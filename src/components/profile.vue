<template lang="html">
  <div class="layout-container">
    <div class="left-side">
      <div class="profile-box">
        <h2 class="heading">{{name}}</h2>
        <p>{{email}}</p>
        <button @click='logOut' class="button">Log out</button>
      </div>
      <div class="new-idea">
        <div class="">
        <h2 class="sub-heading">get started on a new idea</h2>
        </div>
        <div class="idea-list">
          <form>
            <label for="title">Idea Title</label><br>
            <input type="text" id="title" value="" v-model="ideaObject.title"><br><br>
            <label for="description">Short description</label><br>
            <textarea type="text" id="description" value="" v-model="ideaObject.description"></textarea><br>
            <button class="button" name="submit" @click="newIdea()">submit</button>
          </form>
        </div>

      </div>
    </div>
    <div class="right-side">
      <div class="idea-list-container">
        <h2 class="sub-heading">idea list</h2>
      <div class="idea-list" v-for="idea in ideas" >
        <h4>{{idea.title}}</h4>
        <p>{{idea.description}}</p>
        <div class="idea-link">
          <router-link :to="{ path: '/ideamap/'+idea['.key'], component:'ideamap'}" class="">view idea</router-link>
        </div>
        <i class="material-icons delete-icon" name="delete" @click="deleteIdea(idea)">delete</i>

      </div>

      </div>

    </div>
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
      name: this.name,
      email: this.email,
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
    logOut() {
      firebase.auth().signOut();
      window.location.href = '/';
    },
    newIdea: function() {
      console.log('idea added!')
      ideasConfig.child(this.uid).push(this.ideaObject);
      this.ideaObject.title = "";
      this.ideaObject.description = "";
      this.ideaObject.steps = "steps";
    },
    // map: function(idea){
    //   console.log('editing movie...');
    //   this.ideaObject.title=idea.title;
    //   this.ideaObject.description=idea.description;
    //   this.currentIdea=idea;
    //   ideasConfig.child(this.ideaObject['.key']).set({
    //     title: this.ideaObject.title,
    //     description: this.ideaObject.description,
    //     steps: this.ideaObject.steps
    //   })
    // },
    deleteIdea: function (idea){
      console.log('delete this idea');
      this.$firebaseRefs.ideas.child(idea['.key']).remove()
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.name = firebase.auth().currentUser.displayName;
        this.email = firebase.auth().currentUser.email;
        this.uid = firebase.auth().currentUser.uid;
        this.displayName = firebase.auth().currentUser.displayName;
        this.$bindAsArray('ideas', config.db.ref(this.uid));
      } else {
        this.$router.push('/');
      }
    });
  }
}
</script>
