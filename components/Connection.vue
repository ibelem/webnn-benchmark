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
          _this.networkstatus =
            'Your connection type is ' +
            connection.type +
            "<br>It requires to download NN models from server, it's better to use Ethernet or WIFI rather than Cellular network."
        } else {
          _this.networkstatus =
            'Your connection type is ' + connection.type + '.'
        }
      }
    }
    if (connection && connection.type) {
      updateConnectionStatus()
      connection.addEventListener('typechange', updateConnectionStatus)
      connection.addEventListener('change', updateConnectionStatus)
    }
  }
}
</script>
