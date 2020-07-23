<template>
  <div>
    <div>
      <input id="ttsText" type="text">
      <input id="tts_btn" type="button" value="播放" @click="doTTS">
      <input id="zt_btn" type="button" value="暂停" @click="doZT">
    </div>
    <div id="wrapp" />
  </div>

</template>
<script>
import CryptoJS from 'crypto-js'
import WebSocket from 'ws'
import fs from 'fs'

var date = (new Date().toUTCString())
// 设置当前临时状态为初始化

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
  text: '你好这是一个兔头在测试  Hi this is a rabbit testing',
  uri: '/v2/tts'
}

export default {
  data() {
    return {
      textVal: '911',
      ss: '',
      // wssUrl: '',
      websocket: null
    }
  },
  created() {
    this.initWebsocket()
  },
  destroyed() {
    this.websocket.close()
  },
  mounted() {
    this.websocketonopen()
    this.websocketonmessage()
    this.websocketclose()
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
    initWebsocket() {
      const wsUrl = config.hostUrl + '?authorization=' + this.getAuthStr(date) + '&date=' + date + '&host=' + config.host
      this.websocket = new WebSocket(wsUrl)
      this.websocket.onmessage = this.websocketonmessage
      this.websocket.onopen = this.websocketonopen
      this.websocket.close = this.websocketclose
      this.websocket.send = this.websocketsend
    },
    websocketonopen() { // 连接建立之后执行send方法发送数据
      console.log('websocket connect!')
      this.send()
      // 如果之前保存过音频文件，删除之
      if (fs.existsSync('./test.pcm')) {
        fs.unlink('./test.pcm', (err) => {
          if (err) {
            console.log('remove error: ' + err)
          }
        })
      }
    },
    websocketonerror() { // 连接建立失败重连
      this.initWebSocket()
    },
    websocketonmessage(data, err) { // 数据接收
      // const redata = JSON.parse(e.data)
      if (err) {
        console.log('message error: ' + err)
        return
      }

      const res = JSON.parse(data)

      if (res.code !== 0) {
        console.log(`${res.code}: ${res.message}`)
        this.websocketclose()
        return
      }

      const audio = res.data.audio
      const audioBuf = Buffer.from(audio, 'base64')

      this.save(audioBuf)

      if (res.code === 0 && res.data.status === 2) {
        this.websocketclose()
      }
    },
    websocketsend(Data) { // 数据发送
      this.websocketsend(Data)
    },
    websocketclose(e) { // 关闭
      console.log('断开连接', e)
    },
    getAuthStr(date) { // 鉴权签名
      const signatureOrigin = `host: ${config.host}\ndate: ${date}\nGET ${config.uri} HTTP/1.1`
      const signatureSha = CryptoJS.HmacSHA256(signatureOrigin, config.apiSecret)
      const signature = CryptoJS.enc.Base64.stringify(signatureSha)
      const authorizationOrigin = `api_key="${config.apiKey}", algorithm="hmac-sha256", headers="host date request-line", signature="${signature}"`
      const authStr = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(authorizationOrigin))
      return authStr
    },
    send() {
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
      console.log('frame', frame)
      this.websocketsend(JSON.stringify(frame))
      this.websocket.close()
    },
    save(data) {
      fs.writeFile('./demo.mp3', data, { flag: 'a' }, (err) => {
        if (err) {
          console.log('save error: ' + err)
          return
        }

        console.log('文件保存成功')
      })
    }

  }

}
</script>
