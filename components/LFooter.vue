<template>
  <a-layout-footer class="s85">
    <footer>
      <Badge />
      <Environment />
      <div>&copy;2019 {{ $t('footer.name') }}</div>
    </footer>
  </a-layout-footer>
</template>

<script>
import Environment from '~/components/Environment.vue'
// import Connection from '~/components/Connection.vue'
import Badge from '~/components/Badge.vue'

export default {
  components: {
    Environment,
    // Connection,
    Badge
  }
}
</script>

<style scoped>
footer {
  margin: 1rem 0;
}
.ant-layout-footer {
  text-align: center;
}
.ant-layout-footer div {
  margin-top: 0rem;
}
</style>
