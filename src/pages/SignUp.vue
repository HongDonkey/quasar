<template>
  <div id="q-app" style="min-height: 100vh;">
  <div class="q-pa-md">
    <div class="q-gutter-y-md column" style="max-width: 300px">
      <div class="q-gutter-y-md column fixed-center">
        <div class="text-h2">
      Sign-Up
      <q-badge align="top">Mypage v1.0.0</q-badge>
    </div>
      <q-input standout v-model="email" label="Email" type="email"></q-input>

      <q-input standout v-model="name" label="Your name"></q-input>

      <q-input v-model="password" label="password" filled :type="isPwd ? 'password' : 'text'" hint='Please enter at least 6 characters' >

        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          ></q-icon>
        </template>

      </q-input>

      <q-input v-model="password2" label="confirm password" filled :type="isPwd ? 'password' : 'text'" >

        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          ></q-icon>
        </template>
      </q-input>

      <q-btn color="blue" label="sign-up" @click="signup()"></q-btn>
      <router-link to=“/> Move to LogIn </router-link>       ​
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { auth, db } from 'src/boot/firebase'
import { useQuasar } from 'quasar'
import { useRouter, useRoute} from 'vue-router'
import { useStore } from 'vuex'



export default defineComponent({
  name: 'PageIndex',
  setup () {
    const $q = useQuasar()
    const $router = useRouter()
    const $route = useRoute()
    const $store = useStore()

    let email = ref('')
    let name = ref('')
    let password = ref('')
    let password2 = ref('')
    let isPwd = true

    let signup=() => {
      auth.createUserWithEmailAndPassword(email.value, password.value)
       .then((userCredential) => {
        // Signed up
        var user = userCredential.user
        user.name = name.value
        user.updateProfile({
          displayName : name.value
        })
        
        console.log("success", user.email)
        console.log(user);
        console.log(user.name);
        // ...
        // $store.commit("setFireUser", user.name);
        $q.notify({
          position : "bottom-left",
          message : "success",
          color : "purple"
        })
      //,
       db.collection("users").add({
         id: email.value,
         name: name.value,
         gender : "male",
         address : "Seoul"
       })
       .then((docRef) => {
         console.log("Document written with ID: ", docRef.id);
         $q.notify({
           message: "Register Success",
           color: 'blue'
         })
       })
       .catch((error) => {
         console.error("Error adding document: ", error.message)
         $q.notify({
           message: error,
           color: 'red'
         })
       })
        $router.push({ path: '/' })
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
        console.log(errorCode);
        $q.notify({
          position : "bottom-left",
          message : errorMessage,
          color : "purple"
        })
      });
    }
    return {
    email,
    name,
    password,
    password2,
    isPwd,
    signup
      }
    }, 
  })
</script>