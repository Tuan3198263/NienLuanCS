<template>
  <div class="container">
    <!-- Thanh tìm kiếm theo tên công việc -->
    <div class="search-bar mb-3">
      <input
        type="text"
        v-model="searchJobTitle"
        @input="applyFilter"
        class="form-control"
        placeholder="Tìm kiếm công việc theo tên công việc..."
      />
    </div>

    <!-- Thanh tìm kiếm theo địa điểm -->
    <div class="search-bar mb-3">
      <input
        type="text"
        v-model="searchLocation"
        @input="applyFilter"
        class="form-control"
        placeholder="Tìm kiếm theo địa chỉ (tên tỉnh)..."
      />
    </div>

    <!-- Hiển thị danh sách công việc đã lọc theo trang -->
    <div
      v-for="job in paginatedJobs"
      :key="job._id"
      class="job-listing d-flex align-items-center"
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
          Updated: {{ new Date(job.jobUpdatedDate).toLocaleDateString() }}
        </div>
        <div class="tags mt-2">
          <span v-for="tag in job.jobTags" :key="tag">{{ tag }}</span>
        </div>
      </div>
      <div class="ms-auto" style="cursor: pointer">
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

    <!-- Nếu không có công việc nào -->
    <div v-if="filteredJobs.length === 0" class="no-jobs">
      <p>Không tìm thấy công việc phù hợp</p>
    </div>

    <!-- Phân trang -->
    <nav v-if="filteredJobs.length > itemsPerPage" aria-label="Page navigation">
      <ul class="pagination d-flex justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a
            class="page-link"
            href="#"
            @click.prevent="changePage(currentPage - 1)"
          >
            &lt;&lt;
          </a>
        </li>

        <!-- Hiển thị các nút trang -->
        <li
          v-for="page in Math.ceil(filteredJobs.length / itemsPerPage)"
          :key="page"
          class="page-item"
          :class="{ active: page === currentPage }"
        >
          <a class="page-link" href="#" @click.prevent="changePage(page)">
            {{ page }}
          </a>
        </li>

        <li
          class="page-item"
          :class="{
            disabled:
              currentPage === Math.ceil(filteredJobs.length / itemsPerPage),
          }"
        >
          <a
            class="page-link"
            href="#"
            @click.prevent="changePage(currentPage + 1)"
          >
            &gt;&gt;
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { useToast } from "vue-toastification"; // Import Toast từ vue-toastification
import { mapGetters } from "vuex"; // Import mapGetters để sử dụng getters từ Vuex

export default {
  data() {
    return {
      jobs: [], // Danh sách tất cả công việc
      filteredJobs: [], // Danh sách công việc đã lọc
      currentPage: 1, // Trang hiện tại
      itemsPerPage: 5, // Số lượng công việc trên mỗi trang
      searchJobTitle: "", // Lưu trữ giá trị tìm kiếm cho tên công việc
      searchLocation: "", // Lưu trữ giá trị tìm kiếm cho địa điểm
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn"]), // Lấy trạng thái đăng nhập từ Vuex
  },
  mounted() {
    this.fetchJobs(); // Lấy danh sách công việc khi component mount

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
  watch: {
    "$route.query": {
      handler: "applyFilter", // Theo dõi thay đổi query
      immediate: true,
    },
  },
  methods: {
    async fetchJobs() {
      try {
        const response = await fetch("http://localhost:3000/api/jobs");
        const data = await response.json();
        this.jobs = data;
        this.applyFilter(); // Áp dụng bộ lọc sau khi nhận dữ liệu
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    },
    applyFilter() {
      const { jobIndustry, jobField } = this.$route.query;

      // Lọc công việc dựa trên query params
      this.filteredJobs = this.jobs.filter((job) => {
        const matchesJobIndustry = jobIndustry
          ? job.jobIndustry === jobIndustry
          : true;
        const matchesJobField = jobField ? job.jobField === jobField : true;

        // Lọc theo từ khóa tìm kiếm cho tên công việc
        const matchesJobTitle = this.searchJobTitle
          ? job.jobTitle
              .toLowerCase()
              .includes(this.searchJobTitle.toLowerCase())
          : true;

        // Lọc theo địa điểm tìm kiếm
        const matchesLocation = this.searchLocation
          ? job.jobLocation
              .toLowerCase()
              .includes(this.searchLocation.toLowerCase())
          : true;

        return (
          matchesJobIndustry &&
          matchesJobField &&
          matchesJobTitle &&
          matchesLocation
        );
      });

      // Áp dụng phân trang sau khi lọc
      this.paginateJobs();
    },
    // Phương thức phân trang
    paginateJobs() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      this.paginatedJobs = this.filteredJobs.slice(start, end);
    },
    // Chuyển trang
    changePage(page) {
      this.currentPage = page;
      this.paginateJobs(); // Cập nhật danh sách công việc theo trang
    },
    // Điều hướng đến trang chi tiết công việc
    goToJobDetail(jobId) {
      this.$router.push({ name: "JobDetail", params: { id: jobId } });
    },
    // Thêm công việc vào danh sách yêu thích hoặc bỏ yêu thích
    async toggleFavorite(jobID) {
      const toast = useToast(); // Sử dụng toast

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
          toast.error("Không tìm thấy công việc với jobID: " + jobID);
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
  cursor: pointer;
}

.job-listing:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Thêm hiệu ứng khi hover */
}

.job-listing img {
  width: 80px;
  height: auto;
}

.job-title {
  font-size: 18px;
  font-weight: bold;
}

.company-name {
  color: #666;
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
</style>
