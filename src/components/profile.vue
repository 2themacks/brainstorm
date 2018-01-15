<template lang="html">
  <div class="profile-container">
    <h2 class="center-text">Profile Page</h2>
    <p class="center-text">{{name}}</p>
    <p  class="center-text">{{email}}</p>
    <div class="center-text">
      <router-link to="/idea" class="idea-link">go to ideas</router-link><br>
      <button @click='logOut' class="button">Log out</button>
    </div>
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
