import { auth } from 'src/boot/firebase'
import { createStore } from 'vuex'
import { store } from 'quasar/wrappers'

export default store(function () {
  const Store = createStore({
    modules:{

    },
    state: {
      //프로젝트 공통에서 사용할 변수 정의
      //프로젝트 내 모든 곳에서 참조 및 사용 가능
      fireUser:null,
      // userName:null
    },
    actions:{
      //mutations를 실행시키는 역할 즉, state를 변경
      //동기처리가 아닌 비동기 처리
      signOutAction({commit}) {
        auth.signOut().then(() => {
          commit("setFireUser", null)
          //mutation명을 null로 세팅
        })
        //setFireUser를 null값으로 만든다
      },
      authAction({commit}) {
        auth.onAuthStateChanged(user => {
          if (user) {
            commit("setFireUser", user)
          }
          //setFireUser변수에 user 정보를 추가
        })
      }
    },
    mutations:{
      //mutations의 주요 목적은 state를 변경시키는 역할
      //비동기처리가 아닌 동기처리
      //commit("함수명",전달인자)
      setFireUser(state, firebaseUser) {
        state.fireUser = firebaseUser
        //state의 fireUser변수 값에 넘겨받은 firebaseUser값을 입력
      },
      // setUserName(state, userName){
      //   state.userName = userName
      // }
    },
    getters:{
      //
      getFireUser(state){
        return state.fireUser
      },
      // getUserName(state){
      //   return state.userName
      // },
      //fireUser가 세팅이 되어 있는지 아닌지
      isUserAuth(state){
        return !!state.fireUser
      },
      // isUserName(state){
      //   return !!state.userName
      // }
    },
    strict: process.env.DEBUGGING
  })
 return Store
})

//https://uxgjs.tistory.com/149
