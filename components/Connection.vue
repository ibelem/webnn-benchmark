<template v-if="networkstatus.length > 0">
  <div />
</template>

<script>
export default {
  name: 'Connection',
  data() {
    return {
      networkstatus: ''
    }
  },
  beforeMount: function() {
    const _this = this
    const connection =
      navigator.connection ||
      navigator.mozConnection ||
      navigator.webkitConnection

    function updateConnectionStatus() {
      if (connection && connection.type) {
        if (connection.type !== 'ethernet' && connection.type !== 'wifi') {
          _this.networkstatus = `Your connection type is 
            ${connection.type}
            <br>Neural Network models need to be downloaded during the testing, it's better to use Ethernet or WIFI rather than Cellular network.`
        } else {
          _this.networkstatus = `Your connection type is ${connection.type}.`
        }
      }
    }
    if (connection && connection.type) {
      updateConnectionStatus()
      connection.addEventListener('typechange', updateConnectionStatus)
      connection.addEventListener('change', updateConnectionStatus)
    }

    if (this.networkstatus.length > 0) {
      this.openNotification()
    }
  },
  methods: {
    openNotification() {
      const options = { duration: 5 }
      this.$notification.config(options)
      this.$notification.open({
        message: 'AIMark: Network Connection',
        description: this.networkstatus,
        icon: <a-icon type="wifi" style="color: rgba(222, 12, 101, 1.0)" />
      })
    }
  }
}
</script>
