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
export default {
  data() {
    return {
      textVal: '911',
      ss: ''
    }
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
    }
  }
}
</script>
