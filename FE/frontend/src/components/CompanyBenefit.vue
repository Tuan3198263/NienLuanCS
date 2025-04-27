<template>
  <div class="container mt-5 benefits-section" id="benefits">
    <div class="title">
      <h2>Our Benefits</h2>
      <hr />
    </div>
    <div class="row">
      <div class="col-md-4" v-for="benefit in benefits" :key="benefit.id">
        <div class="card benefit-card" style="cursor: pointer">
          <div class="icon">
            <i :class="benefit.icon"></i>
          </div>
          <h5>{{ benefit.title }}</h5>
          <p>{{ benefit.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      benefits: [
        {
          id: 1,
          icon: "fas fa-dollar-sign",
          title: "BONUS",
          description:
            "Thử việc 2 tháng nhận 100% lương trong thời gian thử việc",
        },
        {
          id: 2,
          icon: "fas fa-user-md",
          title: "BHXH, BHYT, BHTN",
          description: "Đóng BHYT, BHXH ngay trong tháng đầu nhận việc",
        },
        {
          id: 3,
          icon: "fas fa-graduation-cap",
          title: "ĐÀO TẠO",
          description: "Cơ hội đi đào tạo/làm việc tại Foxconn Trung Quốc,...",
        },
        {
          id: 4,
          icon: "fas fa-book",
          title: "ĐÀO TẠO",
          description:
            "Cơ hội đi học Thạc sỹ tại Đài Loan miễn phí với tổng chi phí công ty hỗ trợ",
        },
        {
          id: 5,
          icon: "fas fa-car",
          title: "THƯỞNG",
          description:
            "Thưởng các dịp lễ, Tết, đánh giá mức thưởng linh hoạt theo năng lực",
        },
        {
          id: 6,
          icon: "fas fa-laptop",
          title: "NGHỈ PHÉP",
          description: "Nghỉ phép hưởng lương 12 ngày/ năm và các phúc lợi...",
        },
      ],
    };
  },
};
</script>

<style scoped>
body {
  background-color: #e9eff2;
  font-family: "Arial", sans-serif;
}
.benefits-section {
  text-align: center;
  padding: 50px 0;
}
.benefits-section h2 {
  font-size: 36px;
  margin-bottom: 20px;
  position: relative;
  display: inline-block;
}
.benefits-section h2::after {
  content: "";
  display: block;
  width: 100px;
  height: 3px;
  background-color: #00aaff;
  margin: 10px auto 0;
}
.benefit-card {
  background-color: #fff;
  border: none;
  border-radius: 8px;
  padding: 30px;
  margin: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.benefit-card .icon {
  font-size: 50px;
  color: #00aaff;
  margin-bottom: 20px;
}
.benefit-card h5 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}
.benefit-card h5::after {
  content: "";
  display: block;
  width: 30px;
  height: 2px;
  background-color: #00aaff;
  margin: 10px auto 0;
}
.benefit-card p {
  font-size: 14px;
  color: #666;
}
</style>
