<template>
  <div class="col-md-9">
    <h5>Công Ty Của Tôi</h5>
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: activeTab === 'viewProfile' }"
          @click="activeTab = 'viewProfile'"
          href="javascript:void(0);"
        >
          Nhà tuyển dụng xem hồ sơ
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: activeTab === 'followCompany' }"
          @click="activeTab = 'followCompany'"
          href="javascript:void(0);"
        >
          Theo dõi công ty
        </a>
      </li>
    </ul>

    <!-- Nội dung động dựa trên tab -->
    <div v-if="activeTab === 'viewProfile'" class="content-box mt-3">
      <img
        alt="Illustration of a magnifying glass over documents"
        height="100"
        src="https://storage.googleapis.com/a1aa/image/QbFUCNN5fkxNMambElrMcNfF6fu4Me4arpGH7sgGK6k5FzecC.jpg"
        width="100"
      />
      <p>Nhà tuyển dụng không thể xem hồ sơ của bạn</p>
      <a href="#">Bật chế độ cho phép nhà tuyển dụng xem hồ sơ</a>
    </div>

    <div
      v-if="activeTab === 'followCompany'"
      class="company-card mt-3 d-flex align-items-center"
    >
      <img
        alt="Company logo"
        height="50"
        src="https://storage.googleapis.com/a1aa/image/4dDKBPZOuLJMBdNmpylhoN5NBDvg4O8KaXlrmWmPNaNCN75E.jpg"
        width="50"
      />
      <div class="ms-3">
        <h6 class="mb-1">Công ty TNHH Công nghệ Chính xác FUYU</h6>
        <p class="mb-1">
          <i class="fas fa-industry"> </i>
          Sản xuất
        </p>
        <p class="mb-0">
          <i class="fas fa-users"> </i>
          577 lượt theo dõi
          <i class="fas fa-briefcase"> </i>
          9 việc làm
        </p>
      </div>
      <button class="btn ms-auto">Hủy theo dõi</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CompanyTab",
  data() {
    return {
      activeTab: "viewProfile", // tab mặc định
    };
  },
};
</script>

<style scoped>
body {
  background-color: #f8f9fa;
}
.container {
  margin-top: 20px;
}
.nav-tabs .nav-link.active {
  color: #0d6efd;
  font-weight: bold;
}
.content-box {
  background-color: #ffffff;
  border: 1px solid #e9ecef;
  padding: 20px;
  text-align: center;
}
.content-box img {
  width: 100px;
  margin-bottom: 20px;
}
.content-box p {
  margin: 0;
}
.content-box a {
  color: #0d6efd;
  text-decoration: none;
}
.company-card {
  background-color: #ffffff;
  border: 1px solid #e9ecef;
  padding: 20px;
}
.company-card img {
  width: 50px;
}
.company-card h6 {
  font-weight: bold;
}
.company-card p {
  margin: 0;
}
</style>
