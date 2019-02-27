<template>
  <a-layout id="components-layout-index-top" class="layout">
    <LHeader />
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
    return { title: this.$t('about.title') }
  }
}
</script>

<style scoped>
</style>
