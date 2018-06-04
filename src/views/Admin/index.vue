<template>
  <mu-row justify-content="center">
    <mu-col class="horizontal-center" span="11" lg="9">
      <div>
        <h1>运营管理</h1>
        <hr/>
        <template-table :loading="isLoading" :templates="templates" :isAdmin="true"/>
      </div>
    </mu-col>
  </mu-row>
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
}
</script>

<style lang="less" scoped>
h1 {
  text-align: center;
}
</style>
