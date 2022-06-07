import Vue from 'vue'
import VueRouter from 'vue-router'
import Axios  from 'axios'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import MainView from '../views/MainView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',

    component: RegisterView
  },
  {
    path: '/main',
    name: 'main',
    meta:{auth:true},
    component: MainView
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
//ตรวจสอบสิทธิ์การเข้าถึง
router.beforeEach((to,from,next)=>{
  //console.log(to.meta);
  if(!to.meta.auth) return next();
  // Axios.get("api/users/profile")
  //เรียกข้อมูลผ่า Store แทน
  router.app.$store.dispatch("get_data_user")
  .then(()=> next())
  .catch(()=> next({path:'/'}))
  // console.log(router.app.$store);
})

export default router
