<template>
  <div class="container-fuild carousel-container">
    <div class="carousel-wrapper">
      <!-- Carousel -->
      <div id="carouselExampleIndicators" class="carousel slide">
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="3"
            aria-label="Slide 4"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="4"
            aria-label="Slide 5"
          ></button>
        </div>
        <div class="carousel-inner img-slide">
          <div class="carousel-item active">
            <img
              src="../assets/img/carousel/crl1.png"
              class="d-block w-100"
              alt="Slide 1"
            />
            <div
              class="carousel-caption d-flex justify-content-between align-items-center"
            >
              <div class="d-flex align-items-center">
                <img src="../assets/img/company/cpn1.webp" alt="Company Logo" />
                <span class="content-cpn"
                  >SUNTORY PEPSICO VIETNAM BEVERAGE CO., LTD</span
                >
              </div>
              <button class="btn btn-outline-light explore-button">
                Khám phá ngay
              </button>
            </div>
          </div>
          <div class="carousel-item">
            <img
              src="../assets/img/carousel/crl2.png"
              class="d-block w-100"
              alt="Slide 2"
            />
            <div
              class="carousel-caption d-flex justify-content-between align-items-center"
            >
              <div class="d-flex align-items-center">
                <img src="../assets/img/company/cpn2.png" alt="Company Logo" />
                <span class="content-cpn">TECHCOMBANK</span>
              </div>
              <button class="btn btn-outline-light explore-button">
                Khám phá ngay
              </button>
            </div>
          </div>
          <div class="carousel-item">
            <img
              src="../assets/img/carousel/crs3.webp"
              class="d-block w-100"
              alt="Slide 3"
            />
            <div
              class="carousel-caption d-flex justify-content-between align-items-center"
            >
              <div class="d-flex align-items-center">
                <img src="../assets/img/company/cpn3.webp" alt="Company Logo" />
                <span class="content-cpn">BEIERSFORF VIETNAM</span>
              </div>
              <button class="btn btn-outline-light explore-button">
                Khám phá ngay
              </button>
            </div>
          </div>
          <div class="carousel-item">
            <img
              src="../assets/img/carousel/crs4.webp"
              class="d-block w-100"
              alt="Slide 3"
            />
            <div
              class="carousel-caption d-flex justify-content-between align-items-center"
            >
              <div class="d-flex align-items-center">
                <img src="../assets/img/company/cpn4.png" alt="Company Logo" />
                <span class="content-cpn"
                  >BOSCH GLOBAL SOFTWARE TECHNOLOGIES LIMITED</span
                >
              </div>
              <button class="btn btn-outline-light explore-button">
                Khám phá ngay
              </button>
            </div>
          </div>
          <div class="carousel-item">
            <img
              src="../assets/img/carousel/crs5.webp"
              class="d-block w-100"
              alt="Slide 3"
            />
            <div
              class="carousel-caption d-flex justify-content-between align-items-center"
            >
              <div class="d-flex align-items-center">
                <img src="../assets/img/company/cpn5.webp" alt="Company Logo" />
                <span class="content-cpn"
                  >CÔNG TY TNHH DỰ ÁN KIẾN TRÚC TRẮNG</span
                >
              </div>
              <button class="btn btn-outline-light explore-button">
                Khám phá ngay
              </button>
            </div>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
    <!-- Dưới carousel-->
    <div class="container mt-5">
      <!-- Tiêu đề -->
      <div class="row mb-3">
        <div class="col-12">
          <h3 class="text-start">Các công ty hàng đầu</h3>
        </div>
      </div>

      <!-- Các khung chứa công ty -->
      <div class="row">
        <!-- Công ty 1 -->
        <div class="col-md-3">
          <router-link
            :to="{ name: 'CompanyInfo', params: { id: 1 } }"
            class="card d-flex justify-content-center align-items-center"
          >
            <img
              src="../assets/img/4congty/company1.png"
              class="card-img-top"
              alt="Company 1"
            />
            <div class="card-body text-center">
              <h5 class="card-title">FOX COINN INDUSTRIAL</h5>
              <a href="#" class="btn btn-outline-primary">Việc làm</a>
            </div>
          </router-link>
        </div>

        <!-- Công ty 2 -->
        <div class="col-md-3">
          <router-link
            :to="{ name: 'CompanyInfo', params: { id: 2 } }"
            class="card d-flex justify-content-center align-items-center"
          >
            <img
              src="../assets/img/4congty/company2.png"
              class="card-img-top"
              alt="Company 2"
            />
            <div class="card-body text-center">
              <h5 class="card-title">VINUNI</h5>
              <a href="#" class="btn btn-outline-primary">Việc làm</a>
            </div>
          </router-link>
        </div>

        <!-- Công ty 3 -->
        <div class="col-md-3">
          <router-link
            :to="{ name: 'CompanyInfo', params: { id: 3 } }"
            class="card d-flex justify-content-center align-items-center"
          >
            <img
              src="../assets/img/4congty/company3.webp"
              class="card-img-top"
              alt="Company 3"
            />
            <div class="card-body text-center">
              <h5 class="card-title">VINSCHOOL</h5>
              <a href="#" class="btn btn-outline-primary">Việc làm</a>
            </div>
          </router-link>
        </div>

        <!-- Công ty 4 -->
        <div class="col-md-3">
          <router-link
            :to="{ name: 'CompanyInfo', params: { id: 4 } }"
            class="card d-flex justify-content-center align-items-center"
          >
            <img
              src="../assets/img/4congty/company4.webp"
              class="card-img-top"
              alt="Company 4"
            />
            <div class="card-body text-center">
              <h5 class="card-title">CHALEASE</h5>
              <a href="#" class="btn btn-outline-primary">Việc làm</a>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>

  <!-- Ngành trọng điểm -->
  <div class="container mt-3 mt-5">
    <!-- Tiêu đề -->
    <div class="row mb-3">
      <div class="col-6">
        <h3 class="mb-0">Ngành nghề trọng điểm</h3>
      </div>
    </div>

    <!-- Carousel Multi-Item -->
    <div
      id="keyIndustriesCarousel"
      class="carousel slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-inner">
        <!-- Slide 1 -->
        <div class="carousel-item active">
          <div class="row">
            <!-- Job 1 -->
            <div class="col-md-3">
              <div
                class="job-item bg-info-subtle pointer p-3 mb-4 d-flex flex-column align-items-center"
              >
                <div class="job-content text-center">
                  <i class="fa-solid fa-school-flag fa-4x mb-3"></i>
                  <div class="job-title mb-1">KINH DOANH</div>
                  <div class="quanlity-job">500 việc làm</div>
                </div>
              </div>
            </div>

            <!-- Job 2 -->
            <div class="col-md-3">
              <div
                class="job-item bg-info-subtle pointer p-3 mb-4 d-flex flex-column align-items-center"
              >
                <div class="job-content text-center">
                  <i class="fa-solid fa-chalkboard-user fa-4x mb-3"></i>
                  <div class="job-title mb-1">KẾ TOÁN</div>
                  <div class="quanlity-job">500 việc làm</div>
                </div>
              </div>
            </div>

            <!-- Job 3 -->
            <div class="col-md-3">
              <div
                class="job-item bg-info-subtle pointer p-3 mb-4 d-flex flex-column align-items-center"
              >
                <div class="job-content text-center">
                  <i class="fa-solid fa-chalkboard fa-4x mb-3"></i>
                  <div class="job-title mb-1">CNTT</div>
                  <div class="quanlity-job">500 việc làm</div>
                </div>
              </div>
            </div>

            <!-- Job 4 -->
            <div class="col-md-3">
              <div
                class="job-item bg-info-subtle pointer p-3 mb-4 d-flex flex-column align-items-center"
              >
                <div class="job-content text-center">
                  <i class="fa-solid fa-tree fa-4x mb-3"></i>
                  <div class="job-title mb-1">SẢN XUẤT</div>
                  <div class="quanlity-job">500 việc làm</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Slide 2 -->
        <div class="carousel-item">
          <div class="row">
            <!-- Job 6 -->
            <div class="col-md-3">
              <div
                class="job-item bg-info-subtle pointer p-3 mb-4 d-flex flex-column align-items-center"
              >
                <div class="job-content text-center">
                  <i class="fa-solid fa-microphone fa-4x mb-3"></i>
                  <div class="job-title mb-1">TRUYỀN THÔNG</div>
                  <div class="quanlity-job">500 việc làm</div>
                </div>
              </div>
            </div>
            <!-- Job 7 -->
            <div class="col-md-3">
              <div
                class="job-item bg-info-subtle pointer p-3 mb-4 d-flex flex-column align-items-center"
              >
                <div class="job-content text-center">
                  <i class="fa-solid fa-wallet fa-4x mb-3"></i>
                  <div class="job-title mb-1">NGÂN HÀNG</div>
                  <div class="quanlity-job">500 việc làm</div>
                </div>
              </div>
            </div>

            <!-- Job 8 -->
            <div class="col-md-3">
              <div
                class="job-item bg-info-subtle pointer p-3 mb-4 d-flex flex-column align-items-center"
              >
                <div class="job-content text-center">
                  <i class="fa-solid fa-users fa-4x mb-3"></i>
                  <div class="job-title mb-1">NHÂN SỰ</div>
                  <div class="quanlity-job">500 việc làm</div>
                </div>
              </div>
            </div>

            <!-- Job 9 -->
            <div class="col-md-3">
              <div
                class="job-item bg-info-subtle pointer p-3 mb-4 d-flex flex-column align-items-center"
              >
                <div class="job-content text-center">
                  <i class="fa-solid fa-child fa-4x mb-3"></i>
                  <div class="job-title mb-1">GIÁO DỤC</div>
                  <div class="quanlity-job">500 việc làm</div>
                </div>
              </div>
            </div>
            <!-- Job 10 -->
          </div>
        </div>
      </div>

      <!-- Controls for carousel -->
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#keyIndustriesCarousel"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#keyIndustriesCarousel"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>

  <!-- Carousel container -->
  <div class="container mt-5 border rounded-2">
    <!-- Header and "See All" link -->
    <div
      class="row bg-info text-white py-3 justify-content-between align-items-center mb-4 rounded-top-2"
    >
      <div class="col-6">
        <h3 class="mb-0">Việc làm gợi ý</h3>
      </div>
      <div class="col-6 text-end">
        <router-link to="/jobs" class="mt-3 text-white">Xem tất cả</router-link>
      </div>
    </div>

    <!-- Carousel -->
    <div
      id="suggestWorkCarousel"
      class="carousel slide"
      data-bs-ride="carousel"
    >
      <!-- Carousel content -->
      <div class="carousel-inner">
        <div
          class="carousel-item active"
          v-for="(slide, index) in slides"
          :key="index"
        >
          <div class="row">
            <!-- Grid: 2 items on top, 2 items on bottom -->
            <div
              class="col-md-6 mb-4"
              v-for="(job, jobIndex) in slide"
              :key="jobIndex"
            >
              <router-link :to="'/jobs/' + job.jobID" class="job-link">
                <div class="job-item bg-light p-3 rounded-3">
                  <div class="d-flex align-items-center">
                    <div class="job-image me-3">
                      <img
                        :src="job.jobCompanyLogo"
                        alt="Company Logo"
                        class="img-fluid"
                      />
                    </div>
                    <div class="job-content">
                      <h5 class="job-title">{{ job.jobTitle }}</h5>
                      <p class="job-company">{{ job.jobCompanyName }}</p>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Carousel controls -->
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#suggestWorkCarousel"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#suggestWorkCarousel"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>

  <!-- Container chính của khối nội dung và hình ảnh -->
  <div class="container mt-5 border rounded-1">
    <div class="row">
      <!-- Phần bên trái (7 phần) -->
      <div class="col-md-7 d-flex align-items-center">
        <div class="text-content">
          <h2>Thay đổi nghề nghiệp của bạn ngay hôm nay!</h2>
          <p>
            Chúng tôi cung cấp các công cụ và tài nguyên cần thiết để bạn tạo
            một bản CV ấn tượng và thu hút nhà tuyển dụng. Bắt đầu hành trình
            nghề nghiệp của bạn với chúng tôi.
          </p>
          <a href="#" class="btn btn-primary">Tạo CV ngay</a>
        </div>
      </div>

      <!-- Phần bên phải (3 phần) -->
      <div class="col-md-5 d-flex justify-content-end pe-0">
        <div class="image-container pointer">
          <img
            src="../assets/img/cv/cvc.png"
            alt="Tạo CV"
            class="img-fluid rounded-2"
          />
        </div>
      </div>
    </div>
  </div>
  <section class="pt-5 pb-5 mt-3">
    <div class="container">
      <div class="row">
        <div class="col-6">
          <h3 class="mb-3">Báo chí nói gì về Vietnamworks</h3>
        </div>
        <div class="col-6 text-end">
          <button
            class="btn btn-primary mb-3 me-1"
            type="button"
            data-bs-target="#carouselExampleIndicators2"
            data-bs-slide="prev"
          >
            <i class="fa fa-arrow-left"></i>
          </button>
          <button
            class="btn btn-primary mb-3"
            type="button"
            data-bs-target="#carouselExampleIndicators2"
            data-bs-slide="next"
          >
            <i class="fa fa-arrow-right"></i>
          </button>
        </div>
        <div class="col-12">
          <div id="carouselExampleIndicators2" class="carousel slide">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <div class="row">
                  <div class="col-md-4 mb-3">
                    <div class="card">
                      <img
                        class="card-img-top"
                        alt="100%x280"
                        src="../assets/img/newspaper/laodong.png"
                      />
                      <div class="card-body">
                        <h4 class="card-title">Special title treatment</h4>
                        <p class="card-text">
                          With supporting text below as a natural lead-in to
                          additional content.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 mb-3">
                    <div class="card">
                      <img
                        class="img-fluid"
                        style="height: 250px"
                        alt="100%x280"
                        src="../assets/img/newspaper/thanhnien.png"
                      />
                      <div class="card-body">
                        <h4 class="card-title">Special title treatment</h4>
                        <p class="card-text">
                          With supporting text below as a natural lead-in to
                          additional content.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 mb-3">
                    <div class="card">
                      <img
                        class="img-fluid"
                        alt="100%x280"
                        style="height: 250px"
                        src="../assets/img/newspaper/toquoc.png"
                      />
                      <div class="card-body">
                        <h4 class="card-title">Special title treatment</h4>
                        <p class="card-text">
                          With supporting text below as a natural lead-in to
                          additional content.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <div class="row">
                  <div class="col-md-4 mb-3">
                    <div class="card">
                      <img
                        class="img-fluid"
                        alt="100%x280"
                        style="height: 250px"
                        src="../assets/img/newspaper/ldtre.png"
                      />
                      <div class="card-body">
                        <h4 class="card-title">Special title treatment</h4>
                        <p class="card-text">
                          With supporting text below as a natural lead-in to
                          additional content.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 mb-3">
                    <div class="card">
                      <img
                        class="img-fluid"
                        alt="100%x280"
                        style="height: 250px"
                        src="../assets/img/newspaper/vnnet.png"
                      />
                      <div class="card-body">
                        <h4 class="card-title">Special title treatment</h4>
                        <p class="card-text">
                          With supporting text below as a natural lead-in to
                          additional content.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 mb-3">
                    <div class="card">
                      <img
                        class="img-fluid"
                        alt="100%x280"
                        style="height: 250px"
                        src="../assets/img/newspaper/tienphong.png"
                      />
                      <div class="card-body">
                        <h4 class="card-title">Special title treatment</h4>
                        <p class="card-text">
                          With supporting text below as a natural lead-in to
                          additional content.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      jobs: [],
    };
  },
  computed: {
    // Chia các công việc thành các slide với 4 công việc mỗi slide (2 trên, 2 dưới)
    slides() {
      const slideSize = 4;
      let slides = [];
      for (let i = 0; i < this.jobs.length; i += slideSize) {
        slides.push(this.jobs.slice(i, i + slideSize));
      }
      return slides;
    },
  },
  mounted() {
    // Giả lập việc lấy dữ liệu từ API
    this.fetchJobData();
  },
  methods: {
    // Lấy dữ liệu công việc từ API
    async fetchJobData() {
      try {
        const response = await fetch("http://localhost:3000/api/jobs");
        const data = await response.json();
        this.jobs = data; // Lưu dữ liệu vào jobs
      } catch (error) {
        console.error("Failed to fetch job data:", error);
      }
    },
  },
};
</script>

<style scoped>
/* CSS cho carousel */
@import "../assets/CSS/crl_container.css";

/* Các style cho carousel và công việc */
/* Các style cho carousel và công việc */
/* Các style cho carousel và công việc */
.job-link {
  text-decoration: none; /* Không gạch chân link */
}

.job-item {
  display: flex;
  flex-direction: column;
  height: 180px;
  margin-bottom: 20px;
  cursor: pointer; /* Chuyển con trỏ thành pointer khi hover */
  border-radius: 8px;
  transition: transform 0.3s ease; /* Hiệu ứng chuyển động khi hover */
}

.job-item:hover {
  transform: scale(1.05); /* Phóng to nhẹ khi hover */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Tạo bóng khi hover */
}

.job-image {
  width: 180px; /* Điều chỉnh kích thước logo */
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 10px;
}

.job-content {
  flex: 1;
  padding-left: 10px;
}

.job-title,
.job-company {
  white-space: nowrap; /* Ngắt dòng chữ nếu quá dài */
  overflow: hidden;
  text-overflow: ellipsis; /* Hiển thị dấu "..." khi văn bản dài */
  max-width: 180px; /* Đặt chiều rộng tối đa cho tên công việc và công ty */
}

.carousel-item .row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.carousel-item .col-md-6 {
  display: flex;
  justify-content: center;
  padding-left: 0;
  padding-right: 0;
}

.carousel-item .job-item {
  width: 100%; /* Chiếm hết chiều rộng của từng cột */
  margin-bottom: 20px; /* Khoảng cách giữa các item */
}
</style>
