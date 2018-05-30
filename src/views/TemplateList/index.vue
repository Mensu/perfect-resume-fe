<template>
  <div class="template-list-container mr-10 ml-10">
    <control v-model="searchKey" @upload-btn-click="isUploadDialogOpen = true"/>
    <div class="template-list h-center">
      <card v-for="tmpl in list" :key="tmpl.templateId"
            :tmpl="tmpl" @open-rating-dialog="openRatingDialog($event)"/>
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
import Control from './Control';
import Card from './Card';
import RatingDialog from './RatingDialog';
import UploadDialog from './UploadDialog';

const TmplModule = namespace(tmplstore.name);

/**
 * @param {string} src
 * @param {string} target
 */
function match(src, target) {
  return src.toLowerCase().includes(target.toLowerCase());
}

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

  tmplToRate = null;
  searchKey = '';
  isUploadDialogOpen = false;

  created() {
    this.fetchList();
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
  margin-left: @list-margin;
  margin-right: @list-margin;
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
