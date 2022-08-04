<!--
* @Description: socket接收页面
* @Author: songyf
* @Date: 2021-02-16
* @LastEditTime: 2021-02-16
* @LastEditors: songyf
-->
<template>
  <div style="display: none"></div>
</template>
<script>
import io from 'socket.io-client'
export default {
  name: 'SocketPage',
  data () {
    return {
      timerCountDown: '', // 倒计时5秒
      chatSocket: {},
      chatSocket2: {},
      chatSocketList: []
    }
  },
  mounted: function () {
    const nameSpace = localStorage.getItem('userUuid')
    const host = 'http://192.168.2.21:28014'
    this.chatSocketList = io(host + '/' + nameSpace)
    // this.chatSocketList = io('/' + nameSpace)
    this.chatSocketList.on('connect', this.connectHandler)
    this.chatSocketList.on('message', this.messageHandler)
    this.chatSocketList.on('disconnect', this.disconnectHandler)
    this.chatSocketList.on('connect_error', (err) => {
      console.log(111 + err)
    })
  },
  methods: {
    connectSocket () {
    },
    connectHandler () {
      return function () {
        console.log('Client has connected to the server!')
      }
    },
    messageHandler (data) {
      console.log(data)
      if (data.type === 1) {
        this.clearMessage()
        this.$refs.audio && this.$refs.audio.play() // 播放
        this.$alert(`<strong>${data.message}</strong> <br><br><span style="color: red" id="count-down-time">5</span> 秒后自动退出`, '提示', {
          dangerouslyUseHTMLString: true,
          showConfirmButton: false
        })
        this.timerCountDown = setInterval(() => {
          this.countDown()
        }, 1000)
      } else if (data.type === 2) {
        this.$notify({
          title: '提示',
          message: `<strong>${data.message}</strong>`,
          dangerouslyUseHTMLString: true,
          duration: 5000
        })
      } else if (data.type === 3) {
        this.$confirm(`${data.message}`, '提示', {
          confirmButtonText: '同意',
          cancelButtonText: '拒绝',
          dangerouslyUseHTMLString: true,
          type: 'warning'
        }).then(() => {
          this.$get(`/orderInfo/audit/${data.orderUuid}/1`).then((res) => {
            if (res.data.success) {
              this.$message({ type: 'success', message: res.data.msg })
            } else {
              this.$message({ type: 'error', message: res.data.msg })
            }
          })
        }).catch(() => {
          this.$get(`/orderInfo/audit/${data.orderUuid}/0`).then((res) => {
            if (res.data.success) {
              this.$EventBus.$emit('getAuthList')
              this.$message({ type: 'success', message: res.data.msg })
            } else {
              this.$message({ type: 'error', message: res.data.msg })
            }
          })
        })
      }
    },
    countDown () { // 倒计时
      const time = document.getElementById('count-down-time')
      if (time.innerHTML === '0') { // 等于0时清除计时
        clearInterval(this.timerCountDown)
        this.clearMessage()
      } else {
        time.innerHTML = time.innerHTML - 1
      }
    },
    clearMessage () {
      let messageBox = document.getElementsByClassName('el-message-box__wrapper')
      let model = document.getElementsByClassName('v-modal')
      if (Object.keys(messageBox).length > 0) {
        messageBox[0].parentNode.removeChild(messageBox[0])
        model[0].parentNode.removeChild(model[0])
      }
    },
    disconnectHandler () {
      return function () {
        console.log('The client has disconnected!')
      }
    }
  },
  beforeDestroy () {
    if (this.chatSocketList) {
      this.chatSocketList.disconnect()
      this.chatSocketList = []
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.s-notification
  .s-notification-group
    .s-notification-content
      white-space pre-wrap
</style>
