<template>
  <div class="form-container">
    <div class="container" :class="{ sigin }">
      <el-form
        ref="RegisterFormRef"
        :model="RegiserForm"
        status-icon
        :rules="rules"
        class="form"
      >
        <section class="flex justify-center">
          <h1>註冊帳號</h1>
        </section>
        <el-form-item prop="name">
          <el-input
            v-model="RegiserForm.name"
            autocomplete="off"
            clearable
            placeholder="名稱："
          />
        </el-form-item>
        <el-form-item prop="account">
          <el-input
            v-model="RegiserForm.account"
            autocomplete="off"
            clearable
            placeholder="帳號："
            class="mt-[15px]"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="RegiserForm.password"
            type="password"
            show-password
            autocomplete="off"
            clearable
            placeholder="密碼："
            class="mt-[15px]"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="RegiserForm.token"
            autocomplete="off"
            clearable
            placeholder="邀請碼"
            class="mt-[15px]"
          />
        </el-form-item>
        <div class="flex gap-4 justify-center items-center mt-5">
          <span
            class="text-sm text-gray-600 hover:text-orange-300 hover:font-bold cursor-pointer"
            @click="router.push({ name: 'home' })"
            >網站首頁</span
          >
          <span class="text-base">|</span>
          <span
            class="text-sm text-gray-600 hover:text-orange-300 hover:font-bold cursor-pointer"
            >找回密碼</span
          >
          <span class="text-base">|</span>
          <router-link
            to="/auth/login"
            class="text-sm text-gray-600 hover:text-orange-300 hover:font-bold cursor-pointer"
            @click="sigin = !sigin"
            >用戶登入</router-link
          >
        </div>
        <section class="elbutton">
          <el-button
            type="primary"
            @click="submitRegisterForm(RegisterFormRef)"
            class="w-[150px] rounded-full text-gray-600 border-[#53745d] hover:bg-[#678F74] bg-[#678F74]"
            >註冊</el-button
          >
        </section>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import type { ILoginData, IRegisterData } from "../../apis/userApi";
// import { userStores } from '@/stores/userStore'
import router from "@/router";
import userStore from "@/stores/userStore";

class InitData {
  loginForm: ILoginData = {
    account: "admin123",
    password: "admin123",
  };
  RegiserForm: IRegisterData = {
    account: "",
    password: "",
    name: "",
    token: "",
  };
  loginFormRef = ref<FormInstance>();
  RegisterFormRef = ref<FormInstance>();
}

const sigin = ref(false);
const RegiserForm = reactive(new InitData().RegiserForm);
const RegisterFormRef = new InitData().RegisterFormRef;

const rules = reactive<FormRules>({
  account: [
    { required: true, message: "請輸入電子信箱", trigger: "blur" },
    { min: 5, max: 24, message: "帳號長度在 5 到 24 之間", trigger: "blur" },
  ],
  password: [
    { required: true, message: "請輸入密碼", trigger: "blur" },
    { min: 5, max: 12, message: "密碼長度在 5 到 12 之間", trigger: "blur" },
  ],
  name: [
    { required: true, message: "請輸入名稱", trigger: "blur" },
    { min: 1, max: 10, message: "名稱在1到10個字", trigger: "blur" },
  ],
});

const user = userStore();
// const submitForm = async (formEl: FormInstance | undefined) => {
//   await formEl?.validate((valid: boolean) => {
//     if (valid) {
//       userStore.login(loginForm)
//     }
//   })
// }
const submitRegisterForm = async (formEl: FormInstance | undefined) => {
  await formEl?.validate((valid: boolean) => {
    if (valid) {
      if (RegiserForm.token == "123456") {
        user.createUser(RegiserForm);
      } else {
        ElMessage.error("認證碼錯誤");
      }
    }
  });
};
</script>

<style lang="scss" scoped>
.form-container {
  position: relative;
  @apply flex justify-center items-center;

  .container {
    @apply relative w-[400px] min-h-[400px] rounded-[10px] flex justify-center items-center;
    background: rgba(255, 255, 255, 0.5);
    box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(136, 136, 136, 0.5);
  }

  .el-form {
    @apply relative w-full h-full p-[40px];

    h1 {
      @apply relative text-hd-black1 text-[24px] font-semibold mb-[40px];
      letter-spacing: 1px;
    }

    .el-input {
      @apply w-full border-0 outline-none px-[20px] py-[10px] rounded-[35px] text-base focus:ring-1 ring-offset-2 duration-200 focus:border-white;
      border: 1px solid rgba(136, 136, 136, 0.5);

      letter-spacing: 1px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);

      ::placeholder {
        color: var(--hd-black1) !important;
      }
      :deep(.el-input__suffix-inner) {
        @apply text-green-500;
      }
    }
  }
}
.elbutton {
  @apply flex justify-center items-center mt-5 w-auto;
}
:deep(.el-input__wrapper) {
  background: none !important;
  background-color: transparent !important;
  box-shadow: none !important;
}

:deep(.el-button) {
  &.el-button--primary:not(.is-text) {
    background-color: #678f74 !important;
    border: #678f74 !important;
    border-color: transparent !important;
    color: #fff !important;
  }
  &:hover,
  &.el-button--primary:not(.is-text):hover {
    background-color: #53745d !important;
    border-color: transparent !important;
    color: #fff !important;
  }
  &:focus {
    border-color: #53745d !important;
    color: #53745d !important;
  }
}
</style>
