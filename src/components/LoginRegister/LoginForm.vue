<template>
  <form>
    <mu-text-field class="w-p100" label="用户名" icon="person" label-float autocomplete="username"
                    v-model="username"
                    :error-text="error && error.username"
                    @keyup.enter="doLogin()"/>
    <mu-text-field class="w-p100" label="密码" icon="lock" label-float autocomplete="current-password"
                   v-model="password"
                   :type="passwordIsVisible | visibilityInputType"
                   :action-icon="passwordIsVisible | visibilityIcon"
                   :action-click="() => passwordIsVisible = !passwordIsVisible"
                   @keyup.enter="doLogin()"/>
    <mu-button class="w-p100 mt-30" color="primary" @click="doLogin()"
              :disabled="!username || !password || !isValid || isLoggingIn">
      {{ isLoggingIn ? '登录中...' : '登录' }}
    </mu-button>
  </form>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import { LOGIN } from '../../store/actions';
import { SnakeBar } from '../../services/snakebar';

@Component({
  name: 'login-form',
})
export default class extends Vue {
  @Action(LOGIN) login;

  username = '';
  password = '';
  isLoggingIn = false;
  passwordIsVisible = false;

  get error() {
    const error = {};
    if (this.username.length > 0) {
      if (!this.username.match(/^[1-9][0-9]{0,}$/)) {
        error.username = '用户名只能含数字';
      } else if (Number(this.username) >= 2 ** 31) {
        error.username = '用户名必须为 int';
      }
    }
    return error;
  }

  get isValid() {
    return Object.keys(this.error).length === 0;
  }

  async doLogin() {
    if (this.isLoggingIn) {
      return;
    }
    const { username, password } = this;
    if (!this.isValid || username.length === 0 || password.length === 0) {
      return;
    }
    this.isLoggingIn = true;
    try {
      await this.login({ username, password });
      SnakeBar.success('成功登录');
    } finally {
      this.isLoggingIn = false;
    }
  }
}
</script>

<style lang="less" scoped>

</style>
