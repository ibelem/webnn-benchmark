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
          <a-icon type="setting" />Tests
        </span>
        <a-menu-item-group title="Item 1">
          <a-menu-item key="setting:1">
            Option 1
          </a-menu-item>
          <a-menu-item key="setting:2">
            Option 2
          </a-menu-item>
        </a-menu-item-group>
        <a-menu-item-group title="Item 2">
          <a-menu-item key="setting:3">
            Option 3
          </a-menu-item>
          <a-menu-item key="setting:4">
            Option 4
          </a-menu-item>
        </a-menu-item-group>
      </a-sub-menu>
      <a-menu-item key="ranking" disabled>
        <a-icon type="appstore" /> Ranking
      </a-menu-item>
      <a-menu-item key="about">
        <NuxtLink :to="$i18n.path('about')">
          {{ $t('links.about') }} 
        </NuxtLink>
      </a-menu-item>
      <a-menu-item key="login">
        <NuxtLink :to="$i18n.path('login')">
          <a-icon type="user" /> {{ $t('login.login') }}
        </NuxtLink>
      </a-menu-item>
      <a-menu-item key="locale">
        <NuxtLink v-if="$i18n.locale === 'en'" :to="`/zh` + $route.fullPath">
          {{ $t('links.chinese') }}
        </NuxtLink>
        <NuxtLink v-else :to="$route.fullPath.replace(/^\/[^\/]+/, '')">
          {{ $t('links.english') }}
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
