<template lang="html">
  <div class="">
    <h2 class="center-text">{{heading}}</h2>
    <h4 class="center-text">Add a step to your idea</h4>
    <form class="center-text" action="index.html" method="post">
      <textarea type="text" name="step" v-model="step.description"></textarea>
      <p>{{step.description}}</p>
      <button type="button" name="step" @click="newStep()">submit</button>
    </form>
    <div class="center-text">
      <h2>{{idea.title}}</h2>
      <p>description: {{idea.description}}</p>
    </div>
    <div class="steps-div">
      <h4>steps</h4>
      <!-- <ul v-for="step in idea.steps">
        <li>{{step.description}}</li>
      </ul> -->
      <draggable v-model="steps">
        <transition-group name="steps-list">
            <div class='step' v-for="(step, index) in steps" :key="step['.key']" :class="{primary: step.distinction}">
                <p v-model="step.order" >{{step.description}}</p>
                <div class="step-buttons">
                  <i class="material-icons" name="edit" @click="editStep">border_color</i>
                  <i class="material-icons" name="delete" @click="deleteStep">delete</i>
                  <button name="distinction" @click="distinction">primary</button>
                </div>

            </div>
        </transition-group>
      </draggable>
      <button name="order" @click="saveOrder()">save order</button>
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
    isPrimary: true
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
  // saveOrder: function(step){
  //   console.log('save this order')
  //   this.steps.forEach(function(step, index){
  //     step.order = index
  //   });
  //   delete steps['.key']
  //   this.idea.steps(['.key']).set(step.order)
  // },
  saveOrder: function(){
   console.log('save this order')
   let _this = this;
   this.steps.forEach(function(step, index){
     step = {...step} //this is weird?
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

  },
  deleteStep: function(){
    console.log('delete this step');
    let _this = this
    console.log(_this.$firebaseRefs.steps.child(step['.key']))
    // this.$firebaseRefs.steps.child(key).remove()
    // let currentIdea = idea.child(this.uid + '/' + this.$route.params.key);
    // console.log(this.steps['.key'])
  },
  distinction: function(){
    console.log('toggle class');
    console.log(this.steps[0].distinction)

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
