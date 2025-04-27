<template>
  <div>
    <!-- Button trigger modal (optional if used somewhere else) -->
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#jobModal"
      style="display: none"
      ref="modalTrigger"
    >
      Launch Modal
    </button>
    <!-- Modal -->
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
              Chỉnh Sửa Công Việc Mong Muốn
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitForm">
              <!-- Nơi làm việc -->
              <div class="mb-3">
                <label for="workplace" class="form-label">Nơi làm việc</label>
                <input
                  type="text"
                  v-model="workplace"
                  class="form-control"
                  id="workplace"
                  placeholder="Thêm nơi làm việc"
                />
              </div>

              <!-- Mức lương mong muốn -->
              <div class="mb-3">
                <label for="salary" class="form-label"
                  >Mức lương mong muốn (Chỉ nhập số)</label
                >
                <input
                  type="text"
                  v-model="salary"
                  @input="validateSalary"
                  class="form-control"
                  id="salary"
                  placeholder="Thêm mức lương mong muốn (USD/Tháng)"
                />
              </div>
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
            <button type="button" class="btn btn-primary" @click="submitForm">
              Lưu thay đổi
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useToast } from "vue-toastification"; // Import useToast
export default {
  data() {
    return {
      workplace: "", // Biến để lưu nơi làm việc
      salary: "", // Biến để lưu mức lương mong muốn
    };
  },
  setup() {
    const toast = useToast(); // Khởi tạo toast

    return {
      toast,
    };
  },
  methods: {
    // Hàm mở modal
    openModal() {
      this.$refs.modalTrigger.click();
    },

    // Hàm kiểm tra và xử lý dữ liệu nhập vào mức lương
    validateSalary() {
      this.salary = this.salary.replace(/[^0-9.]/g, ""); // Thay thế tất cả các ký tự không phải là số hoặc dấu chấm
    },

    // Hàm gửi form đến API
    async submitForm() {
      // Kiểm tra xem nơi làm việc và mức lương có dữ liệu hợp lệ không
      if (!this.workplace || !this.salary) {
        this.toast.error(
          "Vui lòng nhập đầy đủ thông tin nơi làm việc và mức lương."
        );
        return;
      }
      try {
        const token = localStorage.getItem("token"); // Hoặc lấy từ cookie, nếu bạn dùng token trong localStorage

        // Tạo đối tượng chứa dữ liệu cần gửi
        const data = {
          workplace: this.workplace,
          salary: this.salary,
        };

        // Gửi yêu cầu API bằng fetch
        const response = await fetch(
          "http://localhost:3000/api/profile/workplace-salary",
          {
            method: "PUT", // Sử dụng phương thức PUT để cập nhật
            headers: {
              "Content-Type": "application/json", // Định dạng dữ liệu gửi đi là JSON
              Authorization: `Bearer ${token}`, // Gửi token trong header Authorization
            },
            body: JSON.stringify(data), // Chuyển đối tượng dữ liệu thành chuỗi JSON
          }
        );

        // Kiểm tra phản hồi từ API
        if (!response.ok) {
          throw new Error("Lỗi khi cập nhật dữ liệu");
        }

        const result = await response.json();

        if (response.status === 200) {
          this.toast.success("Cập nhật thành công");

          // Reset các trường nhập
          this.workplace = "";
          this.salary = "";

          // Đóng modal
          this.$refs.modalTrigger.click();
        }
      } catch (error) {
        console.error("Lỗi khi cập nhật:", error);
        this.toast.error("Cập nhật thất bại");
      }
    },
  },
};
</script>

<style scoped>
.modal-content {
  padding: 20px;
}

.modal-header {
  border-bottom: none;
}

.modal-footer {
  border-top: none;
}
</style>
