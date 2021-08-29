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
         <q-btn color="blue" label="sign-up" @click="register()"></q-btn>
         <router-link to=“/> Move to LogIn </router-link>       ​
              </div>
    </div>
  </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'PageIndex',
  // methods: {
  //   register(){
  //     console.log("ok");
  //   }
  // },
  setup(){
    let email = ref('')
    let name = ref('')
    let password = ref('')
    let password2 = ref('')
    let register = ()=> {
      console.log("ok" + email.value)
    }
    return{
      email,
      name,
      password,
      password2,
      register,
      isPwd: ref(true),
      isPwd2: ref(true)
    }
  }
})
</script>
