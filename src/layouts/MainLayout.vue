<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Quasar App </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered class="bg-grey-1">
      <!-- <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-1"> -->
      <!-- show-if-above를 지우면 홈 화면 좌측바가 열리지 않는다-->
      <q-list>
        <q-item-label header class="text-grey-8"> Essential Links </q-item-label>

        <EssentialLink
          v-on:closeDrawer="closeme"
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
        <!-- EssentialLink.vue에서 넘어온 closeDrawer 변수를 closeme 함수로 실행시킴   -->
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Github",
    caption: "github.com/HongDonkey",
    icon: "code",
    link: "https://github.com/HongDonkey",
  },
  {
    title: "Sign Up",
    caption: "Sign Up",
    icon: "login",
    link: "/signup",
    external: false,
  },
];

import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  methods: {
    closeme(param) {
      //EssentialLink.vue 에서 받아온 closeDrawer 변수에 100이라는 값이 파라미터로 있었기 때문에
      // closeme 함수가 실행되면 100이라는 파라미터를 아래 문장과 함께 콘솔창에 출력함
      console.log("event received" + param);
      this.leftDrawerOpen = false;
    },
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
