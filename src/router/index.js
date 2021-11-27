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

import TaskIndex from '../components/task/Index.vue'
import Tasks from '../components/task/Tasks.vue'
import TaskPrepared from '../components/task/Prepared.vue'
import Workbench from '../components/task/Workbench.vue'

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
          }
        ]
      },
      {
        path: '/task',
        name: 'Task',
        component: TaskIndex,
        meta: { requireAuth: true },
        children:[
          {
            path: '/task',
            name: 'AllTasks',
            component: Tasks,
            meta: { requireAuth: true }
          },
          {
            path: '/task/prepared',
            name: 'PreparedTasks',
            component: TaskPrepared,
            meta: { requireAuth: true }
          },
          {
            path: '/task/workbench',
            name: 'Workbench',
            component: Workbench,
            meta: { requireAuth: true }
          }
        ]
      }
    ]
  },
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
