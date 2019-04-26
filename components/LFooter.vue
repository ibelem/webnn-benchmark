<template>
  <a-layout-footer class="s85">
    <footer>
      <Badge />
      <Environment />
      <div>
        &copy;2019 {{ $t('footer.name') }}   
        <a-dropdown>
          <a class="ant-dropdown-link" href="#" title="Web Neural Network API">
            WebNN
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="https://huningxin.github.io/webml-examples/">Use Cases</a>
            </a-menu-item>
            <a-menu-item>
              <a href="https://github.com/intel/webml-polyfill">Polyfill</a>
            </a-menu-item>
            <a-menu-item>
              <a href="https://webmachinelearning.github.io/webnn/">W3C Spec</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>

      </div>
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
