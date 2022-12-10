<template>
  <div class="business-bg">
    <div class="calendar-title">
      <div @click="getPrev">
        <i class="fas fa-angle-left"></i>
      </div>
      <p>{{ title }}</p>
      <div @click="getNext">
        <i class="fas fa-angle-right"></i>
      </div>
    </div>

    <div class="calendar-button">
      <div style="width: 80px">
        <el-select v-model="value" placeholder="日" @change="change(value)">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div style="width: 50px">
        <el-button size="small" @click="getToday">今日</el-button>
      </div>
      <div>
        <el-button type="primary" size="small" @click="add">新增</el-button>
        <el-button type="primary" size="small" @click="report">回報</el-button>
      </div>
    </div>
    <div ref="elementRef" class="calendar">
      <FullCalendar :options="options" ref="calendarRef" />
    </div>

    <div class="schedule-list">
      <!-- <p v-if="!test3.length">尚無資料</p> -->
      <p v-if="hasNotReport.length">未回報</p>
      <el-card
        class="box-card"
        v-model="hasNotReport"
        v-for="(r, index) of hasNotReport"
        :key="index"
      >
        <div class="card-header">
          <span>{{ `${r.start.split(" ")[0]} ${r.title}` }}</span>
          <el-button class="button" text @click="report(r.id)">回報</el-button>
        </div>
      </el-card>
    </div>
    <div class="schedule-list">
      <p v-if="hasReport.length">已回報</p>
      <el-card
        class="box-card"
        v-model="hasReport"
        v-for="(r, index) of hasReport"
        :key="index"
      >
        <div class="card-header">
          <span>{{ `${r.start.split(" ")[0]} ${r.title}` }}</span>
          <el-button class="button" text @click="report(r.id)">回報</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "@fullcalendar/core/vdom";
import type { CalendarOptions } from "@fullcalendar/vue3";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { INITIAL_EVENTS } from "./calendarSet";
// import { businessStores } from "/@/store/modules/business/index";

const value = ref("");
const options1 = [
  {
    value: "Option1",
    label: "月",
  },
  {
    value: "Option2",
    label: "週",
  },
  {
    value: "Option3",
    label: "日",
  },
  {
    value: "Option4",
    label: "清單",
  },
];

const test3 = ref<any>([]);
const hasReport = ref<any>([]);
const hasNotReport = ref<any>([]);

// const test1 = businessStores();

const router = useRouter();
// const id = ref()
// 讓行事曆可以在各種視窗自動調整大小
const elementRef = ref();
const calendarRef = ref<InstanceType<typeof FullCalendar>>();
const resize = new ResizeObserver(() => {
  calendarRef.value?.getApi().updateSize();
});

// 取得當天行程
const getDaySchedule = () => {
  console.log(222);
  hasReport.value = [];
  hasNotReport.value = [];
  let curSchedule = INITIAL_EVENTS.filter((sche) => {
    let date = title.value.split("/").join("");
    let scheDate = sche.start?.split(" ")[0].split("-").join("");
    return scheDate == date ? true : false;
  });
  curSchedule.forEach((sche) => {
    if (sche.position) {
      hasReport.value.push(sche);
      console.log(hasReport.value);
    } else {
      hasNotReport.value.push(sche);
    }
  });
};

// 取得當週行程
const getWeekSchedule = () => {
  hasReport.value = [];
  hasNotReport.value = [];
  let startDate = parseInt(title.value.split("-")[0].split("/").join(""));
  let endDate = parseInt(title.value.split("-")[1].split("/").join(""));
  let curSchedule = INITIAL_EVENTS.filter((sche) => {
    let scheDate = parseInt(sche.start?.split(" ")[0].split("-").join(""));
    return scheDate >= startDate && scheDate <= endDate ? true : false;
  });
  curSchedule.forEach((sche) => {
    if (sche.position) {
      hasReport.value.push(sche);
      console.log(hasReport.value);
    } else {
      hasNotReport.value.push(sche);
    }
  });
};

// 取得當月行程
const getMonthSchedule = () => {
  console.log(333);

  hasReport.value = [];
  hasNotReport.value = [];
  let startDate = parseInt(title.value.split("-")[0].split("/").join(""));
  let endDate = parseInt(title.value.split("-")[1].split("/").join(""));
  let curSchedule = INITIAL_EVENTS.filter((sche) => {
    let scheDate = parseInt(sche.start?.split(" ")[0].split("-").join(""));
    return scheDate >= startDate && scheDate <= endDate ? true : false;
  });
  curSchedule.forEach((sche) => {
    if (sche.position) {
      hasReport.value.push(sche);
      console.log(hasReport.value.length);
    } else {
      hasNotReport.value.push(sche);
      console.log(hasNotReport.value);
    }
  });
};
onMounted(() => {
  //綁定組件監聽尺寸變化
  resize.observe(elementRef.value);
  getTitle();
  getDaySchedule();
});

const curView = ref("Option3");
console.log(typeof curView.value);
// 切換日、週、月選擇框
const change = (value: string) => {
  // 月
  if (value == "Option1") {
    curView.value = value;
    calendarRef.value?.getApi().changeView("dayGridMonth");
    getTitle();
    getMonthSchedule();
  }
  // 週
  if (value == "Option2") {
    curView.value = value;
    calendarRef.value?.getApi().changeView("dayGridWeek");
    getTitle();
    getWeekSchedule();
  }
  // 日
  if (value == "Option3") {
    curView.value = value;
    calendarRef.value?.getApi().changeView("timeGridDay");
    getTitle();
    getDaySchedule();
  }
  // 清單
  if (value == "Option4") {
    curView.value = value;
    calendarRef.value?.getApi().changeView("listMonth");
    getTitle();
    getMonthSchedule();
  }
};

// 日曆時間
const title = ref("");
const getTitle = () => {
  title.value = calendarRef.value?.getApi().view.title;
};

// 切換到今天時間
const getToday = () => {
  calendarRef.value?.getApi().today();
  getTitle();
  switch (curView.value) {
    case "Option1":
      getMonthSchedule();
      break;
    case "Option2":
      getWeekSchedule();
      break;
    case "Option3":
      getDaySchedule();
      break;
    case "Option4":
      getMonthSchedule();
      break;
    default:
      break;
  }
};

// 切換到上一月/天
const getPrev = () => {
  calendarRef.value?.getApi().prev();
  getTitle();
  switch (curView.value) {
    case "Option1":
      getMonthSchedule();
      break;
    case "Option2":
      getWeekSchedule();
      break;
    case "Option3":
      getDaySchedule();
      break;
    case "Option4":
      getMonthSchedule();
      break;
    default:
      break;
  }
};

// 切換到下一月/天
const getNext = () => {
  calendarRef.value?.getApi().next();
  getTitle();
  switch (curView.value) {
    case "Option1":
      getMonthSchedule();
      break;
    case "Option2":
      getWeekSchedule();
      break;
    case "Option3":
      getDaySchedule();
      break;
    case "Option4":
      getMonthSchedule();
      break;
    default:
      break;
  }
};

// const handleDateSelect = (selectInfo) => {
//   // eslint-disable-next-line no-alert
//   const title = prompt('請輸入標題')
//   const calendarApi = selectInfo.view.calendar
//   calendarApi.unselect() // clear date selection
//   if (title) {
//     calendarApi.addEvent({
//       id: createEventId(),
//       title,
//       start: selectInfo.startStr,
//       end: selectInfo.endStr,
//       allDay: selectInfo.allDay
//     })
//   }
// }

const add = () => {
  router.push({ name: "newSchedule" });
};
const report = (info: string) => {
  router.push({ name: "editSchedule", params: { id: info } });
};

// 判斷行程是否回報
INITIAL_EVENTS.filter((list) => {
  if (list.position) {
    list.backgroundColor = "#93cabd";
  } else {
    list.backgroundColor = "#ddb26b";
  }
});

const options = reactive({
  plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
  initialView: "timeGridDay",
  headerToolbar: false,
  titleFormat: {
    year: "numeric",
    month: "numeric",
    day: "2-digit",
  },
  locale: "zn-ch",
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
  // navLinks: true,
  moreLinkContent: "...",
  eventDisplay: "list-item",
  titleRangeSeparator: "-",
  longPressDelay: 800,
  weekText: "周",
  dayHeaderContent(item) {
    return item.text.split("（")[0];
  },
  // navLinkDayClick: (date, jsEvent) => {
  // },

  eventClick: (info) => {
    console.log(info.event.id);

    // change the border color just for fun
    // info.el.style.borderColor = 'red'
  },
  dateClick: (info) => {
    hasReport.value = [];
    hasNotReport.value = [];
    // let schedule = JSON.parse(JSON.stringify(options.events))
    let curSchedule = INITIAL_EVENTS.filter((sche) => {
      let date = info.dateStr;
      return sche.start?.split(" ")[0] == date ? true : false;
    });
    curSchedule.forEach((sche) => {
      if (sche.position) {
        hasReport.value.push(sche);
      } else {
        hasNotReport.value.push(sche);
      }
    });
    report;
    test3.value.push(...curSchedule);
  },
  // select: handleDateSelect,
  events: INITIAL_EVENTS,
} as CalendarOptions);
</script>

<style lang="scss" scoped>
.business-bg {
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
.calendar-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
}
.calendar-button {
  display: flex;
  margin-top: 0px;
  align-items: center;
  justify-content: space-between;
}

.schedule-list {
  margin-top: 10px;
}
.calendar {
  margin-top: 10px;
}
:deep(.fc-toolbar-chunk) {
  margin-top: 10px;
}

.report {
  float: right;
  margin: 20px;
}

:deep(.fc .fc-button-primary:not(:disabled).fc-button-active),
:deep(.fc .fc-button-primary:not(:disabled):active) {
  background-color: #93cabd;
}
// :deep(.fc .fc-button-primary:not(:disabled):active) {
//   background-color: #fff;
// }
:deep(.fc-event-time) {
  overflow: hidden;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.box-card {
  margin-bottom: 10px;
}

:deep(.fc .fc-day-today) {
  background-color: #effaf7;
}
</style>
