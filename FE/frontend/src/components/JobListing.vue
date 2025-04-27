<template>
  <div class="container">
    <div
      v-for="job in jobs"
      :key="job.jobID"
      class="job-listing d-flex align-items-center justify-content-start"
      style="cursor: pointer"
    >
      <img
        :src="job.jobCompanyLogo || 'https://placehold.co/80x80'"
        alt="Company logo"
        @click="goToJobDetail(job.jobID)"
      />
      <div class="ms-3" @click="goToJobDetail(job.jobID)">
        <div class="job-title">{{ job.jobTitle }}</div>
        <div class="company-name">{{ job.jobCompanyName }}</div>
        <div class="salary">{{ job.jobSalary }}</div>
        <div class="location">{{ job.jobLocation }}</div>
        <div class="updated-date">
          Updated: {{ formatDate(job.jobUpdatedDate) }}
        </div>
        <div class="tags mt-2 d-flex justify-content-start">
          <span
            v-for="(tag, index) in job.jobTags"
            :key="index"
            class="tag-item"
          >
            {{ tag }}
          </span>
        </div>
      </div>
      <div class="ms-auto">
        <!-- Biểu tượng yêu thích -->
        <i
          :class="{
            'far fa-heart': !job.isFavorite,
            'fas fa-heart': job.isFavorite,
          }"
          class="favorite"
          @click.stop="toggleFavorite(job.jobID)"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"; // Import mapGetters để sử dụng getters từ Vuex
import { useToast } from "vue-toastification"; // Import toast

export default {
  props: {
    jobs: {
      type: Array,
      required: true,
    },
  },

  computed: {
    ...mapGetters(["isLoggedIn"]), // Lấy trạng thái đăng nhập từ Vuex
  },
  mounted() {
    // Khôi phục trạng thái yêu thích từ localStorage khi trang được tải lại
    const token = localStorage.getItem("token");
    if (token) {
      const userFavorites =
        JSON.parse(localStorage.getItem(`favorites_${token}`)) || [];
      this.jobs.forEach((job) => {
        if (userFavorites.includes(job.jobID)) {
          job.isFavorite = true; // Đánh dấu công việc là yêu thích nếu có trong favorites
        } else {
          job.isFavorite = false;
        }
      });
    }
  },
  methods: {
    formatDate(date) {
      const options = { year: "numeric", month: "short", day: "numeric" };
      return new Date(date).toLocaleDateString("en-US", options);
    },
    goToJobDetail(jobId) {
      this.$router.push({ name: "JobDetail", params: { id: jobId } });
    },

    async toggleFavorite(jobID) {
      const toast = useToast(); // Sử dụng Toast API
      if (!this.isLoggedIn) {
        // Kiểm tra trạng thái đăng nhập
        toast.error("Vui lòng đăng nhập để sử dụng chức năng yêu thích.");
        //this.$router.push({ name: "Login" }); // Điều hướng đến trang đăng nhập
        return;
      }
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Vui lòng đăng nhập!");
          return;
        }

        // Tìm công việc tương ứng trong mảng jobs bằng jobID
        const job = this.jobs.find((j) => j.jobID === jobID);
        if (!job) {
          console.error("Không tìm thấy công việc với jobID:", jobID);
          return;
        }

        // Lưu trạng thái yêu thích trước khi thực hiện gọi API
        const previousState = job.isFavorite;

        // Cập nhật trạng thái yêu thích ngay lập tức trên UI
        job.isFavorite = !job.isFavorite;

        // Cập nhật lại trạng thái yêu thích trong localStorage theo token
        let favorites =
          JSON.parse(localStorage.getItem(`favorites_${token}`)) || [];
        if (job.isFavorite) {
          favorites.push(jobID);
        } else {
          favorites = favorites.filter((id) => id !== jobID);
        }
        localStorage.setItem(`favorites_${token}`, JSON.stringify(favorites));

        const response = await fetch(
          "http://localhost:3000/api/favorites/toggle",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              jobID: jobID, // Sử dụng jobID truyền vào
            }),
          }
        );

        const result = await response.json();

        if (!response.ok) {
          // Hoàn tác thay đổi UI nếu có lỗi từ API
          job.isFavorite = !job.isFavorite;
          console.error("Lỗi khi cập nhật yêu thích:", result.message);
          toast.error(result.message || "Có lỗi xảy ra, vui lòng thử lại.");
        } else {
          toast.success(result.message);
        }
      } catch (error) {
        // Hoàn tác thay đổi UI nếu có lỗi kết nối
        const job = this.jobs.find((j) => j.jobID === jobID);
        job.isFavorite = !job.isFavorite;
        console.error("Lỗi kết nối:", error);
        toast.error("Lỗi kết nối, vui lòng thử lại.");
      }
    },
  },
};
</script>

<style scoped>
.job-listing {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease; /* Thêm hiệu ứng chuyển đổi mượt mà */
  text-align: left;
  cursor: pointer;
}

.job-listing:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Thêm hiệu ứng khi hover */
  transform: translateY(-5px); /* Dịch chuyển lên khi hover */
}

.job-listing img {
  width: 80px;
  height: auto;
  margin-right: 20px;
}

.job-title {
  font-size: 18px;
  font-weight: bold;
  transition: color 0.3s ease; /* Thêm hiệu ứng chuyển đổi màu */
}

.job-listing:hover .job-title {
  color: #007bff; /* Đổi màu tiêu đề khi hover */
}

.company-name {
  color: #666;
  transition: color 0.3s ease; /* Thêm hiệu ứng chuyển đổi màu */
}

.job-listing:hover .company-name {
  color: #333; /* Đổi màu tên công ty khi hover */
}

.salary {
  color: #ff0000;
  font-weight: bold;
}

.location {
  color: #666;
}

.updated-date {
  color: #666;
}

.tags span {
  background-color: #e0e0e0;
  border-radius: 5px;
  padding: 5px 10px;
  margin-right: 5px;
  font-size: 12px;
  transition: background-color 0.3s ease; /* Thêm hiệu ứng chuyển đổi màu */
}

.tags span:hover {
  background-color: #007bff;
  color: white;
}

/* Đảm bảo không có thuộc tính nào khiến phần tử bị ẩn khi hover */
.job-listing:hover .tags span {
  display: inline-block;
}

.favorite {
  font-size: 18px;
  color: #666;
  transition: color 0.3s ease; /* Thêm hiệu ứng chuyển đổi màu */
}

.job-listing:hover .favorite {
  color: #ff6347; /* Đổi màu icon yêu thích khi hover */
}
</style>
