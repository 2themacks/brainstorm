<template>
  <div id="app">
    <h1 class='header'>{{ msg }}</h1>
    <router-link to="/register" class="nav-link">Register or Log In</router-link>
    <router-link to="/profile" class="nav-link">My Profile</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'brainstorm'
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 10px;
}
.nav-link {
  float: right;
  text-decoration: none;
  background-color: lightGrey;
  padding: 1em;
  color: white;
}
.idea-link {
  text-decoration: none;
  background-color: lightGrey;
  padding: 1em;
  color: white;
  margin: 1em auto;
}
.button{
  margin: 1.5em auto;
}
.step-buttons{
  float: right;
  display: inline;
  margin: auto;
}
.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;  /* Preferred icon size */
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: 'liga';
}
.new-idea{
  background-color: white;
  padding: 1em;
  margin: auto;
  width: 50%;
}
.header{
  letter-spacing: .05em;
}
.center-text {
  text-align: center;
  margin: 1em auto;
}

.profile-container{

}
body {
  background-color: lightGrey;
}
a:hover {
  background-color: white;
  color: grey;
}

h1 {
  font-weight: normal;
  display: inline;
}
h2 {
  margin: auto;
  text-align: center;
  font-weight: normal;
}
div {
  margin: 1em auto;
}
.steps-div {
  margin: auto;
  width: 80%;
  border: solid 1px;
  padding: 1em;
}
.step {
  background-color: #F3E8EE;
  width: 80%;
  padding: 1em;
}
.step p {
  display: inline;
}
.primary {
  border: solid 2px;
  margin-left: 15px;
}
</style>
