<template>
  <mu-appbar>
    <mu-icon-button icon="description" slot="left"/>
    <div class="title">完美简历</div>
    <div class="tabs">
      <mu-tabs class="w-p60" :value="path" @change="switchTab($event)">
        <mu-tab v-for="[to, title] in Object.entries(tabs)" :key="to" :value="to" :title="title"/>
      </mu-tabs>
    </div>
    <template slot="right">
      <topbar-right-btn/>
    </template>
  </mu-appbar>
</template>

<script>
import { Component, Vue, Watch, Inject } from 'vue-property-decorator';
import TopbarRightBtn from './TopbarRightBtn';

@Component({
  name: 'topbar',
  components: {
    TopbarRightBtn,
  },
})
export default class extends Vue {
  activeTab = '/';

  @Inject() reloadRouterView;

  get tabs() {
    return {
      '/': '简历模板',
      '/user-center': '用户中心',
      ...(this.isAdmin && { '/admin': '运营管理' }),
    };
  }

  get path() {
    let { path } = this.$route;
    const { pending } = this.$router.history || {};
    if (pending) {
      ({ path } = pending);
    }
    if (!this.tabs[path]) {
      path = '/';
    }
    return path;
  }

  /**
   * @param {string} tab
   */
  switchTab(tab) {
    this.$router.replace(tab);
  }
}
</script>

<style lang="less" scoped>
.mu-appbar /deep/ .mu-appbar-title {
  display: flex;
  align-items: center;
}
.title {
  flex: 0 0 auto;
}
.tabs {
  flex: 1 1 auto;
  display: flex;
  justify-content: space-around;
}
</style>
