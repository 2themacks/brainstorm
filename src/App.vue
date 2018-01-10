<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <router-link to="/register">Register or Log In</router-link>
    <router-link to="/profile">My Profile</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Brainstorm App'
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
a {
  text-decoration: none;
  background-color: lightGrey;
  padding: 1em;
  color: white;
}

h1, h2 {
  font-weight: normal;
  display: inline;
}
div {
  margin: 1em auto;
}

.vddl-dragging{
  background-color: lightGrey;
}
.vddl-list, .vddl-draggable {
  position: relative;
}
.vddl-list {
  min-height: 44px;
}
.vddl-dragging{
  opacity: 0.7;
}

.vddl-dragging-source {
  display: none;
}
</style>
