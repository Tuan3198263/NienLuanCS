<template>
  <div class="col-md-9">
    <h5>Công Việc Của Tôi</h5>
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: activeTab === 'appliedJobs' }"
          @click="setActiveTab('appliedJobs')"
          href="javascript:void(0);"
        >
          Việc đã ứng tuyển
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: activeTab === 'savedJobs' }"
          @click="setActiveTab('savedJobs')"
          href="javascript:void(0);"
        >
          Việc đã lưu
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          :class="{ active: activeTab === 'jobInvitations' }"
          @click="setActiveTab('jobInvitations')"
          href="javascript:void(0);"
        >
          Thư mời ứng tuyển
        </a>
      </li>
    </ul>

    <div class="content-box mt-3" v-if="activeTab === 'appliedJobs'">
      <!-- Kiểm tra nếu ứng viên đã ứng tuyển công việc -->
      <div v-if="appliedJobs.length === 0">
        <p>Bạn chưa ứng tuyển công việc nào.</p>
        <router-link to="/jobs">Xem thêm việc làm</router-link>
      </div>
      <div v-else>
        <!-- Hiển thị danh sách công việc đã ứng tuyển -->
        <JobListingApplication :appliedJobs="appliedJobs" />
      </div>
    </div>
    <div v-if="activeTab === 'savedJobs'" class="content-box mt-3">
      <!-- Kiểm tra nếu favoriteJobs có công việc yêu thích -->
      <div v-if="favoriteJobs.length === 0">
        <p>Bạn chưa lưu công việc yêu thích nào.</p>
        <!-- Sử dụng router-link để điều hướng đến trang jobs -->
        <router-link to="/jobs">Tìm việc để lưu</router-link>
      </div>
      <div v-else>
        <JobListing :jobs="favoriteJobs" />
      </div>
    </div>

    <div v-if="activeTab === 'jobInvitations'" class="content-box mt-3">
      <p>Bạn chưa nhận được thư mời ứng tuyển.</p>
      <a href="#">Cập nhật hồ sơ để nhận thư mời</a>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import JobListing from "./JobListing.vue";
import JobListingApplication from "./jobListingApplication.vue";

export default {
  name: "JobTab",
  components: {
    JobListing,
    JobListingApplication,
  },
  setup() {
    const activeTab = ref("appliedJobs"); // Tab hiện tại
    const favoriteJobs = ref([]); // Danh sách công việc yêu thích
    const appliedJobs = ref([]); //Danh sach cv đã ứng tuyển

    // Lấy token từ localStorage (hoặc từ cookie nếu bạn lưu token ở đó)
    const token = localStorage.getItem("token"); // Hoặc thay bằng cách lấy từ Vuex nếu bạn lưu ở đó

    // Fetch dữ liệu khi component được mounted
    const fetchFavoriteJobs = async () => {
      try {
        if (!token) {
          throw new Error("Không có token, truy cập bị từ chối.");
        }

        const response = await fetch(
          "http://localhost:3000/api/favorites/list",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Thêm token vào header
              "Content-Type": "application/json", // Nếu API yêu cầu
            },
          }
        );

        if (!response.ok) {
          throw new Error("Lỗi khi lấy dữ liệu từ API.");
        }

        const data = await response.json();
        favoriteJobs.value = data.favoriteJobs || [];
      } catch (error) {
        console.error("Error fetching favorite jobs:", error.message);
      }
    };

    // Fetch dữ liệu công việc đã ứng tuyển
    const fetchAppliedJobs = async () => {
      try {
        if (!token) {
          throw new Error("Không có token, truy cập bị từ chối.");
        }

        const response = await fetch(
          "http://localhost:3000/api/applications/user", // Thay đổi URL API nếu cần
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Thêm token vào header
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Lỗi khi lấy dữ liệu từ API.");
        }

        const data = await response.json();
        appliedJobs.value = data.appliedJobs || []; // Cập nhật mảng công việc đã ứng tuyển
      } catch (error) {
        console.error("Error fetching applied jobs:", error.message);
      }
    };

    // Lấy dữ liệu công việc yêu thích khi component được tải
    onMounted(() => {
      fetchFavoriteJobs();
      fetchAppliedJobs(); // Gọi fetchAppliedJobs khi component được mounted

      // Khôi phục trạng thái tab từ localStorage nếu có
      const savedTab = localStorage.getItem("activeTab");
      if (savedTab) {
        activeTab.value = savedTab;
      }
    });

    // Hàm để thay đổi tab và lưu lại vào localStorage
    const setActiveTab = (tab) => {
      activeTab.value = tab;
      localStorage.setItem("activeTab", tab); // Lưu trạng thái tab vào localStorage
    };

    return {
      activeTab,
      favoriteJobs,
      fetchFavoriteJobs,
      fetchAppliedJobs,
      setActiveTab, // Hàm thay đổi tab
      appliedJobs,
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
.content-box p {
  margin: 0 0 10px 0;
}
.content-box a {
  color: #0d6efd;
  text-decoration: none;
}
</style>
