<template>
  <HeaderComponent />
  <div class="container mt-5">
    <div class="row">
      <Sidebar />
      <JobTab />
    </div>
  </div>
</template>

<script>
import HeaderComponent from "../components/Header.vue";
import Sidebar from "../components/Sidebar.vue";
import JobTab from "../components/JobTab.vue";

export default {
  name: "JobManager",
  components: {
    HeaderComponent,
    Sidebar,
    JobTab,
  },
};
</script>

<style scoped>
/* Thêm các kiểu CSS nếu cần */
</style>
