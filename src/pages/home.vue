<template>
  <div id="q-app" style="min-height: 100vh">
    <div class="q-pa-md">
      WELCOME {{ userName }}<br />
      {{ userEmail }}

      <div>
        <q-btn color="blue" label="LOGOUT" @click="logout()"></q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { mapActions, mapGetters, useStore } from "vuex";
import { auth, db } from "src/boot/firebase";
import { useQuasar } from "quasar";
import { useRouter, useRoute } from "vue-router";

export default defineComponent({
  name: "PageIndex",

  setup() {
    const $q = useQuasar();
    const $router = useRouter();
    const $route = useRoute();

    var userName = ref("");
    var userEmail = ref("");

    let logout = () => {
      auth.signOut().then(() => {
        $q.notify({
          position: "bottom-left",
          message: "logout success",
          color: "purple",
        });
        $router.push({ path: "/" });
      });
    };

    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user.displayName);
        userName.value = user.displayName;
        userEmail.value = user.email;

        console.log("1" + user);
        console.log("2" + userName.value);
        console.log("3" + userEmail.value);
      }
    });
    return {
      userName,
      userEmail,
      logout,
    };
  },

  // updated() {
  //   if (this.getFireUser != null && this.userName == "") {
  //     console.log("11");
  //     db.collection("users")
  //       .where("id", "==", this.getFireUser.email)
  //       .get()
  //       .then((querySnapshot) => {
  //         querySnapshot.forEach((doc) => {
  //           // doc.data() is never undefined for query doc snapshots​
  //           console.log(doc.id, " => ", doc.data());
  //           this.name = doc.data().name;
  //         });
  //       })
  //       .catch((error) => {
  //         console.log("Error getting Documents:", error);
  //       });
  //   }
  // },

  mounted() {
    this.authAction();
    console.log("mounted called");
    console.log(this.getFireUser);
    // db.collection("users")
    //   .where("id", "==", this.getFireUser.email)
    //   .get()
    //   .then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //       // doc.data() is never undefined for query doc snapshots​
    //       console.log(doc.id, " => ", doc.data());
    //       this.userName = doc.data().name;
    //     });
    //   });
  },

  coumputed: {
    ...mapGetters(["getFireUser", "isUserAuth"]),
    //
  },
  methods: {
    ...mapActions(["signOutAction", "authAction"]),
    // signOutaAction() 함수를 호출하면 vuex에서 제공하는 authAction 함수를 호출해달라
  },
});
</script>
