
        // Script ẩn/hiện mật khẩu
const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');

togglePassword.addEventListener('click', function (e) {
    // Toggle type giữa password và text
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);

            // Toggle icon mắt
    this.querySelector('i').classList.toggle('fa-eye');
    this.querySelector('i').classList.toggle('fa-eye-slash');
});


// login.js
$(document).ready(function () {
  $('form').on('submit', async function (e) {
    e.preventDefault(); // Ngăn chặn gửi biểu mẫu mặc định

    // Lấy giá trị từ các trường
    const firstName = $('#firstName').val();
    const lastName = $('#lastName').val();
    const phone = $('#phone').val();
    const email = $('#email').val();
    const password = $('#password').val();

    // Gửi yêu cầu POST đến API đăng ký
    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Hiển thị thông báo thành công
        alert(data.message);
        // Có thể chuyển hướng người dùng đến trang đăng nhập hoặc trang khác
        window.location.href = 'login.html';
      } else {
        // Hiển thị thông báo lỗi
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Đã xảy ra lỗi khi đăng ký');
    }
  });
});

    

        