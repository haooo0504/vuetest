<template>
  <Form
    class="flex justify-center items-center p-5"
    @submit="onSubmit"
    :validation-schema="schema"
  >
    <div
      class="w-[700px] bg-white md:grid grid-cols-2 rounded-md shadow-md overflow-hidden"
    >
      <div class="p-6">
        <h2 class="text-center text-gray-900 text-lg mt-3 md:mt-5">會員登入</h2>
        <div class="mt-5 md:mt-9">
          <Field name="account" value="admin123" class="input" label="帳號" />
          <ErrorMessage name="account" class="error" />
          <Field
            name="password"
            value="admin123"
            class="input mt-5"
            label="密碼"
            type="password"
          />
          <ErrorMessage name="password" class="error" />
          <!-- <hdInput v-model="form.account" placeholder="請輸入帳號" />
          <hdInput placeholder="請輸入密碼" class="input mt-5" /> -->
        </div>
        <button class="button">登入</button>
        <div class="flex gap-3 justify-center mt-5">
          <router-link to="/" class="text-sm text-zinc-700"
            >網站首頁</router-link
          >
          <router-link to="/auth/register" class="text-sm text-zinc-700"
            >會員註冊</router-link
          >
          <a href="" class="text-sm text-zinc-700">找回密碼</a>
        </div>
      </div>
      <div class="hidden md:block">
        <img src="/public/image/logoimg.jpg" alt="" class="h-[380px] w-full" />
      </div>
    </div>
  </Form>
</template>

<script setup lang="ts">
import v from "@/plugin/validate";
import util from "@/utils";
import { ElMessage } from "element-plus";
import userStore from "@/stores/userStore";

const user = userStore();
const { Form, Field, ErrorMessage } = v;

const onSubmit = async (values: any) => {
  user.login(values);
};

const schema = {
  account: { required: true },
  password: { required: true, min: 6 },
};

// import hdButtonVue from "@/components/form/hd-button.vue";
</script>

<script lang="ts">
export default {
  route: { name: "login", meta: { guest: true } },
};
</script>

<style lang="scss" scoped></style>
