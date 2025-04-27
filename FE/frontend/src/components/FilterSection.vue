<template>
  <div
    class="filter-section d-flex justify-content-between align-items-center mb-2 p-2"
  >
    <div>
      <!-- Dropdown ngành nghề -->
      <div class="btn-group">
        <button
          class="btn btn-outline-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ selectedJobIndustry ? selectedJobIndustry : "Ngành nghề" }}
        </button>
        <ul class="dropdown-menu">
          <li v-for="(industry, index) in jobIndustries" :key="index">
            <a
              class="dropdown-item"
              href="#"
              @click="selectJobIndustry(industry)"
            >
              {{ industry }}
            </a>
          </li>
        </ul>
      </div>

      <!-- Dropdown lĩnh vực -->
      <div class="btn-group">
        <button
          class="btn btn-outline-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ selectedJobField ? selectedJobField : "Lĩnh vực" }}
        </button>
        <ul class="dropdown-menu">
          <li v-for="(field, index) in jobFields" :key="index">
            <a class="dropdown-item" href="#" @click="selectJobField(field)">
              {{ field }}
            </a>
          </li>
        </ul>
      </div>

      <!-- Tuyển gấp và Xóa nút -->
      <button
        class="btn btn-outline-secondary"
        type="button"
        @click="clearFilter"
      >
        Xóa
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    // Khởi tạo các danh sách ngành nghề và lĩnh vực
    const jobIndustries = ref([
      "Khoa học máy tính",
      "Phát triển phần mềm",
      "Sư phạm",
      "Quảng cáo",
      "Quản lí",
      "Bảo hiểm",
      "Quan hệ công chúng",
      "Phát triển Website",
      "Kế toán",
    ]);

    const jobFields = ref([
      "Giáo dục",
      "Công nghệ thông tin",
      "Y tế",
      "Tài chính",
      "Marketing",
      "Xây dựng",
    ]);

    // Lưu trữ ngành nghề và lĩnh vực đã chọn
    const selectedJobIndustry = ref(null);
    const selectedJobField = ref(null);

    // Các phương thức xử lý khi chọn ngành nghề và lĩnh vực
    const selectJobIndustry = (industry) => {
      selectedJobIndustry.value = industry;
      console.log("Ngành nghề đã chọn:", industry);
      emitFilterUpdate();
    };

    const selectJobField = (field) => {
      selectedJobField.value = field;
      console.log("Lĩnh vực đã chọn:", field);
      emitFilterUpdate();
    };

    // Phương thức xóa bộ lọc
    const clearFilter = () => {
      selectedJobIndustry.value = null;
      selectedJobField.value = null;
      console.log("Bộ lọc đã được xóa");
      emitFilterUpdate();
    };

    // Emit thông tin bộ lọc thay đổi sang URL
    const emitFilterUpdate = () => {
      router.push({
        query: {
          jobIndustry: selectedJobIndustry.value,
          jobField: selectedJobField.value,
        },
      });
    };

    return {
      jobIndustries,
      jobFields,
      selectedJobIndustry,
      selectedJobField,
      selectJobIndustry,
      selectJobField,
      clearFilter,
    };
  },
};
</script>

<style scoped>
.filter-section {
  background-color: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Thêm đổ bóng cho toàn bộ khung */
}

.filter-section .btn {
  margin-right: 10px;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
  width: auto; /* Điều chỉnh chiều rộng của button để phù hợp với nội dung */
}

.filter-section .btn-outline-secondary {
  color: #333;
  border-color: #333;
}

.filter-section .btn-outline-secondary:hover {
  background-color: #333;
  color: #fff;
}

.filter-section .btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.filter-section .btn-primary:hover {
  background-color: #0056b3;
  border-color: #004085;
}

.filter-section .dropdown-toggle {
  min-width: 150px;
  text-align: center;
}

.filter-section .dropdown-menu {
  border-radius: 6px;
  border: 1px solid #ccc;
}

.filter-section .dropdown-item {
  padding: 10px 20px;
}

.filter-section .dropdown-item:hover {
  background-color: #007bff;
  color: white;
}

.filter-section .btn-outline-secondary {
  color: #6c757d;
  border-color: #6c757d;
}

.filter-section .btn-outline-secondary:hover {
  background-color: #6c757d;
  color: white;
}

@media (max-width: 768px) {
  .filter-section {
    flex-wrap: wrap;
  }

  .filter-section .btn {
    margin-bottom: 10px;
    width: 100%;
  }
}
.dropdown-menu {
  max-height: 200px; /* Giới hạn chiều cao của dropdown */
  overflow-y: auto; /* Thêm thanh cuộn dọc khi nội dung vượt quá chiều cao */
}
</style>
