<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="8" :xs="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>基本资料</span>
          </div>
          <el-tabs v-model="activeTab">
            <el-tab-pane label="基本资料" name="userinfo">
              <ul class="list-group list-group-striped">
                <li class="list-group-item">
                  <svg-icon icon-class="user" />用户名称
                  <div class="pull-right">{{ user.userName }}</div>
                </li>
                <li class="list-group-item">
                  <svg-icon icon-class="phone" />手机号码
                  <div class="pull-right">{{ user.phonenumber }}</div>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="resetPwd">
              <resetPwd :user="user" />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
      <el-col :span="16" :xs="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>消息提醒</span>
          </div>
          <div>
            <ul class="list-group list-group-striped">
              <li
                :key="key"
                v-for="({ content, createDate }, key) in msgList"
                class="list-group-item"
                style="
                  display: flex;
                  flex-direction: row;
                  justify-content: space-between;
                "
              >
                <span>{{ content }}</span>
                <span>{{ createDate }}</span>
              </li>
            </ul>
          </div>
          <div v-if="showNothing" class="nothing">
            <div class="box">
              <h3>暂无消息</h3>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import resetPwd from "./resetPwd";
import { getUserProfile, fetchLogs } from "@/api/system/user";

export default {
  name: "Profile",
  components: { resetPwd },
  data() {
    return {
      user: {},
      roleGroup: {},
      postGroup: {},
      activeTab: "userinfo",
      msgList: undefined,
      showNothing: false,
    };
  },
  // 系统消息页加上
  mounted() {
    this.getUser();
    this.getLogs();
  },
  watch: {
    "$store.state.app.systemMsgToggle": function () {
      this.getLogs();
    },
  },
  methods: {
    getUser() {
      getUserProfile().then((response) => {
        this.user = response.data;
        this.roleGroup = response.roleGroup;
        this.postGroup = response.postGroup;
      });
    },
    async getLogs() {
      const res = await fetchLogs();
      if (res.code === 200) {
        // 获取列表成功了，再 hintDisplay
        this.$store.commit("app/SET_HINT_DISPLAY", false);

        if (res.data.length) {
          this.showNothing = false;
          this.msgList = res.data;
        } else {
          this.showNothing = true;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  width: 200px;
  height: 200px;
  margin: 0 auto;
  padding-top: 150px;
  text-align: center;
  background-image: url(../../../../assets/image/nothing.png);
  background-repeat: no-repeat;
  background-position: center 0;
  background-size: 205px;
}
</style>
