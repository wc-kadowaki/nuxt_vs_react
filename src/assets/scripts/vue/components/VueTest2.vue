<script setup>
import { inject } from "vue";
const bar = inject('bar');
console.log(bar);
// barはreadonlyなのでコンポーネント側から値の変更はできないようにできる
bar.bar = 'updateText'; // エラーにはならずwornになる
</script>

<template>
  {{ bar.bar }}
</template>