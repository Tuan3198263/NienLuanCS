<template>
  <div class="notification-dropdown" v-if="showDropdown" ref="dropdown">
    <div class="notification-header">Thông báo</div>
    <ul class="notification-list">
      <li
        v-for="(notification, index) in notifications"
        :key="index"
        class="notification-item"
        @click="selectNotification(notification)"
      >
        <div class="notification-message">
          {{ notification.message }}
        </div>
        <div class="notification-footer">
          <div class="notification-date">
            {{ formatDate(notification.createdAt) }}
            <!-- Hiển thị ngày bên phải -->
          </div>
        </div>
      </li>
    </ul>
    <div v-if="notifications.length === 0" class="no-notifications">
      Không có thông báo
    </div>

    <!-- Form hiển thị chi tiết thông báo -->
  </div>
  <div v-if="selectedNotification" class="notification-detail">
    <div class="detail-header">Chi tiết thông báo</div>
    <div class="detail-content">
      <p><strong>Thông báo:</strong> {{ selectedNotification.message }}</p>
      <p>
        <strong>Ngày thông báo:</strong>
        {{ formatDate(selectedNotification.createdAt) }}
      </p>
    </div>
    <button @click="closeDetail" class="close-detail-btn">Đóng</button>
  </div>
</template>

<script>
import { onClickOutside } from "@vueuse/core";
import { ref, onMounted, watch } from "vue";

export default {
  name: "NotificationDropdown",
  props: {
    showDropdown: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { emit }) {
    const notifications = ref([]);
    const selectedNotification = ref(null); // Lưu thông báo đã chọn
    const dropdownRef = ref(null);

    // Hàm để tải thông báo từ API bằng fetch
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/notifications/user/notifications",
          {
            method: "GET", // GET request
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Nếu cần token cho auth
            },
          }
        );

        // Kiểm tra nếu phản hồi là OK (status 200-299)
        if (!response.ok) {
          throw new Error("Lỗi khi lấy thông báo");
        }

        const data = await response.json();
        notifications.value = data.notifications; // Giả sử dữ liệu trả về là một đối tượng với trường notifications
      } catch (error) {
        console.error("Lỗi khi lấy thông báo:", error);
      }
    };

    // Đảm bảo chỉ đóng khi người dùng click ngoài dropdown
    const toggleDropdown = () => {
      emit("update:showDropdown", !props.showDropdown);
    };

    // Đảm bảo dropdown chỉ đóng khi click ngoài vùng dropdown
    onClickOutside(dropdownRef, () => {
      if (props.showDropdown && !selectedNotification.value) {
        emit("update:showDropdown", false);
      }
    });

    // Lấy thông báo khi component được mount
    onMounted(() => {
      if (props.showDropdown) {
        fetchNotifications();
      }
    });

    // Hàm khi người dùng click vào thông báo
    const selectNotification = (notification) => {
      selectedNotification.value = notification; // Cập nhật thông báo đã chọn
    };

    // Hàm định dạng ngày giờ (tùy vào định dạng ngày trong dữ liệu)
    const formatDate = (date) => {
      const d = new Date(date);
      return `${d.getDate()}/${
        d.getMonth() + 1
      }/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
    };

    // Đóng form chi tiết thông báo
    const closeDetail = () => {
      selectedNotification.value = null; // Đặt lại thông báo đã chọn
    };

    return {
      notifications,
      selectedNotification,
      toggleDropdown,
      selectNotification,
      formatDate,
      closeDetail,
      dropdownRef,
    };
  },
};
</script>

<style scoped>
/* Các kiểu dáng không thay đổi */
.notification-dropdown {
  position: absolute;
  top: 60px;
  right: 20px;
  width: 350px;
  background-color: #ffffff;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 9999;
  overflow: hidden;
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.notification-header {
  background-color: #4caf50;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  padding: 12px;
  text-align: center;
  border-bottom: 1px solid #ddd;
  border-radius: 8px 8px 0 0;
}

.notification-list {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 250px;
  overflow-y: auto;
}

.notification-item {
  padding: 12px;
  border-bottom: 1px solid #f1f1f1;
  background-color: #fafafa;
  color: #333;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.notification-item:hover {
  background-color: #e0f7e0;
}

.notification-message {
  font-weight: bold;
  margin-bottom: 5px;
}

.notification-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #ddd;
  padding-top: 5px;
}

.notification-date {
  font-size: 14px;
  font-weight: bold; /* In đậm ngày giờ */
  color: #4caf50;
}

.no-notifications {
  padding: 15px;
  text-align: center;
  color: #888;
  font-size: 16px;
}

.notification-detail {
  padding: 30px; /* Tăng khoảng cách padding */
  background-color: #f9f9f9;
  border-radius: 8px;
  width: 500px; /* Tăng kích thước của form */
  max-width: 90%;
  position: fixed; /* Đặt form cố định */
  top: 50%; /* Đặt form ở giữa màn hình theo chiều dọc */
  left: 50%; /* Đặt form ở giữa màn hình theo chiều ngang */
  transform: translate(-50%, -50%); /* Căn giữa hoàn toàn */
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1); /* Thêm bóng đổ */
  z-index: 10000; /* Đảm bảo form nằm trên cùng */
  background-color: white; /* Đặt nền màu trắng */
  max-height: 80vh; /* Giới hạn chiều cao của form */
  overflow-y: auto; /* Cuộn khi nội dung quá dài */
}

.detail-header {
  font-size: 22px; /* Tăng kích thước chữ cho tiêu đề */
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.detail-content {
  font-size: 18px; /* Tăng kích thước chữ cho nội dung */
  color: #333;
}

.close-detail-btn {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.close-detail-btn:hover {
  background-color: #45a049;
}
</style>
