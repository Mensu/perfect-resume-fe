<template>
  <div>
    <mu-text-field class="w-p100" label="用户名" icon="person" labelFloat v-model="username"/>
    <mu-text-field class="w-p100" label="昵称" icon="person" labelFloat v-model="nickname"/>
    <mu-text-field class="w-p100" label="密码" icon="lock" labelFloat
                    v-model="password"
                    :type="passwordIsVisible ? 'text' : 'password'"
                    :action-icon="passwordIsVisible ? 'visibility_off' : 'visibility'"
                    :action-click="() => toggleVisibility('passwordIsVisible')"/>
    <mu-text-field class="w-p100" label="确认密码" icon="lock" labelFloat
                    v-model="confirmingPassword"
                    :type="confirmingPasswordIsVisible ? 'text' : 'password'"
                    :action-icon="confirmingPasswordIsVisible ? 'visibility_off' : 'visibility'"
                    :action-click="() => toggleVisibility('confirmingPasswordIsVisible')"/>
    <mu-button class="w-p100 mt-30" @click="doRegister()" color="primary">
      注册
    </mu-button>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
@Component({
  name: 'register-form',
})
export default class extends Vue {
  username = '';
  nickname = '';
  password = '';
  confirmingPassword = '';
  passwordIsVisible = false;
  confirmingPasswordIsVisible = false;

  toggleVisibility(prop) {
    this[prop] = !this[prop];
  }

  doRegister() {
    console.log(this.username, this.nickname, this.password, this.confirmingPassword);
  }
}
</script>

<style lang="less" scoped>

</style>
