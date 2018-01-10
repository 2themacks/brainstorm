import firebase from 'firebase'
import firebaseui from 'firebaseui'
import Vue from 'vue'
import vuefire from 'vuefire'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import draggable from 'vuedraggable'


Vue.use(VueRouter);
Vue.use(vuefire);


new Vue({
  el: '#app',
  router,
  created() {
    firebase.auth().onAuthStateChanged(function(user){
      if (user) {
        // this.$router.push('/profile');
      }
      else {
        // this.$router.push('/');
      }
    });
  },
  render: h => h(App)
})
