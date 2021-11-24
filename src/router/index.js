import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import AppIndex from '../components/home/AppIndex.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'

import UserIndex from '../components/user/User.vue'

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
        component: UserIndex,
        meta: { requireAuth: true }
      },
      {
        path: '/graph',
        name: 'Graph',
        component: GraphIndex,
        meta: { requireAuth: true },
        children:[
          {
            path: '/graph',
            name: 'AllPictures',
            component: GraphPictures,
            meta: { requireAuth: true }
          },
          {
            path: '/graph/unpublished',
            name: 'UnpublishedPictures',
            component: GraphUnpublished,
            meta: { requireAuth: true }
          },
          {
            path: '/graph/upload',
            name: 'UploadPictures',
            component: GraphUpload,
            meta: { requireAuth: true }
          }
        ]
      },
      {
        path: '/task',
        name: 'Task',
        component: TaskIndex,
        meta: { requireAuth: true }
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
