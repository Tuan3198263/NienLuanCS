<template>
  <div class="d-flex">
    <!-- Sidebar -->
    <div class="sidebar"></div>

    <!-- Main Content -->
    <div class="flex-grow-1 p-4">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Tin tuyển dụng</a>
          <button
            class="btn btn-success ml-auto"
            data-bs-toggle="modal"
            data-bs-target="#jobModal"
          >
            <i class="fas fa-plus"></i> Thêm tin tuyển dụng
          </button>
        </div>
      </nav>

      <!-- Job Detail Section -->
      <div
        v-if="selectedJob && Object.keys(selectedJob).length > 0"
        class="job-detail card mb-4"
      >
        <div class="card-header">
          <h4>Chi tiết công việc</h4>
        </div>
        <div class="card-body">
          <div class="detail-item">
            <i class="fas fa-briefcase icon"></i>
            <h5>{{ selectedJob.jobTitle }}</h5>
          </div>
          <div class="detail-item">
            <i class="fas fa-building icon"></i>
            <p><strong>Công ty:</strong> {{ selectedJob.jobCompanyName }}</p>
          </div>
          <div class="detail-item">
            <i class="fas fa-dollar-sign icon"></i>
            <p><strong>Lương:</strong> {{ selectedJob.jobSalary }}</p>
          </div>
          <div class="detail-item">
            <i class="fas fa-map-marker-alt icon"></i>
            <p><strong>Địa điểm:</strong> {{ selectedJob.jobLocation }}</p>
          </div>
          <div class="detail-item">
            <i class="fas fa-file-alt icon"></i>
            <p><strong>Mô tả:</strong> {{ selectedJob.jobDescription }}</p>
          </div>
          <div class="detail-item">
            <i class="fas fa-briefcase icon"></i>
            <p><strong>Ngành nghề:</strong> {{ selectedJob.jobIndustry }}</p>
          </div>
          <div class="detail-item">
            <i class="fas fa-user-tie icon"></i>
            <p><strong>Cấp bậc:</strong> {{ selectedJob.jobLevel }}</p>
          </div>

          <div class="detail-item">
            <i class="fas fa-tasks icon"></i>
            <div>
              <p><strong>Yêu cầu:</strong></p>
              <ul>
                <li
                  v-for="requirement in selectedJob.jobRequirements"
                  :key="requirement"
                >
                  {{ requirement }}
                </li>
              </ul>
            </div>
          </div>
          <div class="detail-item">
            <i class="fas fa-code icon"></i>
            <div>
              <p><strong>Kỹ năng:</strong></p>
              <ul>
                <li v-for="skill in selectedJob.jobSkills" :key="skill">
                  {{ skill }}
                </li>
              </ul>
            </div>
          </div>

          <div class="detail-item">
            <i class="fas fa-calendar-alt icon"></i>
            <p>
              <strong>Ngày hết hạn ứng tuyển:</strong>
              {{
                new Date(
                  selectedJob.jobApplicationDeadline
                ).toLocaleDateString()
              }}
            </p>
          </div>
        </div>
      </div>

      <!-- Job Posts List -->
      <div class="container mt-4">
        <div class="card mb-4">
          <div class="card-header">
            <h4>Danh sách tin tuyển dụng</h4>
          </div>
          <div class="card-body">
            <!-- Search Bar -->
            <div class="input-group w-50 mb-4">
              <span class="input-group-text">
                <i class="fas fa-search"></i>
              </span>
              <input
                v-model="searchQuery"
                type="text"
                class="form-control"
                placeholder="Tìm kiếm theo tiêu đề"
              />
            </div>

            <table class="table table-striped table-responsive">
              <thead>
                <tr>
                  <th style="width: 7%">STT</th>
                  <th style="width: 30%">Tiêu đề</th>
                  <th style="width: 20%">Tên công ty</th>
                  <th style="width: 7%">Link</th>
                  <th style="width: 15%">Ngày cập nhật</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="filteredJobPosts.length === 0">
                  <td colspan="6" class="text-center">
                    <strong>Không tìm thấy công việc</strong>
                  </td>
                </tr>
                <tr v-for="(job, index) in filteredJobPosts" :key="job.jobID">
                  <td>{{ index + 1 }}</td>
                  <td>{{ job.jobTitle }}</td>
                  <td>{{ job.jobCompanyName }}</td>
                  <td class="text-center">
                    <a :href="`/jobs/${job.jobID}`" target="_blank">
                      <i class="fas fa-map-marker-alt"></i>
                    </a>
                  </td>
                  <td>
                    {{ new Date(job.jobUpdatedDate).toLocaleDateString() }}
                  </td>
                  <td class="text-end">
                    <button
                      class="btn btn-info btn-sm me-2"
                      @click="viewJob(job)"
                    >
                      <i class="fas fa-eye"></i>
                    </button>
                    <button
                      class="btn btn-primary btn-sm me-2"
                      @click="openEditModal(job)"
                    >
                      <i class="fas fa-edit"></i>
                    </button>
                    <button
                      class="btn btn-danger btn-sm"
                      @click="deleteJob(job.jobID)"
                    >
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <nav class="mt-3">
              <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                  <button
                    class="page-link"
                    @click="changePage(currentPage - 1)"
                  >
                    Trước
                  </button>
                </li>
                <li
                  v-for="page in totalPages"
                  :key="page"
                  class="page-item"
                  :class="{ active: currentPage === page }"
                >
                  <button class="page-link" @click="changePage(page)">
                    {{ page }}
                  </button>
                </li>
                <li
                  class="page-item"
                  :class="{ disabled: currentPage === totalPages }"
                >
                  <button
                    class="page-link"
                    @click="changePage(currentPage + 1)"
                  >
                    Sau
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <!-- Modal Edit Job -->
      <div
        v-if="isEditModalVisible"
        class="modal-overlay"
        @click.self="closeEditModal"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-danger" style="font-weight: bold">
              Chỉnh sửa tin tuyển dụng
            </h5>
          </div>
          <div class="modal-body">
            <form @submit.prevent="updateJob">
              <div class="mb-3">
                <label for="jobTitle" class="form-label">Tiêu đề</label>
                <input
                  v-model="selectedJob.jobTitle"
                  type="text"
                  class="form-control"
                  id="jobTitle"
                  required
                />
              </div>

              <div class="mb-3">
                <label for="jobSalary" class="form-label">Lương</label>
                <input
                  v-model="selectedJob.jobSalary"
                  type="text"
                  class="form-control"
                  id="jobSalary"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="jobLocation" class="form-label">Địa điểm</label>
                <input
                  v-model="selectedJob.jobLocation"
                  type="text"
                  class="form-control"
                  id="jobLocation"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="jobDescription" class="form-label">Mô tả</label>
                <textarea
                  v-model="selectedJob.jobDescription"
                  class="form-control"
                  id="jobDescription"
                  rows="3"
                  required
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="jobIndustry" class="form-label">Ngành nghề</label>
                <input
                  v-model="selectedJob.jobIndustry"
                  type="text"
                  class="form-control"
                  id="jobIndustry"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="jobField" class="form-label">Lĩnh vực</label>
                <input
                  v-model="selectedJob.jobField"
                  type="text"
                  class="form-control"
                  id="jobField"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="ApplicationDeadline" class="form-label"
                  >Hạn ứng tuyển</label
                >
                <input
                  v-model="selectedJob.jobApplicationDeadline"
                  type="date"
                  class="form-control"
                  id="ApplicationDeadline"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="jobLevel" class="form-label">Cấp bậc</label>
                <input
                  v-model="selectedJob.jobLevel"
                  type="text"
                  class="form-control"
                  id="jobLevel"
                  required
                />
              </div>
              <div class="modal-footer">
                <button
                  type="submit"
                  class="btn btn-primary"
                  style="margin-right: 10px"
                >
                  Cập nhật
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="closeEditModal"
                >
                  Đóng
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!--form-->

      <!-- Modal for job posting -->
      <div
        class="modal fade"
        id="jobModal"
        tabindex="-1"
        aria-labelledby="jobModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="jobModalLabel">
                Đăng tin tuyển dụng
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="submitJobForm">
                <!-- Danh sách công ty -->
                <div class="mb-3">
                  <label for="jobCompany" class="form-label">Tên công ty</label>
                  <select
                    class="form-select"
                    v-model="newJob.companyName"
                    required
                  >
                    <option
                      v-for="company in companies"
                      :key="company._id"
                      :value="company.companyName"
                    >
                      {{ company.companyName }}
                    </option>
                  </select>
                </div>

                <div class="mb-3">
                  <label for="jobTitle" class="form-label"
                    >Tiêu đề công việc</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    v-model="newJob.jobTitle"
                    required
                  />
                </div>

                <div class="mb-3">
                  <label for="jobSalary" class="form-label">Lương</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="newJob.jobSalary"
                    required
                  />
                </div>

                <div class="mb-3">
                  <label for="jobLocation" class="form-label">Khu vực</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="newJob.jobLocation"
                    required
                  />
                </div>

                <div class="mb-3">
                  <label for="jobDescription" class="form-label"
                    >Mô tả công việc</label
                  >
                  <textarea
                    class="form-control"
                    v-model="newJob.jobDescription"
                    rows="3"
                    required
                  ></textarea>
                </div>

                <div class="mb-3">
                  <label for="jobRequirements" class="form-label"
                    >Yêu cầu công việc</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    v-model="newJob.jobRequirements"
                    placeholder="Nhập các yêu cầu công việc, phân cách bằng dấu phẩy"
                  />
                </div>

                <div class="mb-3">
                  <label for="jobApplicationDeadline" class="form-label"
                    >Hạn nộp đơn</label
                  >
                  <input
                    type="date"
                    class="form-control"
                    v-model="newJob.jobApplicationDeadline"
                    required
                  />
                </div>

                <div class="mb-3">
                  <label for="jobIndustry" class="form-label">Ngành nghề</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="newJob.jobIndustry"
                  />
                </div>

                <div class="mb-3">
                  <label for="jobLevel" class="form-label">Cấp bậc</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="newJob.jobLevel"
                  />
                </div>

                <div class="mb-3">
                  <label for="jobField" class="form-label">Lĩnh vực</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="newJob.jobField"
                  />
                </div>

                <div class="mb-3">
                  <label for="jobSkills" class="form-label">Kỹ năng</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="newJob.jobSkills"
                    placeholder="Nhập các kỹ năng, phân tách bằng dấu phẩy"
                  />
                </div>

                <div class="mb-3">
                  <label for="jobTags" class="form-label">Tags công việc</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="newJob.jobTags"
                    placeholder="Nhập các tags, phân cách bằng dấu phẩy"
                  />
                </div>

                <div class="mb-3">
                  <label for="jobVacancyCount" class="form-label"
                    >Số lượng tuyển</label
                  >
                  <input
                    type="number"
                    class="form-control"
                    v-model="newJob.jobVacancyCount"
                  />
                </div>

                <div class="mb-3">
                  <label for="jobAddress" class="form-label"
                    >Địa chỉ làm việc</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    v-model="newJob.jobAddress"
                  />
                </div>

                <button type="submit" class="btn btn-primary">Đăng tin</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!--end form post-->
    </div>
  </div>
</template>

<script>
import SidebarAdmin from "../../components/admin/SidebarAdmin.vue";
import { useToast } from "vue-toastification"; // Import useToast

export default {
  components: {
    SidebarAdmin, // Đăng ký component
  },
  data() {
    return {
      jobPosts: [],
      selectedJob: {}, // Job được chọn để hiển thị chi tiết
      searchQuery: "",
      isEditModalVisible: false, // Điều khiển modal hiển thị
      companies: [], // Danh sách công ty
      currentPage: 1, // Trang hiện tại
      itemsPerPage: 5, // Số lượng tin hiển thị mỗi trang
      newJob: {
        companyName: "",
        jobTitle: "",
        jobSalary: "",
        jobLocation: "",
        jobDescription: "",
        jobRequirements: "",
        jobApplicationDeadline: "",
        jobIndustry: "",
        jobLevel: "",
        jobField: "",
        jobSkills: "",
        jobTags: "",
        jobVacancyCount: 1,
        jobAddress: "",
      },
    };
  },
  computed: {
    filteredJobs() {
      // Lọc danh sách job dựa trên searchQuery
      return this.jobPosts.filter((job) =>
        job.jobTitle.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    filteredJobPosts() {
      // Chỉ lấy các job thuộc trang hiện tại
      return this.filteredJobs.slice(
        (this.currentPage - 1) * this.itemsPerPage,
        this.currentPage * this.itemsPerPage
      );
    },
    totalPages() {
      // Sử dụng danh sách đã lọc để tính tổng số trang
      return Math.ceil(this.filteredJobs.length / this.itemsPerPage);
    },
  },

  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    fetchJobs() {
      fetch("http://localhost:3000/api/jobs")
        .then((response) => response.json())
        .then((data) => {
          this.jobPosts = data;
        })
        .catch((error) => {
          console.error("Error fetching job data:", error);
        });
    },

    fetchCompanies() {
      // Lấy danh sách công ty từ API
      fetch("http://localhost:3000/api/companies")
        .then((response) => response.json())
        .then((data) => {
          this.companies = data; // Lưu danh sách công ty vào `companies`
        })
        .catch((error) => {
          console.error("Error fetching companies:", error);
        });
    },

    openEditModal(job = {}) {
      this.selectedJob = { ...job }; // Sao chép công việc vào selectedJob
      this.isEditModalVisible = true; // Hiển thị modal
    },

    closeEditModal() {
      this.isEditModalVisible = false; // Đóng modal
    },

    viewJob(job) {
      this.selectedJob = job; // Cập nhật công việc đã chọn để hiển thị chi tiết
    },
    updateJob() {
      const toast = useToast();
      // Cập nhật công việc bằng PUT request
      fetch(`http://localhost:3000/api/jobs/${this.selectedJob.jobID}`, {
        method: "PUT", // Hoặc PATCH nếu API yêu cầu
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.selectedJob),
      })
        .then((response) => {
          if (response.ok) {
            // Cập nhật lại danh sách công việc sau khi sửa thành công
            const index = this.jobPosts.findIndex(
              (job) => job.jobID === this.selectedJob.jobID
            );
            if (index !== -1) {
              this.jobPosts.splice(index, 1, this.selectedJob); // Cập nhật công việc trong danh sách
            }
            this.closeEditModal(); // Đóng modal sau khi cập nhật
            toast.success("Cập nhật công việc thành công!");
          } else {
            toast.error("Cập nhật công việc thất bại!");
          }
        })
        .catch((error) => {
          console.error("Error updating job:", error);
          toast.error("Có lỗi xảy ra khi cập nhật công việc.");
        });
    },

    // Phương thức gửi form công việc
    submitJobForm() {
      const toast = useToast();
      // Kiểm tra console dữ liệu trước khi gửi
      console.log(this.newJob);
      // Chuyển đổi các trường mảng (nếu có) thành mảng thực tế
      this.newJob.jobRequirements = this.newJob.jobRequirements
        .split(",")
        .map((item) => item.trim());
      this.newJob.jobSkills = this.newJob.jobSkills
        .split(",")
        .map((item) => item.trim());
      this.newJob.jobTags = this.newJob.jobTags
        .split(",")
        .map((item) => item.trim());

      // Gửi yêu cầu POST tới server sử dụng fetch
      fetch("http://localhost:3000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.newJob), // Chuyển đổi dữ liệu thành JSON
      })
        .then((response) => response.json()) // Chuyển đổi phản hồi thành JSON
        .then((data) => {
          // Nếu yêu cầu thành công
          console.log("Đã đăng tin thành công:", data);
          toast.success("Đăng tin thành công!");

          // Reset form
          this.newJob = {
            jobCompanyName: "",
            jobTitle: "",
            jobSalary: "",
            jobLocation: "",
            jobDescription: "",
            jobRequirements: "",
            jobApplicationDeadline: "",
            jobIndustry: "",
            jobLevel: "",
            jobField: "",
            jobSkills: "",
            jobTags: "",
            jobVacancyCount: "",
            jobAddress: "",
          };
        })
        .catch((error) => {
          // Nếu có lỗi xảy ra
          console.error("Lỗi khi tạo công việc:", error);
          toast.error("Có lỗi xảy ra khi đăng tin công việc.");
        });
    },
    // Phương thức xóa công việc
    deleteJob(jobID) {
      const toast = useToast();
      // Hiển thị thông báo xác nhận trước khi xóa
      if (confirm("Bạn có chắc chắn muốn xóa công việc này?")) {
        fetch(`http://localhost:3000/api/jobs/${jobID}`, {
          method: "DELETE", // Phương thức DELETE để xóa công việc
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (response.ok) {
              // Nếu xóa thành công, xóa công việc khỏi danh sách công việc
              this.jobPosts = this.jobPosts.filter(
                (job) => job.jobID !== jobID
              );
              toast.error("Xóa công việc thành công!");
            } else {
              toast.error("Xóa công việc thất bại!");
            }
          })
          .catch((error) => {
            console.error("Lỗi khi xóa công việc:", error);
            toast.error("Có lỗi xảy ra khi xóa công việc.");
          });
      }
    },
  },
  mounted() {
    this.fetchJobs();
    this.fetchCompanies(); // Gọi fetchCompanies khi component được mount
  },
};
</script>

<style scoped>
.d-flex {
  display: flex;
  min-height: 100vh;
}

.flex-grow-1 {
  margin-left: 250px;
  padding: 20px;
  flex-grow: 1;
}

.table {
  width: 100%;
  table-layout: fixed;
}

.table td,
.table th {
  padding: 12px 15px;
}

.text-center {
  text-align: center;
}

.text-end {
  text-align: right; /* Căn phải các icon hành động */
}

.job-detail {
  margin-bottom: 20px;
}

.modal-dialog {
  max-width: 600px;
}

@media (max-width: 992px) {
  .d-flex {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    height: auto;
    position: relative;
  }

  .flex-grow-1 {
    margin-left: 0;
  }
}
.detail-item {
  display: flex;
  align-items: flex-start; /* Căn chỉnh các item từ đỉnh */
  margin-bottom: 10px;
}

.icon {
  width: 30px;
  text-align: center;
  margin-right: 10px;
  font-size: 1.2em;
  color: #007bff;
}

.detail-item p,
.detail-item h5 {
  margin: 0;
}

.detail-item div {
  flex: 1; /* Chiếm đầy đủ không gian */
}

.detail-item ul {
  padding-left: 1.2em; /* Khoảng cách bên trái cho các danh sách yêu cầu và kỹ năng */
  margin-top: 0.5em;
}
</style>
