<template>
  <div id="app">
    <topbar class="mb-40"/>
    <transition :name="transition" mode="out-in">
      <router-view></router-view>
    </transition>
    <login-register/>
    <mu-back-top/>
  </div>
</template>

<script>
import { Component, Vue, Provide, Watch } from 'vue-property-decorator';
import Topbar from './components/Topbar';
import LoginRegister from './components/LoginRegister';

@Component({
  name: 'app',
  components: {
    Topbar,
    LoginRegister,
  },
})
export default class extends Vue {
  transition = 'slide-left';

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
    await this.$nextTick();
    this.$router.back();
  }
}
</script>


<style lang="less" scoped>
@duration: 0.3s;
@translate: 500px;

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
