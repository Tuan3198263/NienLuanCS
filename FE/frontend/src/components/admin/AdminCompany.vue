<template>
  <div class="d-flex">
    <!-- Sidebar -->

    <!-- Main Content -->
    <div class="content flex-grow-1">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Quản lý công ty</a>
          <!-- Button to Add Company -->
          <button
            class="btn btn-success ml-auto"
            data-bs-toggle="modal"
            data-bs-target="#addCompanyModal"
          >
            Thêm công ty
          </button>
        </div>
      </nav>

      <!-- Company Info -->

      <div class="card mb-4 mt-4">
        <div class="card-header">
          <h4>Thông tin công ty</h4>
        </div>
        <div class="card-body d-flex justify-content-between">
          <div>
            <p><strong>Id công ty:</strong> {{ company.companyId }}</p>
            <p><strong>Tên công ty:</strong> {{ company.companyName }}</p>
            <p><strong>Địa chỉ:</strong> {{ company.companyAddress }}</p>
            <p><strong>Website:</strong> {{ company.companyWebsite }}</p>
          </div>
          <div>
            <img
              v-if="company.companyLogo"
              :src="company.companyLogo"
              alt="Logo công ty"
              style="max-width: 150px; height: auto; object-fit: contain"
            />
          </div>
        </div>
      </div>

      <!-- Employees List -->
      <div class="card mb-4">
        <div class="card-header">
          <h4>Danh sách công ty</h4>
        </div>
        <!-- Search Bar -->
        <div class="container mt-4">
          <div class="input-group mb-4">
            <span class="input-group-text">
              <i class="fas fa-search"></i>
              <!-- Icon Search -->
            </span>
            <input
              type="text"
              class="form-control"
              placeholder="Tìm kiếm công ty"
              v-model="searchQuery"
            />
          </div>
        </div>

        <div class="card-body">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên công ty</th>
                <th>Website</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="filteredCompanies.length === 0">
                <td colspan="4" class="text-center">Không tìm thấy công ty</td>
              </tr>
              <tr
                v-for="(company, index) in filteredCompanies"
                :key="company.id"
              >
                <td>{{ index + 1 }}</td>
                <td
                  @click.prevent="showCompanyInfo(company)"
                  style="cursor: pointer"
                >
                  {{ company.companyName }}
                </td>
                <td>
                  <!-- Chuyển đến trang thông tin công ty khi click vào website -->
                  <router-link
                    :to="'/company-info/' + company.companyId"
                    style="cursor: pointer"
                  >
                    {{ company.companyWebsite }}
                  </router-link>
                </td>
                <td>
                  <button
                    class="btn btn-primary btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#companyModal"
                    @click="editCompany(company.companyId)"
                  >
                    <i class="fas fa-edit"></i>
                  </button>
                  <button
                    class="btn btn-danger btn-sm"
                    @click="deleteCompany(company.companyId)"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal Add Company -->
    <div
      class="modal fade"
      id="addCompanyModal"
      tabindex="-1"
      aria-labelledby="addCompanyModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addCompanyModalLabel">
              Thêm công ty mới
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <!-- Form thêm công ty mới -->
            <form @submit.prevent="saveNewCompany">
              <div class="mb-3">
                <label for="companyId" class="form-label">
                  <i class="fas fa-building"></i> Id công ty
                </label>
                <input
                  type="text"
                  class="form-control"
                  v-model="newCompany.companyId"
                  required
                  placeholder="Nhập Id công ty"
                />
              </div>
              <div class="mb-3">
                <label for="companyName" class="form-label">
                  <i class="fas fa-city"></i> Tên công ty
                </label>
                <input
                  type="text"
                  class="form-control"
                  v-model="newCompany.companyName"
                  required
                  placeholder="Nhập tên công ty"
                />
              </div>

              <div class="mb-3">
                <label for="companyLogo" class="form-label">
                  <i class="fas fa-file-image"></i> Logo công ty (URL)
                </label>
                <input
                  type="text"
                  class="form-control"
                  v-model="newCompany.companyLogo"
                  required
                  placeholder="Nhập URL logo công ty"
                />
              </div>
              <div class="mb-3">
                <label for="companyAddress" class="form-label">
                  <i class="fas fa-map-marker-alt"></i> Địa chỉ
                </label>
                <input
                  type="text"
                  class="form-control"
                  v-model="newCompany.companyAddress"
                  required
                  placeholder="Nhập địa chỉ công ty"
                />
              </div>
              <div class="mb-3">
                <label for="companyWebsite" class="form-label">
                  <i class="fas fa-link"></i> Website
                </label>
                <input
                  type="url"
                  class="form-control"
                  v-model="newCompany.companyWebsite"
                  required
                  placeholder="Nhập URL website công ty"
                />
              </div>

              <div class="mb-3">
                <label for="companyDescription" class="form-label">
                  <i class="fas fa-pencil-alt"></i> Mô tả công ty
                </label>
                <textarea
                  class="form-control"
                  v-model="newCompany.companyDescription"
                  required
                  placeholder="Nhập mô tả về công ty"
                ></textarea>
              </div>
              <input type="hidden" v-model="newCompany.companyId" />
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Đóng
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="saveNewCompany"
              data-bs-dismiss="modal"
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Edit Company -->
    <div
      class="modal fade"
      id="companyModal"
      tabindex="-1"
      aria-labelledby="companyModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="companyModalLabel">
              Chỉnh sửa công ty
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <!-- Form chỉnh sửa công ty -->
            <form @submit.prevent="saveCompany">
              <div class="mb-3">
                <label for="companyName" class="form-label">Tên công ty</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="selectedCompany.companyName"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="companyAddress" class="form-label">Địa chỉ</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="selectedCompany.companyAddress"
                  required
                />
              </div>

              <div class="mb-3">
                <label for="companyWebsite" class="form-label">Website</label>
                <input
                  type="url"
                  class="form-control"
                  v-model="selectedCompany.companyWebsite"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="companyLogo" class="form-label">Logo công ty</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="selectedCompany.companyLogo"
                />
              </div>
              <input type="hidden" v-model="selectedCompany.companyId" />
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Đóng
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="saveCompany"
              data-bs-dismiss="modal"
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarAdmin from "../../components/admin/SidebarAdmin.vue"; // Ensure the correct import path
import { useToast } from "vue-toastification"; // Import useToast

export default {
  components: {
    SidebarAdmin,
  },

  data() {
    return {
      searchQuery: "", // Initialize search query for filtering companies
      companies: [], // Initialize empty array for company data
      company: {
        companyId: null,
        companyName: "",
        companyAddress: "",
        companyWebsite: "",
      },
      selectedCompany: {
        // This is for editing company info
        companyId: null,
        companyName: "",
        companyAddress: "",
        companyWebsite: "",
        companyLogo: "",
      },
      newCompany: {
        companyId: null,
        companyName: "",
        companyAddress: "",
        companyWebsite: "",
        companyLogo: "",
        companyDescription: "",
        companyImage: "",
        companyJobsOpening: 0,
        companyFollowersCount: 0,
      },
    };
  },

  computed: {
    filteredCompanies() {
      // Lọc công ty dựa trên tên công ty
      const filtered = this.companies.filter((company) =>
        company.companyName
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      );
      return filtered;
    },
  },

  methods: {
    showCompanyInfo(company) {
      // Cập nhật thông tin công ty vào dữ liệu hiện tại để hiển thị
      this.company = { ...company };
    },
    async fetchCompanies() {
      try {
        const response = await fetch("http://localhost:3000/api/companies");

        // Check if the response is successful (status code 200)
        if (!response.ok) {
          throw new Error("Failed to fetch companies");
        }

        // Parse the response data as JSON
        const data = await response.json();
        this.companies = data; // Assign API data to companies array
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    },
    editCompany(id) {
      const company = this.companies.find((c) => c.companyId === id);

      if (company) {
        this.selectedCompany = { ...company }; // Chỉ sao chép dữ liệu của công ty được chọn vào selectedCompany
      }
    },
    saveCompany() {
      if (this.selectedCompany.companyId) {
        // Nếu có companyId, thực hiện cập nhật công ty
        this.updateCompany(this.selectedCompany);
      } else {
        // Nếu không có companyId, thêm công ty mới
        this.addCompany(this.selectedCompany);
      }
    },
    async updateCompany(company) {
      const toast = useToast();
      try {
        const response = await fetch(
          `http://localhost:3000/api/${company.companyId}`,
          {
            method: "PUT", // Gửi yêu cầu PUT để cập nhật
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              companyName: company.companyName,
              companyAddress: company.companyAddress,
              companyWebsite: company.companyWebsite,
              companyLogo: company.companyLogo,
            }),
          }
        );

        if (response.ok) {
          // Cập nhật thành công, tìm và cập nhật công ty trong mảng
          const index = this.companies.findIndex(
            (c) => c.companyId === company.companyId
          );
          if (index !== -1) {
            this.companies[index] = { ...company }; // Cập nhật công ty trong mảng
          }
          toast.success("Cập nhật thành công!");
          this.resetForm();
        } else {
          console.error("Failed to update company");
        }
      } catch (error) {
        console.error("Error updating company:", error);
      }
    },

    async saveNewCompany() {
      const toast = useToast();
      try {
        // Kiểm tra xem tất cả các trường cần thiết đã được nhập hay chưa
        if (
          !this.newCompany.companyName ||
          !this.newCompany.companyAddress ||
          !this.newCompany.companyWebsite
        ) {
          toast.error("Vui lòng điền đầy đủ thông tin!");
          return;
        }

        // Gửi yêu cầu POST đến API để thêm công ty mới
        const response = await fetch("http://localhost:3000/api/company", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.newCompany),
        });

        if (response.ok) {
          const data = await response.json();
          // Cập nhật lại danh sách công ty sau khi thêm thành công
          this.companies.push(data); // Giả sử API trả về thông tin công ty vừa thêm
          toast.success("Thêm công ty thành công!");
          this.resetForm(); // Reset form sau khi thêm
        } else {
          toast.error("Thêm công ty thất bại!");
        }
      } catch (error) {
        console.error("Lỗi khi thêm công ty:", error);
        toast.error("Đã có lỗi xảy ra, vui lòng thử lại.");
      }
    },

    // Phương thức xóa công ty
    async deleteCompany(companyId) {
      const toast = useToast();
      try {
        // Xác nhận hành động xóa
        const confirmDelete = confirm("Bạn có chắc chắn muốn xóa công ty này?");
        if (!confirmDelete) return;

        // Gửi yêu cầu DELETE tới API
        const response = await fetch(
          `http://localhost:3000/api/company/${companyId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          // Nếu có lỗi từ backend, trả về thông báo lỗi và hiển thị
          const errorData = await response.json();
          toast.error(`Lỗi: ${errorData.message}`);
          return;
        }

        // Thành công, xóa công ty khỏi danh sách
        this.companies = this.companies.filter(
          (company) => company.companyId !== companyId
        );
        toast.success("Công ty đã được xóa thành công!");
      } catch (error) {
        console.error("Error deleting company:", error);
        toast.error("Có lỗi xảy ra khi xóa công ty.");
      }
    },
    resetForm() {
      this.selectedCompany = {
        companyId: null,
        companyName: "",
        companyAddress: "",
        companyWebsite: "",
        companyLogo: "",
      };
    },
  },
  async created() {
    await this.fetchCompanies(); // Fetch company data when component is created
  },
};
</script>

<style scoped>
.content {
  margin-left: 250px; /* Adjust for the sidebar width */
  padding: 20px;
}

.table {
  width: 100%;
}

.modal-dialog {
  max-width: 600px;
}

.input-group-text {
  background-color: #fff;
}

@media (max-width: 992px) {
  .content {
    margin-left: 0;
  }
}
.card-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card-body img {
  max-width: 150px; /* Giới hạn kích thước logo */
  height: auto;
  object-fit: contain;
}
</style>
