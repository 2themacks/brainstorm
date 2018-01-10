<template lang="html">
  <div class="">
    <h1>{{heading}}</h1>
    <h4>ADD TO YOUR IDEA</h4>
    <form class="" action="index.html" method="post">
      <input type="text" name="step" v-model="step.description">
      <p>{{step.description}}</p>
      <button type="button" name="step" @click="newStep()">submit</button>
    </form>

    <h2>Idea Title: {{idea.title}}</h2>
    <p>description: {{idea.description}}</p>
    <h4>steps</h4>
    <ul v-for="step in idea.steps">
      <li>{{step.description}}</li>
    </ul>

    <draggable v-model="steps">
      <transition-group name="steps-list">
          <div v-for="(step, index) in steps" :key="step['.key']">
              <p v-model="step.order">{{index}}//   {{step.description}}</p>
          </div>
      </transition-group>
    </draggable>
    <button type="button" name="order" @click="saveOrder()">save order</button>
  </div>
</template>
<!-- SAVE PROCESS
every time s change its made, loop through an array and set this.order = this.index
save to firebase

displayprocess
links in slack -->
<script>
import firebase from 'firebase'
import config from '../utils/firebaseConfig'
import draggable from 'vuedraggable'
import _ from 'lodash'

let idea = config.db.ref();

export default {
  name: 'ideas',
  firebase: {
    idea: idea
  },
data(){
  return {
    heading: "Now map that Idea out",
    uid: "",
    step: {
      description: "",
      distinction: "",
      order: ""
    },
    steps:[]
  }
},
components: {
  draggable
},
methods: {
  newStep: function(){
    console.log('adding this step');
    let currentIdea = idea.child(this.uid + '/' + this.$route.params.key);
    currentIdea.child('steps').push(this.step);
  },
  saveOrder: function(){
    console.log('save this order')
    this.steps.forEach(function(step, index){
      step.order = index
    });
    // let currentSteps = config.db.ref(this.uid + '/' + this.$route.params.key + '/steps')
    // currentSteps.set(this.steps);
    let currentIdea = idea.child(this.uid + '/' + this.$route.params.key);
    currentIdea.child('steps').update(order);
  }
},
created(){
  firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        this.uid = firebase.auth().currentUser.uid;
        this.displayName = firebase.auth().currentUser.displayName;
        // this.$bindAsObject('ideas', config.db.ref(this.uid));
        // this.$bindAsObject('idea', config.db.ref(this.uid + '/' + this.$route.params.key));
        this.$bindAsObject('idea', config.db.ref(this.uid + '/' + this.$route.params.key));
        this.$bindAsArray('steps', config.db.ref(this.uid + '/' + this.$route.params.key + '/steps'), null, function() {
          this.steps = _.orderBy(this.steps, 'order');
        })
      }
  })
}
}
</script>
<style media="screen">

</style>
