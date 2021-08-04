import { createRouter, createWebHistory } from 'vue-router'

const Home= ()=>import('../views/home/home.vue')
const Cart= ()=>import('../views/cart/cart.vue')
const Category= ()=>import('../views/category/category.vue')
const User= ()=>import('../views/user/user.vue')
const Detail=()=>import('../views/detail/detail')
const Login=()=>import('../views/login')
const routes = [
  {
    path:'',
    redirect:'/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      keepAlive: true //设置页面是否需要使用缓存
    },
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/user',
    name: 'User',
    component: User
  },

  {
    path: '/category',
    name: 'Category',
    component: Category
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title:'登录页',
      tabbar:true
    }
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: Detail
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  }
  else
  {
    const token = sessionStorage.getItem('token')
    if (!token&&to.name==='Cart') {
      alert('还没登录，请先登录查看！')
      next('/login')

    } else {
      next()
    }

  }})
export default router
