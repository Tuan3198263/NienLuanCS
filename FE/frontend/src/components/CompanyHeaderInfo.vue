<template>
  <div>
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto justify-content-between w-50">
            <li class="nav-item">
              <a class="nav-link" href="#">
                <i class="fas fa-home"></i>
                Back To Top
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#jobs">
                <i class="fas fa-briefcase"></i>
                Jobs
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#office">
                <i class="fas fa-building"></i>
                Office
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#stories">
                <i class="fas fa-info-circle"></i>
                Stories
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#benefits">
                <i class="fas fa-star"></i>
                Benefits
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <i class="fas fa-share-alt"></i>
                Share
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container-fluid p-0" style="cursor: pointer">
      <img :src="companyImage" alt="Company Logo" class="header-image" />
    </div>

    <div class="company-info">
      <h1>{{ companyName }}</h1>
    </div>

    <div class="jobs-info">
      <p>
        {{ jobsOpening }} Jobs are opening.
        <a href="#"> View all jobs </a>
      </p>
    </div>

    <div class="follow-button">
      <button>
        <i class="fas fa-check"></i>
        Following ({{ followersCount }})
      </button>
    </div>

    <div class="zalo-icon">
      <img alt="Zalo icon" src="https://placehold.co/50x50" />
    </div>
  </div>
</template>

<script>
export default {
  name: "CompanyHeaderInfo",
  props: {
    companyName: {
      type: String,
      required: true,
    },

    companyImage: {
      type: String,
      required: true,
    },
    jobsOpening: {
      type: Number,
      required: true,
    },
    followersCount: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
.header-image {
  width: 100%; /* Dài hết chiều ngang */
  height: 400px; /* Chiều cao cố định */
  object-fit: cover; /* Giữ tỷ lệ ảnh và cắt để vừa với khung */
}
.company-info {
  text-align: center;
  padding: 20px;
}
.company-info img {
  width: 150px;
  height: auto;
}
.company-info h1 {
  font-size: 24px;
  margin-top: 10px;
}
.jobs-info {
  text-align: center;
  padding: 10px;
  background-color: #f1f1f1;
}
.jobs-info a {
  color: #00a2ff;
  text-decoration: none;
}
.jobs-info a:hover {
  text-decoration: underline;
}
.follow-button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.follow-button button {
  background-color: #00a2ff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
}
.follow-button button:hover {
  background-color: #008cdd;
}
.zalo-icon {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>
