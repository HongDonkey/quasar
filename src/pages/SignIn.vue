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
    <q-btn unelevated rounded color="primary" name="Login" label="Sign-In" />
     <router-link to=“/SignUp> Move to SignUp </router-link>
  </div>
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
      register,
      isPwd: ref(true)
    }
  }
})
</script>
