<template>
  <div>
    <div class="template-list h-center">
       <mu-card v-for="oneTmpl in list" :key="oneTmpl.templateId">
        <mu-card-header>
          <mu-avatar class="v-center" :src="oneTmpl.user.userId | avatar" slot="avatar"/>
          <div class="mu-card-header-title v-center">{{ oneTmpl.user.nickname }}</div>
        </mu-card-header>
        <mu-card-media>
          <img :src="oneTmpl.templateId | tmplImg"/>
        </mu-card-media>
        <mu-card-title :title="oneTmpl.name"/>
        <mu-card-text>
          <rating-bar :value="oneTmpl.rating" :max="5" read-only/>
          <div class="mt-20">{{ oneTmpl.description }}</div>
        </mu-card-text>
        <mu-card-actions>
          <mu-flat-button label="下载" icon="file_download" @click="download(oneTmpl)"/>
          <mu-flat-button label="评分" icon="star_border" @click="openRatingDialog(oneTmpl)"/>
        </mu-card-actions>
      </mu-card>
    </div>
    <mu-dialog v-if="templateToRate" :open="!!templateToRate" dialog-class="max-w-400"
              :title="'给《' + templateToRate.name + '》评分'" @close="closeRatingDialog()">
      <rating-bar v-model="myRating" :max="5"/>
      <mu-flat-button label="取消" slot="actions" @click="closeRatingDialog()"/>
      <mu-flat-button label="确定" slot="actions" primary :disabled="!myRating" @click="doRating()"/>
    </mu-dialog>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { template as templstore } from '../store/modules/template';
import { FETCH_TEMPLATE_LIST } from '../store/modules/template/actions';
import { guardLogin } from '../services/guard';

const TemplModule = namespace(templstore.name);

@Component({
  name: 'template-list',
})
export default class extends Vue {
  @TemplModule.State rawList;
  @TemplModule.Action(FETCH_TEMPLATE_LIST) fetchList;

  templateToRate = null;
  myRating = 0;

  created() {
    this.fetchList();
  }

  get list() {
    return this.rawList;
  }

  /**
   * @param {Template} template
   */
  async openRatingDialog(template) {
    if (await guardLogin(false)) {
      return;
    }
    this.templateToRate = { ...template };
    this.myRating = template.myRating;
  }

  closeRatingDialog() {
    this.templateToRate = null;
    this.myRating = 0;
  }

  async doRating() {
    if (this.myRating === this.templateToRate.myRating) {
      this.closeRatingDialog();
      return;
    }
    // TODO: 修改评分
    this.closeRatingDialog();
  }

  /**
   * @param {Template} template
   */
  download(template) {
    // TODO: 生成下载链接
    window.open('/favicon.ico', '_blank');
  }
}
</script>

<style lang="less" scoped>
.template-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  max-width: 1280px;
}
.mu-card {
  display: inline-block;
  width: 250px;
  margin: 10px;
}
.mu-dialog .rating-bar {
  cursor: pointer;
}
</style>
