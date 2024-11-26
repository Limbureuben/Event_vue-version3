import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '@/views/AboutView.vue'
import ContactView from '@/views/ContactView.vue'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'
import PolicyView from '@/views/policyView.vue'
import DashboardView from '@/views/admin/DashboardView.vue'
import HomepageView from '@/views/user/HomepageView.vue'
import SuccessfulConfrimation from '@/views/user/SuccessfulConfrimation.vue'



const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{ path: '/', name: 'login', component: LoginView },
        { path: '/about', name: 'about', component: AboutView },
        { path: '/contact', name: 'contact', component: ContactView },
        { path: '/signup', name: 'signup', component: SignupView },
        { path: '/policy', name: 'policy', component: PolicyView },
        { path: '/successful', name: 'successful', component: SuccessfulConfrimation },
        { 
            path: '/homepage', name: 'homepage', component: HomepageView,
            meta: { requiresAuth: true },

         },
        { path: '/dashboard', name: 'dashboard', component: DashboardView,
            meta: { requiresAuth: true, requiresSuperuser: true },
        }
    ]
    
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('access_token');
    const isSuperuser = localStorage.getItem('isSuperuser') === 'true';
  
    if(to.meta.requiresAuth) {
        if(!isAuthenticated) {
            next({ name: 'login'});
        } else if(to.meta.requiresSuperuser && !isSuperuser) {
            next({ name: 'homepage'});
        } else {
            next();
        }
    } else if (to.name === 'login' && isAuthenticated) {
        next({ name: isSuperuser ? 'dashboard' : 'homepage'});
    } else {
        next();
    }
  });
  

export default router