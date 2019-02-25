<template>
  <a-layout id="components-layout-index-top" class="layout">
    <a-layout-header>
      <div class="logo" />
      <Nav />
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>List</a-breadcrumb-item>
        <a-breadcrumb-item>App</a-breadcrumb-item>
      </a-breadcrumb>
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">
        <h4 class="title">
          {{ $t('home.title') }}
        </h4>
        <h5 class="subtitle">
          {{ $t('home.introduction') }}
        </h5>
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
