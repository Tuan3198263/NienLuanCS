
// login.js

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






document.querySelector('form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            window.location.href = 'trangchu.html';
            // Có thể chuyển hướng đến trang khác hoặc làm gì đó khác sau khi đăng nhập thành công
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('Đã có lỗi xảy ra. Vui lòng thử lại.');
    }
});
