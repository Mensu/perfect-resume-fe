<template>
  <mu-dialog v-if="open" :open="open" :overlay-close="false" :esc-press-close="false"
              :title="'上传我的简历模板'" @close="close()">
    <div>
      <input type="file" hidden ref="fileInputEl"
              @change="changeFile($event.target.files.item(0))"/>
      <mu-button class="mr-20" color="primary" @click="$refs.fileInputEl.click()">
        <mu-icon left value="add"/>
        {{ file ? '更换' : '选择' }}文件
      </mu-button>
      <mu-text-field type="text" label="模板名称" v-model="name" label-float/>
    </div>
    <div>
      <mu-alert v-if="file" color="info">
        <mu-icon value="check_circle"/>
        已选择文件 {{ file.name }}，文件大小 {{ file.size | fileSize }}
      </mu-alert>
    </div>
    <mu-button flat slot="actions" @click="close()">
      取消
    </mu-button>
    <mu-button flat slot="actions" color="primary" :disabled="!isFormValid" @click="doUpload()">
      上传
    </mu-button>
  </mu-dialog>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { template as tmplstore } from '../../store/modules/template';
import { UPLOAD } from '../../store/modules/template/actions';
import { guardLogin } from '../../services/guard';
import { SnakeBar } from '../../services/snakebar';

const TmplModule = namespace(tmplstore.name);

@Component({
  name: 'template-list',
})
export default class extends Vue {
  @TmplModule.Action(UPLOAD) upload;

  @Prop({ type: Boolean, default: false })
  open;

  name = '';
  file = null;

  get isFormValid() {
    return this.name.length > 0 && this.file;
  }

  changeFile(file) {
    if (file) {
      this.file = file;
    }
  }

  close() {
    this.$emit('update:open', false);
    this.file = null;
  }

  async doUpload() {
    if (await guardLogin(false)) {
      return;
    }
    await this.upload(this.file, this.name);
    SnakeBar.success('成功上传');
    this.close();
  }
}
</script>

<style lang="less" scoped>
.upload-btn {
  display: block;
}
</style>
