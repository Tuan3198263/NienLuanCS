<template>
  <div>
    <!-- Button trigger modal (optional if used somewhere else) -->
    <button
      type="button"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#profileModal"
      style="display: none"
      ref="modalTrigger"
    >
      Launch Modal
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="profileModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Thông Tin Cơ Bản</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="lastName" class="form-label">Họ</label>
                <input
                  type="text"
                  class="form-control"
                  id="lastName"
                  placeholder="Nhập họ"
                  v-model="formData.lastName"
                  required
                  @blur="validateField('lastName')"
                />
                <div v-if="errors.lastName" class="text-danger">
                  {{ errors.lastName }}
                </div>
              </div>
              <div class="mb-3">
                <label for="firstName" class="form-label">Tên</label>
                <input
                  type="text"
                  class="form-control"
                  id="firstName"
                  placeholder="Nhập tên"
                  v-model="formData.firstName"
                  required
                  @blur="validateField('firstName')"
                />
                <div v-if="errors.firstName" class="text-danger">
                  {{ errors.firstName }}
                </div>
              </div>

              <div class="mb-3">
                <label for="birthDate" class="form-label">Ngày Sinh</label>
                <input
                  type="date"
                  class="form-control"
                  id="birthDate"
                  v-model="formData.birthDate"
                  required
                  @blur="validateField('birthDate')"
                />
                <div v-if="errors.birthDate" class="text-danger">
                  {{ errors.birthDate }}
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">Giới Tính</label>
                <div>
                  <label class="form-check-label me-2" for="genderMale">
                    <input
                      type="radio"
                      v-model="formData.gender"
                      value="Nam"
                      class="form-check-input"
                      id="genderMale"
                      name="gender"
                      @blur="validateField('gender')"
                    />
                    Nam
                  </label>
                  <label class="form-check-label me-2" for="genderFemale">
                    <input
                      type="radio"
                      v-model="formData.gender"
                      value="Nữ"
                      class="form-check-input"
                      id="genderFemale"
                      name="gender"
                    />
                    Nữ
                  </label>
                </div>
                <div v-if="errors.jobTitle" class="text-danger">
                  {{ errors.gender }}
                </div>
              </div>
              <div class="mb-3">
                <label for="jobTitle" class="form-label">Chức Danh</label>
                <input
                  type="text"
                  class="form-control"
                  id="jobTitle"
                  placeholder="Nhập chức danh"
                  v-model="formData.jobTitle"
                  required
                  @blur="validateField('jobTitle')"
                />
                <div v-if="errors.jobTitle" class="text-danger">
                  {{ errors.jobTitle }}
                </div>
              </div>
              <div class="mb-3">
                <label for="level" class="form-label">Cấp Bậc Hiện Tại</label>
                <select
                  class="form-select"
                  id="level"
                  name="level"
                  v-model="formData.level"
                  @blur="validateField('level')"
                >
                  <option value="" disabled selected hidden>
                    Chọn cấp bậc...
                  </option>
                  <!-- Trường dự trữ -->
                  <option value="Thực tập sinh/Sinh Viên">
                    Thực tập sinh/Sinh viên
                  </option>
                  <option value="Mới tốt nghiệp">Mới tốt nghiệp</option>
                  <option value="Nhân viên">Nhân viên</option>
                  <option value="Trưởng phòng">Trưởng phòng</option>
                  <option value="Giám đốc">Giám đốc và cấp cao hơn</option>
                  <!-- Add other levels as needed -->
                </select>
                <div v-if="errors.level" class="text-danger">
                  {{ errors.level }}
                </div>
              </div>

              <div class="mb-3">
                <label for="companyField" class="form-label"
                  >Ngành nghề hiện tại</label
                >
                <select
                  class="form-select"
                  id="companyField"
                  v-model="formData.companyField"
                  @blur="validateField('companyField')"
                >
                  <option value="" disable selected hidden>
                    Chọn ngành nghề...
                  </option>
                  <option value="Khoa học máy tính">Khoa học máy tính</option>
                  <option value="Phát triển phần mềm">
                    Phát triển phần mềm
                  </option>
                  <option value="Sư phạm">Sư phạm</option>
                  <option value="Quảng cáo">Quảng cáo</option>
                  <option value="Quan hệ công chúng">Quan hệ công chúng</option>
                  <option value="Đầu tư tài chính">Đầu tư tài chính</option>
                  <option value="Khác">Khác...</option>
                  <!-- Add other fields as needed -->
                </select>
                <div v-if="errors.companyField" class="text-danger">
                  {{ errors.companyField }}
                </div>
              </div>

              <div class="mb-3">
                <label for="careerField" class="form-label"
                  >Lĩnh Vực Hiện Tại</label
                >
                <select
                  class="form-select"
                  id="careerField"
                  v-model="formData.careerField"
                  @blur="validateField('careerField')"
                >
                  <option value="" disable selected hidden>
                    Chọn lĩnh vực...
                  </option>
                  <option value="Công nghệ thông tin">
                    Công nghệ thông tin
                  </option>
                  <option value="Y tế">Y tế</option>
                  <option value="Giáo dục">Giáo dục</option>
                  <option value="Tài chính">Tài chính</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Nông nghiệp">Nông nghiệp</option>
                  <option value="Khác...">Khác...</option>
                  <!-- Add other fields as needed -->
                </select>
                <div v-if="errors.careerfield" class="text-danger">
                  {{ errors.careerfield }}
                </div>
              </div>

              <div class="mb-3">
                <label for="experience" class="form-label"
                  >Số Năm Kinh Nghiệm</label
                >
                <input
                  type="number"
                  class="form-control"
                  id="experience"
                  placeholder="Nhập số năm kinh nghiệm"
                  v-model="formData.experience"
                  min="1"
                  max="20"
                  required
                  @blur="validateField('experience')"
                />
                <div v-if="errors.experience" class="text-danger">
                  {{ errors.experience }}
                </div>
              </div>
              <div class="mb-3">
                <label for="degree" class="form-label">Bằng cấp cao nhất</label>
                <select
                  class="form-select"
                  v-model="formData.degree"
                  id="degree"
                  name="degree"
                  @blur="validateField('degree')"
                >
                  <option value="" disabled selected hidden>
                    Chọn bằng cấp...
                  </option>
                  <option value="Trung học">Trung học</option>
                  <option value="Trung cấp">Trung cấp</option>
                  <option value="Cao đẳng">Cao đẳng</option>
                  <option value="Cử nhân">Cử nhân</option>
                  <option value="Thạc sĩ">Thạc sĩ</option>
                  <option value="Tiến sĩ">Tiến sĩ</option>
                  <!-- Add other fields as needed -->
                </select>
                <div v-if="errors.degree" class="text-danger">
                  {{ errors.degree }}
                </div>
              </div>

              <div class="mb-3">
                <label for="address" class="form-label">Địa Chỉ</label>
                <input
                  type="text"
                  class="form-control"
                  id="address"
                  placeholder="Nhập địa chỉ"
                  v-model="formData.address"
                  maxlength="100"
                  required
                  @blur="validateField('address')"
                />
                <div v-if="errors.address" class="text-danger">
                  {{ errors.address }}
                </div>
              </div>
            </form>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Hủy
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click.prevent="submitForm"
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
import { useToast } from "vue-toastification"; // Import useToast
export default {
  data() {
    return {
      formData: {
        lastName: "",
        firstName: "",
        birthDate: "",
        gender: "",
        jobTitle: "",
        level: "",
        companyField: "",
        careerField: "",
        experience: null,
        degree: "",
        address: "",
      },
      errors: {
        lastName: null,
        firstName: null,
        jobTitle: null,
        birthDate: null,
        gender: null,
        level: null,
        companyField: null,
        careerField: null,
        experience: null,
        degree: null,
        address: null,
      },
    };
  },
  setup() {
    const toast = useToast(); // Khởi tạo toast

    return {
      toast,
    };
  },
  methods: {
    openModal() {
      this.$refs.modalTrigger.click();
    },

    closeModal() {},

    validateField(field) {
      // Biểu thức chính quy cho phép ký tự chữ cái, bao gồm cả tiếng Việt và khoảng trắng
      const nameRegex =
        /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/;

      if (!this.formData[field]) {
        this.errors[field] = `Vui lòng nhập ${this.getFieldLabel(field)}.`;
      } else if (
        field === "lastName" ||
        field === "firstName" ||
        field === "jobTitle"
      ) {
        if (!nameRegex.test(this.formData[field])) {
          this.errors[field] = `${this.getFieldLabel(
            field
          )} chỉ được phép chứa ký tự chữ.`;
        } else {
          this.errors[field] = null; // Xóa lỗi nếu trường hợp lệ
        }
      } else {
        this.errors[field] = null; // Xóa lỗi nếu trường hợp hợp lệ
      }
    },
    getFieldLabel(field) {
      const labels = {
        lastName: "họ",
        firstName: "tên",
        jobTitle: "chức danh",
        birthDate: "ngày sinh",
        gender: "giới tính",
        level: "cấp bậc hiện tại",
        companyField: "ngành nghề hiện tại",
        careerField: "lĩnh vực hiện tại",
        experience: "số năm kinh nghiệm",
        degree: "bằng cấp cao nhất",
        address: "địa chỉ",
      };
      return labels[field] || field;
    },
    validateForm() {
      // Kiểm tra tất cả các trường
      Object.keys(this.formData).forEach((field) => {
        this.validateField(field);
      });
      console.log(this.errors); // Kiểm tra lỗi tại đây
    },
    //gửi form
    async submitForm() {
      this.validateForm();

      // Kiểm tra nếu không có lỗi thì mới submit form
      const hasErrors = Object.values(this.errors).some(
        (error) => error !== null
      );
      if (!hasErrors) {
        const user = JSON.parse(localStorage.getItem("user"));
        const email = user.email; // Lấy email đã đăng nhập
        const token = localStorage.getItem("token");
        console.log("Token:", token); // Log token để kiểm tra

        try {
          const response = await fetch("http://localhost:3000/api/profile", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Nếu sử dụng token
            },
            body: JSON.stringify({
              email: email, // Email của người dùng
              firstname: this.formData.firstName,
              lastname: this.formData.lastName,
              gender: this.formData.gender,
              birthday: this.formData.birthDate,
              jobtitle: this.formData.jobTitle,
              level: this.formData.level,
              companyfield: this.formData.companyField,
              careerfield: this.formData.careerField,
              experience: this.formData.experience,
              degree: this.formData.degree,
              address: this.formData.address,
            }),
          });

          if (response.ok) {
            const data = await response.json();

            this.toast.success("Profile đã được cập nhật thành công");
            // Đóng modal sau khi cập nhật thành công
            this.$refs.modalTrigger.click();
          } else {
            const errordata = await response.json();

            this.toast.error(`Lỗi: ${errordata.message || "Có lỗi xảy ra"}!`);
          }
        } catch (error) {
          console.error("Error updating profile:", error);
          this.toast.error("Đã có lỗi xảy ra khi cập nhật profile"); //
        }
      } else {
        this.toast.error("Form có lỗi, vui lòng kiểm tra lại."); //
      }
    },
  },
};
</script>

<style scoped>
.modal-content {
  border-radius: 10px;
}
label {
  font-weight: 500;
}
</style>
