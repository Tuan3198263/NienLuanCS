<template>
  <div
    class="dropdown d-flex"
    @click="toggleDropdown"
    @blur="closeDropdown"
    tabindex="0"
  >
    <button class="btn btn-outline-light dropdown-toggle" type="button">
      <i class="fas fa-user"></i> Hồ Sơ
    </button>
    <div v-if="isDropdownOpen" class="dropdown-menu show">
      <a class="dropdown-item" href="#" @click="goToProfile">Hồ sơ của tôi</a>
      <a class="dropdown-item" href="#" @click="goToMyCompany"
        >Công ty của tôi</a
      >
      <a class="dropdown-item" href="#" @click="goToMyJob">Việc làm của tôi</a>
      <div class="dropdown-divider"></div>
      <a class="dropdown-item" @click="handleLogout" style="cursor: pointer"
        >Đăng xuất</a
      >
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router"; // Import useRouter từ vue-router
import { mapActions } from "vuex"; // Import mapActions để sử dụng các actions từ Vuex
import { useToast } from "vue-toastification"; // Import toast để hiển thị thông báo

export default {
  name: "ProfileDropdown",
  data() {
    return {
      isDropdownOpen: false,
    };
  },
  setup() {
    const router = useRouter(); // Khởi tạo useRouter
    const toast = useToast(); // Khởi tạo useToast để hiển thị thông báo toast

    const goToProfile = () => {
      router.push({ name: "Profile" }); // Điều hướng đến trang Profile
    };

    const goToMyCompany = () => {
      router.push({ name: "CompanyManager" }); // Điều hướng đến trang cong ty cua toi
    };

    const goToMyJob = () => {
      router.push({ name: "JobManager" }); // Điều hướng đến trang viec lam cua toi
    };

    return {
      goToProfile,
      goToMyCompany,
      goToMyJob,
      toast, // Trả về toast để sử dụng trong methods
    };
  },
  methods: {
    ...mapActions(["logout"]), // Sử dụng mapActions để lấy action logout từ Vuex
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    closeDropdown() {
      this.isDropdownOpen = false;
    },
    // dang xuat
    handleLogout() {
      this.logout(); // Gọi action logout từ Vuex
      this.$router.push({ name: "Login" }); // Điều hướng về trang đăng nhập
      // Hiển thị thông báo đăng xuất thành công
      this.toast.success("Đăng xuất thành công!");
    },
    handleDocumentClick(event) {
      const dropdown = this.$el; // Đối tượng dropdown
      if (!dropdown.contains(event.target)) {
        this.closeDropdown(); // Đóng dropdown nếu click ra ngoài
      }
    },
  },
  mounted() {
    // Thêm sự kiện click cho document
    document.addEventListener("click", this.handleDocumentClick);
  },
  beforeUnmount() {
    // Gỡ bỏ sự kiện click cho document
    document.removeEventListener("click", this.handleDocumentClick);
  },
};
</script>

<style scoped>
.dropdown-menu {
  position: absolute; /* Đảm bảo dropdown hiển thị đúng vị trí */
  display: block; /* Hiển thị dropdown khi mở */
  z-index: 1000; /* Đảm bảo nằm trên các thành phần khác */
  right: 0;
  top: 50px; /* Căn chỉnh bên phải với nút */
  min-width: 160px; /* Thiết lập độ rộng tối thiểu nếu cần */
}

.dropdown-item {
  text-align: left; /* Căn trái cho các item trong dropdown */
  padding: 8px 16px; /* Thêm padding để các item cách xa nhau hơn */
}

/* Tùy chọn: Thay đổi thêm style cho dropdown */
.dropdown {
  margin-right: 0; /* Điều chỉnh lề phải nếu cần */
}
</style>
