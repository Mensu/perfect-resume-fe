<template>
  <div class="topbar-right-btn">
    <template v-if="isLoggedIn">
      <mu-button flat class="right-menu-button right-menu" ref="rightMenuButton"
                      @click="isRightMenuOpen = true">
        <img class="w-30 h-30 mr-10 v-center" src="../../assets/logo.png"/>
        <span class="v-center">{{ nickname }}</span>
      </mu-button>
      <mu-popover :open.sync="isRightMenuOpen" :trigger="trigger" placement="bottom">
        <mu-menu>
          <mu-list class="right-menu" @click="isRightMenuOpen = false">
            <mu-list-item button to="/user-center">
              <mu-list-item-action>
                <mu-icon value="settings"/>
              </mu-list-item-action>
              <mu-list-item-title>个人设置</mu-list-item-title>
            </mu-list-item>
            <mu-list-item button @click="doLogout()">
              <mu-list-item-action>
                <mu-icon value="exit_to_app"/>
              </mu-list-item-action>
              <mu-list-item-title>登出</mu-list-item-title>
            </mu-list-item>
          </mu-list>
        </mu-menu>
      </mu-popover>
    </template>
    <mu-button flat v-else class="right-menu" @click="openLoginRegister()">
      登录 / 注册
    </mu-button>
  </div>
</template>

<script>
import { Component, Vue, Watch, Inject } from 'vue-property-decorator';
import { namespace, State, Action } from 'vuex-class';
import { OPEN_LOGIN_FORM, LOGOUT } from '../../store/actions';
import { user as userstore } from '../../store/modules/user';
import { SnakeBar } from '../../services/snakebar';

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
    SnakeBar.success('成功登出');
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
.right-menu {
  width: 168px;
}
</style>
