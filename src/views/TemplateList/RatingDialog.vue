<template>
  <mu-dialog v-if="tmpl" :open="!!tmpl" dialog-class="min-w-400"
              :title="'给《' + tmpl.name + '》评分'" @close="close()">
    <rating-bar v-model="myRating" :max="5"/>
    <mu-button flat slot="actions" @click="close()">
      取消
    </mu-button>
    <mu-button flat slot="actions" color="primary" :disabled="!myRating" @click="rate()">
      确定
    </mu-button>
  </mu-dialog>
</template>

<script>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component({
  name: 'rating-dialog',
})
export default class extends Vue {
  @Prop({ type: Object, default: null })
  tmpl;

  myRating = 0;

  @Watch('tmpl')
  tmplChange(tmpl) {
    this.myRating = tmpl ? tmpl.myRating : 0;
  }

  close() {
    this.$emit('update:tmpl', null);
    this.$emit('close');
    this.myRating = 0;
  }

  async rate() {
    if (this.myRating === this.tmpl.myRating) {
      this.close();
      return;
    }
    // TODO: 修改评分
    this.close();
  }
}
</script>

<style lang="less" scoped>
@import './vars.less';
.template-list-container {
  max-width: 1280px;
  margin-left: @list-margin;
  margin-right: @list-margin;
}
.template-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-left: -@card-margin;
  margin-right: -@card-margin;
}
</style>
