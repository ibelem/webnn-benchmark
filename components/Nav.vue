<template>
  <div>
    <a-menu v-model="current" mode="horizontal">
      <a-menu-item key="home">
        <NuxtLink :to="$i18n.path('')">
          <a-icon type="home" /> {{ $t('links.home') }}
        </NuxtLink>
      </a-menu-item>
      <a-menu-item key="benchmark" disabled>
        <a-icon type="dashboard" /> Benchmark
      </a-menu-item>
      <a-sub-menu>
        <span slot="title" class="submenu-title-wrapper">
          <a-icon type="api" /> Tests
        </span>
        <a-menu-item-group title="TensorflowLite Format">
          <a-menu-item key="test:1">
            MobileNet v1
          </a-menu-item>
          <a-menu-item key="test:2">
            MobileNet v2
          </a-menu-item>
        </a-menu-item-group>
        <a-menu-item-group title="ONNX Format">
          <a-menu-item key="test:3">
            SqueezeNet
          </a-menu-item>
          <a-menu-item key="test:4">
            Option 4
          </a-menu-item>
        </a-menu-item-group>
      </a-sub-menu>
      <a-menu-item key="ranking" disabled>
        <a-icon type="trophy" /> Ranking
      </a-menu-item>
      <a-menu-item key="about">
        <NuxtLink :to="$i18n.path('about')">
          <a-icon type="message" /> {{ $t('links.about') }} 
        </NuxtLink>
      </a-menu-item>
      <a-menu-item key="login">
        <NuxtLink :to="$i18n.path('login')">
          <a-icon type="user" /> {{ $t('login.login') }}
        </NuxtLink>
      </a-menu-item>
      <a-menu-item key="locale">
        <NuxtLink v-if="$i18n.locale === 'en'" :to="`/zh` + $route.fullPath">
          <a-icon type="global" /> {{ $t('links.chinese') }}
        </NuxtLink>
        <NuxtLink v-else :to="$route.fullPath.replace(/^\/[^\/]+/, '')">
          <a-icon type="global" /> {{ $t('links.english') }}
        </NuxtLink>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: ['home']
    }
  }
}
</script>
