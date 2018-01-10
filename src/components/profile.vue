<template lang="html">
  <div class="">
    <button @click='logOut'>Log out</button><br />
    <h1>Profile Page</h1>
    <p>{{name}}</p>
    <p>{{email}}</p>
    <router-link to="/idea">go to ideas</router-link>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  data() {
    return {
      name: this.name,
      email: this.email
    }
  },
  methods: {
    logOut() {
      firebase.auth().signOut();
      window.location.href = '/';
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.name = firebase.auth().currentUser.displayName;
        this.email = firebase.auth().currentUser.email;
      } else {
        this.$router.push('/');
      }
    });
  }
}
</script>

<style lang="css">
</style>
