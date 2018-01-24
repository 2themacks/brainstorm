<template lang="html">
  <div class="layout-container">
    <div class="left-side">
      <div class="">
        <h2 class="sub-heading">{{idea.title}}</h2>
        <p>description: {{idea.description}}</p>
      </div>

      <form class="idea-list">
        <h4 class="">Add a step to your idea</h4>
        <textarea type="text" name="step" v-model="step.description"></textarea><br>
        <button type="button" name="step" @click="newStep()">submit</button>
      </form>
    </div>
    <div class="right-side">

      <div class="steps-div">
        <h2 class="sub-heading">steps needed to accomplish it</h2>
        <p>directions here</p>
        <draggable v-model="steps">
          <transition-group name="steps-list">
              <div class='step' v-for="(step, index) in steps" :key="step['.key']" :class="{primary: step.distinction}">
                  <i class="material-icons">drag_handle</i>
                  <p v-show="!editing" v-model="step.order" >{{step.description}}</p>
                  <textarea v-show="editing" v-model="step.description">{{step.description}}</textarea>
                  <div class="step-buttons">
                    <i class="material-icons" name="edit" @click="editStep(step)" v-show="!editing">border_color</i>
                    <i class="material-icons" v-show="editing" @click="editStep(step)">check_circle</i>
                    <i class="material-icons" name="delete" @click="deleteStep(step)">delete</i>
                    <button name="distinction" @click="distinction(step)">primary</button>
                  </div>
              </div>
          </transition-group>
        </draggable>
        <button name="order" @click="saveOrder()">save changes</button>
      </div>
    </div>



  </div>
</template>
<script>
import firebase from 'firebase'
import config from '../utils/firebaseConfig'
import draggable from 'vuedraggable'
import _ from 'lodash'

let idea = config.db.ref();
let steps = config.db.ref('steps');

export default {
  name: 'ideas',
  firebase: {
    idea: idea,
    steps: steps
  },
data(){
  return {
    heading: "Now map that Idea out",
    uid: "",
    step: {
      description: "",
      distinction: false,
      order: ""
    },
    steps:[],
    isPrimary: true,
    editing: false
  }
},
components: {
  draggable
},
methods: {
  newStep: function(){
    console.log('adding this step');
    this.step.order = this.steps.length++;

    let currentIdea = idea.child(this.uid + '/' + this.$route.params.key);
    currentIdea.child('steps').push(this.step);

    this.$bindAsArray('steps', config.db.ref(this.uid + '/' + this.$route.params.key + '/steps'), null, function() {
      this.steps = _.orderBy(this.steps, 'order');
    })
    this.step.order = '';
    this.step.description = '';
  },
  saveOrder: function(){
   console.log('save this order')
   let _this = this;
   this.steps.forEach(function(step, index){
     step = {...step}
     let newKey = step['.key']
     delete step['.key']
     step.order = index;
     _this.$firebaseRefs.steps.child(newKey).set(step)
     console.log(step);
    });
  },
  editStep: function(){
    console.log('edit this step');
    //turn steps into input fields and show save button
    this.editing=!this.editing
  },
  deleteStep: function(step){
    console.log('delete this step');
    this.$firebaseRefs.steps.child(step['.key']).remove()
    this.$bindAsArray('steps', config.db.ref(this.uid + '/' + this.$route.params.key + '/steps'), null, function() {
      this.steps = _.orderBy(this.steps, 'order');
    })
  },
  distinction: function(step){
    console.log('toggle class');
    step.distinction = !step.distinction
  }
},
created(){
  firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        this.uid = firebase.auth().currentUser.uid;
        this.displayName = firebase.auth().currentUser.displayName;
        this.$bindAsObject('idea', config.db.ref(this.uid + '/' + this.$route.params.key));
        this.$bindAsArray('steps', config.db.ref(this.uid + '/' + this.$route.params.key + '/steps'), null, function() {
          this.steps = _.orderBy(this.steps, 'order');
        })
      }
  })
}
}
</script>
