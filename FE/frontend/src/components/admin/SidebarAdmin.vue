<template>
  <div class="sidebar pe-4 pb-3">
    <nav class="navbar bg-light navbar-light">
      <!-- Logo and Profile -->
      <a href="index.html" class="navbar-brand mx-4 mb-3">
        <h3 class="text-primary">
          <i class="fa fa-briefcase me-2"></i>Tuan Le
        </h3>
      </a>

      <!-- User Info -->
      <div class="d-flex align-items-center ms-4 mb-4">
        <div class="position-relative">
          <img
            class="rounded-circle"
            src="../../assets/img/yahiko.jpg"
            alt=""
            style="width: 40px; height: 40px"
          />
          <div
            class="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"
          ></div>
        </div>
        <div class="ms-3">
          <h6 class="mb-0">Tuan Le</h6>
          <span>Quản trị viên</span>
        </div>
      </div>

      <!-- Navigation Links -->
      <div class="navbar-nav w-100">
        <router-link
          to="/admin/tong-quan"
          class="nav-item nav-link"
          exact
          active-class="router-link-active"
        >
          <i class="fa fa-users me-2"></i>Tổng quan
        </router-link>

        <router-link
          to="/admin/cong-ty"
          class="nav-item nav-link"
          active-class="router-link-active"
        >
          <i class="fa fa-briefcase me-2"></i>Công ty
        </router-link>

        <router-link
          to="/admin/tin-tuyen-dung"
          class="nav-item nav-link"
          active-class="router-link-active"
        >
          <i class="fa fa-users me-2"></i>Tin tuyển dụng
        </router-link>

        <router-link
          to="/admin/don-tuyen-dung"
          class="nav-item nav-link"
          active-class="router-link-active"
        >
          <i class="fa fa-file-alt me-2"></i>Đơn tuyển dụng
        </router-link>

        <router-link
          to="/admin/ho-so"
          class="nav-item nav-link"
          active-class="router-link-active"
        >
          <i class="fa fa-building me-2"></i>Hồ sơ
        </router-link>

        <router-link
          to="/"
          class="nav-item nav-link"
          active-class="router-link-active"
        >
          <i class="fa fa-house me-2"></i>Trang chủ
        </router-link>
      </div>
    </nav>
  </div>
</template>
<style scoped>
/* Root variables */
:root {
  --primary: #009cff;
  --light: #f3f6f9;
  --dark: #191c24;
}

/* Sidebar Styling */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100vh;
  background: var(--light);
  overflow-y: auto;
  transition: 0.5s;
  z-index: 999;
  padding: 0;
}

html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

/* Navbar styles */
.navbar {
  padding: 0;
}

/* User Info Section */
.sidebar .d-flex {
  display: flex;
  align-items: center;
}

.sidebar .d-flex img {
  width: 40px;
  height: 40px;
}

.sidebar .navbar .navbar-nav .nav-link {
  padding: 7px 20px;
  color: var(--dark);
  font-weight: 500;
  border-left: 3px solid var(--light);
  border-radius: 0 30px 30px 0;
  outline: none;
  display: flex;
  align-items: center;
}

.sidebar .navbar .navbar-nav .nav-link i {
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border-radius: 50%;
}

/* Hover and Active States */
.sidebar .navbar .navbar-nav .nav-link:hover,
.sidebar .navbar .navbar-nav .nav-link.active {
  color: var(--primary);
  background: #ffffff;
  border-color: var(--primary);
}

.sidebar .navbar .navbar-nav .nav-link:hover i,
.sidebar .navbar .navbar-nav .nav-link.active i {
  background: var(--light);
}

/* Responsive Design for Sidebar */
@media (min-width: 992px) {
  .sidebar {
    margin-left: 0;
  }

  .sidebar.open {
    margin-left: -250px;
  }

  .content {
    width: calc(100% - 250px);
  }

  .content.open {
    width: 100%;
    margin-left: 0;
  }
}

@media (max-width: 991.98px) {
  .sidebar {
    margin-left: -250px;
  }

  .sidebar.open {
    margin-left: 0;
  }

  .content {
    width: 100%;
    margin-left: 0;
  }
}

/* Active Route Styling */
.router-link-active {
  color: #28a745;
  background: #e9f7ef;
  border-color: #28a745;
}
</style>
