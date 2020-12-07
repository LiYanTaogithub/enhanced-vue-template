<template>
  <div class="navbar">
    <!-- <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" /> -->
    <span>{{bankName}}</span>
    <div class="right-menu">
      <div class="hintimg"  @click="clickHint">
         <img src="../../assets/image/remind.png" alt="">
         <div class="redporint" v-if="hintDisplay"></div>
      </div>
     
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/user/profile">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import Search from '@/components/HeaderSearch'
import RuoYiGit from '@/components/RuoYi/Git'
import RuoYiDoc from '@/components/RuoYi/Doc'

import router from "@/router";

export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
    SizeSelect,
    Search,
    RuoYiGit,
    RuoYiDoc
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device',
      'bankName',
      'hintDisplay'
    ]),
    setting: {
      get() {
        return this.$store.state.settings.showSettings
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'showSettings',
          value: val
        })
      }
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('LogOut').then(() => {
          location.href = '/index'
        })
      })
    },
    clickHint(){
      if(router.currentRoute.path !== '/user/profile') {
        this.$router.push('/user/profile')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  position: relative;
  height: 50px;
  padding-left: 30px;
  overflow: hidden;
  color: #fff;
  font-size: 18px;
  // text-align: center;
  line-height: 50px;
  background: #304156;
  // box-shadow: 0 1px 4px rgba(0,21,41,.08);
  background-image: linear-gradient(#007a84,#00b5bb);

  // .hamburger-container {
  //   float: left;
  //   height: 100%;
  //   line-height: 46px;
  //   cursor: pointer;
  //   transition: background .3s;
  //   -webkit-tap-highlight-color:transparent;

  //   &:hover {
  //     background: rgba(0, 0, 0, .025)
  //   }
  // }

  // .breadcrumb-container {
  //   float: left;
  // }

  // .errLog-container {
  //   display: inline-block;
  //   vertical-align: top;
  // }

  .right-menu {
    display: flex;
    flex-direction: row;
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      height: 100%;
      padding: 0 8px;
      color: #5a5e66;
      font-size: 18px;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .hintimg {
      position: relative;
      margin-right: 30px;
      cursor: pointer;
    }
    .hintimg::after {
      width: 10px;
      height: 10px;
      color: red;
      background: red;
      content: '';
    }

    .redporint {
      position: absolute;
      top: 10px;
      right: 0;
      display: inline-block;
      width: 10px;
      height: 10px;
      color: red;
      background: red;
      border-radius: 50%;
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        position: relative;
        margin-top: 5px;

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          cursor: pointer;
        }

        .el-icon-caret-bottom {
          position: absolute;
          top: 25px;
          right: -20px;
          font-size: 12px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
