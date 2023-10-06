import Vue from 'vue'
import VueRouter from 'vue-router'
// kasir
import Kasir from '../views/Kasir/KasirHome.vue'
import keranjang from '../views/Kasir/OnGoing.vue'
import Menu from '../views/Kasir/AddMenu.vue'
import Histori from '../views/Kasir/HistoriView.vue'
import Transaksi from '../views/Kasir/TransaksiView.vue'
import Print from '../views/Kasir/NotaVue.vue'

// admin
import admin from '../views/Admin/AdminHome.vue'
import addmeja from '../views/Admin/ManageMeja.vue'
import addmenu from '../views/Admin/ManageMenu.vue'
import adduser from '../views/Admin/ManageUser.vue'
// manager
import manager from '../views/Manager/ManagerHome.vue'
import all from '../views/Manager/AllTransaksi.vue'
import profit from '../views/Manager/ProfitPage.vue'

import login from '../views/LoginPage.vue'
import NotFound from '../views/NotFound.vue'
import SalahAkses from '../views/SalahAkses.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  // kasir
  {
    path: '/kasir',
    name: 'kasirhome',
    component: Kasir,
    meta: {
      requiresAuth: true,
      allowedRoles: ['kasir']
    }
  },
  {
    path: '/keranjang',
    name: 'On going',
    component: keranjang,
    meta: {
      requiresAuth: true,
      allowedRoles: ['kasir']
    }
  },
  {
    path: '/menu',
    name: 'addmenu',
    component: Menu,
    meta: {
      requiresAuth: true,
      allowedRoles: ['kasir']
    }
  },
  {
    path: '/print/:id',
    name: 'histori',
    component: Histori,
    meta: {
      requiresAuth: true,
      allowedRoles: ['kasir']
    }
  },
  {
    path: '/Nota/:id',
    name: 'Nota',
    component: Print,
    meta: {
      requiresAuth: true,
      allowedRoles: ['kasir']
    }
  },
  {
    path: '/transaksi',
    name: 'transaksi',
    component: Transaksi,
    meta: {
      requiresAuth: true,
      allowedRoles: ['kasir']
    }
  },
  // admin
  {
    path: '/admin',
    name: 'admin',
    component: admin,
    meta: {
      requiresAuth: true,
      allowedRoles: ['admin']
    }
  },
  {
    path: '/addmeja',
    name: 'admin',
    component: addmeja,
    meta: {
      requiresAuth: true,
      allowedRoles: ['admin']
    }
  },
  {
    path: '/addmenu',
    name: 'admin',
    component: addmenu,
    meta: {
      requiresAuth: true,
      allowedRoles: ['admin']
    }
  },
  {
    path: '/adduser',
    name: 'admin',
    component: adduser,
    meta: {
      requiresAuth: true,
      allowedRoles: ['admin']
    }
  },
  // manager
  {
    path: '/manager',
    name: 'manager home',
    component: manager,
    meta: {
      requiresAuth: true,
      allowedRoles: ['manager']
    }
  },
  {
    path: '/alltransaksi',
    name: 'all transaksi',
    component: all,
    meta: {
      requiresAuth: true,
      allowedRoles: ['manager']
    }
  },
  
  {
    path: '/profit',
    name: 'profit harian & bulanan',
    component: profit,
    meta: {
      requiresAuth: true,
      allowedRoles: ['manager']
    }
  },
  {
    path: '*',
    component: NotFound
  },
  {
    path: '/forbidden',
    component: SalahAkses
  }

  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router


router.beforeEach((to,form, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  if (requiresAuth) {
    const userRole = localStorage.getItem("role")
    if (!userRole) {
      next({
        path: '/'
      })
    } else {
      if (to.meta.allowedRoles.includes(userRole)) {
        next()
      } else {
        next({
          path: '/forbidden'
        })
      }
    }
  } else {
    next();
  }
})