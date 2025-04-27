<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header text-center">
            <h4>Đăng Ký</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleRegister">
              <div class="mb-3">
                <label for="firstName" class="form-label">Họ</label>
                <input
                  type="text"
                  class="form-control"
                  id="firstName"
                  v-model="firstName"
                  placeholder="Nhập họ"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="lastName" class="form-label">Tên</label>
                <input
                  type="text"
                  class="form-control"
                  id="lastName"
                  v-model="lastName"
                  placeholder="Nhập tên"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="phone" class="form-label">Số điện thoại</label>
                <input
                  type="text"
                  class="form-control"
                  id="phone"
                  v-model="phone"
                  placeholder="Nhập số điện thoại"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="email"
                  placeholder="Nhập email"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Mật khẩu</label>
                <div class="input-group">
                  <input
                    :type="passwordType"
                    class="form-control"
                    id="password"
                    v-model="password"
                    placeholder="Nhập mật khẩu"
                    required
                  />
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    @click="togglePassword"
                  >
                    <i class="fa" :class="passwordIcon"></i>
                  </button>
                </div>
              </div>
              <button type="submit" class="btn btn-primary w-100">
                Đăng Ký
              </button>
              <p class="text-danger mt-2">{{ errorMessage }}</p>
            </form>
          </div>
          <div class="card-footer text-center">
            <p>
              Đã có tài khoản?
              <span @click="goToLogin" style="cursor: pointer; color: blue"
                >Đăng nhập</span
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification"; // Import useToast

export default {
  name: "SignupForm",
  setup() {
    const router = useRouter();
    const toast = useToast(); // Khởi tạo toast
    const firstName = ref("");
    const lastName = ref("");
    const phone = ref("");
    const email = ref("");
    const password = ref("");
    const passwordType = ref("password");
    const errorMessage = ref("");
    const passwordIcon = ref("fa-eye");

    const togglePassword = () => {
      passwordType.value =
        passwordType.value === "password" ? "text" : "password";
      passwordIcon.value =
        passwordIcon.value === "fa-eye" ? "fa-eye-slash" : "fa-eye";
    };

    const handleRegister = async () => {
      // Kiểm tra thông tin nhập
      if (
        !firstName.value ||
        !lastName.value ||
        !phone.value ||
        !email.value ||
        !password.value
      ) {
        errorMessage.value = "Vui lòng nhập đầy đủ thông tin.";
        toast.error("Vui lòng nhập đầy đủ thông tin."); // Hiển thị thông báo lỗi bằng toast
        return; // Dừng lại nếu có thông tin chưa nhập
      }

      // Nếu thông tin hợp lệ, thực hiện logic đăng ký
      try {
        const response = await fetch("http://localhost:3000/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: firstName.value,
            lastName: lastName.value,
            phone: phone.value,
            email: email.value,
            password: password.value,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success(data.message); // Thông báo thành công
          router.push({ name: "Login" }); // Đổi sang route trang đăng nhập
        } else {
          errorMessage.value = data.message; // Hiển thị thông báo lỗi từ máy chủ
          toast.error(data.message); // Thông báo lỗi từ máy chủ
        }
      } catch (error) {
        console.error("Error during registration:", error);
        errorMessage.value = "Đã có lỗi xảy ra. Vui lòng thử lại.";
        toast.error("Đã có lỗi xảy ra. Vui lòng thử lại."); // Thông báo lỗi khi có sự cố
      }
    };

    const goToLogin = () => {
      router.push({ name: "Login" });
    };

    return {
      firstName,
      lastName,
      phone,
      email,
      password,
      passwordType,
      errorMessage,
      passwordIcon,
      togglePassword,
      handleRegister,
      goToLogin,
    };
  },
};
</script>

<style scoped>
.card-header {
  background-color: #007bff;
  color: white;
}
</style>
