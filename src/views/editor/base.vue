<template>
  <div><Editor v-model="content" />{{ content }}</div>
</template>

<script lang="ts" setup>
import Editor from "@/components/wangEditor/editor.vue";
import { ref } from "vue";
const content = ref("<p>abc123</p>");
</script>

<style lang="scss" scoped></style>
