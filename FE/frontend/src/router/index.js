import { createRouter, createWebHistory } from 'vue-router';
import Signup from '../views/Signup.vue'; // Đảm bảo đường dẫn chính xác
import Login from '../views/Login.vue'; // Đảm bảo đường dẫn chính xác
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue';
import CompanyInfo  from '../views/CompanyInfo.vue';
import AllJob from '../views/AllJob.vue'
import NotFound from '../views/NotFound.vue';
import JobDetail from '../views/JobDetail.vue'; // Import JobDetail component
import CompanyManager from '../views/CompanyManager.vue';
import JobManager from '../views/JobManager.vue';
import SidebarAdmin from '../components/admin/SidebarAdmin.vue';
import AdminPage from '../views/admin/AdminPage.vue';
import AdminCompany from '../components/admin/AdminCompany.vue';
import Dashboard from '../components/admin/Dashboard.vue';
import JobPost from '../components/admin/JobPost.vue';
import JobApplications from '../components/admin/JobApplications.vue';
import AdminProfile from '../components/admin/AdminProfile.vue'

import { authGuard } from './authGuard'; // Import authGuard




const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },

   {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
   {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/company-info/:id',
    name: 'CompanyInfo',
    component: CompanyInfo,
    props: true, // Đảm bảo rằng props được truyền từ route
  },
  {
    path: '/jobs',
    name: 'AllJob',
    component: AllJob
  },

   {
    path: '/jobs/:id', // Đường dẫn động, có thể chứa id công việc
    name: 'JobDetail',
    component: JobDetail,
    props: true, // Cho phép truyền props
  },

  {
    path: '/company-manager',
    name: 'CompanyManager',
    component: CompanyManager
  },

  {
    path: '/job-manager',
    name: 'JobManager',
    component: JobManager
  },



  //router test
  {
    path: '/test',
    name: 'Test',
    component: () => import('../components/NotificationDropdown.vue'), // Đảm bảo bạn đã cung cấp component
  },


  
  {
    path: '/:catchAll(.*)', // Bắt bất kỳ đường dẫn nào không hợp lệ
    name: 'NotFound',
    component: NotFound, // Component hiển thị trang không tìm thấy
  },

   {
    path: '/admin',
    name: 'AdminPage',
    component: AdminPage,
    children: [
      {
        path: 'cong-ty',  // Khi đường dẫn là '/admin/company'
        name: 'AdminCompany',  // Đặt tên route cho việc dễ dàng điều hướng
        component: AdminCompany,  // Component sẽ được hiển thị
      },
      {
        path: 'tong-quan',  // Khi đường dẫn là '/admin/company'
        name: 'Dashboard',  // Đặt tên route cho việc dễ dàng điều hướng
        component: Dashboard,  // Component sẽ được hiển thị
      },
       {
        path: 'tin-tuyen-dung',  // Khi đường dẫn là '/admin/company'
        name: 'JobPost',  // Đặt tên route cho việc dễ dàng điều hướng
        component: JobPost,  // Component sẽ được hiển thị
      },
      {
        path: 'don-tuyen-dung',  // Khi đường dẫn là '/admin/company'
        name: 'JobApplications',  // Đặt tên route cho việc dễ dàng điều hướng
        component: JobApplications,  // Component sẽ được hiển thị
      },
       {
        path: 'ho-so',  // Khi đường dẫn là '/admin/company'
        name: 'AdminProfile',  // Đặt tên route cho việc dễ dàng điều hướng
        component: AdminProfile,  // Component sẽ được hiển thị
      },
    ],
  },

  
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});


// Sử dụng authGuard
router.beforeEach(authGuard);




export default router;
