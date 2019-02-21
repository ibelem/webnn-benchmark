<template>
  <footer>
    <!-- <Connection /> -->
    <Badge />
    <Environment />
    <div>
      &copy;2019 {{ $t('footer.name') }}
    </div>
  </footer>
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
  text-align: center;
}
footer div {
  margin-top: 1rem;
}
</style>
