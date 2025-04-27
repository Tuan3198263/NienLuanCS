<template>
  <div class="d-flex">
    <!-- Sidebar -->

    <!-- Main Content -->
    <div class="content flex-grow-1">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Tổng quan</a>
        </div>
      </nav>

      <div class="container mt-4">
        <!-- Tổng quan dữ liệu -->
        <div class="row">
          <!-- Số công ty -->
          <div class="col-md-4">
            <div class="card mb-4">
              <div class="card-header">
                <h4>Số công ty</h4>
              </div>
              <div class="card-body">
                <p>{{ companies.length }} công ty</p>
              </div>
            </div>
          </div>

          <!-- Số nhân viên -->
          <div class="col-md-4">
            <div class="card mb-4">
              <div class="card-header">
                <h4>Số nhân viên</h4>
              </div>
              <div class="card-body">
                <p>{{ employees.length }} nhân viên</p>
              </div>
            </div>
          </div>

          <!-- Số tin tuyển dụng -->
          <div class="col-md-4">
            <div class="card mb-4">
              <div class="card-header">
                <h4>Số tin tuyển dụng</h4>
              </div>
              <div class="card-body">
                <p>{{ jobPosts.length }} tin tuyển dụng</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarAdmin from "../../components/admin/SidebarAdmin.vue"; // Ensure the correct import path

export default {
  components: {
    SidebarAdmin,
  },
  data() {
    return {
      companies: [
        {
          id: 1,
          name: "XYZ Corporation",
          address: "123 Street, City, Country",
          phone: "(123) 456-7890",
          email: "contact@xyz.com",
        },
        {
          id: 2,
          name: "ABC Ltd.",
          address: "456 Road, City, Country",
          phone: "(234) 567-8901",
          email: "contact@abc.com",
        },
      ],
      employees: [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
      ],
      jobPosts: [
        { id: 1, title: "Software Developer" },
        { id: 2, title: "HR Manager" },
      ],
      company: {
        id: null,
        name: "",
        address: "",
        phone: "",
        email: "",
      },
    };
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

@media (max-width: 992px) {
  .content {
    margin-left: 0;
  }
}
</style>
