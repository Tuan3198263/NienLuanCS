<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-primary navbar-custom">
      <div
        class="container-fluid d-flex justify-content-center align-items-center container-item"
      >
        <!-- Logo bên trái -->
        <div class="logo d-flex">
           <router-link to="/" exact>
          <img src="../assets/img/logo.png" alt="Logo" class="img-fluid" />
        </router-link>
        </div>
      </div>
    </nav>
</template>

<script>
export default {
  name: 'HeaderLogin'
};
</script>

<style scoped>

</style>