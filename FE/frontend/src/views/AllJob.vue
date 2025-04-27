<template>
  <HeaderComponent />
  <div class="container mt-4">
    <FilterSection />
    <div class="">
      <div class="mb-3"></div>
      <RelatedKeywords :keywords="keywords" />
    </div>
    <SortSection />
    <div class="row">
      <div class="col-md-8">
        <JobCard
          v-for="job in jobs"
          :key="job.id"
          :jobTitle="job.title"
          :companyName="job.company"
          :salary="job.salary"
          :location="job.location"
          :tags="job.tags"
          :isNew="job.isNew"
          :isUrgent="job.isUrgent"
          :companyLogo="job.logo"
          :date="job.date"
        />
      </div>
      <div class="col-md-4">
        <AdSection />
      </div>
    </div>
  </div>
  <FooterCompany />
</template>

<script>
import HeaderComponent from "../components/Header.vue";
import FilterSection from "../components/FilterSection.vue";
import SortSection from "../components/SortSection.vue";
import JobCard from "../components/JobCard.vue";
import RelatedKeywords from "../components/RelateKeywords.vue";
import AdSection from "../components/AdSection.vue";
import FooterCompany from "../components/FooterCompany.vue";

export default {
  components: {
    HeaderComponent,
    FilterSection,
    SortSection,
    JobCard,
    RelatedKeywords,
    AdSection,
    FooterCompany,
  },
  data() {
    return {
      keywords: [
        "Kinh Doanh",
        "Tiếng Anh",
        "Chăm Sóc Khách Hàng",
        "AutoCAD",
        "IT",
        "...",
      ],
      jobs: [
        {
          id: "",
          title: "",
          company: "",
          salary: "",
          location: "",
          tags: [""],
          isNew: true,
          isUrgent: true,
          logo: "",
          date: "",
        },
        // Add more jobs here
      ],
    };
  },
};
</script>
