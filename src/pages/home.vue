<template>
  <div id="q-app" style="min-height: 100vh">
    <div class="q-pa-md">
      WELCOME {{ userName }}<br />
      {{ userEmail }}
      <div>
        ​
        <q-btn color="blue" label="LOGOUT" @click="logout()"></q-btn>
        <section v-if="!onloading">
          ​<q-table :title="date" :rows="rows" :columns="columns" row-key="no"
            v-model:pagination="pagination"
            :filter="filter"
            >​ </q-table
          >​
        </section>
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
      pagination: {
      sortBy: 'time',
      descending: false,
      rowsPerPage: 15, // q-table에 기본적으로 몇 개의 row가 표시되는지
      },
      date: '2019/02/01',
      filter : '',
      columns : [
        {
          name: 'no',
          required: true,
          label: 'SID',
          align: 'left',
          field: row => row.no,
          format: val => `${val}`,
          sortable: true
          },
        { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true },
        { name: 'email', align: 'left', label: 'E-mail', field: 'id', sortable: true },
        { name: 'time', label: 'Time', field: 'time', sortable: true }
        ],
        rows : [ ],
        cnt : 1,
        onloading : true //데이터가 로딩이 되면 false로 바뀜
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

    var now = new Date();
    var mon = now.getMonth() + 1 //제로베이스 인덱스이기 때문에 하나를 더해줌
    var date = now.getDate()
    if (mon < 10) { mon = "0" + mon; } //월이 한자리 수 이면 01,02처럼 표시(자릿수 맞춰줌)
    if (date < 10) { date = "0" + date;} //일이 한자리 수 이면 01,02처럼 표시(자릿수 맞춰줌)
    this.date = now.getFullYear() + '/' + mon + '/' + date // ex 2021/01/01
    console.log(this.date);
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
  }, // end of mounted()

  created(){
    // 오늘 로그인한 유저만 조회
    var now = new Date();
    var startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    var timestamp = startOfDay / 1 // /1 로 수식을 주면 유닉스 타임으로 떨어짐
    // * 유닉스 타임 : 1970년 1월 1일 00:00:00 협정 세계시부터의 경과 시간을 초로 환산하여 정수로 나타낸 것
    console.log("today timestamp => ",timestamp);

    db.collection("users").where("date",">=",timestamp).onSnapshot((snapshot)=>{
      snapshot.docChanges().forEach((change) => {
        if(change.type === "added") {
          console.log("data added>> ", change.doc.data());
          var tempRow = {name: '', id: '', time:'', no:''}
          tempRow.name = change.doc.data().name
          tempRow.id = change.doc.data().email
          const getTime = (unixTime) => {
            let d = new Date(unixTime)
            console.log(d);
            var hour = d.getHours()
            var min = d.getMinutes()
            var sec = d.getSeconds()
            if (hour < 10) { hour = "0" + hour; }
            if (min < 10) { min = "0" + min; }
            if (sec < 10) { sec = "0" + sec; }
            let ret = (d.getMonth() + 1) + 
            "/" +(d.getDate()) +
            " " +hour+
            ":" +min+
            ":" +sec
            return ret
          }
          tempRow.time = getTime(change.doc.data().date)
          tempRow.no = this.cnt
          this.cnt++
          this.rows.push(tempRow)
        }
      });
    })

    this.onloading = false
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
