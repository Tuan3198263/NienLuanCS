<template>
  <div class="d-flex">
    <!-- Sidebar -->
    <div class="sidebar"></div>

    <!-- Main Content -->
    <div class="flex-grow-1 p-4">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Hồ sơ Admin</a>
        </div>
      </nav>

      <div class="container mt-4">
        <!-- Profile Info -->
        <div class="card mb-4">
          <div class="card-header">
            <h4>Thông tin hồ sơ Admin</h4>
          </div>
          <div class="card-body">
            <p><strong>Họ tên:</strong> {{ profile.name }}</p>
            <p><strong>Chức vụ:</strong> {{ profile.position }}</p>
            <p><strong>Địa chỉ:</strong> {{ profile.address }}</p>
            <p><strong>Email:</strong> {{ profile.email }}</p>
            <p><strong>Số điện thoại:</strong> {{ profile.phone }}</p>
            <p><strong>Ngày tham gia:</strong> {{ profile.joinDate }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarAdmin from "../../components/admin/SidebarAdmin.vue"; // Đảm bảo đường dẫn chính xác

export default {
  components: {
    SidebarAdmin,
  },
  data() {
    return {
      profile: {
        name: "Lê Nguyễn Thái Tuấn",
        position: "Admin",
        address: "456 Admin St, City, Country",
        email: "admin@xyz.com",
        phone: "0987654321",
        joinDate: "2024-01-15",
      },
    };
  },
};
</script>

<style scoped>
.d-flex {
  display: flex;
  min-height: 100vh;
}

.flex-grow-1 {
  margin-left: 250px; /* Khoảng cách giữa sidebar và content */
  padding: 20px;
  flex-grow: 1;
}

.card-header h4 {
  font-weight: 600;
}

.card-body p {
  font-size: 16px;
}

.card-body p strong {
  color: #007bff;
}

@media (max-width: 992px) {
  .d-flex {
    flex-direction: column; /* Chuyển sidebar và content thành cột */
  }

  .sidebar {
    width: 100%; /* Sidebar chiếm toàn bộ chiều rộng */
    height: auto; /* Không cố định chiều cao */
    position: relative; /* Chuyển thành block */
  }

  .flex-grow-1 {
    margin-left: 0; /* Không có khoảng cách khi sidebar nằm trên cùng */
  }
}
</style>
