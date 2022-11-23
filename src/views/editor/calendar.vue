<template>
  <div class="business-bg">
    <div ref="elementRef" class="calendar">
      <FullCalendar :options="options" ref="calendarRef" />
    </div>
    <div style="margin-top: 10px">
      <el-button size="mini" type="primary" @click="add">新增</el-button>
      <el-button size="mini" type="primary" @click="add">回報</el-button>
      <el-button :plain="true" @click="takePhoto" class="uploadPhotos"
        >拍照</el-button
      >
      <Photo ref="clearCamera" v-if="visible" @closed="clearIntervals" />
    </div>
    <div class="demo-collapse" style="margin-top: 10px">
      <el-collapse
        v-model="test"
        @change="handleChange"
        v-for="(r, index) of test"
        :key="index"
      >
        <el-collapse-item :title="r.title" name="1">
          <div>
            Consistent with real life: in line with the process and logic of
            real life, and comply with languages and habits that the users are
            used to;
          </div>
          <div>
            Consistent within interface: all elements should be consistent, such
            as: design style, icons and texts, position of elements, etc.
          </div>
          <el-button size="mini" type="primary" @click="add" class="report"
            >回報</el-button
          >
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "@fullcalendar/core/vdom";
import FullCalendar from "@fullcalendar/vue3";
import type { CalendarOptions } from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { reactive, ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { INITIAL_EVENTS, createEventId } from "./calendarSet";
import Photo from "./camera.vue";

const test3 = ref([]);
// const test2=computed(()=>{
//   title:
// })

const activeNames = reactive({
  name: "",
  start: "",
});

const router = useRouter();
const id = ref();
// 讓行事曆可以在各種視窗自動調整大小
const elementRef = ref();
const calendarRef = ref<typeof FullCalendar | null>(null);
const resize = new ResizeObserver(() => {
  calendarRef.value?.getApi().updateSize();
});
onMounted(() => {
  //綁定組件監聽尺寸變化
  resize.observe(elementRef.value);
});
const handleDateSelect = (selectInfo) => {
  // eslint-disable-next-line no-alert
  const title = prompt("請輸入標題");
  const calendarApi = selectInfo.view.calendar;
  calendarApi.unselect(); // clear date selection
  if (title) {
    calendarApi.addEvent({
      id: createEventId(),
      title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay,
    });
  }
};

const refetchEvents = (arg) => {
  console.log(arg);
};
const add = () => {
  router.push({ name: "newSchedule" });
  INITIAL_EVENTS.push({
    title: "123",
    start: "2022-11-12",
    id: "123",
  });
  calendarRef.value?.getApi().refetchEvents();
  console.log(calendarRef.value?.getApi());
};

const test = [
  {
    title: "拜訪",
    start: "2022-11-18",
    abc: "abc",
  },
  {
    title: "拜訪1",
    start: "2022-11-18",
  },
  {
    id: "a",
    title: "拜訪",
    start: "2022-11-19",
  },
  {
    id: "ab",
    title: "拜訪",
    start: "2022-11-22",
  },
];
const submitForm = reactive({
  title: "",
  start: null as number | null,
});

const options = reactive({
  plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
  initialView: "dayGridMonth",
  headerToolbar: {
    start: "title",
    center: "prev,today,next",
    end: "dayGridMonth,dayGridWeek,timeGridDay,listDay",
  },
  titleFormat: {
    year: "numeric",
    month: "numeric",
  },
  buttonText: {
    today: "今日",
    month: "月",
    week: "週",
    day: "日",
    list: "清單",
  },
  editable: true,
  selectable: true,
  weekends: true,
  dayMaxEventRows: true,
  moreLinkContent: "...",
  eventDisplay: "list-item",
  titleRangeSeparator: ",",
  longPressDelay: 800,

  dateClick: (info) => {
    let schedule = JSON.parse(JSON.stringify(options.events));
    let curSchedule = schedule.filter((sche) => {
      let date = info.dateStr;
      return sche.start == date ? true : false;
    });

    console.log(curSchedule);
    test3.value.push(curSchedule);
    alert(curSchedule);
  },
  select: handleDateSelect,
  initialEvents: INITIAL_EVENTS,
} as CalendarOptions);
// const aaa = () => {
//   options.events.push({ id: 'b', start: '2022-11-11', title: 'aaa' })
// }
// aaa()

//控制拍照功能的显示和隐藏
const visible = ref(false);
const takePhoto = () => {
  visible.value = true;
};

//清除拍照功能
const clearCamera = ref();
const clearIntervals = () => {
  nextTick(() => {
    clearCamera.value.stopNavigator();
  });
  visible.value = false;
};
</script>

<style lang="scss" scoped>
.calendar {
  margin-top: 10px;
}
:deep(.fc-toolbar-chunk) {
  margin-top: 10px;
}
:deep(.fc-header-toolbar) {
  // display: inline;
  font-size: 12px;
}
:deep(.fc-col-header) {
  font-size: 10px;
}
:deep(.fc-view-harness) {
  height: 450px !important;
}
.report {
  float: right;
  margin: 20px;
}
</style>
