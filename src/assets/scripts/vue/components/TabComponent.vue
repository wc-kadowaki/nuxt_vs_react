<template>
  <div>
    <input type="text" v-model="inputText">
    <p>{{ inputText }}</p>
  </div>
</template>

<script setup>
import { onUpdated, ref } from 'vue';

const inputText = ref('');

onUpdated(() => {
  console.log('テキストを変更');
});
</script>

<script>
// export default {
//   data() {
//     return {
//       inputText: ''
//     }
//   }
// }
</script>