import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Main from '../views/Main.vue'

import DeviceCategoryEdit from '../views/DeviceCategoryEdit.vue'
import DeviceCategoryList from '../views/DeviceCategoryList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      { path: '/deviceCategories/create', component: DeviceCategoryEdit },
      { path: '/deviceCategories/edit/:id', component: DeviceCategoryEdit, props: true },
      { path: '/deviceCategories/list', component: DeviceCategoryList },
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
