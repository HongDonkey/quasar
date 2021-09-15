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
    <q-btn unelevated rounded color="primary" name="Login" label="Sign-In" @click="login" />
    <!-- <q-btn unelevated rounded color="primary" name="github" label="Sign-In(github)" @click="github" /> -->
     <router-link to=“/SignUp> Move to SignUp </router-link>
  </div>
</div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref} from 'vue';
import { auth, db } from 'src/boot/firebase'
import { useQuasar } from 'quasar'
import { useRouter, useRoute } from 'vue-router'
import { useStore, mapGetters } from 'vuex';

export default defineComponent({
  name: 'PageIndex',

  setup () {
    const $q = useQuasar()
    const $store = useStore();
    const $router = useRouter()
    const $route = useRoute()

    let email = ref('')
    let password = ref('')
    let isPwd = ref(true)

    let login = () => {
      
      auth.signInWithEmailAndPassword(email.value, password.value)
       .then((userCredential) => {
        // Signed up
        var user = userCredential.user;
        console.log("success", user)
        // console.log(name.value);
        // ...
        console.log(user);

        $store.commit("setFireUser", user)
        console.log(auth);

        
        $q.notify({
          position : "bottom-left",
          message : ("WELCOME" + " " + user.email + user.name),
          color : "purple"
        })
      $router.push({ path: 'home' })
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
        $q.notify({
          position : "bottom-left",
          message : errorMessage,
          color : "purple"
        })
      });
    }
 return {
      email,
      password,
      isPwd,
      login
  }
  
  },
  computed: {
    ...mapGetters(["getFireUser", "isUserAuth"])
  }
   
    // github() {
    //   var provider = new firebase.auth.GithubAuthProvider();
    //   auth.signInWithPopup(provider)
    //   .then((result) => {
    //     /** @type {firebase.auth.OAuthCredential} */
    //     var credential = result.credential;
    //     console.log(credential);
    //     console.log('result', result);
    //     this.$q.notify({ message : "success" })
    //     this.$router.push({ path : "home" })
    //     // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    //     var token = credential.accessToken;
    //     console.log(token);
    //     // The signed-in user info.
    //     var user = result.user;
    //     // ...
    //   }).catch((error) => {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     console.log(errorCode);
    //     console.log(errorMessage);
    //     // The email of the user's account used.
    //     var email = error.email;
    //     // The firebase.auth.AuthCredential type that was used.
    //     var credential = error.credential;
    //     // ...
    //   });
    // }
  })
</script>