<template>
  <div id="q-app" style="min-height: 100vh;">
    <div class="q-pa-md">
<div class ="window-height row justify-center full-height">
  <div class="q-gutter-y-md column fixed-center">
 <div class="text-h2">
      Sign-In
      <q-badge align="top">Mypage v1.0.0</q-badge>
    </div>
    <q-input color="teal" outlined v-model="email" label="Email ID">
      <template v-slot:append>
      </template>
    </q-input>
   <q-input v-model="password" label="password" filled :type="isPwd ? 'password' : 'text'" hint="Password with toggle">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          ></q-icon>
        </template>
      </q-input>
      <q-checkbox v-model="remember" label="Remember Me" color="teal"/>
    <q-btn unelevated rounded color="primary" name="Login" label="Sign-In" @click="login" />

  
    <q-btn padding="none" flat>
      <img src="../assets/google.png" style="width: 200px;" @click="google">
    </q-btn>
    <q-btn padding="none" flat>
      <img src="../assets/github.png" style="width: 200px;" @click="github">
    </q-btn>

     <router-link to=“/SignUp> Move to SignUp </router-link>
  </div>
</div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref} from 'vue';
import { auth, db, g_auth } from 'src/boot/firebase'
import { useQuasar } from 'quasar'
import { useRouter, useRoute } from 'vue-router'
import { useStore, mapGetters } from 'vuex';

export default defineComponent({
  name: 'PageIndex',

  setup () {
    const $q = useQuasar()
    const $store = useStore()
    const $router = useRouter()
    const $route = useRoute()

    let email = ref('')
    let password = ref('')
    let isPwd = ref(true)
    let remember = ref(false)


    
 return {
      email,
      password,
      isPwd,
      remember
  }
  
  },
  mounted(){
    if(localStorage.checkbox && localStorage.checkbox !==""){
      this.remember = true
      this.email = localStorage.username
    } else {
      this.remember = false
    }
  },
  computed: {
    ...mapGetters(["getFireUser", "isUserAuth"])
  },
   
  methods: {

      login(){
      
      auth.signInWithEmailAndPassword(this.email, this.password)
       .then((userCredential) => {
        // Signed up
        var user = userCredential.user;
        console.log("success", user)
        // console.log(name.value);
        // ...
        console.log(user);

        this.$store.commit("setFireUser", user)
        console.log(auth);

        
        this.$q.notify({
          position : "bottom-left",
          message : ("WELCOME" + " " + user.email + user.displayName),
          color : "purple"
        })
        if (this.remember.value == true) {
          localStorage.username = email.value;
          localStorage.checkbox = remember.value;
        } else {
          localStorage.username = "";
          localStorage.checkbox = "";
        }
      this.$router.push({ path: 'home' })
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
        this.$q.notify({
          position : "bottom-left",
          message : errorMessage,
          color : "purple"
        })
      });
    },
  
    google(){
      var provider = new g_auth.GoogleAuthProvider();
      auth.languageCode = 'kr_KR'
          auth.signInWithPopup(provider).then((result) => {
       
       //토큰정보
        ///** @type {firebase.auth.OAuthCredential} */
        // var credential = result.credential;
        //This gives you a Google Access Token. You can use it to access the Google API.
        // var token = credential.accessToken;

        // The signed-in user info.
        var user = result.user;
        this.$store.commit("setFireUser", user)
        db.collection("users").where("id","==",user.email).get().then((snapshot)=>{
          if(snapshot.empty == true){//empty는 select를 요청했는데 아무 것도 안오는 것, 로그인한 기록이 없이 처음이라는 것
            db.collection("users").add({
              id: user.email,
              name: user.displayName
            })
             console.log("파이어스토어");
          this.$router.push({ path: 'home' })
          } else {
            console.log("else>>",snapshot);
            snapshot.forEach((doc)=> {
              db.collection("users").doc(doc.id).set({
              id: user.email,
              name: user.displayName
            })
            })
        
            }
         
        })
        // ...
      }).catch((error) => {
        console.log(error);
  });

    },
    github(){
      var provider = new g_auth.GithubAuthProvider()
      auth.languageCode = 'kr_KR'
          auth.signInWithPopup(provider).then((result) => {
       
       //토큰정보
        ///** @type {firebase.auth.OAuthCredential} */
        // var credential = result.credential;
        //This gives you a Google Access Token. You can use it to access the Google API.
        // var token = credential.accessToken;

        // The signed-in user info.
        var user = result.user;
        this.$store.commit("setFireUser", user)
        db.collection("users").where("id","==",user.email).get().then((snapshot)=>{
          if(snapshot.empty == true){//empty는 select를 요청했는데 아무 것도 안오는 것, 로그인한 기록이 없이 처음이라는 것
            db.collection("users").add({
              id: user.email,
              name: user.displayName
            })
             console.log("파이어스토어");
          this.$router.push({ path: 'home' })
          } else {
            console.log("else>>",snapshot);
            snapshot.forEach((doc)=> {
              db.collection("users").doc(doc.id).set({
              id: user.email,
              name: user.displayName
            })
            })
        
            }
         
        })
        // ...
      }).catch((error) => {
        console.log(error);
  });
    }
    
  }
  })
</script>