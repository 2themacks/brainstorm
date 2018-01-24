<template>
  <div id="app">
    <router-link to="/">
      <h1 class='header'>{{msg}}</h1>
    </router-link>
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
  margin-top: 10px;
}
.idea-list-container{
  box-sizing: border-box;
}
.idea-list{
  margin-left: 0em;
  width: 70%;
  padding: 2em;
  border-left: solid 3px #13294C;
}

//LINK STYLING
.nav-link {
  float: right;
  letter-spacing: .05em;
  text-transform: lowercase;
  margin-right: 1em;
  margin-top: 1em;
  padding: .5em
}
.idea-link {
  margin: 1em auto;
  color: #1F2328;
  font-size: 1.2em;
  padding: .5em
}
a:hover {
  background-color: #F9E561;
  // background-color: #FFA921;
}
a, a:visited {
  text-decoration: none;
  color: #1F2328;
  letter-spacing: .05em;
}
.layout-container {
  box-sizing: border-box;
  display: flex;
}
.left-side{
  padding: 1em;
  width: 40%;
}
.right-side{
  width: 60%;
}
.button{
  margin: 1.5em auto;
  padding: .5em 1.5em;
  background-color: #97A09E;
  color: #FAFAFB;
  letter-spacing: .05em;
}

.step-buttons {
  float: right;
  display: inline;
  margin: auto;
}
.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 20px;  /* Preferred icon size */
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
.delete-icon {
  float: right;
}
.new-idea{
  padding: 1em;
  margin: auto;
  width: 80%;
}
.header {
  letter-spacing: .1em;
  font-size: 3em;
  background-color: #C0E0DE;
  box-shadow: -5px -5px #F9E561;
  margin: .5em;
}
.sub-heading {
  background-color: #F9E561;
  margin: auto;
  display: inline;
  letter-spacing: .1em;
}
.heading{
  font-weight: 600;
  letter-spacing: .05em;
  text-transform: uppercase;
}
.center-text {
  text-align: center;
  margin: 1em auto;
}
.profile-box{
  width: 80%;
}
body {
  background-color: #FDFDFD;
}
h1 {
  font-weight: normal;
  display: inline;
  margin: auto;
}
h2 {
  margin: auto;
  font-weight: normal;
}
h4 {
  text-transform: uppercase;
}
p{
  line-height: 1.5em;
}
div {
  margin: 1em auto;
}
.steps-div {
  margin: auto;
  width: 100%;
  padding: 1em;
  border-left: solid 3px #13294C;
}
.step {
  width: 80%;
  padding: 1em;
}
.step p {
  display: inline;
}
.primary {
  margin-left: 15px;
  background-color: #C0E0DE;
}

</style>
