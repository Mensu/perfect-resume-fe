<template>
  <div id="app">
    <topbar class="topbar"/>
    <div class="main pt-40 pb-40 h-center">
      <transition :name="transition" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <login-register/>
    <mu-snackbar position="top"
                  :color="snakebarMsg && snakebarMsg.type"
                  :open="!!snakebarMsg">
      <mu-icon v-if="snakebarMsg" left :value="snakebarMsg.icon"/>
      {{ snakebarMsg && snakebarMsg.msg }}
    </mu-snackbar>
  </div>
</template>

<script>
import { Component, Vue, Provide, Watch } from 'vue-property-decorator';
import { State } from 'vuex-class';
import Topbar from './components/Topbar';
import LoginRegister from './components/LoginRegister';

@Component({
  name: 'app',
  components: {
    Topbar,
    LoginRegister,
  },
  created() {
    // 使得 $router reactive
    this.router = this.$router;
  },
})
export default class extends Vue {
  @State snakebarMsg;
  transition = 'slide-left';
  router = {};

  @Watch('$route')
  $routeChange($route, $oldRoute) {
    const order = {
      '/': 0,
      '/user-center': 1,
      '/admin': 2,
      '/_': 0,
    };
    this.transition = `slide-${order[$route.path] > order[$oldRoute.path] ? 'left' : 'right'}`;
  }

  @Provide()
  async reloadRouterView() {
    this.$router.push('_');
  }
}
</script>

<style lang="less">
html, body {
  margin: 0;
  height: 100%;
  width: 100%;
  background-color: #fbfbfb;
}
</style>


<style lang="less" scoped>
@duration: 0.3s;
@translate: 500px;

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.topbar {
  flex: 0 0 auto;
}

.main {
  flex: 1 1 auto;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all @duration ease;
}
.slide-left-enter, .slide-right-leave-to {
  transform: translateX(@translate);
  opacity: 0;
}
.slide-left-enter-to, .slide-left-leave,
.slide-right-enter-to, .slide-right-leave {
  transform: translateX(0px);
  opacity: 1;
}
.slide-right-enter, .slide-left-leave-to {
  transform: translateX(-@translate);
  opacity: 0;
}
</style>
