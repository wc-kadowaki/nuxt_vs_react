<script setup>
import { inject } from "vue";
const bar = inject('bar');
console.log(bar);
</script>

<template>
  {{ bar }}
</template>