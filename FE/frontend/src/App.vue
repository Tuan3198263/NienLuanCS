<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div id="app">
    <router-view /> <!-- Sẽ hiển thị Home.vue ở đây -->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
