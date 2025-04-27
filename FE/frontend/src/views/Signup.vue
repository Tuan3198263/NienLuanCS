<template>
  <div>
    <!-- Gọi component Header -->
    <HeaderLogin />
    
    <!-- Gọi component Form Đăng Ký -->
    <SignupForm />
  </div>
</template>

<script>
import HeaderLogin from '../components/HeaderLogin.vue';
import SignupForm from '../components/SignupForm.vue';

export default {
  components: {
    HeaderLogin,
    SignupForm
  }
};
</script>
