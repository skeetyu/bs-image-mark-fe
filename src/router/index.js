import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import AppIndex from '../components/home/AppIndex.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'

import UserIndex from '../components/user/Index.vue'

import GraphIndex from '../components/graph/Index.vue'
import GraphPictures from '../components/graph/Pictures.vue'
import GraphUnpublished from '../components/graph/Unpublished.vue'
import GraphUpload from '../components/graph/Upload.vue'

import TaskIndex from '../components/task/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/index',
    children:[
      {
        path: '/index',
        name: 'AppIndex',
        component: AppIndex
      },
      {
        path: '/user',
        name: 'User',
        component: UserIndex
      },
      {
        path: '/graph',
        name: 'Graph',
        component: GraphIndex,
        children:[
          {
            path: '/graph',
            name: 'AllPictures',
            component: GraphPictures
          },
          {
            path: '/graph/unpublished',
            name: 'UnpublishedPictures',
            component: GraphUnpublished
          },
          {
            path: '/graph/upload',
            name: 'UploadPictures',
            component: GraphUpload
          }
        ]
      },
      {
        path: '/task',
        name: 'Task',
        component: TaskIndex
      }
    ]
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
]

const router = new VueRouter({
  routes
})

export default router
