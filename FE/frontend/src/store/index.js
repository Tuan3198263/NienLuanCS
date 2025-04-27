// store/index.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    isLoggedIn: !!localStorage.getItem('user'), // Khôi phục trạng thái từ localStorage
    user: JSON.parse(localStorage.getItem('user')), // Khôi phục thông tin người dùng
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      state.isLoggedIn = !!user; // Cập nhật trạng thái đăng nhập
    },
    LOGOUT(state) {
      state.user = null;
      state.isLoggedIn = false; // Đánh dấu đã đăng xuất
    },
  },
  actions: {
    login({ commit }, user) {
      commit('SET_USER', user);
      localStorage.setItem('user', JSON.stringify(user)); // Lưu trữ thông tin người dùng vào localStorage
    },
    logout({ commit }) {
      localStorage.removeItem('user'); // Xóa thông tin người dùng khỏi localStorage
      commit('LOGOUT'); // Gọi mutation LOGOUT
    },
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    getUser: (state) => state.user,
  },

});
