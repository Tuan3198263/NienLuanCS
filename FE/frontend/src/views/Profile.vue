<template>
    <HeaderComponent/>
  <div class="container mt-5">
    <div class="row">
      <Sidebar />
      <ProfileContent />
    </div>
  </div>
</template>

<script>
import HeaderComponent from '../components/Header.vue'
import Sidebar from '../components/Sidebar.vue';
import ProfileContent from '../components/ProfileContent.vue';

export default {
  name: "Profile",
  components: {
    HeaderComponent,
    Sidebar,
    ProfileContent,
  },
};
</script>

<style scoped>
/* Thêm các kiểu CSS nếu cần */
</style>
