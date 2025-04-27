<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-primary">
      <div class="container-fluid">
        <!-- Logo bên trái -->
        <a class="navbar-brand" href="#" @click.prevent="goToHome">
          <img
            src="../assets/img/logo.png"
            alt="Logo"
            style="max-height: 40px"
          />
        </a>

        <!-- Nút điều hướng (hamburger menu) -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Thanh tìm kiếm và các nút bên phải -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <div class="d-flex align-items-center flex-grow-1">
            <!-- Thanh tìm kiếm -->
            <div class="input-group search-bar mx-2">
              <input
                class="form-control"
                type="search"
                placeholder="Tìm kiếm"
                aria-label="Search"
                v-model="searchQuery"
                @keypress.enter="handleSearch"
              />
              <button
                class="btn btn-outline-info"
                type="button"
                @click="handleSearch"
              >
                <i class="fas fa-search"></i>
              </button>
            </div>
            <!-- Các nút bên phải -->
            <div class="ms-auto d-flex align-items-center">
              <!-- Button tất cả danh mục với biểu tượng menu hamburger -->
              <div class="me-3">
                <router-link
                  to="/jobs"
                  class="btn btn-outline-light d-flex align-items-center"
                >
                  <i class="fas fa-briefcase" style="margin-right: 5px"></i> Tìm
                  việc
                </router-link>
              </div>

              <!-- Icon thông báo và đăng nhập -->
              <div class="d-flex align-items-center">
                <!-- Nút thông báo với dropdown -->
                <div class="position-relative dropdown">
                  <button
                    class="btn btn-outline-light me-2"
                    @click="toggleNotificationDropdown"
                  >
                    <i class="fas fa-bell"></i>
                  </button>

                  <!-- Dropdown thông báo -->
                  <notification-dropdown
                    v-if="showNotificationDropdown"
                    :notifications="notifications"
                    :showDropdown="showNotificationDropdown"
                    @update:showDropdown="showNotificationDropdown = $event"
                  />
                </div>

                <!-- Nếu đã đăng nhập thì hiển thị dropdown hồ sơ -->
                <ProfileDropdown v-if="isLoggedIn" />

                <!-- Nếu chưa đăng nhập thì hiển thị nút đăng nhập -->
                <button v-else class="btn btn-outline-light" @click="goToLogin">
                  <i class="fas fa-user"></i> Đăng nhập
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue"; // Import onMounted và onBeforeUnmount
import { useStore } from "vuex"; // Import Vuex store
import { useRouter } from "vue-router"; // Import router
import ProfileDropdown from "./ProfileDropdown.vue"; // Import ProfileDropdown component
import NotificationDropdown from "./NotificationDropdown.vue"; // Import NotificationDropdown component
import { useToast } from "vue-toastification"; // Import useToast

export default {
  name: "HeaderComponent",
  components: {
    ProfileDropdown,
    NotificationDropdown,
  },
  setup(props, { emit }) {
    const store = useStore();
    const router = useRouter(); // Sử dụng useRouter
    const toast = useToast(); // Sử dụng toast trong setup
    const isLoggedIn = store.getters.isLoggedIn;
    const user = store.getters.getUser;

    const searchQuery = ref("");
    const showNotificationDropdown = ref(false); // Trạng thái dropdown thông báo

    const notifications = ref([]); // Mảng giả lập thông báo

    // Điều hướng đến trang đăng nhập
    const goToLogin = () => {
      router.push({ name: "Login" });
    };

    // Điều hướng đến trang chủ
    const goToHome = () => {
      router.push({ name: "Home" });
    };

    // Hàm tìm kiếm
    const handleSearch = () => {
      if (searchQuery.value.trim() !== "") {
        emit("search", searchQuery.value); // Phát sự kiện để gửi query lên component cha
        router.push({ name: "AllJob", query: { search: searchQuery.value } });
      }
    };

    // Toggle dropdown thông báo
    const toggleNotificationDropdown = () => {
      if (!isLoggedIn) {
        // Nếu chưa đăng nhập, hiển thị cảnh báo yêu cầu đăng nhập
        toast.warning("Vui lòng đăng nhập để xem thông báo!"); // Sử dụng toast để thông báo lỗi
      } else {
        showNotificationDropdown.value = !showNotificationDropdown.value;
      }
    };

    return {
      isLoggedIn,
      user,
      goToLogin,
      goToHome,
      searchQuery,
      handleSearch,
      notifications,
      showNotificationDropdown,
      toggleNotificationDropdown,
    };
  },
};
</script>

<style scoped>
/* Bạn có thể thêm CSS dành riêng cho component ở đây */
@import "../assets/CSS/header.css";
/* Tạo dấu chấm đỏ trên biểu tượng chuông */
.fas.fa-bell {
  position: relative;
}

.fas.fa-bell::after {
  content: "";
  position: absolute;
  top: -5px; /* Điều chỉnh vị trí dấu chấm đỏ */
  right: -5px; /* Điều chỉnh vị trí dấu chấm đỏ */
  width: 10px; /* Đường kính dấu chấm đỏ */
  height: 10px; /* Đường kính dấu chấm đỏ */
  background-color: red; /* Màu sắc dấu chấm */
  border-radius: 50%; /* Biến dấu chấm thành hình tròn */
  border: 1px solid white; /* Đường viền trắng để tách dấu chấm khỏi nền */
}
</style>
