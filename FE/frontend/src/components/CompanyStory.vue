<template>
  <div class="container mt-5" id="stories">
    <div class="title">
      <h2>Our Story</h2>
      <hr />
    </div>
    <div class="content">
      <div class="text">
        <h3>Giới thiệu công ty</h3>
        <p class="text-start">{{ companyDescription }}</p>
      </div>
      <div class="image" style="cursor: pointer">
        <img :src="companyImage" alt="Company Story" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    companyDescription: {
      type: String,
      required: true,
    },
    companyImage: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.container {
  background-color: white;
  padding: 20px;
  border: 1px solid #e0e0e0;
  margin-top: 20px;
}
.section-title {
  text-align: center;
  margin-bottom: 20px;
}
.section-title h2 {
  font-size: 24px;
  color: #333;
  position: relative;
  display: inline-block;
}
.title hr {
  width: 80px;
  border: 2px solid #00aaff;
  margin: 10px auto;
}
.content {
  display: flex;
  align-items: center;
}
.content .text {
  flex: 1;
  padding-right: 20px;
}
.content .text h3 {
  color: #007bff;
  font-size: 18px;
  margin-bottom: 10px;
}
.content .text p {
  font-size: 14px;
  color: #333;
}
.content .image {
  flex: 1;
}
.content .image img {
  width: 100%;
  border: 1px solid #e0e0e0;
}
</style>
