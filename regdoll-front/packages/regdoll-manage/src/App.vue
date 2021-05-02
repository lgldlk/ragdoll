<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3.0 + Vite" />
</template>

<script lang="ts">
import HelloWorld from './components/HelloWorld.vue';
import { defineComponent } from 'vue';
export default defineComponent({
  data() {
    return { count: 1 };
  },
  components: {
    HelloWorld,
  },
  methods: {
    increment() {
      this.count++;
    },
  },
});
</script>
