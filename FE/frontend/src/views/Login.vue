<template>
  <div>
    <!-- Gọi component Header -->
    <HeaderLogin />
    
    <!-- Gọi component Form Đăng Ký -->
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue';
import HeaderLogin from '../components/HeaderLogin.vue';


export default {
  components: {
    HeaderLogin,
    LoginForm
  }
};
</script>
