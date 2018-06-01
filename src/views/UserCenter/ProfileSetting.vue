<template>
  <div>
    <h1>个人设置</h1>
    <hr>
    <form class="mt-20 mb-20 h-center">
      <mu-row gutter>
        <mu-col span="4">
          <label>头像：</label>
        </mu-col>
        <mu-col span="8">
          <div class="avatar">
            <input type="file" hidden ref="avatarEl"
                  @change="changeAvatarFile($event.target.files.item(0))"/>
            <img :src="avatar" @click="$refs.avatarEl.click()"/>
          </div>
        </mu-col>
      </mu-row>
      <mu-row gutter align-items="baseline">
        <mu-col span="4">
          <label>昵称：</label>
        </mu-col>
        <mu-col span="8">
          <mu-text-field v-model="nickname" autocomplete="new-username"
                          :error-text="error && error.nickname"
                          @input.once="dirty.nickname = true"/>
        </mu-col>
      </mu-row>
      <mu-row gutter align-items="baseline">
        <mu-col span="4">
          <label>设置新密码：</label>
        </mu-col>
        <mu-col span="8">
          <mu-text-field v-model="newPassword" autocomplete="new-password"
                          :error-text="error && error.newPassword"
                          :type="newPasswordIsVisible | visibilityInputType"
                          :action-icon="newPasswordIsVisible | visibilityIcon"
                          :action-click="() => toggleVisibility('newPasswordIsVisible')"
                          @input.once="dirty.newPassword = true"/>
        </mu-col>
      </mu-row>
      <mu-row gutter align-items="baseline">
        <mu-col span="4">
          <label>确认新密码：</label>
        </mu-col>
        <mu-col span="8">
          <mu-text-field v-model="confirmingPassword" autocomplete="new-password"
                          :error-text="error && error.confirmingPassword"
                          :type="confirmingPasswordIsVisible | visibilityInputType"
                          :action-icon="confirmingPasswordIsVisible | visibilityIcon"
                          :action-click="() => toggleVisibility('confirmingPasswordIsVisible')"
                          @input.once="dirty.confirmingPassword = true"/>
        </mu-col>
      </mu-row>
      <hr/>
      <mu-row gutter align-items="baseline">
        <mu-col span="4">
          <label>当前密码：</label>
        </mu-col>
        <mu-col span="8">
          <mu-text-field v-model="password" autocomplete="current-password"
                          :error-text="error && error.password"
                          :type="passwordIsVisible | visibilityInputType"
                          :action-icon="passwordIsVisible | visibilityIcon"
                          :action-click="() => toggleVisibility('passwordIsVisible')"
                          @input.once="dirty.password = true"/>
        </mu-col>
      </mu-row>
      <div class="ctrl mt-30">
        <mu-button class="w-p60" color="primary" :disabled="!isValid || isUpdating"
                    @click="doUpdate()">
          {{ isUpdating ? '修改中...' : '确认修改' }}
        </mu-button>
      </div>
    </form>
  </div>
</template>

<script>
import { Component, Vue, Watch } from 'vue-property-decorator';
import { namespace, State } from 'vuex-class';
import { user as userstore } from '../../store/modules/user';
import { avatar } from '../../services/pipes';
import { UPDATE_USER_PROFILE } from '../../store/modules/user/actions';
import { SnakeBar } from '../../services/snakebar';

const UserModule = namespace(userstore.name);

@Component({
  name: 'profile-setting',
})
export default class extends Vue {
  @UserModule.Action(UPDATE_USER_PROFILE) update;
  @UserModule.State('nickname') curNickname;

  @Watch('curNickname')
  curNicknameChange(nickname) {
    if (!this.dirty.nickname) {
      this.nickname = nickname;
    }
  }
  nickname = '';

  isUpdating = false;

  get curAvatar() {
    return avatar(0);
  }
  /** @type {File} */
  avatarFile = null;
  avatarURL = null;
  get avatar() {
    if (this.avatarURL) {
      URL.revokeObjectURL(this.avatarURL);
      this.avatarURL = null;
    }
    if (this.avatarFile === null) {
      return avatar(0);
    }
    this.avatarURL = URL.createObjectURL(this.avatarFile);
    return this.avatarURL;
  }

  password = '';
  passwordIsVisible = false;
  newPassword = '';
  newPasswordIsVisible = false;
  confirmingPassword = '';
  confirmingPasswordIsVisible = false;

  dirty = {
    nickname: false,
    password: false,
    newPassword: false,
    confirmingPassword: false,
  }

  get error() {
    const error = {};
    if (this.dirty.nickname) {
      if (this.nickname.length === 0) {
        error.nickname = '昵称不得为空';
      } else if (this.password.length > 45) {
        error.nickname = '昵称不能太长';
      }
    }
    if (this.dirty.password && this.password.length === 0) {
      error.password = '请输入您当前的密码，确认您的身份';
    }
    if (this.newPassword.length > 45) {
      error.newPassword = '密码不能太长';
    }
    if (this.dirty.confirmingPassword && this.confirmingPassword !== this.newPassword) {
      error.confirmingPassword = '确认密码与新密码不一致';
    }
    return error;
  }

  get isValid() {
    return Object.keys(this.error).length === 0 && this.dirty.password;
  }

  created() {
    this.reset();
  }

  reset() {
    this.nickname = this.curNickname;
    this.avatarFile = null;
  }

  /**
   * @param {string} prop
   */
  toggleVisibility(prop) {
    this[prop] = !this[prop];
  }

  /**
   * @param {File} file
   */
  changeAvatarFile(file) {
    if (file) {
      if (!file.type.startsWith('image/')) {
        SnakeBar.error('头像应该是图片文件');
        return;
      }
      this.avatarFile = file;
    }
  }

  async doUpdate() {
    const newUser = {};
    newUser.nickname = this.nickname;
    newUser.password = this.newPassword.length > 0 ? this.newPassword : this.password;
    this.isUpdating = true;
    try {
      await this.update(newUser);
      SnakeBar.success('成功更新个人信息');
    } finally {
      this.isUpdating = false;
    }
  }
}
</script>

<style lang="less" scoped>
form {
  max-width: 500px;
  .row {
    margin-bottom: 5px;
    .col:first-child {
      text-align: right;
    }
  }
  .avatar {
    display: inline-block;
    border: 1px dashed gray;
    border-radius: 1px;
    img {
      height: 150px;
      width: 150px;
      cursor: pointer;
    }
  }
}
.ctrl {
  display: flex;
  justify-content: center;
}
</style>
