// src/router/authGuard.js
import store from '../store'; // Import store

export function authGuard(to, from, next) {
  const isLoggedIn = store.getters.isLoggedIn; // Lấy trạng thái từ store

  // Kiểm tra nếu người dùng chưa đăng nhập và cố gắng truy cập vào các route cần bảo vệ
  if ((to.name === 'Profile' || to.name === 'JobManager' || to.name === 'CompanyManager') && !isLoggedIn) {
    next({ name: 'Login' }); // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
  } else {
    next(); // Tiếp tục đến route tiếp theo
  }
}
