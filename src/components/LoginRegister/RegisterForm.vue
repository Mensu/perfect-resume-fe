<template>
  <div>
    <mu-text-field class="w-p100" label="用户名" icon="person" labelFloat v-model="username"/>
    <mu-text-field class="w-p100" label="昵称" icon="person" labelFloat v-model="nickname"/>
    <mu-text-field class="w-p100" label="密码" icon="lock" labelFloat type="password"
                    v-model="password" />
    <mu-text-field class="w-p100" label="确认密码" icon="lock" labelFloat type="password"
                    v-model="confirmingPassword" />
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

  doRegister() {
    console.log(this.username, this.nickname, this.password, this.confirmingPassword);
  }
}
</script>

<style lang="less" scoped>

</style>
