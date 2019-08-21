<template>
  <div id="app">
    <div class="top" v-show="isTop">
      <span class="txt">
        <img src="./assets/images/logo.png" alt="">
      </span>
    </div>

    <!-- 小狗按钮 -->
    <div class="dog iconfont icon-keji-" @click="ShowBack"></div>

    <!-- 向上弹窗 -->
    <transition name="slide">
      <div class="buyInfo" v-if="isBack">
        <div class="icon">
          <div @click="toBack">
            <p class="iconfont icon-houtui"></p>
            <span>后退</span>
          </div>
          <div @click="Reload">
            <p class="iconfont icon-shuaxin"></p>
            <span>刷新</span>
          </div>
          <div @click="toHome">
            <p class="iconfont icon-huidaoshouye-szxdf"></p>
            <span>回到首页</span>
          </div>
          <div>
            <p class="iconfont icon-tuichu"></p>
            <span>退出</span>
          </div>
        </div>
        <mt-button type="default" size="large" @click="DelShow">取消</mt-button>
      </div>
    </transition>

    <div id="nav" v-show="isNav">
      <router-link to="/home">
        <p class="iconfont icon-shouye"></p>
        <span>首页</span>
      </router-link>
      <router-link to="/goods/breakfast">
        <p class="iconfont icon-zaocan"></p>
        <span>元气早餐</span>
      </router-link>
      <router-link to="/goods/cake">
        <p class="iconfont icon-Desert-"></p>
        <span>生日蛋糕</span>
      </router-link>
      <router-link :to="token ? '/goods/carlist' : '/user/login' ">
        <p class="iconfont icon-gouwuche"></p>
        <span>购物车</span>
      </router-link>
      <router-link to="/userinfo">
        <p class="iconfont icon-wode"></p>
        <span>我的诺心</span>
      </router-link>
      <div class="carnum" v-if="token">{{carNum}}</div>
    </div>
    <keep-alive include="CakeList">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
// iOS禁止网页缩放
window.onload = function() {
	document.addEventListener('touchstart', function(event) {
		if (event.touches.length > 1) {
		event.preventDefault()
		}
	})
	document.addEventListener('gesturestart', function(event) {
		event.preventDefault()
	})
}

import {mapActions} from 'vuex';
import {mapState} from 'vuex';
export default {
  name: "app",
  data() {
    return {
      isTop: true,
      isNav: true,
      isBack: false,
    };
  },
  computed: mapState(['carNum', 'token']),
  methods: {
    // 点击小狗浮标
    ShowBack() {
      this.isBack = !this.isBack;
    },
    // 隐藏弹框
    DelShow() {
      this.isBack = false;
    },
    // 强制刷新当前页
    Reload() {
      this.$router.go(0); 
    },
    // 返回上一页
    toBack() {
      this.$router.back();
      this.isBack = false;
    },
    // 返还首页
    toHome() {
      this.$router.push('/home');
      this.isBack = false;
	},
	...mapActions(['reqCarnum'])
  },
  // 监听要跳往的路由是否需要显示上下导航栏
  watch: {
    $route(to, from) {
      const name = to.name;
      this.isNav = /home|CakeList|BreakfastList|CarList|Userinfo/.test(name);
      this.isTop = /home|CarList/.test(name);
    }
  },
  created() {
    // 把token存到本地和仓库store
    const token = localStorage.getItem('token');
    this.$store.state.token = token;
  },
  // 第一次进入的路由也要判断是否显示上下导航栏
  mounted() {
    this.isNav = /home|CakeList|BreakfastList|CarList|Userinfo/.test(this.$route.name);
	this.isTop = /home|CarList/.test(this.$route.name);
	this.reqCarnum();
  }
};
</script>


<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
li {
  list-style: none;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.top {
  position: sticky;
  left: 0;
  top: 0;
  right: 0;
  z-index: 1000;
  padding: 0.1rem 0;
  background-color: rgb(253, 252, 252);
  span {
    font-size: 0.35rem;
  }
  .txt {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.2rem;
    border-radius: 0.5rem;
    img{
      height: 0.3rem;
    }
  }
}

#nav {
  border-top: 1px solid #adadad;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 500;
  padding: 0.2rem 0;
  background-color: rgb(253, 252, 252);

  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
    &.router-link-exact-active {
      color: orange;
    }
  }
  p {
    font-size: 0.42rem;
    color: rgb(255, 198, 107);
    padding-bottom: 0.1rem;
  }
}
.carnum{
  width: 0.25rem;
  height: 0.25rem;
  text-align: center;
  line-height: 0.25rem;
  font-size: 0.2rem;
  background-color: red;
  padding: 0.05rem;
  border-radius: 50%;
  color: #fff;
  position: absolute;
  top: 0.1rem;
  left: 5.15rem;
}

.dog {
  position: fixed;
  top: 50%;
  right: 0.4rem;
  z-index: 999;
  font-size: 0.4rem;
  color: rgb(255, 94, 0);
  border-radius: 50%;
  padding: 0.1rem;
  background-color: rgba(197, 255, 182, 0.7);
}

.slide-enter {
  transform: translateY(100%);
}
.slide-enter-to {
  transform: translateY(0);
}
.slide-enter-active {
  transition: all 0.5s ease;
}
.slide-leave {
  transform: translateY(0);
}
.slide-leave-to {
  transform: translateY(100%);
}
.slide-leave-active {
  transition: all 0.5s ease;
}

.buyInfo {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 999;
  box-sizing: border-box;
  background-color: #fff;
  width: 100vw;
  display: flex;
  flex-direction: column;
  .icon {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0.2rem 0;
    background-color: rgb(251, 248, 248);
    div {
      padding: 0.3rem 0;
      p {
        font-size: 0.6rem;
      }
    }
  }

  button {
    height: 1rem;
    font-size: 0.25rem;
    background-color: rgb(236, 236, 236);
  }
}
</style>
