<template>
  <form>
    <mu-text-field class="w-p100" label="用户名" icon="person" label-float autocomplete="new-username"
                    v-model="username" :error-text="error.username"
                    @input.once="dirty.username = true"/>
    <mu-text-field class="w-p100" label="昵称" icon="person" label-float autocomplete="new-username"
                    v-model="nickname" :error-text="error.nickname"
                    @input.once="dirty.nickname = true"/>
    <mu-text-field class="w-p100" label="密码" icon="lock" label-float autocomplete="new-password"
                    v-model="password" :error-text="error.password"
                    :type="passwordIsVisible | visibilityInputType"
                    :action-icon="passwordIsVisible | visibilityIcon"
                    :action-click="() => toggleVisibility('passwordIsVisible')"
                    @input.once="dirty.password = true"/>
    <mu-text-field class="w-p100" label="确认密码" icon="lock" label-float autocomplete="new-password"
                    v-model="confirmingPassword" :error-text="error.confirmingPassword"
                    :type="confirmingPasswordIsVisible | visibilityInputType"
                    :action-icon="confirmingPasswordIsVisible | visibilityIcon"
                    :action-click="() => toggleVisibility('confirmingPasswordIsVisible')"
                    @input.once="dirty.confirmingPassword = true"/>
    <mu-button class="w-p100 mt-30" @click="doRegister()" color="primary"
                :disabled="!isValid || isRegistering">
      {{ isRegistering ? '注册中...' : '注册' }}
    </mu-button>
  </form>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import { REGISTER, LOGIN } from '../../store/actions';
import { SnakeBar } from '../../services/snakebar';

@Component({
  name: 'register-form',
})
export default class extends Vue {
  @Action(LOGIN) login;
  @Action(REGISTER) register;

  username = '';
  nickname = '';
  password = '';
  passwordIsVisible = false;
  confirmingPassword = '';
  confirmingPasswordIsVisible = false;
  isRegistering = false;

  dirty = {
    username: false,
    nickname: false,
    password: false,
    confirmingPassword: false,
  }

  toggleVisibility(prop) {
    this[prop] = !this[prop];
  }

  get error() {
    const error = {};
    if (this.dirty.username && this.username.length === 0) {
      error.username = '用户名不得为空';
    }
    if (this.dirty.nickname && this.nickname.length === 0) {
      error.nickname = '昵称不得为空';
    }
    if (this.dirty.password && this.password.length === 0) {
      error.password = '密码不得为空';
    }
    if (this.dirty.confirmingPassword && this.confirmingPassword !== this.password) {
      error.confirmingPassword = '确认密码与密码不一致';
    }
    return error;
  }

  get isValid() {
    return Object.values(this.dirty).every(x => x) && Object.keys(this.error).length === 0;
  }

  async doRegister() {
    if (this.isRegistering || !this.isValid) {
      return;
    }
    const { username, nickname, password } = this;
    this.isRegistering = true;
    try {
      await this.register({ username, nickname, password });
      await this.login({ username, password });
      SnakeBar.success('成功注册');
    } finally {
      this.isRegistering = false;
    }
  }
}
</script>

<style lang="less" scoped>

</style>
