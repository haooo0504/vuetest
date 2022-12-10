import { ref } from "vue";

export const workTypeList = ref([
  {
    value: "1",
    label: "類別一",
    subTitle: "abc",
    children: [
      { value: "1-1", label: "tag1-1", subTitle: "tag1", sort: 1 },
      { value: "1-2", label: "tag1-2", subTitle: "tag2", sort: 2 },
      { value: "1-3", label: "tag1-3", subTitle: "tag3", sort: 3 },
      { value: "1-4", label: "tag1-4", subTitle: "tag4", sort: 4 },
      { value: "1-5", label: "tag1-5", subTitle: "tag5", sort: 5 },
    ],
    isCheck: true,
    sort: 1,
  },
  {
    value: "2",
    label: "類別二",
    children: [
      { value: "2-1", label: "tag2-1", subTitle: "tag1", sort: 1 },
      { value: "2-2", label: "tag2-2", subTitle: "tag2", sort: 2 },
      { value: "2-3", label: "tag2-3", subTitle: "tag3", sort: 3 },
      { value: "2-4", label: "tag2-4", subTitle: "tag4", sort: 3 },
    ],
    isCheck: false,
    sort: 2,
  },
  {
    value: "3",
    label: "類別三",
    children: [
      {
        value: "3-1",
        label: "tag3-1",
        subTitle: "tag1",
        sort: 1,
        children: [
          { value: "3-1-1", label: "tag3-1-1", subTitle: "tag3-1-1", sort: 1 },
          { value: "3-1-2", label: "tag3-1-2", subTitle: "tag3-1-2", sort: 2 },
        ],
      },
      { value: "3-2", label: "tag3-2", subTitle: "tag2", sort: 2 },
    ],
    isCheck: true,
    sort: 3,
  },
]);
