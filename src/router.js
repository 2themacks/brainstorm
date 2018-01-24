import VueRouter from 'vue-router'
import profile from './components/profile.vue'
import register from './components/register.vue'
import idea from './components/idea.vue'
import ideamap from './components/ideamap.vue'
import home from './components/home.vue'

const router = new VueRouter({
  mode: 'history',
  routes: [
    {path: '/register', component: register},
    {path: '/profile', component: profile},
    {path: '/idea', component: idea},
    {path: '/ideamap/:key', component: ideamap},
    {path: '/', component: home}
  ]
});

export default router;
