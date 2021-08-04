<template>
  <div id="app" class="wrapper">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component"  v-if="$route.meta.keepAlive"/>
      </keep-alive>
      <component :is="Component"  v-if="!$route.meta.keepAlive"/>
    </router-view>

    <main-tab-bar v-if="!$route.meta.tabbar"/>
  </div>
</template>
<script>
  import MainTabBar from './components/content/mainTabbar/MainTabBar'
  export default {
    name: 'app',
    components: {
      MainTabBar
    }
  }
</script>
<style>
  @import "./assets/css/base.css";
</style>
