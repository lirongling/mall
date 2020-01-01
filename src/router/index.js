import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home'
import Comm from '../views/Comm.vue'
Vue.use(VueRouter)

const routes = [{
        path: '/home',
        // 重定向
        redirect: '/'
    },
    {
        path: "/",
        component: Comm,
        children: [{
            path: '/',
            name: "home",
            component: Home,
            meta: {
                title: '首页'
            }
        }],
    },
    {
        path: "/my",
        component: Comm,
        children: [{
            path: '/',
            name: "my",
            component: () =>
                import ( /* webpackChunkName: "about" */ '../views/My/My'),
            meta: {
                title: '我的'
            }
        }],
    },
    {
        path: "/category",
        component: Comm,
        children: [{
            path: '/',
            name: "category",
            component: () =>
                import ( /* webpackChunkName: "about" */ '../views/Categorty/Category'),
            meta: {
                title: '分类'
            }
        }],
    },
    {
        path: "/shoppingCar",
        component: Comm,
        children: [{
            path: '/',
            name: "shoppingCar",
            component: () =>
                import ( /* webpackChunkName: "about" */ '../views/ShoppingCar/ShoppingCar'),
            meta: {
                title: '分类'
            }
        }],
    },
    {
        path: '*',
        name: 'err',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Err'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Login/Login'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/phoneLogin',
        name: 'phoneLogin',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Login/PhoneLogin'),
        meta: {
            title: '手机号登录'
        }
    },
    {
        path: '/register',
        name: 'register',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Login/Register'),
        meta: {
            title: '手机号登录'
        }
    },
    {
        path: '/details',
        name: 'details',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Details/Details'),
        meta: {
            title: '商品详情'
        }
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})


router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    let loginMsg = localStorage.getItem('loginMsg')
        // if (to.path==='/login')
        //     next()
        // else
        //     loginMsg ? next():next('/login')
        // if (to.path==='/edit'||to.path==='/look') {
        //     let a=to.query._id
        //     a ? next():next('/published')
        // }
    next()

})

export default router