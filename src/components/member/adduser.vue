<template>
  <el-button text @click="dialogVisible = true">新增用戶</el-button>

  <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="30%"
    :before-close="handleClose"
  >
    <el-input v-model="CreateForm.name" placeholder="名稱" clearable />
    <el-input v-model="CreateForm.account" placeholder="帳號" clearable />
    <el-input v-model="CreateForm.password" placeholder="密碼" clearable />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">Cancel</el-button>
        <el-button type="primary" @click="changePermissions">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ElMessageBox } from "element-plus";
import { firebaseStores } from "@/stores/firebaseStore";

class createUser {
  CreateForm = {
    account: "",
    password: "",
    name: "",
  };
}
const CreateForm = reactive(new createUser().CreateForm);

const dialogVisible = ref(false);
const firebaseStore = firebaseStores();

const handleClose = (done: () => void) => {
  ElMessageBox.confirm("確定要關閉嗎?")
    .then(() => {
      cancel();

      // done();
    })
    .catch(() => {
      // catch error
    });
};

const changePermissions = () => {
  firebaseStore.add("users", CreateForm.account, {
    active: true,
    name: CreateForm.name,
    account: CreateForm.account,
    password: CreateForm.password,
    permissions: [],
    token: "123456",
  });
  dialogVisible.value = false;
};
const cancel = () => {
  CreateForm.name = "";
  CreateForm.account = "";
  CreateForm.password = "";
  dialogVisible.value = false;
};
</script>

<style lang="scss" scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
