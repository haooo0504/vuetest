<template>
  <div class="bg">
    <div class="schedule-form__header">
      <span>編輯工作項目</span>
    </div>
    <el-form
      :model="submitForm[0]"
      label-width="auto"
      label-position="top"
      class="form"
      ref="submitFormRef"
      :rules="submitFormRules"
    >
      <el-form-item label="工作項目" prop="title">
        <el-input v-model="submitForm[0].title" />
      </el-form-item>
      <el-form-item label="勤務類型">
        <el-tree-select
          v-model="submitForm[0].workType"
          :data="workResultOptions"
          multiple
          :render-after-expand="false"
          filterable
          collapse-tags
          collapse-tags-tooltip
        />
      </el-form-item>
      <el-form-item label="工作對象" prop="workObj">
        <el-select v-model="submitForm[0].workObj" placeholder="Select">
          <el-option
            v-for="items in options"
            :key="items.value"
            :label="items.label"
            :value="items.value"
            :disabled="items.disabled"
          />
        </el-select>

        <!-- <el-form-item>
            <el-input v-model="submitForm[0].workObj" />
          </el-form-item> -->
      </el-form-item>
      <el-form-item label="預計拜訪成果" prop="workResult">
        <el-tree-select
          v-model="submitForm[0].workResult"
          :data="workResultOptions"
          multiple
          :render-after-expand="false"
          filterable
          collapse-tags
          collapse-tags-tooltip
        />
      </el-form-item>
      <div
        v-for="(item, index) in submitForm"
        :key="index"
        style="margin-top: 20px"
      >
        <el-card class="box-card">
          <div>
            <el-form-item label="開始時間" prop="start">
              <el-date-picker
                v-model="item.start"
                type="datetime"
                placeholder="Pick a Date"
                format="YYYY/MM/DD HH:mm:ss"
                value-format="YYYY-MM-DD HH:mm:ss"
                :disabledDate="disabledDate"
              />
              {{ index }}
            </el-form-item>
            <el-form-item label="結束時間" prop="end">
              <el-date-picker
                v-model="item.end"
                type="datetime"
                placeholder="Pick a Date"
                format="YYYY/MM/DD HH:mm:ss"
                value-format="YYYY-MM-DD HH:mm:ss"
                :disabledDate="disabledVoteDate"
                :disabled="!item.start"
              />
            </el-form-item>
          </div>

          <el-button
            v-if="index != 0"
            type="danger"
            size="small"
            @click="del(index)"
            >刪除時段</el-button
          >
        </el-card>
      </div>
      <el-button
        style="width: 100%; margin-top: 20px"
        type="primary"
        @click="addDriver(submitForm[0])"
        >增加時段</el-button
      >
      <div style="margin-top: 30px; display: flex; justify-content: end">
        <el-form-item>
          {{ submitForm }}

          <el-button type="primary" @click="handleDateSelect">送出</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { INITIAL_EVENTS, createEventId } from "./calendarSet";
import { ElForm } from "element-plus";
import { workTypeList } from "./resultList";

// 動態增加select - options
const workResultOptions = ref([]);

onMounted(() => {
  const getTagList = () => {
    workResultOptions.value.push(...workTypeList.value);
    console.log(workResultOptions.value);
  };
  getTagList();
});

//
const router = useRouter();
const cancel = () => {
  router.push({ name: "index" });
};
let submitForm = reactive([
  {
    id: createEventId(),
    title: "",
    start: "",
    end: "",
    position: "",
    workType: "",
    workObj: "",
    workResult: "",
  },
]);

// const submitData = computed(() => {
//   return {
//     title: submitForm.title,
//     start: submitForm.start
//   }
// })

const handleDateSelect = async () => {
  await submitFormRef.value?.validate(async (valid) => {
    if (valid) {
      // test.setschedule(submitForm)
      // submitForm = submitForm.slice(1)
      //   submitForm = JSON.parse(JSON.stringify(submitForm));
      //   console.log(...submitForm);
      //   INITIAL_EVENTS.push(...submitForm);
      //   router.push({ name: "index" });
      //   console.log(INITIAL_EVENTS);
      console.log(123);
    } else {
      console.log(456);
    }
  });
};

const options = [
  {
    value: "Option1",
    label: "1",
  },
  {
    value: "Option2",
    label: "2",
  },
  {
    value: "Option3",
    label: "3",
  },
];

const info = [
  {
    title: "",
    start: null as number | null,
    end: null as number | null,
    workObj: "",
    workResult: "",
  },
];

const del = (index: number) => {
  submitForm.splice(index, 1);
};

// 表單驗證
const submitFormRef = ref<InstanceType<typeof ElForm>>();

const validateCount = (rule: any, value: string, callback: Function) => {
  if (value == "") {
    callback(new Error("請輸入結束時間"));
  } else {
    if (new Date(value) < new Date(submitForm[0].start!)) {
      console.log(value);
      callback(new Error("不得小於開始時間"));
    } else {
      callback();
    }
  }
  //   else if (!value) {
  //     console.log(value);
  //     callback(new Error("請選擇結束日期"));
  //   } else {
  //     callback();
  //   }
};
const submitFormRules = {
  title: [{ required: true, message: "請輸入標題", trigger: "blur" }],
  start: [{ required: true, message: "請選擇開始日期", trigger: "blur" }],
  end: [{ required: true, message: "請選擇結束日期", trigger: "blur" }],
  // baseCount: [{ required: true, validator: validateCount, trigger: 'blur' }],
  // targetCount: [{ required: true, validator: validateCount, trigger: 'blur' }]
};

const addDriver = (info) => {
  //   submitFormRef.value?.validate((valid) => {
  //     if (!valid) {
  //       console.log(123);
  //     } else {
  //     }
  //   });
  submitForm.push({
    id: createEventId(),
    title: info.title,
    start: info.start,
    end: info.end,
    position: info.position,
    workType: info.workType,
    workObj: info.workObj,
    workResult: info.workResult,
  });
  submitForm[0].start = "";
  submitForm[0].end = "";
  // submitForm[0].workObj = ''
  // submitForm[0].workResult = ''
  console.log(456);
};
// 時間選擇器規則
const today = new Date();
const startDateRange = computed(() => {
  if (submitForm[0].start) {
    console.log(submitForm[0].start, new Date(submitForm[0].start));
    return new Date(submitForm[0].start);
  } else {
    return today;
  }
});

const disabledDate = (time: Date) => {
  return time < new Date(new Date().setDate(today.getDate() - 1));
};
const disabledVoteDate = (time: Date) => {
  return (
    // time.getTime() < new Date(startDateRange.value).getTime() ||
    // time.getTime() >= new Date(startDateRange.value).getTime() + 3600 * 1000 * 24
    time <=
      new Date(
        new Date(startDateRange.value).setDate(
          startDateRange.value.getDate() - 1
        )
      ) || time > new Date(new Date().setDate(startDateRange.value.getDate()))
  );
};
</script>

<style lang="scss" scoped>
.bg {
  width: 98%;
  min-height: 80vh;
  padding-right: 2.5%;
  padding-left: 2.5%;
  margin: 30px auto 60px auto;
  overflow: hidden;
  background-color: #fff;
  border: solid 1px #ebeef5;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.form {
  padding: 20px;
}
.schedule-form__header {
  padding: 20px 20px 0;
  display: flex;
  align-items: center;
  font-size: 25px;
  font-weight: bold;
  line-height: 2.1;
}

//   :deep(.el-form-item:nth-of-type(3)),
//   :deep(.el-form-item:nth-of-type(4)) {
//     margin-top: 60px;
//   }
</style>
