<template>
  <div class="template-list-container h-center pl-40 pr-40">
    <control v-model="searchKey" @upload-btn-click="isUploadDialogOpen = true"/>
    <div class="loading" v-if="isLoading">
      <mu-circular-progress :size="40"/>
    </div>
    <div class="template-list">
      <card v-for="tmpl in list" :key="tmpl.templateId"
            :tmpl="tmpl" @open-rating-dialog="openRatingDialog($event)"/>
      <!-- 这四个玩意是为了防止 space-between 最后一行的崩坏的 workaround -->
      <div class="after"></div>
      <div class="after"></div>
      <div class="after"></div>
      <div class="after"></div>
    </div>
    <rating-dialog :tmpl.sync="tmplToRate"/>
    <upload-dialog :open.sync="isUploadDialogOpen"/>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { template as tmplstore } from '../../store/modules/template';
import { FETCH_TEMPLATE_LIST } from '../../store/modules/template/actions';
import { match } from '../../services/utils';
import Control from './components/Control';
import Card from './components/Card';
import RatingDialog from './components/RatingDialog';
import UploadDialog from './components/UploadDialog';

const TmplModule = namespace(tmplstore.name);

@Component({
  name: 'template-list',
  components: {
    Control,
    Card,
    RatingDialog,
    UploadDialog,
  },
})
export default class extends Vue {
  @TmplModule.State rawList;
  @TmplModule.Action(FETCH_TEMPLATE_LIST) fetchList;

  isLoading = true;
  tmplToRate = null;
  searchKey = '';
  isUploadDialogOpen = false;

  async created() {
    if (this.rawList.length > 0) {
      this.isLoading = false;
      return;
    }
    try {
      await this.fetchList();
    } finally {
      this.isLoading = false;
    }
  }

  get list() {
    const searchKey = this.searchKey.trim();
    const keys = searchKey.split(/\s/).filter(key => key.length > 0);
    // 空白分隔的每个关键字都匹配
    return this.rawList.filter(tmpl => keys.every((key) => {
      const nameMatch = () => match(tmpl.name, key);
      const descMatch = () => match(tmpl.description, key);
      const nicknameMatch = () => match(tmpl.user.nickname, key);
      return nameMatch() || descMatch() || nicknameMatch();
    }));
  }

  /**
   * @param {Template} tmpl
   */
  openRatingDialog(tmpl) {
    this.tmplToRate = { ...tmpl };
  }
}
</script>

<style lang="less" scoped>
@import './vars.less';
.template-list-container {
  max-width: 1280px;
}
.loading {
  text-align: center;
}
.after {
  height: 0;
  .card();
}
.template-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  margin-left: -@card-margin;
  margin-right: -@card-margin;
}
</style>
