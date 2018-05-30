<template>
  <form>
    <mu-text-field class="w-p100" label="用户名" icon="person" label-float autocomplete="username"
                    v-model="username" @keyup.enter="doLogin()"/>
    <mu-text-field class="w-p100" label="密码" icon="lock" label-float autocomplete="current-password"
                   v-model="password"
                   :type="passwordIsVisible ? 'text' : 'password'"
                   :action-icon="passwordIsVisible ? 'visibility_off' : 'visibility'"
                   :action-click="() => passwordIsVisible = !passwordIsVisible"
                   @keyup.enter="doLogin()"/>
    <mu-button class="w-p100 mt-30" @click="doLogin()" :disabled="isLoggingIn" color="primary">
      {{ isLoggingIn ? '登录中...' : '登录' }}
    </mu-button>
  </form>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import { LOGIN } from '../../store/actions';

@Component({
  name: 'login-form',
})
export default class extends Vue {
  username = '';
  password = '';
  isLoggingIn = false;
  passwordIsVisible = false;
  @Action(LOGIN) login;

  reset() {
    this.username = '';
    this.password = '';
  }

  async doLogin() {
    if (this.isLoggingIn) return;
    const { username, password } = this;
    // TODO: 检查用户名密码是否为空
    this.isLoggingIn = true;
    try {
      await this.login({ username, password });
    } finally {
      this.isLoggingIn = false;
    }
  }
}
</script>

<style lang="less" scoped>

</style>
