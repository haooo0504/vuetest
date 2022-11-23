<template>
  <div class="bg">
    <div class="schedule-form__header">
      <span>{{ id ? "編輯" : "新增" }}工作項目</span>
    </div>
    <el-form
      :model="submitForm"
      label-width="auto"
      label-position="top"
      class="form"
    >
      <el-form-item label="工作項目">
        <el-input v-model="submitForm.title" />
      </el-form-item>
      <el-form-item label="開始時間">
        <el-col :span="11">
          <el-date-picker
            v-model="submitForm.start"
            type="date"
            placeholder="Pick a date"
            style="width: 100%"
          />
        </el-col>
        <el-col :span="2" class="text-center">
          <span class="text-gray-500">-</span>
        </el-col>
        <el-col :span="11">
          <el-time-picker
            v-model="form.date2"
            placeholder="Pick a time"
            style="width: 100%"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="結束時間">
        <el-col :span="11">
          <el-date-picker
            v-model="submitForm.end"
            type="date"
            placeholder="Pick a date"
            style="width: 100%"
          />
        </el-col>
        <el-col :span="2" class="text-center">
          <span class="text-gray-500">-</span>
        </el-col>
        <el-col :span="11">
          <el-time-picker
            v-model="form.date2"
            placeholder="Pick a time"
            style="width: 100%"
          />
        </el-col>
      </el-form-item>

      <el-form-item label="工作對象">
        <el-select v-model="value" placeholder="Select">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="預計拜訪成果">
        <el-input v-model="submitForm.title" />
      </el-form-item>
      <el-form-item label="定位">
        <el-input v-model="submitForm.title" />
      </el-form-item>
      <el-form-item label="拍照">
        <el-input v-model="submitForm.title" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleDateSelect">Create</el-button>
        <el-button @click="cancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const cancel = () => {
  router.push({ name: "calendar" });
};

const submitForm = reactive({
  title: "",
  start: null as number | null,
});
const submitData = computed(() => {
  return {
    title: submitForm.title,
    start: submitForm.start,
  };
});
const schedule: any = [];

const handleDateSelect = () => {};

// do not use same name with ref
const form = reactive({
  name: "",
  region: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
});

const options = [
  {
    value: "Option1",
    label: "社區",
  },
  {
    value: "Option2",
    label: "物業公司",
  },
  {
    value: "Option3",
    label: "建設公司",
  },
];
</script>

<style scoped>
.bg {
  margin-top: 10px;
  background-color: #fff;
}
.form {
  padding: 20px;
}
.schedule-form__header {
  padding: 20px;
  display: flex;
  align-items: center;
  font-size: 25px;
  font-weight: bold;
  line-height: 2.1;
}
</style>
