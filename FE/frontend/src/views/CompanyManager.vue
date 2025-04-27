<template>
  <HeaderComponent />
  <div class="container mt-5">
    <div class="row">
      <Sidebar />
      <CompanyTab />
    </div>
  </div>
</template>

<script>
import HeaderComponent from "../components/Header.vue";
import Sidebar from "../components/Sidebar.vue";
import CompanyTab from "../components/CompanyTab.vue";

export default {
  name: "CompanyManager",
  components: {
    HeaderComponent,
    Sidebar,
    CompanyTab,
  },
};
</script>

<style scoped>
/* Thêm các kiểu CSS nếu cần */
</style>
