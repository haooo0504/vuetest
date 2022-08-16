<template>
  <div>
    <Editor v-model="content" :height="300" placeholder="請輸入內容" />
    {{ content }}
  </div>
</template>

<script setup lang="ts">
import Editor from "@/components/markdown/editor.vue";
import { ref } from "vue";
const content = ref("abc");
</script>

<style lang="scss" scoped></style>
