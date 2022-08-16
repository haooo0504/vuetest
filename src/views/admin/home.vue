<template>
  <div>
    <div class="grid md:grid-flow-col gap-3">
      <el-card
        class="box-card cursor-pointer"
        v-for="(card, index) in cards"
        :key="index"
        shadow="hover"
      >
        <template #header>
          <div class="card-header">
            <span class="flex justify-between items-center"
              >{{ card.title }}
              <el-tag class="ml-2" type="danger" effect="dark" size="small"
                >月</el-tag
              >
            </span>
          </div>
        </template>
        <section class="flex my-3 justify-between items-center">
          <span class="text-3xl">${{ card.price }}</span>
          <i :class="[card.icon]" class="text-2xl"></i>
        </section>
        <section class="text-base mt-6 flex justify-between">
          {{ card.totalTitle }}
          <span>{{ card.total }}</span>
        </section>
      </el-card>
    </div>
    <div class="mt-5 grid md:grid-cols-2 gap-3">
      <el-card :body-style="{ padding: '20px' }">
        <template #header>
          <div>用戶統計</div>
        </template>
        <div id="echart1" class="w-full h-72"></div>
      </el-card>
      <el-card :body-style="{ padding: '20px' }">
        <template #header>
          <div>用戶統計</div>
        </template>
        <div id="echart2" class="w-full h-80"></div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick } from "vue";
import { ref } from "vue";
import { echart1, echart2 } from "./echart";
import * as echarts from "echarts";
// import echarts from "echarts";

interface ICard {
  title: string;
  price: number;
  icon: string;
  iconColor: string;
  totalTitle: string;
  total: number;
}
const cards = ref<ICard[]>([
  {
    title: "訪問數",
    price: 541315,
    icon: "fas fa-chart-column",
    iconColor: "string",
    totalTitle: "總人數",
    total: 5462444,
  },
  {
    title: "銷售數",
    price: 457888,
    icon: "fas fa-money-check-dollar",
    iconColor: "string",
    totalTitle: "總銷售數",
    total: 2545314,
  },
  {
    title: "訂單數",
    price: 48524,
    icon: "fas fa-money-bill-trend-up",
    iconColor: "string",
    totalTitle: "總訂單數",
    total: 453423,
  },
  {
    title: "評論數",
    price: 13545,
    icon: "fas fa-comment-dots",
    iconColor: "string",
    totalTitle: "總評論數",
    total: 215615,
  },
]);

// nextTick(() => {
//   echarts
//     .init(document.getElementById("echart1") as HTMLDivElement)
//     .setOption(echart1);
//   echarts
//     .init(document.getElementById("echart2") as HTMLDivElement)
//     .setOption(echart2);
// });
let echarts1 = {} as echarts.ECharts;
let echarts2 = {} as echarts.ECharts;

onMounted(() => {
  echarts1 = echarts.init(document.getElementById("echart1") as HTMLDivElement);
  echarts1.setOption(echart1);

  echarts2 = echarts.init(document.getElementById("echart2") as HTMLDivElement);
  echarts2.setOption(echart2);
});
onUnmounted(() => {
  echarts1.dispose();
  echarts1.clear();
  echarts1 = null!;
  echarts2.dispose();
  echarts2.clear();
  echarts2 = null!;
});
</script>

<style lang="scss" scoped></style>
