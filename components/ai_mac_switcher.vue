<template>
  <section class="section ir" v-if="ismac">
    <div class="field">
      <b-switch v-model="isSwitchedCustom" @input="getParam" true-value="MPS" false-value="BNNS">
        <!-- {{ isSwitchedCustom }} -->
        {{ bk }}
      </b-switch>
    </div>
  </section>
</template>

<script>
  export default {
    mounted() {
      this.showMacSwitcher()
    },
    methods: {
      showMacSwitcher: function() {
        if (navigator.platform.toLowerCase().indexOf('mac') > -1) {
          this.ismac = true;
          if (location.search == '?prefer=fast') {
            this.isSwitchedCustom = 'BNNS';
            this.bk = 'MPS OFF';
          } else {
            this.isSwitchedCustom = 'MPS';
            this.bk = 'MPS ON';
          }
        } else {
          this.ismac = false;
        }
      },
      getParam: function(value) {
        if (value == 'BNNS' && location.search != '?prefer=fast') {
          location.href = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + location.pathname + '?prefer=fast';
        } else if (value == 'MPS' && location.search == '?prefer=fast') {
          location.href = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + location.pathname;
        }
      }
    },
    data() {
      return {
        ismac: false,
        isSwitchedCustom: '',
        bk: '',
      }
    }
  }
</script>

<style scoped>
  
</style>