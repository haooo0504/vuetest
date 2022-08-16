<template>
  <div class="admin-menu" :class="{ close: menu.close }">
    <div class="menu w-[220px] bg-hd-bg-black">
      <div class="logo">
        <i class="fab fa-codepen text-[30px]"></i>
        <span class="aaa text-md ml-2">hello</span>
      </div>
      <div class="left-container">
        <dl v-for="(menus, index) of menu.menus" :key="index">
          <dt @click="handle(menus)">
            <section>
              <i :class="menus.icon" class="text-2xl"></i>
              <span class="text-md ml-2">{{ menus.title }}</span>
            </section>
            <section
              :class="{ 'rotate-180': menus.isClick }"
              class="duration-300"
            >
              <i class="fas fa-angle-down"></i>
            </section>
          </dt>
          <dd v-show="menus.isClick || refmenu.close.value">
            <div
              :class="{ active: cmenu?.isClick }"
              v-for="(cmenu, key) of menus?.children"
              :key="key"
              @click="handle(menus, cmenu)"
            >
              {{ cmenu?.title }}
            </div>
          </dd>
        </dl>
      </div>
      <div>
        <ThemeSetting class="setting">
          <span class="ml-2 text-base">設定</span>
        </ThemeSetting>
      </div>
    </div>

    <div class="bg block md:hidden" @click="menu.toggleState()"></div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";

import menuStore from "@/stores/menuStore";
import { watch } from "vue";
import type { IMenu } from "types/menu";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";

const menu = menuStore();
const refmenu = storeToRefs(menu);
const route = useRoute();
watch(route, () => menu.setCurrentMenu(route), { immediate: true });
console.log(menu.menus);

// const reset = () => {
//   menu.menus.forEach((menu) => {
//     menu.isClick = false;
//     menu.children?.forEach((cmenu) => {
//       cmenu.isClick = false;
//     });
//   });
// };

const handle = (pmenu: IMenu, cmenu?: IMenu) => {
  // reset();
  pmenu.isClick = !pmenu.isClick;
  if (cmenu) {
    cmenu.isClick = true;
    router.push({ name: cmenu.route });
  }
};
</script>

<style lang="scss" scoped>
.admin-menu {
  .menu {
    @apply h-full;
    .logo {
      @apply flex items-center p-4 py-5 text-ft-color;
    }
    .left-container {
      dl {
        @apply text-ft-color text-sm relative;
        dt {
          @apply text-sm p-4 flex justify-between cursor-pointer items-center;
          section {
            @apply flex items-center;
          }
        }
        dd {
          div {
            @apply py-3 pl-4 m-2  text-ft-color rounded-md cursor-pointer hover:bg-[#c1c2c4] duration-200;
            &.active {
              @apply bg-gray-400 text-white;
            }
          }
        }
      }
    }
    .setting {
      @apply w-[220px]  absolute bottom-0 py-4 px-4 text-[28px];
    }
  }
}

@media screen and(min-width:768px) {
  .admin-menu {
    &.close {
      .menu {
        width: 65px;

        .logo {
          @apply flex justify-center;

          span {
            @apply hidden;
          }
        }
        .left-container {
          dl {
            @apply relative;
            dt {
              @apply flex justify-center;
              section {
                span {
                  @apply hidden;
                }
                &:nth-of-type(2) {
                  @apply hidden;
                }
              }
            }
            dd {
              div {
                @apply hidden;
              }
            }

            &:hover {
              dd {
                display: block !important;
                @apply block absolute left-full z-50 top-0 w-[200px] bg-[#DCDDDF];
                div {
                  display: block !important;
                }
              }
            }
          }
        }
        .setting {
          @apply w-[65px] flex justify-center;

          span {
            @apply hidden;
          }
        }
      }
    }
  }
}
@media screen and(max-width:768px) {
  .admin-menu {
    @apply h-screen w-[200px] absolute left-0 top-0 z-50;
    .menu {
      @apply h-full z-50 absolute;
      .close {
      }
    }
    .bg {
      @apply bg-gray-100 z-40 opacity-75 w-screen h-screen absolute left-0 top-0;
    }
    &.close {
      @apply hidden;
    }
  }
}
</style>
