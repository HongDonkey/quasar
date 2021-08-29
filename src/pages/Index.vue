<template>
  <div id="q-app" style="min-height: 100vh;">
  <div class="q-pa-md">
    <div class="q-gutter-y-md column" style="max-width: 300px">
      <q-input standout v-model="email" label="Email"></q-input>
       <q-input standout v-model="name" label="Your name"></q-input>
        <q-input standout v-model="password" label="password"></q-input>
         <q-input standout v-model="password2" label="confirm password"></q-input>
         <!-- <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'" hint="Password with toggle">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          ></q-icon>
        </template>
      </q-input> -->
         <q-btn color="blue" label="sign-up" @click="register()"></q-btn>
         <router-link to=“/SignUp> Move to SignUp </router-link>
          
    </div>
  </div>
  </div>
</template>

<script>
import { defineComponent, ref} from 'vue';

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
    // let isPwd = ()=> {
    //  ref(true)
    // }
    }
    return{
      email,
      name,
      password,
      password2,
      register
      // isPwd
    }
  }
})
</script>
