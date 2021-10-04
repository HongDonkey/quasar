<template>
  <div id="app" align="center">
    <q-card-section class="q-qt-none">
      성명 : {{ name }}
      <p></p>
      아이디 : {{ email }}
      <p></p>
      가입일 : {{ creationTime }}
      <p></p>
      최근 로그인 날짜 :
      {{ lastSignInTime }}
      <p></p>
    </q-card-section>
    <q-btn outline label="계정삭제" color="primary" @click="confirm" style="width: 100%">
    </q-btn>
  </div>
</template>

<script>
import { auth, g_auth, db } from "src/boot/firebase";
export default {
  data() {
    return {
      name: "",
      email: "",
      creationTime: "",
      lastSignInTime: "",
    };
  },

  created() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("user>>>", user);
        this.email = user.email;
        this.creationTime = user.metadata.creationTime;
        this.lastSignInTime = user.metadata.lastSignInTime;
        this.name = user.displayName;
      } else {
        console.log("logout or delete");
      }
    });
  },
  methods: {
    deleteUserInfo(users) {
      return new Promise(function (resolve, reject) {
        //deleteUserInfo 함수를 호출한 유저정보와 일치하는 데이터를 파이어스토어에서 찾고 일치하면 resolve변수로 실행
        //실패하면 reject로 작업을 수행(호출한 메서드에 catch문)
        db.collection("users") //users라는 파이어스토어에서
          .where("id", "==", users.email) // doc.id와 일치하는 users.email 값이 있다면
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              db.collection("users") //users라는 파이어스토어에서
                .doc(doc.id) //doc.id == user.email이면 delete 함수 실행
                .delete()
                .then(() => {
                  console.log("doc deleted");
                  resolve("success");
                  //파이어스토어에서 데이터가 삭제되면 success 출력
                })
                .catch((err) => {
                  console.log("delete error", err);
                  reject(err);
                });
            });
          });
      });
    },
    confirm() {
      const user = auth.currentUser;
      console.log("current user>>>", user);
      this.$q
        .dialog({
          title: "확인",
          message: "비밀번호 재입력",
          prompt: {
            model: "",
            type: "password",
          },
          cancel: true,
          presistent: true,
        })
        .onOk((data) => {
          //다이얼로그에 정보 입력후 ok버튼을 누르면 접속중인 유저의 정보가 data변수에 담김
          var credentials = g_auth.EmailAuthProvider.credential(user.email, data);
          //가져온 data변수에서 user.email을 찾아 credentials 변수로 지정함
          user.reauthenticateWithCredential(credentials).then(() => {
            //credentials변수에 담긴 user data를 재인증 받음
            console.log("reauth ok");
            //재인증 성공 시 콘솔 출력

            //   console.log("user account deleted");

            this.deleteUserInfo(user) // 파이어스토어에 데이터를 지우는 함수 호출
              .then((res) => {
                //deleteUserInfo 호출하여 삭제가 되었다면
                console.log(res);
                user.delete().then(() => {
                  console.log("firebase auth account deleted");
                });
              })
              .catch((err) => {
                console.log(err);
              });
          });
        });
    },
  },
};
</script>
