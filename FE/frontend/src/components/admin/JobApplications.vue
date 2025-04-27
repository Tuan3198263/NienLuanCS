<template>
  <div class="d-flex">
    <!-- Sidebar -->
    <div class="sidebar"></div>

    <!-- Main Content -->
    <div class="flex-grow-1 p-4">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Đơn ứng tuyển</a>
        </div>
      </nav>

      <div class="container mt-4">
        <!-- Tìm kiếm -->
        <!-- Tìm kiếm -->
        <div class="row mb-3">
          <div class="col-md-4">
            <input
              v-model="searchName"
              class="form-control"
              type="text"
              placeholder="Tìm kiếm theo họ tên ứng viên"
              @input="searchApplications"
            />
          </div>
          <div class="col-md-4">
            <input
              v-model="searchJobTitle"
              class="form-control"
              type="text"
              placeholder="Tìm kiếm theo tên công việc"
              @input="searchApplications"
            />
          </div>
          <div class="col-md-4">
            <select
              v-model="searchStatus"
              class="form-control"
              @change="searchApplications"
            >
              <option value="" disabled>Lọc theo trạng thái</option>
              <option value="accepted">Đã chấp nhận</option>
              <option value="rejected">Bị từ chối</option>
              <option value="pending">Chờ xử lý</option>
            </select>
          </div>
        </div>

        <!-- Job Applications List -->
        <div class="card mb-4">
          <div class="card-header">
            <h4>Danh sách ứng viên</h4>
          </div>
          <div class="card-body">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Tên ứng viên</th>
                  <th scope="col" class="text-truncate">Công việc</th>
                  <th scope="col">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(application, index) in paginatedApplications"
                  :key="application._id"
                  @click="selectApplication(application)"
                >
                  <td>{{ (currentPage - 1) * itemsPerPage + index + 1 }}</td>
                  <td>
                    {{ application.userId.lastName }}
                    {{ application.userId.firstName }}
                  </td>
                  <td class="text-truncate" style="max-width: 200px">
                    {{ application.jobID.jobTitle }}
                  </td>
                  <td>{{ application.status }}</td>
                  <td>
                    <button
                      class="btn btn-success btn-sm me-2"
                      @click.stop="acceptApplication(application._id)"
                    >
                      <i class="fas fa-check-circle"></i> Chấp nhận
                    </button>
                    <button
                      class="btn btn-danger btn-sm me-2"
                      @click.stop="rejectApplication(application._id)"
                    >
                      <i class="fas fa-times-circle"></i> Từ chối
                    </button>
                    <button
                      class="btn btn-primary btn-sm"
                      @click.stop="sendEmail(application._id)"
                    >
                      <i class="fas fa-envelope"></i> Gửi thư
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="pagination mt-3 justify-content-center">
              <button
                class="btn btn-light"
                :disabled="currentPage === 1"
                @click="prevPage"
              >
                &laquo; Trang trước
              </button>
              <button
                class="btn btn-light mx-1"
                v-for="page in totalPages"
                :key="page"
                :class="{
                  'btn-primary': page === currentPage,
                  'btn-light': page !== currentPage,
                }"
                @click="changePage(page)"
              >
                {{ page }}
              </button>
              <button
                class="btn btn-light"
                :disabled="currentPage === totalPages"
                @click="nextPage"
              >
                Trang sau &raquo;
              </button>
            </div>
          </div>
        </div>

        <!-- Candidate Details -->
        <div v-if="selectedApplication" class="card mt-4">
          <div class="card-header">
            <h4>Chi tiết thông tin ứng viên</h4>
          </div>
          <div class="card-body">
            <div class="row">
              <!-- Candidate Information -->
              <div class="col-md-4">
                <h5>Thông tin ứng viên</h5>
                <p>
                  <strong>Họ và tên:</strong>
                  {{ selectedApplication.userId.lastName }}
                  {{ selectedApplication.userId.firstName }}
                </p>
                <p>
                  <strong>Email:</strong> {{ selectedApplication.userId.email }}
                </p>
                <p>
                  <strong>Số điện thoại:</strong>
                  {{ selectedApplication.userId.phone }}
                </p>
                <p><strong>Ảnh CV:</strong></p>
                <img
                  :src="selectedApplication.profileId.cv"
                  alt="CV Image"
                  class="img-fluid cv-image"
                />
                <p>
                  <a
                    :href="selectedApplication.profileId.cv"
                    class=""
                    target="_blank"
                  >
                    Xem CV
                  </a>
                </p>
              </div>

              <!-- Personal Profile -->
              <div class="col-md-4">
                <h5>Hồ sơ cá nhân</h5>
                <p>
                  <strong>Ngày sinh:</strong>
                  {{ selectedApplication.profileId.birthday }}
                </p>
                <p>
                  <strong>Địa chỉ:</strong>
                  {{ selectedApplication.profileId.address }}
                </p>
                <p>
                  <strong>Lương mong muốn:</strong>
                  {{ selectedApplication.profileId.salary }}$
                </p>
                <p>
                  <strong>Ngành nghề:</strong>
                  {{ selectedApplication.profileId.careerfield }}
                </p>
                <p>
                  <strong>Lĩnh vực:</strong>
                  {{ selectedApplication.profileId.companyfield }}
                </p>
                <p>
                  <strong>Số năm kinh nghiệm:</strong>
                  {{ selectedApplication.profileId.experience }}
                </p>
                <p>
                  <strong>Trình độ:</strong>
                  {{ selectedApplication.profileId.degree }}
                </p>
              </div>

              <!-- Job Application Details -->
              <div class="col-md-4">
                <h5>Công việc ứng tuyển</h5>
                <p>
                  <strong>Tên công việc:</strong>
                  {{ selectedApplication.jobID.jobTitle }}
                </p>
                <p>
                  <strong>Lương:</strong>
                  {{ selectedApplication.jobID.jobSalary }}
                </p>
                <p>
                  <strong>Địa điểm:</strong>
                  {{ selectedApplication.jobID.jobLocation }}
                </p>
                <p>
                  <strong>Ngành nghề:</strong>
                  {{ selectedApplication.jobID.jobIndustry }}
                </p>
                <p>
                  <strong>Lĩnh vực:</strong>
                  {{ selectedApplication.jobID.jobField }}
                </p>
                <p>
                  <strong>Trình độ yêu cầu:</strong>
                  {{ selectedApplication.jobID.jobLevel }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarAdmin from "../../components/admin/SidebarAdmin.vue"; // Đảm bảo đường dẫn chính xác
import { useToast } from "vue-toastification"; // Import useToast

export default {
  components: {
    SidebarAdmin,
  },
  data() {
    return {
      jobApplications: [], // Danh sách đơn ứng tuyển
      selectedApplication: null, // Thông tin ứng viên được chọn
      searchName: "", // Biến lưu tên ứng viên tìm kiếm
      searchJobTitle: "", // Biến lưu tên công việc tìm kiếm
      searchStatus: "", // Trạng thái tìm kiếm
      filteredApplications: [], // Danh sách ứng tuyển sau khi tìm kiếm
      currentPage: 1, // Trang hiện tại
      itemsPerPage: 5, // Số mục trên mỗi trang
    };
  },
  computed: {
    paginatedApplications() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredApplications.slice(start, end);
    },

    totalPages() {
      return Math.ceil(this.filteredApplications.length / this.itemsPerPage);
    },
  },

  mounted() {
    this.fetchApplications(); // Lấy danh sách đơn ứng tuyển khi component được render
  },
  methods: {
    // Lấy danh sách đơn ứng tuyển từ API
    async fetchApplications() {
      try {
        const response = await fetch(
          "http://localhost:3000/api/applications/applicationslist"
        );
        const data = await response.json();

        if (response.ok) {
          this.jobApplications = data.applications; // Cập nhật danh sách đơn ứng tuyển
          this.filteredApplications = data.applications; // Khởi tạo filteredApplications
        } else {
          console.error(data.message); // Xử lý khi có lỗi
        }
      } catch (error) {
        console.error("Error fetching applications:", error); // Xử lý lỗi nếu có
      }
    },

    searchApplications() {
      // Lọc ứng viên theo tên hoặc công việc
      this.filteredApplications = this.jobApplications.filter((application) => {
        const fullName = `${application.userId.firstName} ${application.userId.lastName}`;
        const jobTitle = application.jobID.jobTitle;

        // Lọc theo trạng thái nếu có
        const matchesStatus = this.searchStatus
          ? application.status === this.searchStatus
          : true;

        return (
          fullName.toLowerCase().includes(this.searchName.toLowerCase()) &&
          jobTitle.toLowerCase().includes(this.searchJobTitle.toLowerCase()) &&
          matchesStatus
        );
      });
    },

    async acceptApplication(id) {
      const confirmAction = window.confirm(
        "Bạn có chắc chắn muốn duyệt đơn này không?"
      );
      if (!confirmAction) return; // Hủy nếu người dùng không xác nhận
      const toast = useToast();
      try {
        const response = await fetch(
          `http://localhost:3000/api/applications/accept/${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          // Cập nhật trạng thái ứng tuyển trong frontend
          const updatedApplication = this.jobApplications.find(
            (app) => app._id === id
          );
          if (updatedApplication) {
            updatedApplication.status = "accepted";
            toast.success("Đã chấp nhận đơn ứng tuyển");
          }

          // Cập nhật danh sách ứng tuyển đã lọc
          this.searchApplications();
        } else {
          console.error("Error accepting application");
        }
      } catch (error) {
        console.error("Error accepting application:", error);
      }
    },

    async rejectApplication(id) {
      const confirmAction = window.confirm(
        "Bạn có chắc chắn muốn từ chối đơn này không?"
      );
      if (!confirmAction) return; // Hủy nếu người dùng không xác nhận
      const toast = useToast();
      try {
        // Gửi yêu cầu PUT tới API để từ chối đơn ứng tuyển
        const response = await fetch(
          `http://localhost:3000/api/applications/reject/${id}`,
          {
            method: "PATCH", // Sử dụng PUT hoặc PATCH tùy theo API của bạn
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          // Cập nhật trạng thái ứng tuyển sau khi phản hồi từ server
          const application = this.jobApplications.find(
            (app) => app._id === id
          );
          if (application) {
            application.status = "rejected"; // Cập nhật trạng thái sau khi từ chối
            toast.success("Đã từ chối đơn ứng tuyển");
          }
          console.log("Đơn ứng tuyển đã được từ chối!");
        } else {
          console.error("Lỗi khi từ chối đơn: ", data.message);
        }
      } catch (error) {
        console.error("Lỗi kết nối: ", error);
      }
    },
    async sendEmail(applicationId) {
      const toast = useToast();
      const confirmAction = window.confirm(
        "Bạn có chắc chắn muốn gửi email không?"
      );
      if (!confirmAction) return; // Hủy nếu người dùng không xác nhận
      try {
        const response = await fetch(
          "http://localhost:3000/api/email/send-status-email",
          {
            method: "POST", // Phương thức HTTP là POST
            headers: {
              "Content-Type": "application/json", // Gửi dữ liệu dưới dạng JSON
            },
            body: JSON.stringify({ applicationId: applicationId }), // Chuyển đổi đối tượng thành JSON
          }
        );

        if (response.ok) {
          const data = await response.json();
          toast.success("Email đã được gửi thành công");
        } else {
          const errorData = await response.json();
          toast.error("Lỗi khi gửi email: " + errorData.message);
        }
      } catch (error) {
        toast.error("Lỗi khi gửi yêu cầu gửi email");
        console.error("Lỗi khi gửi yêu cầu:", error);
      }
    },
    selectApplication(application) {
      this.selectedApplication = application; // Cập nhật thông tin ứng viên đã chọn
    },
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
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

.card-header h4 {
  font-weight: 600;
}

.card-body p {
  font-size: 16px;
}

.card-body p strong {
  color: #007bff;
}

.table th,
.table td {
  vertical-align: middle;
}

.cv-image {
  width: 150px;
  height: auto;
}

.text-truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.pagination .btn {
  min-width: 40px;
}
tbody tr:hover {
  background-color: #f5f5f5;
  cursor: pointer;
}
</style>
