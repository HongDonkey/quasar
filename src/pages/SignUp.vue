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
        <q-input v-model="password" label="password" filled :type="isPwd ? 'password' : 'text'" hint="Password with toggle">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          ></q-icon>
        </template>
      </q-input>
        <q-input v-model="password2" label="confirm password" filled :type="isPwd2 ? 'password' : 'text'" hint="Password with toggle">
        <template v-slot:append>
          <q-icon
            :name="isPwd2 ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd2 = !isPwd2"
          ></q-icon>
        </template>
      </q-input>
         <q-btn color="blue" label="sign-up" @click="login()"></q-btn>
         <router-link to=“/> Move to LogIn </router-link>       ​
              </div>
    </div>
  </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { auth } from 'src/boot/firebase'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'PageIndex',
  setup () {
    const $q = useQuasar()
  },
  data(){
    return {
      email: "",
      name:"",
      password: "",
      password2:"",
      isPwd: true,
      isPwd2: true
    };
  },
    methods: {
      login(){
      auth.createUserWithEmailAndPassword(this.email, this.password)
       .then((userCredential) => {
        // Signed up
        var user = userCredential.user;
        console.log("success", user.email)
        
        // ...
        $q.notify({
          position : "bottom-left",
          message : "login success",
          color : "purple"
        })
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
      });

    }
    }
  })
</script>
