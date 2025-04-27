<template>
  <div>
    <!-- Sử dụng Header component -->
    <HeaderComponent />

    <!-- Nội dung trang chủ -->
    
    <BodyHome />
     <!-- Gọi component Footer -->
    <Footer />
  </div>
</template>

<script>

import HeaderComponent from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import BodyHome from '../components/BodyHome.vue';

export default {
  components: {
    HeaderComponent,
    BodyHome,
    Footer
  }
}
</script>

<style scoped>
/* CSS cho trang chủ */
</style>
