<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header text-center">
            <h4>Đăng Nhập</h4>
          </div>
          <div class="card-body">
            <!--form-->
            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="Nhập email"
                  v-model="email"
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Mật khẩu</label>
                <div class="input-group">
                  <input
                    :type="passwordType"
                    class="form-control"
                    id="password"
                    placeholder="Nhập mật khẩu"
                    v-model="password"
                  />
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    id="togglePassword"
                    @click="togglePassword"
                  >
                    <i
                      :class="
                        passwordType === 'password'
                          ? 'fa fa-eye'
                          : 'fa fa-eye-slash'
                      "
                    ></i>
                  </button>
                </div>
              </div>
              <div class="form-check mb-3">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="rememberMe"
                />
                <label class="form-check-label" for="rememberMe">Nhớ tôi</label>
              </div>
              <button type="submit" class="btn btn-primary w-100">
                Đăng Nhập
              </button>
              <div v-if="errorMessage" class="alert alert-danger mt-3">
                {{ errorMessage }}
              </div>
              <!-- Hiển thị thông báo lỗi -->
            </form>
          </div>
          <div class="card-footer text-center">
            <a href="#">Quên mật khẩu?</a>
            <p>
              Chưa có tài khoản?
              <span @click="goToSignup" style="cursor: pointer; color: blue"
                >Đăng ký</span
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
import { useStore } from "vuex";
import { useToast } from "vue-toastification"; // Import toastification

export default {
  name: "LoginForm",
  setup() {
    const router = useRouter();
    const store = useStore();
    const toast = useToast(); // Khởi tạo toast
    const email = ref("");
    const password = ref("");
    const passwordType = ref("password");
    const errorMessage = ref("");

    const togglePassword = () => {
      passwordType.value =
        passwordType.value === "password" ? "text" : "password";
    };

    const handleLogin = async () => {
      // Kiểm tra thông tin nhập
      if (!email.value || !password.value) {
        errorMessage.value = "Vui lòng nhập đầy đủ email và mật khẩu.";
        return; // Dừng lại nếu có thông tin chưa nhập
      }

      // Nếu thông tin hợp lệ, thực hiện logic đăng nhập
      try {
        const response = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.value,
            password: password.value,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          // đăng nhập thành công
          toast.success(data.message); // Sử dụng toast để hiển thị thông báo thành công

          // Lưu thông tin vào localStorage
          localStorage.setItem("user", JSON.stringify(data.user)); // data.user là thông tin người dùng trả về từ server
          localStorage.setItem("token", data.token); // Giả sử server trả về token
          // Gọi Vuex để cập nhật trạng thái đăng nhập
          store.dispatch("login", { email: email.value });

          router.push({ name: "Home" }); // Đổi sang route trang chính
        } else {
          errorMessage.value = data.message; // Hiển thị thông báo lỗi từ máy chủ
          toast.error(data.message); // Sử dụng toast để hiển thị thông báo lỗi
        }
      } catch (error) {
        console.error("Error during login:", error);
        errorMessage.value = "Đã có lỗi xảy ra. Vui lòng thử lại.";
        toast.error("Đã có lỗi xảy ra. Vui lòng thử lại."); // Hiển thị thông báo lỗi với toast
      }
    };

    const goToSignup = () => {
      router.push({ name: "Signup" });
    };

    return {
      email,
      password,
      passwordType,
      togglePassword,
      handleLogin,
      goToSignup,
      errorMessage,
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
