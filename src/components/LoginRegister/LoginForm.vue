<template>
  <div>
    <mu-text-field class="w-p100" label="用户名" icon="person" labelFloat v-model="username"/>
    <mu-text-field class="w-p100" label="密码" icon="lock" labelFloat type="password"
                    v-model="password" />
    <mu-raised-button class="w-p100 mt-30" :label="isLoggingIn ? '登录中...' : '登录'"
                      @click="doLogin()" :disabled="isLoggingIn" primary/>
  </div>
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
  @Action(LOGIN) login;

  reset() {
    this.username = '';
    this.password = '';
  }

  async doLogin() {
    if (this.isLoggingIn) return;
    const { username, password } = this;
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
