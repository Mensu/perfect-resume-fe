<template>
  <mu-card>
    <mu-card-header>
      <mu-avatar class="v-center" :src="tmpl.user.userId | avatar" slot="avatar"/>
      <div class="mu-card-header-title v-center">{{ tmpl.user.nickname }}</div>
    </mu-card-header>
    <mu-card-media>
      <img :src="tmpl.templateId | tmplImg"/>
    </mu-card-media>
    <mu-card-title :title="tmpl.name"/>
    <mu-card-text>
      <rating-bar :value="tmpl.rating" :max="5" read-only/>
      <div class="mt-20">{{ tmpl.description || '简历模板描述' }}</div>
    </mu-card-text>
    <mu-card-actions class="center">
      <mu-button flat @click="download(tmpl)">
        <mu-icon left value="file_download"/>
        下载
      </mu-button>
      <mu-button flat @click="openRatingDialog(tmpl)">
        <mu-icon left value="star_border"/>
        评分
      </mu-button>
    </mu-card-actions>
  </mu-card>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { guardLogin } from '../../../services/guard';
import { axiosDefaults } from '../../../services/api';

@Component({
  name: 'card',
})
export default class extends Vue {
  @Prop({ default: () => [] })
  tmpl;

  templateToRate = null;
  myRating = 0;

  /**
   * @param {Template} template
   */
  async openRatingDialog(template) {
    if (await guardLogin(false)) {
      return;
    }
    this.$emit('open-rating-dialog', template);
  }

  /**
   * @param {Template} template
   */
  download(template) {
    window.open(`${axiosDefaults.baseURL}/resume/${template.downloadPath}`, '_blank');
  }
}
</script>

<style lang="less" scoped>
@import '../vars.less';
.mu-card {
  .card();
}
.center {
  display: flex;
  justify-content: space-evenly;
}
</style>
