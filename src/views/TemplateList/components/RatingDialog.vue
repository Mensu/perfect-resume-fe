<template>
  <mu-dialog v-if="tmpl" :open="!!tmpl" dialog-class="min-w-400"
              :title="'给《' + tmpl.name + '》评分'" @close="close()">
    <rating-bar v-model="myRating" :max="5"/>
    <mu-button flat slot="actions" @click="close()">
      取消
    </mu-button>
    <mu-button flat slot="actions" color="primary" :disabled="!myRating || isRating"
                @click="doRate()">
      确定
    </mu-button>
  </mu-dialog>
</template>

<script>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { template as tmplstore } from '../../../store/modules/template';
import { FETCH_TEMPLATE_LIST, RATE_TEMPLATE } from '../../../store/modules/template/actions';
import { SnakeBar } from '../../../services/snakebar';

const TmplModule = namespace(tmplstore.name);

@Component({
  name: 'rating-dialog',
})
export default class extends Vue {
  @TmplModule.Action(RATE_TEMPLATE) rate;
  @TmplModule.Action(FETCH_TEMPLATE_LIST) fetchList;

  @Prop({ type: Object, default: null })
  tmpl;

  myRating = 0;
  isRating = false;

  @Watch('tmpl')
  tmplChange(tmpl) {
    this.myRating = tmpl ? tmpl.myRating : 0;
  }

  close() {
    this.$emit('update:tmpl', null);
    this.myRating = 0;
  }

  async doRate() {
    if (this.myRating === this.tmpl.myRating) {
      this.close();
      return;
    }
    const { tmpl: { templateId }, myRating } = this;
    this.isRating = true;
    try {
      await this.rate({ templateId, myRating });
      SnakeBar.success('成功评分');
      this.close();
    } finally {
      this.isRating = false;
    }
  }
}
</script>

<style lang="less" scoped>
@import '../vars.less';
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
