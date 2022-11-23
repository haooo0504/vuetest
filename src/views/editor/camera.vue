<template>
  <teleport to="body">
    <div class="mask">
      <el-header class="go">
        <div class="box">
          <video
            id="videoCamera"
            class="canvas"
            :width="videoWidth"
            :height="videoHeight"
            autoPlay
          ></video>
          <canvas
            id="canvasCamera"
            class="canvas"
            :width="videoWidth"
            :height="videoHeight"
          ></canvas>
        </div>
        <div class="footer">
          <el-button @click="getCompetence" icon="el-icon-video-camera">
            打开摄像头
          </el-button>
          <el-button @click="drawImage" icon="el-icon-camera"> 拍照 </el-button>
          <el-button @click="stopNavigator" icon="el-icon-switch-button">
            关闭摄像头
          </el-button>
          <el-button @click="resetCanvas" icon="el-icon-refresh">
            重置
          </el-button>
          <el-button @click="$emit('closed')" class="closeBtn">关闭</el-button>
        </div>
      </el-header>
    </div>
  </teleport>
</template>

<script setup>
import { ref, reactive, inject, toRefs, nextTick } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
const message = inject("$message");
const config = inject("$CONFIG");
const tool = inject("$TOOL");
const api = inject("$API");

const loading = ref(false);
const os = ref(false); //控制摄像头开关
let thisVideo = ref("");
let thisContext = ref("");
let thisCancas = ref("");
const videoWidth = ref(959);
const videoHeight = ref(500);
const postOptions = ref([]);
const certCtl = ref("");
const mask = ref(true);

//查询参数
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  imgSrc: undefined,
});
const closedPhono = ref(null);

const emit = defineEmits(["closed"]);
const props = defineProps({
  visible: { type: Boolean },
});
const { visible } = toRefs(props);
const handleChange = (val) => {
  console.log(visible);
};

//调用摄像头权限
const getCompetence = () => {
  nextTick(() => {
    os.value = false;
    thisCancas = document.getElementById("canvasCamera");
    thisContext = thisCancas.getContext("2d");
    thisVideo = document.getElementById("videoCamera");
    closedPhono.value = thisVideo;
    if (navigator.mediaDevices === undefined) {
      navigator.mediaDevices = {};
    }

    if (navigator.mediaDevices.getUserMedia === undefined) {
      navigator.mediaDevices.getUserMedia = function (constraints) {
        // 首先获取现存的getUserMedia(如果存在)
        let getUserMedia =
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia ||
          navigator.getUserMedia;
        if (!getUserMedia) {
          return Promise.reject(
            new Error("getUserMedia is not implemented in this browser")
          );
        }
        return new Promise(function (resolve, reject) {
          getUserMedia.call(navigator, constraints, resolve, reject);
        });
      };
    }

    const constraints = {
      audio: false,
      video: {
        width: videoWidth.value,
        height: videoHeight.value,
        transform: "scaleX(-1)",
      },
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (stream) {
        if ("srcObject" in thisVideo) {
          thisVideo.srcObject = stream;
        } else {
          thisVideo.src = window.URL.createObjectURL(stream);
        }
        thisVideo.onloadedmetadata = function (e) {
          thisVideo.play();
        };
      })
      .catch((err) => {
        ElMessage.error("没有开启摄像头权限或浏览器版本不兼容");
      });
  });
};

//绘制图片
const drawImage = () => {
  getCompetence();
  thisCancas = document.getElementById("canvasCamera");
  thisContext = thisCancas.getContext("2d");
  thisVideo = document.getElementById("videoCamera");
  thisContext.drawImage(thisVideo, 0, 0, 300, 200);
  //获取图片地址
  queryParams.imgSrc = thisCancas.toDataURL("image/png");
  console.log(queryParams.imgSrc);
};

//清空画布
const clearCanvas = (id) => {
  let c = document.getElementById(id);
  let cxt = c.getContext("2d");
  cxt.clearRect(0, 0, 300, 200);
};

//重置画布
const resetCanvas = () => {
  queryParams.imgSrc = "";
  clearCanvas("canvasCamera");
};

//关闭摄像头
const stopNavigator = () => {
  // thisVideo = document.getElementById("videoCamera");
  if (closedPhono.value && closedPhono.value !== null) {
    thisVideo.srcObject.getTracks()[0].stop();
    os.value = true;
  } else {
    ElMessage.error("没有开启摄像头权限或浏览器版本不兼容");
  }
};
defineExpose({
  stopNavigator,
});
</script>

<style scoped>
.footer {
  width: 959px;
  height: 50px;
  background-color: white;
  justify-content: space-between;
  float: left;
  margin-top: 217px;
}
.detailed {
  width: 1200px !important;
  height: 800px !important;
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
}

.oText {
  margin-left: 42px;
}
.mask {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}
.closeBtn {
  float: right;
}
.box {
  width: 959px;
  height: 500px;
  margin-top: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  float: left !important;
}
.go {
  width: 1000px;
  height: 800px;
  background-color: white;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: inline-block;
}
</style>
