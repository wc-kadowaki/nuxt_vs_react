<template>
  hello {{ text }}
  <VueTest />
</template>

<script>
import { defineComponent } from "vue";
import VueTest from "./components/VueTest";

export default defineComponent({
  name: 'App',
  setup() {
    return {
      text: 'world'
    }
  },
  components: {
    VueTest,
  }
});

</script>