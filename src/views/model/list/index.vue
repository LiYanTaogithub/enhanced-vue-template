<template>
  <div class="">
    <iframe
      id="test"
      ref="iframe"
      height="1000"
      width="100%"
      frameborder="no"
      scrolling="no"
      :src="src"
    />
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";
export default {
  components: {},
  data() {
    return {
      src:
        "https://ftctest.btonline365.com/html/Risk/model/model_list.html?token=" +
        getToken(),
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    console.log("src:", this.src);
    this.iframeInit();
  },
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  methods: {
    iframeInit() {
      // alert('2222')
      const iframe = this.$refs.iframe;
      // 链接为空不显示加载状态和绑定ifram监听事件
      // 处理兼容行问题
      if (iframe.attachEvent) {
        // 接受子级返回数据
        window.attachEvent(
          "onmessage",
          function () {
            // console.log("父级接收子级返回数据" + e.data);
            iframe.contentWindow.postMessage(
              {
                token: getToken(),
              },
              "https://ftctest.btonline365.com/html/Risk/model/model_list.html"
            );
          },
          false
        );
      } else {
        // 接受子级返回数据
        window.addEventListener(
          "message",
          (e) => {
            console.log(e.data);
            alert(JSON.stringify(e.data));
            // 外部vue向iframe内部传数据
            iframe.contentWindow.postMessage(
              {
                token: getToken(),
              },
              "https://ftctest.btonline365.com/html/Risk/model/model_list.html"
            );
          },
          false
        );
      }
    },
  },
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
