<template>
  <div class="col-md-3">
    <div class="list-group">
      <a href="#" class="list-group-item list-group-item-action bg-info-subtle">
        <i class="fas fa-briefcase"></i> Quản lý nghề nghiệp
      </a>

      <router-link
        to="/profile"
        class="list-group-item list-group-item-action"
        :class="{ active: $route.name === 'Profile' }"
      >
        <i class="fas fa-user"></i> Hồ sơ của tôi
      </router-link>
      <router-link
        to="/company-manager"
        class="list-group-item list-group-item-action"
        :class="{ active: $route.name === 'CompanyManager' }"
      >
        <i class="fas fa-building"></i> Công ty của tôi
      </router-link>

      <router-link
        to="/job-manager"
        class="list-group-item list-group-item-action"
        :class="{ active: $route.name === 'JobManager' }"
      >
        <i class="fas fa-clipboard"></i> Việc làm của tôi
      </router-link>
      <!-- Thêm các router-link khác tương ứng -->
      <a href="#" class="list-group-item list-group-item-action">
        <i class="fas fa-cog"></i> Quản lý tài khoản
      </a>
      <button class="btn btn-warning mt-3 w-100">
        <i class="fas fa-plus-circle"></i> Tạo thông báo việc làm
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
};
</script>

<style scoped>
/* Thêm các kiểu CSS nếu cần */
</style>
