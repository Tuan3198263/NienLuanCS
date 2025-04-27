<template>
  <Header />
  <div class="container mt-4 mb-4">
    <div class="row mt-5">
      <div class="col-md-8">
        <div class="job-header">
          <h1>{{ jobTitle }}</h1>
          <span class="badge">{{ jobSalary }}</span>
          <div class="d-flex align-items-center mt-3">
            <i class="fas fa-map-marker-alt me-2"></i> {{ jobLocation }}
            <i class="fas fa-calendar-alt ms-4 me-2"></i> Cập nhật ngày
            {{ jobUpdatedDate }}
          </div>
          <div class="mt-3">
            <!-- Nút nộp đơn -->
            <button
              v-if="!hasApplied"
              class="btn btn-apply"
              @click="applyForJob"
            >
              Nộp đơn
            </button>
            <button v-else class="btn btn-apply" disabled>Đã nộp đơn</button>
            <button class="btn btn-save ms-2" @click="toggleFavorite">
              {{ isFavorite ? "Đã lưu" : "Lưu công việc này" }}
            </button>
          </div>
        </div>
        <div class="job-description mt-4">
          <h2>Mô tả công việc</h2>
          <p>{{ jobDescription }}</p>
        </div>
        <div class="job-requirements mt-4">
          <h2>Yêu cầu công việc</h2>
          <ul>
            <li v-for="(requirement, index) in jobRequirements" :key="index">
              {{ requirement }}
            </li>
          </ul>
        </div>
        <div>
          <h4 class="mb-2 mt-4" style="font-weight: bold; font-size: 22px">
            Các phúc lợi dành cho bạn
          </h4>
          <div class="benefit-item">
            <i class="fas fa-map-marker-alt"></i>
            <div>
              <h5>Thưởng</h5>
              <p>KPI Bonus</p>
            </div>
          </div>
          <div class="benefit-item">
            <i class="fas fa-heartbeat"></i>
            <div>
              <h5>Chăm sóc sức khoẻ</h5>
              <p>BVI</p>
            </div>
          </div>
          <div class="benefit-item">
            <i class="fas fa-calendar-alt"></i>
            <div>
              <h5>Nghỉ phép có lương</h5>
              <p>15 days of annual leave</p>
            </div>
          </div>
          <div class="benefit-item">
            <i class="fas fa-bus"></i>
            <div>
              <h5>Xe đưa đón</h5>
              <p>Shuttle bus from HCMC</p>
            </div>
          </div>
          <div class="benefit-item">
            <i class="fas fa-utensils"></i>
            <div>
              <h5>Căn-tin</h5>
              <p>Lunch at staff canteen</p>
            </div>
          </div>
        </div>
        <div class="job-tags mt-4">
          <h2>Kỹ năng cần thiết</h2>
          <ul>
            <li v-for="(skill, index) in jobSkills" :key="index">
              {{ skill }}
            </li>
          </ul>
        </div>
        <div class="container job-info mt-4">
          <h5>Thông tin khác</h5>

          <div class="row">
            <div class="col-6">
              <i class="fas fa-briefcase"></i>
              <span>NGÀNH NGHỀ</span>
            </div>
            <div class="col-6">
              <span>{{ jobIndustry }}</span>
              <!-- Dữ liệu ngành nghề từ CSDL -->
            </div>
          </div>

          <div class="row">
            <div class="col-6">
              <i class="fas fa-map-marker-alt"></i>
              <span>CẤP BẬC</span>
            </div>
            <div class="col-6">
              <span>{{ jobLevel }}</span>
              <!-- Dữ liệu vị trí từ CSDL -->
            </div>
          </div>

          <div class="row">
            <div class="col-6">
              <i class="fas fa-industry"></i>
              <span>LĨNH VỰC</span>
            </div>
            <div class="col-6">
              <span>{{ jobField }}</span>
              <!-- Dữ liệu lĩnh vực từ CSDL -->
            </div>
          </div>

          <div class="row">
            <div class="col-6">
              <i class="fas fa-users"></i>
              <span>SỐ LƯỢNG TUYỂN DỤNG</span>
            </div>
            <div class="col-6">
              <span>{{ jobVacancyCount }}</span>
              <!-- Dữ liệu số lượng tuyển dụng từ CSDL -->
            </div>
          </div>

          <div class="row">
            <div class="col-6">
              <i class="fas fa-user-clock"></i>
              <span>SỐ NĂM KINH NGHIỆM TỐI THIỂU</span>
            </div>
            <div class="col-6">
              <span>1</span>
            </div>
          </div>

          <div class="row">
            <div class="col-6">
              <i class="fas fa-clock"></i>
              <span>GIỜ LÀM VIỆC</span>
            </div>
            <div class="col-6">
              <span>08:10 - 16:10</span>
            </div>
          </div>

          <div class="row">
            <div class="col-6">
              <i class="fas fa-calendar-day"></i>
              <span>NGÀY LÀM VIỆC</span>
            </div>
            <div class="col-6">
              <span>T2 - T7</span>
            </div>
          </div>

          <div class="row">
            <div class="col-6">
              <i class="fas fa-calendar-day"></i>
              <span>HẠN ỨNG TUYỂN</span>
            </div>
            <div class="col-6">
              <span>{{ jobApplicationDeadline }}</span>
              <!-- Dữ liệu hạn ứng tuyển từ CSDL -->
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="company-info text-center">
          <img
            src="https://www.vietnamworks.com/_next/image?url=https%3A%2F%2Fimages.vietnamworks.com%2Flogo%2F500x600%20(7)_127695.png&w=1920&q=75"
            alt="Advertisement"
            class="img-fluid mb-3"
          />
        </div>
        <div class="company-info text-center">
          <img
            src="https://www.vietnamworks.com/_next/image?url=https%3A%2F%2Fimages.vietnamworks.com%2Flogo%2FPost%203-500x600_128840.png&w=1920&q=75"
            alt="Advertisement"
            class="img-fluid mb-3"
          />
        </div>
      </div>
    </div>
  </div>
  <FooterCompany />
</template>

<script>
import { ref, onMounted } from "vue";
import Header from "../components/Header.vue";
import FooterCompany from "../components/FooterCompany.vue";
import { useStore } from "vuex"; // Import useStore để truy cập Vuex trong setup()
import { useToast } from "vue-toastification"; // Import useToast từ thư viện Vue Toastificatio

export default {
  components: {
    Header,
    FooterCompany,
  },

  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore(); // Sử dụng useStore để truy cập Vuex store
    const toast = useToast(); // Khởi tạo toast từ useToast

    const jobId = ref(""); // Thêm _id để lưu ID của công việc
    const jobTitle = ref("");
    const jobSalary = ref("");
    const jobLocation = ref("");
    const jobUpdatedDate = ref("");
    const jobCompanyName = ref("");
    const jobCompanyLogo = ref("");
    const jobDescription = ref("");
    const jobRequirements = ref([]);
    const jobSkills = ref([]);
    const jobIndustry = ref("");
    const jobLevel = ref("");
    const jobField = ref("");
    const jobVacancyCount = ref("");
    const jobApplicationDeadline = ref("");
    const isFavorite = ref(false); // Track if job is in favorites
    const hasApplied = ref(false); // Trạng thái ứng tuyển

    const fetchJobData = async (id) => {
      try {
        const response = await fetch(`http://localhost:3000/api/jobs/${id}`);
        const data = await response.json();

        // Lưu jobId vào jobId (chỉ lấy giá trị ID)
        jobId.value = data._id;
        jobTitle.value = data.jobTitle;
        jobSalary.value = data.jobSalary;
        jobLocation.value = data.jobLocation;
        jobUpdatedDate.value = new Date(
          data.jobUpdatedDate
        ).toLocaleDateString();
        jobCompanyName.value = data.jobCompanyName;
        jobCompanyLogo.value = data.jobCompanyLogo;
        jobDescription.value = data.jobDescription;
        jobRequirements.value = data.jobRequirements;
        jobSkills.value = data.jobSkills;
        jobIndustry.value = data.jobIndustry;
        jobLevel.value = data.jobLevel;
        jobField.value = data.jobField;
        jobVacancyCount.value = data.jobVacancyCount;
        jobApplicationDeadline.value = new Date(
          data.jobApplicationDeadline
        ).toLocaleDateString();
      } catch (error) {
        console.error("Lỗi khi gọi API: ", error);
      }
    };

    const toggleFavorite = async () => {
      if (!store.getters.isLoggedIn) {
        toast.warning("Vui lòng đăng nhập để sử dụng chức năng yêu thích.");
        return; // Dừng việc thực thi hàm nếu người dùng chưa đăng nhập
      }
      try {
        const response = await fetch(
          "http://localhost:3000/api/favorites/toggle",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming JWT is used for auth
            },
            body: JSON.stringify({ jobID: props.id }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          isFavorite.value = !isFavorite.value; // Toggle favorite state
          localStorage.setItem(`job_${props.id}_favorite`, isFavorite.value); // Lưu trạng thái yêu thích vào LocalStorage
          toast.success(data.message || "Trạng thái yêu thích đã thay đổi!");
        } else {
          toast.error(data.message || "Có lỗi xảy ra"); //
        }
      } catch (error) {
        console.error("Error toggling favorite:", error);
        toast.error("Có lỗi xảy ra");
      }
    };

    // Hàm gửi yêu cầu nộp đơn
    const applyForJob = async () => {
      if (!store.getters.isLoggedIn) {
        toast.warning("Vui lòng đăng nhập để nộp đơn ứng tuyển");
        return; // Dừng việc thực thi hàm nếu người dùng chưa đăng nhập
      }
      try {
        const response = await fetch(
          "http://localhost:3000/api/applications/apply",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Giả sử bạn đã có token JWT
            },
            body: JSON.stringify({
              jobID: jobId.value,
            }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          toast.success("Nộp đơn thành công!");

          // Cập nhật trạng thái đã ứng tuyển
          hasApplied.value = true;

          // Kiểm tra lại trạng thái ứng tuyển (nếu cần)
          checkApplicationStatus(); // Gọi lại để cập nhật trạng thái ứng tuyển
        } else {
          toast.error(data.message || "Có lỗi xảy ra khi nộp đơn.");
        }
      } catch (error) {
        console.error("Lỗi khi nộp đơn: ", error);
        toast.error("Có lỗi xảy ra khi nộp đơn.");
      }
    };

    // Kiểm tra trạng thái ứng tuyển
    const checkApplicationStatus = async () => {
      if (!jobId.value) {
        toast.error("Không có ID công việc để kiểm tra trạng thái ứng tuyển.");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3000/api/applications/has-applied`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              jobID: jobId.value, // Đảm bảo truyền đúng jobId ở đây
            }),
          }
        );

        const data = await response.json();
        console.log(data); // Kiểm tra phản hồi từ server

        if (data.hasApplied) {
          hasApplied.value = true; // Đã ứng tuyển
        }
      } catch (error) {
        console.error("Lỗi khi kiểm tra ứng tuyển:", error);
      }
    };

    onMounted(async () => {
      // Lấy trạng thái yêu thích từ LocalStorage khi component được tải lại
      const savedFavoriteStatus = localStorage.getItem(
        `job_${props.id}_favorite`
      );
      if (savedFavoriteStatus === "true") {
        isFavorite.value = true;
      } else if (savedFavoriteStatus === "false") {
        isFavorite.value = false;
      }
      // laay du lieu cong viec
      await fetchJobData(props.id);
      checkApplicationStatus();
    });

    return {
      // Lưu _id vào jobId
      jobId,
      jobTitle,
      jobSalary,
      jobLocation,
      jobUpdatedDate,
      jobCompanyName,
      jobCompanyLogo,
      jobDescription,
      jobRequirements,
      jobSkills,
      jobIndustry,
      jobLevel,
      jobField,
      jobVacancyCount,
      jobApplicationDeadline,
      isFavorite, // Make sure it's returned
      toggleFavorite,
      applyForJob, // Thêm hàm nộp đơn vào return
      hasApplied,
    };
  },
};
</script>

<style scoped>
/* Background */
/* Background */
body {
  background-color: #f8f9fa;
  font-family: "Arial", sans-serif;
  margin: 0;
  padding: 0;
}

.container {
  max-width: 1200px;
  margin: auto;
}

/* Job Header */
.job-header {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.job-header h1 {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.job-header .badge {
  font-size: 14px;
  color: #ff6f61;
}

.job-header .d-flex {
  font-size: 14px;
  color: #495057;
}

.job-header .btn-apply {
  background-color: #ff6f61;
  color: #fff;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s;
}

.job-header .btn-apply:hover {
  background-color: #e14a3b;
}

.job-header .btn-save {
  border: 1px solid #ced4da;
  color: #495057;
  padding: 8px 15px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.job-header .btn-save:hover {
  background-color: #f1f1f1;
}

/* Job Description */
.job-description {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.job-description h2 {
  font-size: 22px;
  font-weight: bold;
  color: #333;
}

.job-description p {
  font-size: 16px;
  color: #666;
}

/* Job Requirements and Skills */
.job-requirements,
.job-tags {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.job-requirements h2,
.job-tags h2 {
  font-size: 22px;
  font-weight: bold;
  color: #333;
}

.job-requirements ul,
.job-tags ul {
  padding-left: 20px;
  list-style-type: disc;
}

.job-requirements li,
.job-tags li {
  font-size: 16px;
  color: #666;
}

/* Job Info */
.job-info {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.job-info h5 {
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
}

.job-info .row {
  margin-bottom: 10px;
}

.job-info .col-6 {
  display: flex;
  align-items: center;
  font-size: 16px;
}

.job-info .col-6 i {
  font-size: 20px;
  margin-right: 10px;
  color: #007bff;
}

.job-info .col-6 span {
  color: #495057;
}

.job-info .col-6 span:first-child {
  font-weight: bold;
}

.job-info .col-6 span:last-child {
  color: gray;
}

/* Company Info */
.company-info {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}

.company-info .company-logo {
  max-width: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
}

/* Utility */
.mt-4 {
  margin-top: 1.5rem;
}

.ms-2 {
  margin-left: 0.5rem;
}

.me-2 {
  margin-right: 0.5rem;
}

.d-flex {
  display: flex;
  justify-content: flex-start;
}

.align-items-center {
  align-items: center;
}

.row {
  display: flex;
  flex-wrap: wrap;
}

.col-md-8 {
  width: 66.66%;
}

.col-md-4 {
  width: 33.33%;
}

/* Button Styles */
.btn {
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.btn-apply {
  background-color: #ff6f61;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
}

.btn-apply:hover {
  background-color: #e14a3b;
}

.btn-save {
  background-color: transparent;
  border: 1px solid #ced4da;
  color: #495057;
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: bold;
}

.btn-save:hover {
  background-color: #f1f1f1;
}

/* Icon and Info Styling */
.job-info .row i {
  font-size: 20px;
  color: #007bff;
  margin-right: 10px;
}

/* Responsive Styling */
@media (max-width: 768px) {
  .col-md-8,
  .col-md-4 {
    width: 100%;
  }

  .job-header h1 {
    font-size: 20px;
  }

  .job-header .badge {
    font-size: 12px;
  }

  .job-info .row i {
    font-size: 18px;
  }
}

.benefit-item {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}
.benefit-item i {
  font-size: 24px;
  margin-right: 15px;
  color: #007bff;
}
.benefit-item h5 {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
}
.benefit-item p {
  margin: 0;
  font-size: 14px;
  color: #666;
}
</style>
