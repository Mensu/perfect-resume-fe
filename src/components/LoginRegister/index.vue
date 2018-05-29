<template>
  <mu-dialog v-if="isLoginRegisterOpen" :open="isLoginRegisterOpen" dialog-class="max-w-400"
            @close="close(); activeTab = 'login'">
    <mu-tabs class="flat-tabs" center :value="activeTab"
            @change="activeTab = $event">
      <mu-tab value="login">登录</mu-tab>
      <mu-tab value="register">注册</mu-tab>
    </mu-tabs>
    <div class="pt-25 pb-25">
      <login-form v-if="activeTab === 'login'"/>
      <register-form v-else/>
    </div>
  </mu-dialog>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';
import { OPEN_LOGIN_FORM, CLOSE_LOGIN_FORM } from '../../store/actions';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

@Component({
  name: 'login-register',
  components: {
    LoginForm,
    RegisterForm,
  },
})
export default class extends Vue {
  @State isLoginRegisterOpen;
  @Action(OPEN_LOGIN_FORM) open;
  @Action(CLOSE_LOGIN_FORM) close;
  activeTab = 'login';
}
</script>

<style lang="less" scoped>

</style>
