<template>
  <div class="admin-page">
    <div class="admin-container">
      <!-- Sidebar -->
      <SidebarAdmin />

      <!-- Main Content -->
      <div class="main-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import SidebarAdmin from "../../components/admin/SidebarAdmin.vue";

export default {
  components: {
    SidebarAdmin,
  },
};
</script>

<style scoped>
.admin-container {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding: 20px;
}
</style>
