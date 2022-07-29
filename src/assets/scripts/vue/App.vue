<template>
  hello {{ text }}
  <button @click="hoge()">テキスト変更</button>
  <div>
    <button @click="countUp();">カウントアップ</button>通常：{{ refObject.count }}, 他：{{ refObject.otherCount }}
  </div>
  <div>
    <button @click="count++; foo();">ボタン</button>{{ count }}
  </div>
  <VueTest />
  <div>
    <button @click="barTest();">ボタン</button>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, provide, readonly } from "vue";
import VueTest from "./components/VueTest";

const text = ref('world');

const count = ref(0); // オブジェクト
// なんでtemplate側だとcount++でvalueが更新されているのかよくわからない
const foo = () => {
  console.log(count);
}

const refObject = reactive({ count: 0, otherCount: 1 }); // Proxyオブジェクト

const countUp = () => {
  refObject.count = refObject.count + 1;
  refObject.otherCount = refObject.otherCount * 2;
}

const provideObject = reactive({
  bar: 'text',
  bar2: 'text2',
  bar3: 'text3',
});

const barTest = () => {
  provideObject.bar = 'update text';
}

//コンポーネント側で値を変更されたくない場合はreadonlyで渡すことで制限できる
provide('bar', readonly(provideObject));

const hoge = () => {
  text.value = 'japan';
};

onMounted(() => {
  console.log('Component is mounted!');
});

</script>