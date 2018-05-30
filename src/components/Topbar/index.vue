<template>
  <mu-appbar color="primary">
    <mu-button icon slot="left">
      <mu-icon value="description"/>
    </mu-button>
    <div class="title">完美简历</div>
    <div class="tabs">
      <mu-tabs class="w-p70" :value="path" @change="switchTab($event)" center full-width>
        <mu-tab v-for="[to, title] in Object.entries(tabs)" :key="to" :value="to">
          {{ title }}
        </mu-tab>
      </mu-tabs>
    </div>
    <template slot="right">
      <topbar-right-btn/>
    </template>
  </mu-appbar>
</template>

<script>
import { Component, Vue, Watch, Inject } from 'vue-property-decorator';
import { namespace, State } from 'vuex-class';
import { user as userstore } from '../../store/modules/user';

import TopbarRightBtn from './TopbarRightBtn';

const UserModule = namespace(userstore.name);

@Component({
  name: 'topbar',
  components: {
    TopbarRightBtn,
  },
})
export default class extends Vue {
  @State isLoginRegisterOpen;
  @UserModule.State isAdmin;
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
    if (this.isLoginRegisterOpen && pending) {
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
.mu-appbar {
  width: 100%;
  & /deep/ .mu-appbar-title {
    display: flex;
    align-items: center;
  }
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
