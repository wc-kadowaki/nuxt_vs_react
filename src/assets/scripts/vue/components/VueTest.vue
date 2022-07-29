<template>
  <div>
    <InjectTest />
    <button @click="toggleButton();">トグルボタン</button>
    {{ flag }}
    <div class="tab-content">
      <button @click="changeComponent">コンポーネントを変える</button>
      <KeepAlive>
        <Component :is="current" />
      </KeepAlive>
    </div>
  </div>
</template>

<script setup>
import InjectTest from './InjectTest.vue';
import TabComponent from './TabComponent.vue';
import TabComponent2 from './TabComponent2.vue';
import { ref } from 'vue';

let flag = ref(false);

const current = ref(TabComponent);

const changeComponent = () => {
  if (current.value.name == 'TabComponent') {
    current.value = TabComponent2
  } else {
    current.value = TabComponent
  }
}

const toggleButton = () => {
  flag.value = !flag.value;
};

</script>
