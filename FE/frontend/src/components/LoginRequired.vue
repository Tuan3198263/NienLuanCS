<!-- src/components/LoginRequired.vue -->
<template>
  <div class="login-required">
    <p>Vui lòng đăng nhập để thêm công việc vào danh sách yêu thích.</p>
    <button @click="goToLogin" class="btn btn-primary">Đăng nhập</button>
  </div>
</template>

<script>
export default {
  methods: {
    goToLogin() {
      this.$router.push({ name: "Login" }); // Chuyển hướng đến trang đăng nhập
    },
  },
};
</script>

<style scoped>
.login-required {
  padding: 10px;
  border: 1px solid #ff0000;
  background-color: #ffe6e6;
  color: #ff0000;
  border-radius: 5px;
}
</style>
