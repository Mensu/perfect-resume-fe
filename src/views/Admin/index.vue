<template>
  <div>
    <h1>运营管理</h1>
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
  name: 'admin',
  components: {
    TemplateTable,
  },
})
export default class extends Vue {
  @TmplModule.Action(FETCH_TEMPLATE_LIST) fetchList;
  @TmplModule.State rawList;

  get templates() {
    return this.rawList;
  }

  isLoading = true;

  async created() {
    try {
      await this.fetchList();
    } finally {
      this.isLoading = false;
    }
  }
}
</script>

<style lang="less" scoped>

</style>
