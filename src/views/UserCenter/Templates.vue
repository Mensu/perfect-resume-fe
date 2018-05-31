<template>
  <div>
    <h1>{{ title }}</h1>
    <hr/>
    <template-table :loading="isLoading" :templates="templates"/>
  </div>
</template>

<script>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import TemplateTable from '../../components/TemplateTable';
import { user as userstore } from '../../store/modules/user';
import { template as tmplstore } from '../../store/modules/template';
import { FETCH_TEMPLATE_LIST } from '../../store/modules/template/actions';

const UserModule = namespace(userstore.name);
const TmplModule = namespace(tmplstore.name);

@Component({
  name: 'templates',
  components: {
    TemplateTable,
  },
})
export default class extends Vue {
  @UserModule.State nickname;
  @TmplModule.Action(FETCH_TEMPLATE_LIST) fetchList;
  @TmplModule.State rawList;

  @Prop() filter;
  @Watch('filter')
  filterChange(filter) {
    this.checkFilter(filter);
  }

  get title() {
    const map = {
      uploaded: '我上传的模板',
      rated: '我评分过的模板',
    };
    return map[this.filter] || '所有模板';
  }

  get templates() {
    return this.rawList.filter((one) => {
      if (this.filter === 'uploaded') {
        return one.user.nickname === this.nickname;
      } else if (this.filter === 'rated') {
        return one.myRating !== null;
      }
      return false;
    });
  }

  isLoading = true;

  async created() {
    if (this.checkFilter(this.filter)) {
      return;
    }
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

  checkFilter(filter) {
    if (!['uploaded', 'rated'].includes(filter)) {
      this.$router.back();
      return true;
    }
    return false;
  }
}
</script>

<style lang="less" scoped>

</style>
