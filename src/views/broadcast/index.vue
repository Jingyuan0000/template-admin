<template>
  <div>
    <div>
      <input id="ttsText" type="text">
      <input id="tts_btn" type="button" value="播放" @click="doTTS">
      <input id="zt_btn" type="button" value="暂停" @click="doZT">

      <audio id="xf" autoplay="autoplay">
        <source :src="audioData">
      </audio>
      <input id="tts_btn" type="button" value="播放在线合成" @click="doXF">
    </div>
    <div id="wrapp" />
  </div>

</template>
<script>
import CryptoJS from 'crypto-js'
// import fs from 'fs'

// 系统配置
const config = {
  // 请求地址
  hostUrl: 'wss://tts-api.xfyun.cn/v2/tts',
  host: 'tts-api.xfyun.cn',
  // 在控制台-我的应用-在线语音合成（流式版）获取
  appid: '5ec5edc4',
  // 在控制台-我的应用-在线语音合成（流式版）获取
  apiSecret: '06e41594bf03cd60e32409b3d7187046',
  // 在控制台-我的应用-在线语音合成（流式版）获取
  apiKey: '140ace321786ed56adcc9014dc847881',
  text: '你好这是一个兔头兔兔在测试  Hi this is a rabbit testing',
  uri: '/v2/tts'
}
export default {
  data() {
    return {
      textVal: '911',
      ss: '',
      path: '',
      socket: '',
      audioData: ''
    }
  },
  // created() {
  //   this.initWebsocket()
  // },
  destroyed() {
    this.socket.onclose = this.close()
  },
  mounted() {
    // 获取当前时间 RFC1123格式
    const date = (new Date().toUTCString())
    // 设置当前临时状态为初始化
    this.path = config.hostUrl + '?authorization=' + this.getAuthStr(date) + '&date=' + date + '&host=' + config.host
    this.init()
  },
  methods: {
    doTTS() {
      var ttsDiv = document.getElementById('wrapp')
      var ttsText = document.getElementById('ttsText').value
      var a = '<audio id="wrapp_aud" autoplay="autoplay">'
      var b = '<source src="http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=8&text=' + ttsText + '"type="audio/mpeg">'
      var c = '</audio>'
      ttsDiv.innerHTML = a + b + c
      var ttsAudio = document.getElementById('wrapp_aud')
      ttsAudio.play
    },
    doZT() {
      var ttsAudio = document.getElementById('wrapp_aud')
      ttsAudio.pause()
    },
    doXF() {
      var xfAudio = document.getElementById('xf')
      xfAudio.play
    },
    init() {
      if (typeof (WebSocket) === 'undefined') {
        alert('您的浏览器不支持socket')
      } else {
        this.socket = new WebSocket(this.path)
        this.socket.onopen = this.open
        this.socket.onerror = this.error
        this.socket.onmessage = this.getMessage
      }
    },
    // websocket方法
    open() {
      console.log('socket连接成功')
      this.sendText()
      // 如果之前保存过音频文件，删除之
      // if (fs.existsSync('./test.pcm')) {
      //   fs.unlink('./test.pcm', (err) => {
      //     if (err) {
      //       console.log('remove error: ' + err)
      //     }
      //   })
      // }
    },
    error() {
      console.log('socket连接错误')
    },
    getMessage(res) {
      // console.log('res1', res.data)
      const result = JSON.parse(res.data)
      console.log('res2', result.code, result.message, result.data)
      if (result.code !== 0) {
        console.log('error' + result.code + res.data.message)
        this.close()
        return
      }
      const audio = result.data.audio
      const audioBuf = Buffer.from(audio, 'base64')

      this.save(audioBuf)
      // if (result.code === 0 && result.data.status === 2) {
      //   this.close()
      // }
    },
    send(params) {
      this.socket.send(params)
    },
    close() {
      console.log('socket已经关闭')
    },
    // 鉴权签名
    getAuthStr(date) {
      const signatureOrigin = `host: ${config.host}\ndate: ${date}\nGET ${config.uri} HTTP/1.1`
      const signatureSha = CryptoJS.HmacSHA256(signatureOrigin, config.apiSecret)
      const signature = CryptoJS.enc.Base64.stringify(signatureSha)
      const authorizationOrigin = `api_key="${config.apiKey}", algorithm="hmac-sha256", headers="host date request-line", signature="${signature}"`
      const authStr = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(authorizationOrigin))
      return authStr
    },
    // 传输数据
    sendText() {
      const frame = {
        // 填充common
        'common': {
          'app_id': config.appid
        },
        // 填充business
        'business': {
          'aue': 'lame',
          'sfl': 1,
          'auf': 'audio/L16;rate=16000',
          'vcn': 'xiaoyan',
          'tte': 'UTF8'
        },
        // 填充data
        'data': {
          'text': Buffer.from(config.text).toString('base64'),
          'status': 2
        }
      }
      this.send(JSON.stringify(frame))
    },
    // 保存文件
    save(data) {
      console.log('进入save')
      // console.log('声音文件', data.toString())
      const audioBuf = Buffer.from(data, 'base64')
      this.audioData = 'data:audio/wav;base64' + audioBuf
      console.log('audioBuf', audioBuf)
    }
  }
}
</script>
