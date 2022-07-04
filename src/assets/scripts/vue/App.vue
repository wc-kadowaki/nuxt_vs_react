<template>
  hello {{ text }}
  <VueTest />
</template>

<script setup>
import { onMounted } from "vue";
import VueTest from "./components/VueTest";

const text = 'world';

const hoge = () => {
  console.log('hoge');
}

onMounted(() => {
  hoge();
});

const foo = async function () {
  console.log('foo');
}

</script>