<template>
  <a-layout id="components-layout-index-top" class="layout">
    <a-layout-header>
      <Nav />
    </a-layout-header>
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
    <a-layout-footer style="text-align: center">
      <Foot />
    </a-layout-footer>
  </a-layout>
</template>

<script>
import Nav from '~/components/Nav.vue'
import Foot from '~/components/Foot.vue'

export default {
  components: {
    Nav,
    Foot
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
