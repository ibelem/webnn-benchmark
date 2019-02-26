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
          {{ $t('about.title') }}
        </h4>
        <Logo />
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      <Foot />
    </a-layout-footer>
  </a-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import Nav from '~/components/Nav.vue'
import Foot from '~/components/Foot.vue'

export default {
  components: {
    Logo,
    Nav,
    Foot
  },
  head() {
    return { title: this.$t('about.title') }
  }
}
</script>

<style scoped>
</style>
