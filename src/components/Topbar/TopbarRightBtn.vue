<template>
  <div class="topbar-right-btn">
    <template v-if="isLoggedIn">
      <mu-flat-button class="pl-16 right-menu-button right-btn" color="white"
                      ref="rightMenuButton" :label="nickname" @click="isRightMenuOpen = true">
        <img class="w-30 h-30" src="../../assets/logo.png"/>
      </mu-flat-button>
      <mu-popover :open="isRightMenuOpen" :trigger="trigger"
                  @close="isRightMenuOpen = false">
        <mu-menu @itemClick="isRightMenuOpen = false">
          <mu-menu-item title="个人设置" leftIcon="settings" to="/user-center"/>
          <mu-menu-item title="登出" leftIcon="exit_to_app" @click="doLogout()"/>
        </mu-menu>
      </mu-popover>
    </template>
    <mu-flat-button v-else class="right-btn" color="white" label="登录 / 注册"
                    @click="openLoginRegister()"/>
  </div>
</template>

<script>
import { Component, Vue, Watch, Inject } from 'vue-property-decorator';
import { namespace, State, Action } from 'vuex-class';
import { OPEN_LOGIN_FORM, LOGOUT } from '../../store/actions';
import { user as userstore } from '../../store/modules/user';

const UserModule = namespace(userstore.name);

@Component({
  name: 'topbar-right-btn',
})
export default class extends Vue {
  @State isLoggedIn;
  @UserModule.State isAdmin;
  @UserModule.State nickname;
  @Action(OPEN_LOGIN_FORM) openLoginRegister;
  @Action(LOGOUT) logout;

  isRightMenuOpen = false;
  trigger = null;

  mounted() {
    this.isLoggedInChange(this.isLoggedIn);
  }

  @Watch('isLoggedIn')
  /**
   * @param {boolean} isLoggedIn
   */
  async isLoggedInChange(isLoggedIn) {
    await this.$nextTick();
    this.trigger = isLoggedIn ? this.$refs.rightMenuButton.$el : null;
  }

  @Inject() reloadRouterView;

  async doLogout() {
    await this.logout();
    await this.reloadRouterView();
  }
}
</script>


<style lang="less" scoped>
.topbar-right-btn {
  height: 100%;
}
.right-menu-button {
  text-transform: unset;
}
.right-btn {
  width: 168px;
}
</style>
