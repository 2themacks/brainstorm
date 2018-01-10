<template lang="html">
  <div class="">
    <h2>Register for an account</h2>
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script>
import firebase from 'firebase'
import firebaseui from 'firebaseui'
import config from '../utils/firebaseConfig.js'

export default {
  name: 'login',
  mounted() {
    let uiConfig = {
        signInSuccessUrl: '/profile',
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
      };
      // Initialize the FirebaseUI Widget using Firebase.
      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      // The start method will wait until the DOM is loaded.
      ui.start('#firebaseui-auth-container', uiConfig);
  }
}
</script>
<style lang="css">
</style>
