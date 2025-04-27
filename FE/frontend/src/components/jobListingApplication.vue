<template>
  <div class="container">
    <div
      v-for="job in appliedJobs"
      :key="job.jobID"
      class="job-listing d-flex align-items-center justify-content-start"
      style="cursor: pointer"
    >
      <img
        :src="job.jobCompanyLogo || 'https://placehold.co/80x80'"
        alt="Company logo"
        @click="goToJobDetail(job.jobID)"
      />
      <div class="ms-3" @click="goToJobDetail(job.jobID)">
        <div class="job-title">{{ job.jobTitle }}</div>
        <div class="company-name">{{ job.jobCompanyName }}</div>
        <div class="salary">{{ job.jobSalary }}</div>
        <div class="location">{{ job.jobLocation }}</div>
        <div class="updated-date">
          Updated: {{ formatDate(job.jobUpdatedDate) }}
        </div>
        <div class="tags mt-2 d-flex justify-content-start">
          <span
            v-for="(tag, index) in job.jobTags"
            :key="index"
            class="tag-item"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    appliedJobs: {
      type: Array,
      required: true,
    },
  },

  methods: {
    formatDate(date) {
      const options = { year: "numeric", month: "short", day: "numeric" };
      return new Date(date).toLocaleDateString("en-US", options);
    },
    goToJobDetail(jobId) {
      this.$router.push({ name: "JobDetail", params: { id: jobId } });
    },
  },
};
</script>

<style scoped>
.job-listing {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  text-align: left;
  cursor: pointer;
}

.job-listing:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
}

.job-listing img {
  width: 80px;
  height: auto;
  margin-right: 20px;
}

.job-title {
  font-size: 18px;
  font-weight: bold;
}

.company-name {
  color: #666;
}

.salary {
  color: #ff0000;
  font-weight: bold;
}

.location {
  color: #666;
}

.updated-date {
  color: #666;
}

.tags span {
  background-color: #e0e0e0;
  border-radius: 5px;
  padding: 5px 10px;
  margin-right: 5px;
  font-size: 12px;
}

.favorite {
  font-size: 18px;
  color: #666;
}
</style>
