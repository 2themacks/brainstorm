<template lang="html">
  <div class="">
    <h2>ideas for {{displayName}}</h2>
    <div class="idea-list" v-for="idea in ideas" >
      <h4>Title: {{idea.title}}</h4>
      <p> Description:{{idea.description}}</p>
      <p>key: {{idea['.key']}}</p>
      <!-- <router-link to="/ideamap" @click="map">Go to this idea</router-link> -->
      <router-link :to="{ path: '/ideamap/'+idea['.key'], component:'ideamap'}">edit/view idea</router-link>

    </div>

    <h4>get started on a new idea</h4>
    <form class="" action="index.html" method="post">

      <label for="title">Idea Title</label>
      <input type="text" id="title" value="" v-model="ideaObject.title">

      <label for="description">Short description</label>
      <input type="text" id="description" value="" v-model="ideaObject.description">
      <button type="button" name="submit" @click="newIdea()">submit</button>
    </form>

  </div>
</template>

<script>
import firebase from 'firebase'
import config from '../utils/firebaseConfig'

let ideasConfig = config.db.ref();

export default {
  name: 'ideas',
  firebase: {
    ideas: ideasConfig
  },
  data() {
    return {
      displayName: '',
      uid: "",
      ideaObject: {
        title: "",
        description: "",
        steps: "steps"
      },
      currentIdea: {}
    }
  },
  methods: {
    newIdea: function() {
      console.log('idea added!')
      ideasConfig.child(this.uid).push(this.ideaObject);
      this.ideaObject.title = "";
      this.ideaObject.description = "";
      this.ideaObject.steps = "steps";
    },
    map: function(idea){
      console.log('editing movie...');
      this.ideaObject.title=idea.title;
      this.ideaObject.description=idea.description;
      this.currentIdea=idea;
      ideasConfig.child(this.ideaObject['.key']).set({
        title: this.ideaObject.title,
        description: this.ideaObject.description,
        steps: this.ideaObject.steps
      })
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user)=> {
        if (user) {
          this.uid = firebase.auth().currentUser.uid;
          this.displayName = firebase.auth().currentUser.displayName;
          this.$bindAsArray('ideas', config.db.ref(this.uid));
        }
        else{
          //no user is signed in
        }
    })
  }
}
</script>
<style media="screen">
  .idea-list{
    border: solid 1px;
    margin: 1em auto;
    width: 40%;
    padding: 1em;
  }
</style>
