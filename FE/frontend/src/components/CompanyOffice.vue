<template>
  <div class="container mt-5" id="office">
    <div class="title">
      <h2>Our Office</h2>
      <hr />
    </div>
    <div class="row">
      <!-- Hiển thị hình ảnh văn phòng tương ứng -->
      <div
        class="col-md-4 image-card"
        style="cursor: pointer"
        v-for="(image, index) in selectedCompanyImages"
        :key="index"
      >
        <img
          :alt="'Office Image ' + (index + 1)"
          class="img-fluid"
          :src="getImagePath(image)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    companyId: {
      type: [Number, String],
      required: true,
    },
  },
  setup(props) {
    // Chỉ định danh sách hình ảnh văn phòng cho công ty (sử dụng mảng trực tiếp)
    const selectedCompanyImages = [
      "office1.jpg", // Hình ảnh 1
      "office2.jpg", // Hình ảnh 2
      "office3.jpg",
      "office4.jpg",
      "office5.jpg",
      "office6.jpg", // Hình ảnh 3
      // Thêm các hình ảnh khác nếu cần
    ];

    return {
      selectedCompanyImages, // Trả về mảng hình ảnh đã xác định
    };
  },
  methods: {
    // Xử lý đường dẫn hình ảnh
    getImagePath(image) {
      // Nếu là URL, trả về nguyên bản, nếu không thì lấy từ thư mục assets
      if (image.startsWith("http")) {
        return image;
      }
      try {
        return new URL(`../assets/img/company_office/${image}`, import.meta.url)
          .href;
      } catch (error) {
        console.error("Không tìm thấy ảnh:", error);
        return ""; // Trả về chuỗi rỗng nếu không tìm thấy hình ảnh
      }
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 20px;
}

.title {
  text-align: center;
  margin-bottom: 20px;
}

.title h2 {
  font-family: "Arial", sans-serif;
  font-size: 36px;
  color: #333;
}

.title hr {
  width: 80px;
  border: 2px solid #00aaff;
  margin: 10px auto;
}

.image-card {
  margin-bottom: 20px;
}

.image-card img {
  width: 100%; /* Chiều rộng hình ảnh đầy đủ của container */
  height: 200px; /* Chiều cao cố định cho tất cả hình ảnh */
  object-fit: cover; /* Cắt hình ảnh nếu cần để giữ tỷ lệ */
}
</style>
