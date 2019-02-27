<template>
  <a-layout id="components-layout-index-top" class="layout">
    <LHeader />
    <a-layout-content>
      <div>
        <h3 class="title">
          {{ $t('home.title') }}
        </h3>
        <h4 class="subtitle">
          {{ $t('home.introduction') }}
        </h4>
      </div>
    </a-layout-content>
    <LFooter />
  </a-layout>
</template>

<script>
import LHeader from '~/components/LHeader.vue'
import LFooter from '~/components/LFooter.vue'

export default {
  components: {
    LHeader,
    LFooter
  },
  head() {
    return { title: this.$t('home.title') }
  }
}
</script>

<style scoped>
#components-layout-index-top .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}
</style>
