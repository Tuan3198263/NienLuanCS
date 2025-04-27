<template>
  <div class="col-md-9">
    <!-- Thông tin cá nhân -->
    <div class="card mb-4">
      <div class="card-body d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center">
          <!-- Hiển thị avatar nếu có, nếu không thì hiển thị icon người dùng -->
          <!-- Nếu có avatar -->
          <img
            v-if="userProfile.avatar"
            :src="userProfile.avatar"
            alt="Avatar"
            class="avatar-img rounded-circle me-3"
            @click="openAvatarModal"
            style="cursor: pointer"
          />

          <!-- Nếu không có avatar, hiển thị icon mặc định -->
          <i
            v-else
            class="fas fa-user-circle rounded-circle me-3 avatar-icon"
            @click="openAvatarModal"
            style="font-size: 80px; cursor: pointer"
          ></i>

          <div>
            <!-- Hiển thị họ tên từ userProfile -->
            <h5 class="card-title mb-1">
              {{ userProfile.lastname }} {{ userProfile.firstname }}
            </h5>

            <p class="card-text mb-1 info">
              <i class="fas fa-user"></i>
              {{ userProfile.jobtitle || "Thêm Chức Danh" }} -
              {{ userProfile.experience || "Thêm Số năm kinh nghiệm" }}
            </p>
            <p class="card-text mb-1 info">
              <i class="fas fa-briefcase"></i>
              {{ userProfile.level || "Thêm Cấp Bậc Hiện Tại" }}
            </p>
            <p class="card-text mb-1 info">
              <i class="fas fa-envelope"></i> {{ userProfile.email }}
            </p>
            <p class="card-text info">
              <i class="fas fa-map-marker-alt"></i>
              {{ userProfile.address || "Thêm Địa Chỉ" }}
            </p>
          </div>
        </div>
        <div>
          <i
            class="fas fa-pencil-alt edit-icon d-flex justify-content-end mb-4"
            style="cursor: pointer"
            @click="$refs.profileForm.openModal()"
          ></i>
          <ProfileForm ref="profileForm" />

          <p class="card-text mb-1 info">
            <i class="fas fa-graduation-cap"></i>
            {{ userProfile.degree || "Thêm Bằng Cấp Cao Nhất" }}
          </p>
          <p class="card-text mb-1 info">
            <i class="fas fa-phone"></i>
            {{ userProfile.phone || "Thêm Số Điện Thoại" }}
          </p>
        </div>
      </div>

      <!-- Thêm ProfileForm vào đây -->
      <ProfileForm ref="profileForm" />
    </div>

    <!-- Công Việc Mong Muốn -->
    <div class="card mb-4">
      <div class="card-body">
        <h5 class="card-title">Công Việc Mong Muốn</h5>

        <div class="d-flex justify-content-between">
          <div>
            <p class="card-text mb-1">
              <i class="fas fa-map-marker-alt"></i>
              <strong>Nơi làm việc:</strong>
              {{ userProfile.workplace || "Thêm Bằng Nơi Làm Việc" }}
            </p>
            <p class="card-text mb-1">
              <i class="fas fa-dollar-sign"></i>
              <strong>Mức lương mong muốn (USD / tháng):</strong>
              {{ userProfile.salary || "Thêm Mức Lương Mong Muốn" }}
            </p>
          </div>
          <div>
            <i
              class="fas fa-pencil-alt edit-icon d-flex justify-content-end mb-4"
              style="cursor: pointer"
              @click="$refs.jobForm.openModal()"
            ></i>
            <JobForm ref="jobForm" />
          </div>
        </div>
      </div>
      <JobForm ref="jobForm" />
    </div>

    <!-- Khung Upload CV -->
    <!-- Khung Cập Nhật CV -->
    <div class="card mb-4">
      <div class="card-body">
        <h5 class="card-title">Cập nhật CV</h5>
        <!-- Hiển thị CV nếu đã có -->
        <div v-if="userProfile.cv" class="cv-info mt-3">
          <img :src="userProfile.cv" alt="CV Preview" class="cv-thumbnail" />
          <div>
            <a :href="userProfile.cv" target="_blank">
              Xem CV: {{ userProfile.cvName }}
            </a>
          </div>
        </div>
        <div class="d-flex flex-column align-items-center">
          <!-- Nút cập nhật CV -->

          <button class="btn btn-link" @click="triggerCVUpdate">
            <i class="fas fa-refresh"></i> Cập nhật CV của bạn
          </button>

          <!-- Input file ẩn, chỉ hiện khi người dùng click vào nút cập nhật -->
          <input
            type="file"
            ref="cvFileInput"
            @change="handleCVUpdate"
            class="form-control-file"
            style="display: none"
          />
        </div>
      </div>
    </div>

    <!-- Các mục khác -->
    <div v-for="section in sections" :key="section.title" class="card mb-4">
      <div class="card-body">
        <h5 class="card-title">{{ section.title }}</h5>
        <button class="btn btn-link" @click="openModal(section)">
          <i :class="section.icon"></i> {{ section.buttonText }}
        </button>
      </div>
    </div>
    <!-- Modal cập nhật avatar -->
    <div v-if="showAvatarModal" class="modal-backdrop">
      <div class="modal-content">
        <h5>Chọn Avatar mới</h5>
        <input type="file" @change="handleAvatarUpload" />
        <button class="btn btn-info mt-4 mb-4" @click="updateAvatar">
          Cập nhật
        </button>
        <button class="btn btn-danger" @click="closeAvatarModal">Đóng</button>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileForm from "./ProfileForm.vue"; // Đảm bảo import đúng file
import JobForm from "./JobForm.vue";
import { useToast } from "vue-toastification"; // Import useToast

export default {
  name: "ProfileContent",
  components: { ProfileForm, JobForm },
  data() {
    return {
      userProfile: {
        firstname: "",
        lastname: "",
        email: "",
        jobtitle: "",
        level: "",
        experience: "",
        address: "",
        degree: "",
        phone: "",
        workplace: "",
        salary: "",
        avatar: "", // Thêm trường avatar vào userProfile
        cv: "",
      },
      showAvatarModal: false, // Điều khiển hiển thị modal cập nhật avatar
      selectedAvatar: null, // Ảnh người dùng chọn để cập nhật
      selectedCV: null, // File CV người dùng chọn
      sections: [
        {
          title: "Hoàn Chỉnh Hồ Sơ",
          icon: "fas fa-info-circle",
          buttonText: "Thêm Thông Tin Cơ Bản",
        },
        {
          title: "Mục Tiêu Nghề Nghiệp",
          icon: "fas fa-bullseye",
          buttonText: "Thêm Mục Tiêu Nghề Nghiệp",
        },
        {
          title: "Kinh Nghiệm Làm Việc",
          icon: "fas fa-briefcase",
          buttonText: "Thêm Kinh Nghiệm Làm Việc",
        },
        {
          title: "Học Vấn",
          icon: "fas fa-book",
          buttonText: "Thêm Học Vấn",
        },
        {
          title: "Dự Án",
          icon: "fas fa-tasks",
          buttonText: "Thêm Dự Án",
        },
        {
          title: "Kỹ Năng",
          icon: "fas fa-lightbulb",
          buttonText: "Thêm Kỹ Năng",
        },
      ],
    };
  },
  setup() {
    const toast = useToast(); // Khởi tạo toast

    return {
      toast,
    };
  },
  async mounted() {
    try {
      const response = await fetch("http://localhost:3000/api/users/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Nếu sử dụng token
          // Thêm các tiêu đề cần thiết ở đây nếu cần
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      this.userProfile = data; // Lưu dữ liệu vào userProfile
      console.log(this.userProfile); // Kiểm tra dữ liệu đã được gán hay chưa
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  },
  methods: {
    openProfileForm() {
      this.$refs.profileForm.openModal(); // Mở modal từ ProfileForm
    },
    // Mở modal cập nhật avatar
    openAvatarModal() {
      this.showAvatarModal = true;
    },
    // Đóng modal
    closeAvatarModal() {
      this.showAvatarModal = false;
    },
    // Xử lý khi người dùng chọn file
    handleAvatarUpload(event) {
      this.selectedAvatar = event.target.files[0];
    },
    // Cập nhật avatar
    async updateAvatar() {
      if (!this.selectedAvatar) return;

      // Sử dụng FormData để gửi file
      const formData = new FormData();
      formData.append("avatar", this.selectedAvatar);

      try {
        const response = await fetch(
          "http://localhost:3000/api/profile/avatar",
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Token nếu cần
            },
            body: formData,
          }
        );

        const data = await response.json();

        if (response.ok) {
          this.closeAvatarModal(); // Đóng modal
          this.toast.success("Cập nhật ảnh đại diện thành công!"); // Thông báo thành công
        } else {
          console.error("Lỗi cập nhật avatar:", data.message);
          this.toast.error("Lỗi cập nhật avatar!"); // Thông báo lỗi
        }
      } catch (error) {
        console.error("Lỗi khi gửi yêu cầu:", error);
        this.toast.error("Đã xảy ra lỗi khi cập nhật ảnh đại diện!"); // Thông báo lỗi
      }
    },

    triggerCVUpdate() {
      this.$refs.cvFileInput.click();
    },
    // Hàm xử lý khi người dùng chọn file mới để cập nhật CV
    handleCVUpdate(event) {
      this.selectedCV = event.target.files[0];
      this.uploadCV(); // Tự động gọi phương thức upload sau khi chọn file
    },
    // Hàm tải lên CV
    async uploadCV() {
      if (!this.selectedCV) {
        alert("Vui lòng chọn file CV trước khi tải lên.");
        return;
      }

      const formData = new FormData();
      formData.append("cv", this.selectedCV);

      try {
        const response = await fetch("http://localhost:3000/api/profile/cv", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Token nếu cần
          },
          body: formData,
        });

        const data = await response.json();

        if (response.ok) {
          // Cập nhật CV trong userProfile
          this.userProfile.cvName = this.selectedCV.name; // Hiển thị tên file CV

          // Giả sử server trả về hình ảnh thu nhỏ của CV
          this.userProfile.cvThumbnail = data.cvThumbnail || "";

          this.toast.success("Tải lên CV thành công!"); // Thông báo thành côn
        } else {
          console.error("Lỗi khi tải lên CV:", data.message);
          this.toast.error("Lỗi khi tải lên CV!"); // Thông báo lỗi
        }
      } catch (error) {
        console.error("Lỗi khi gửi yêu cầu:", error);
        this.toast.error("Đã xảy ra lỗi khi tải lên CV!"); // Thông báo lỗi
      }
    },
  },
};
</script>

<style scoped>
.card {
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 1.75rem;
  font-weight: bold;
}

.card-text {
  font-size: 1rem;
  color: #6c757d;
}

.fas {
  margin-right: 8px;
}

.btn-link {
  color: #007bff;
  font-size: 1rem;
  text-decoration: none;
}

.btn-link:hover {
  text-decoration: underline;
}

.progress {
  height: 20px;
  border-radius: 10px;
}

.progress-bar {
  background-color: #007bff;
}

.info {
  font-weight: 600;
}

.avatar-icon {
  color: #6c757d;
}
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}
.avatar-img {
  width: 90px; /* Cập nhật kích thước ảnh */
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid blue; /* Đường viền có độ dày 5px và màu xanh (có thể thay đổi màu) */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Thêm bóng nhẹ cho ảnh */
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 400px; /* Đặt chiều rộng cho modal */
  max-width: 100%; /* Đảm bảo modal không rộng hơn màn hình */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Thêm hiệu ứng bóng cho modal */
}

h5 {
  margin-bottom: 20px;
  font-size: 1.25rem;
}

.form-control {
  border-radius: 5px;
  padding: 10px;
}
.cv-img {
  width: 100%; /* Chiều rộng ảnh CV */
  max-width: 300px; /* Giới hạn chiều rộng tối đa */
  height: auto; /* Đảm bảo ảnh CV tỷ lệ đúng */
  border: 1px solid #ddd;
  border-radius: 5px;
}

.cv-placeholder {
  text-align: center;
  padding: 20px;
  border: 1px dashed #ccc;
  border-radius: 5px;
  width: 100%;
  max-width: 300px;
}

.cv-upload-icon {
  font-size: 40px;
  color: #ccc;
}
.cv-thumbnail {
  width: 200px; /* Điều chỉnh độ rộng phù hợp */
  height: auto; /* Giữ tỷ lệ ảnh */
  border: 1px solid #ccc; /* Thêm viền nhẹ để phân biệt ảnh */
  border-radius: 8px; /* Bo góc nhẹ cho ảnh */
  padding: 5px; /* Khoảng cách giữa ảnh và viền */
  object-fit: cover; /* Đảm bảo ảnh không bị biến dạng */
  margin-bottom: 15px; /* Khoảng cách giữa ảnh và phần hiển thị link CV */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Thêm đổ bóng nhẹ */
}
</style>
