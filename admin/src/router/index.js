import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
// 设备分类路由
import DeviceCategoryEdit from '../views/DeviceCategoryEdit.vue'
import DeviceCategoryList from '../views/DeviceCategoryList.vue'
//单位路由
import DeviceUnitEdit from '../views/DeviceUnitEdit.vue'
import DeviceUnitList from '../views/DeviceUnitList.vue'
//设备路由
import ItDeviceEdit from '../views/ItDeviceEdit.vue'
import ItDeviceList from '../views/ItDeviceList.vue'

import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'


Vue.use(VueRouter)

const routes = [
  {path:'/login', name:'login', component:Login},
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      { path: '/deviceCategories/create', component: DeviceCategoryEdit },
      { path: '/deviceCategories/edit/:id', component: DeviceCategoryEdit, props: true },
      { path: '/deviceCategories/list', component: DeviceCategoryList },

      { path: '/deviceUnits/create', component: DeviceUnitEdit },
      { path: '/deviceUnits/edit/:id', component: DeviceUnitEdit, props: true },
      { path: '/deviceUnits/list', component: DeviceUnitList },

      { path: '/itDevices/create', component: ItDeviceEdit },
      { path: '/itDevices/edit/:id', component: ItDeviceEdit, props: true },
      { path: '/itDevices/list', component: ItDeviceList },

      { path: '/admin_users/create', component: AdminUserEdit },
      { path: '/admin_users/edit/:id', component: AdminUserEdit, props: true },
      { path: '/admin_users/list', component: AdminUserList },

    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
