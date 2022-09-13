<template>
  <el-button text @click="dialogVisible = true">新增用戶</el-button>

  <!-- <el-dialog
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
  </el-dialog> -->

  <el-dialog
    v-model="dialogVisible"
    title="新增用戶"
    custom-class="dialog"
    :before-close="handleClose"
  >
    <el-form :rules="rules" ref="CreateFormref" :model="CreateForm">
      <el-form-item label="名稱" prop="name">
        <el-input v-model="CreateForm.name" placeholder="名稱" clearable />
      </el-form-item>
      <el-form-item label="帳號" prop="account">
        <el-input v-model="CreateForm.account" placeholder="帳號" clearable />
      </el-form-item>
      <el-form-item label="密碼" prop="password">
        <el-input v-model="CreateForm.password" placeholder="密碼" clearable />
      </el-form-item>
      <span class="dialog-footer flex justify-end">
        <el-button @click="cancel">Cancel</el-button>
        <el-button type="primary" @click="changePermissions(CreateFormref)"
          >Confirm</el-button
        >
      </span>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  ElMessageBox,
  type FormRules,
  type FormInstance,
  ElMessage,
} from "element-plus";
import { firebaseStores } from "@/stores/firebaseStore";

class createUser {
  CreateForm = {
    account: "",
    password: "",
    name: "",
  };
  CreateFormref = ref<FormInstance>();
}
const CreateForm = reactive(new createUser().CreateForm);
const CreateFormref = ref(new createUser().CreateFormref);

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

const changePermissions = async (formEl: FormInstance | undefined) => {
  await formEl?.validate((valid: boolean) => {
    if (valid) {
      firebaseStore.add("users", CreateForm.account, {
        active: true,
        name: CreateForm.name,
        account: CreateForm.account,
        password: CreateForm.password,
        permissions: [],
        token: "123456",
      });
      dialogVisible.value = false;
      ElMessage({
        message: "新增用戶成功",
        type: "success",
      });
    }
  });
};
const cancel = () => {
  CreateForm.name = "";
  CreateForm.account = "";
  CreateForm.password = "";
  dialogVisible.value = false;
};

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
</script>

<style lang="scss" scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
