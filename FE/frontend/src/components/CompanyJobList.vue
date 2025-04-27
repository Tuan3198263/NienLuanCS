<template>
  <div id="jobs">
    <div
      v-if="
        selectedCompany &&
        selectedCompany.jobs &&
        selectedCompany.jobs.length > 0
      "
    >
      <JobListing :jobs="selectedCompany.jobs" />
    </div>
  </div>
</template>
<script>
import { onMounted, ref } from "vue"; // Import onMounted và ref từ vue
import { useRoute } from "vue-router"; // Nhập useRoute để lấy params
import JobListing from "../components/JobListing.vue";

export default {
  components: {
    JobListing,
  },
  setup() {
    const route = useRoute(); // Sử dụng useRoute để truy cập thông tin route
    const companyId = Number(route.params.id); // Lấy ID từ params và chuyển đổi sang Number
    const selectedCompany = ref({ jobs: [] }); // Mặc định có mảng jobs rỗng

    // Fetch công ty từ API khi component được mount
    const fetchCompany = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/jobs/company/${companyId}`
        );
        if (!response.ok) {
          throw new Error("Không tìm thấy công ty.");
        }
        const jobs = await response.json(); // Dữ liệu trả về là các công việc
        console.log("Company Data:", jobs); // Log dữ liệu nhận được

        // Kiểm tra dữ liệu trả về là mảng công việc
        if (Array.isArray(jobs)) {
          selectedCompany.value.jobs = jobs; // Gán công việc vào selectedCompany
        } else {
          selectedCompany.value.jobs = []; // Nếu không có công việc
        }
      } catch (error) {
        console.error("Error fetching company jobs:", error);
        selectedCompany.value.jobs = []; // Set jobs rỗng khi có lỗi
      }
    };

    // Gọi hàm fetchCompany khi component được mount
    onMounted(() => {
      fetchCompany();
    });

    // Trả về selectedCompany để sử dụng trong template
    return { selectedCompany };
  },
};
</script>
