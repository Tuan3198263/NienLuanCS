<template>
  <div>
    <!-- Sử dụng component header -->
    <!-- Cập nhật đúng props trong component -->
    <CompanyHeaderInfo
      v-if="selectedCompany && selectedCompany.companyName"
      :companyName="selectedCompany.companyName"
      :companyImage="selectedCompany.companyImage"
      :jobsOpening="selectedCompany.companyJobsOpening"
      :followersCount="selectedCompany.companyFollowersCount"
    />

    <!-- Thông tin khác của công ty -->
    <div class="company-info">
      <!-- Sử dụng component danh sách công việc -->
      <CompanyJobList :jobs="selectedCompany.jobs" />
      <CompanyOffice companyId="companyId" />
      <CompanyStory
        :companyDescription="
          selectedCompany.companyDescription || 'Mô tả công ty không có sẵn'
        "
        :companyImage="
          selectedCompany.companyImage || 'https://placehold.co/80x80'
        "
      />
      <CompanyBenefit />
      <FooterCompany />
    </div>
  </div>
</template>

<script>
import CompanyHeaderInfo from "../components/CompanyHeaderInfo.vue";
import CompanyJobList from "../components/CompanyJobList.vue";
import CompanyOffice from "../components/CompanyOffice.vue";
import CompanyStory from "../components/CompanyStory.vue";
import CompanyBenefit from "../components/CompanyBenefit.vue";
import FooterCompany from "../components/FooterCompany.vue";

export default {
  components: {
    CompanyHeaderInfo,
    CompanyJobList,
    CompanyOffice,
    CompanyStory,
    CompanyBenefit,
    FooterCompany,
  },
  props: {
    companyName: {
      type: String,
      default: "Chưa có tên công ty",
    },
    companyImage: {
      type: String,
      default: "https://placehold.co/80x80",
    },
    jobsOpening: {
      type: Number,
      default: 0,
    },
    followersCount: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      selectedCompany: {},
    };
  },
  created() {
    this.id = this.$route.params.id; // Lấy id từ URL
    this.fetchCompanyData();
  },

  methods: {
    async fetchCompanyData() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/company/${this.id}`
        );
        if (!response.ok) {
          console.error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        this.selectedCompany = data || {};
      } catch (error) {
        console.error("Error fetching company data:", error);
        this.selectedCompany = {};
      }
    },
  },
};
</script>

<style scoped>
.company-info {
  padding: 20px;
  text-align: center;
}
</style>
