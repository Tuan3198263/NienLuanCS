<template>
  <div class="related-keywords mb-3">
    <span style="margin-right: 15px">Từ khóa liên quan</span>
    <span v-for="keyword in keywords" :key="keyword" class="badge">{{
      keyword
    }}</span>
  </div>
</template>

<script>
export default {
  props: {
    keywords: Array,
  },
};
</script>

<style scoped>
.related-keywords {
  font-weight: bold;
  font-size: 16px;
  color: #555;
}

.related-keywords .badge {
  display: inline-block;
  background-color: #f5f5f5;
  color: #333;
  margin-right: 18px;
  margin-top: 8px;
  padding: 3px 3px;
  border-radius: 20px; /* Làm badge có dạng hình tròn bo góc */
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Thêm hiệu ứng đổ bóng */
  transition: all 0.3s ease;
  cursor: pointer;
}
</style>
