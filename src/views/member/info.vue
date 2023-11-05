<template>
  <div class="flex justify-center items-center">
    <div>
      <div class="flex justify-center items-center">
        <section
          class="bg-gray-300 w-[180px] h-[180px] rounded-full overflow-hidden relative flex justify-center items-center cursor-pointer"
          @click="avatarDialog = true"
        >
          <i class="fas fa-image absolute z-10 text-lg"></i>
          <el-image
            :src="newuserinfo.avatar ?? '/image/photo.jpg'"
            fit="cover"
            class="user_avatar absolute z-20"
          >
          </el-image>
        </section>
      </div>

      <div class="flex w-[350px] mt-10 items-center border-b border-teal-500">
        <span class="mr-10 px-2 text-gray-600">用戶帳號</span>
        <div class="flex items-center flex-1 justify-between py-2">
          <span class="px-2">{{ user?.account }}</span>
          <section class="mr-2"></section>
        </div>
      </div>
      <div class="flex w-[350px] mt-10 items-center border-b border-teal-500">
        <span class="mr-10 px-2 text-gray-600">用戶名稱</span>
        <div class="flex items-center flex-1 justify-between py-2">
          <span class="px-2" id="useraccount">{{ newuserinfo.name }}</span>
          <section class="mr-2 cursor-pointer" @click="openName">
            <i class="fa-solid fa-pencil" />
          </section>
        </div>
      </div>
      <div class="flex w-[350px] mt-10 items-center border-b border-teal-500">
        <span class="mr-10 px-2 text-gray-600">用戶密碼</span>
        <div class="flex items-center flex-1 justify-between py-2">
          <span class="px-2" id="userpassword">{{ newuserinfo.password }}</span>
          <section class="mr-2 cursor-pointer" @click="openPassword">
            <i class="fa-solid fa-pencil" />
          </section>
        </div>
      </div>
      <Dialog
        v-model="dialogName"
        title="更改名稱"
        @before-close="changeName"
        @change-close="changeclosename"
        @change-sub="changeName"
      >
        <template #default>
          <div class="flex justify-center items-center">
            <span class="mr-5">新名稱：</span>
            <el-input
              v-model="CreateForm.name"
              placeholder="Please input"
              clearable
              class="flex-1"
            />
          </div>
        </template>
      </Dialog>

      <Dialog
        v-model="dialogPassword"
        title="更改密碼"
        @before-close="changePassword"
        @change-close="changeclosepass"
        @change-sub="changePassword"
      >
        <template #default>
          <div class="flex justify-center items-center">
            <span class="mr-5">新密碼：</span>
            <el-input
              v-model="CreateForm.password"
              placeholder="Please input"
              clearable
              class="flex-1"
            />
          </div>
        </template>
      </Dialog>
    </div>

    <member-editor-avatar v-model="avatarDialog" :userAccount="user?.account" />
  </div>
</template>

<script setup lang="ts">
import userStores from "@/stores/userStore";
import { firebaseStores } from "@/stores/firebaseStore";
import store from "@/utils/store";
import { CacheEnum } from "@/enum/cacheEnum";

// const userimg = await store.get(CacheEnum.USER_INFO).avatar;
const userStore = userStores();
const user = userStore.info;

class updateUser {
  CreateForm = {
    name: user?.name,
    password: user?.password,
  };
}
const CreateForm = reactive(new updateUser().CreateForm);

const avatarDialog = ref(false);

const firebaseStore = firebaseStores();
const newuserinfo = (await firebaseStore.get("users", user?.account!)) as IUser;

const dialogName = ref(false);
const dialogPassword = ref(false);
const editPermissions = ref<string[]>([]);
// const changeName = async () => {
//   firebaseStore.update("users", user?.account!, { name: CreateForm.name });
//   const a = await firebaseStore.get("users", user?.account!);
//   document.querySelector("#useraccount")!.innerHTML = a?.name!;

//   dialogName.value = false;
// };
const changeName = async () => {
  // userStore.info = { ...userStore.info, name: CreateForm.name };
  const a = await userStore.changeName("users", user?.account!, {
    name: CreateForm.name,
  });
  document.querySelector("#useraccount")!.innerHTML = a;
  CreateForm.name = a;

  dialogName.value = false;
};

const changePassword = async () => {
  firebaseStore.update("users", user?.account!, {
    password: CreateForm.password,
  });
  const a = await firebaseStore.get("users", user?.account!);
  document.querySelector("#userpassword")!.innerHTML = a?.password!;
  CreateForm.password = a?.password!;
  dialogPassword.value = false;
};
const openName = async () => {
  const a = await firebaseStore.get("users", user?.account!);
  CreateForm.name = a!.name;
  dialogName.value = true;
};

const openPassword = async () => {
  const a = await firebaseStore.get("users", user?.account!);
  CreateForm.password = a!.password;
  dialogPassword.value = true;
};

const changeclosename = async () => {
  const a = await firebaseStore.get("users", user?.account!);
  CreateForm.name = a!.name;
  dialogName.value = false;
};
const changeclosepass = async () => {
  const a = await firebaseStore.get("users", user?.account!);
  CreateForm.password = a!.password;
  dialogPassword.value = false;
};
</script>

<style scoped lang="scss">
.user_avatar {
  @apply w-full cursor-pointer relative flex justify-center items-center;

  &::after {
    content: "修改";
    @apply absolute text-white w-full h-full text-lg flex justify-center items-center invisible;
    background-color: #6f6f6f70;
  }
  &:hover::after {
    @apply visible;
  }
}
</style>
