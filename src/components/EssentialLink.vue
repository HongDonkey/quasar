<template>
  <section v-if="external">
    <q-item clickable tag="a" target="_blank" :href="link" @click="sendEvent()">
      <!-- 클릭하면 sendEvent 함수 호출 -->
      <q-item-section v-if="icon" avatar>
        <q-icon :name="icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ title }}</q-item-label>
        <q-item-label caption>
          {{ caption }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </section>
  <section v-else>
    <router-link :to="link" style="text-decoration: none; color: inherit">
      <q-item>
        <q-item-section v-if="icon" avatar>
          <q-icon :name="icon" />
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ title }}</q-item-label>
          <q-item-label caption>
            {{ caption }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </router-link>
  </section>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: "",
    },

    link: {
      type: String,
      default: "#",
    },

    icon: {
      type: String,
      default: "",
    },

    external: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    sendEvent() {
      this.$emit("closeDrawer", 100);
      // closeDrawer 이라는 변수에 100이라는 파라미터를 담아서 emit함
      console.log("emit event");
    },
  },
});
</script>
