<template>
  <div>
    <div class="ctrl">
      <mu-text-field type="text" label="搜索模板" label-float action-icon="search"
                    :value="searchKey"
                    @input.native="search($event)"
                    @compositionstart="searchComposing = true"
                    @compositionend="searchComposing = false"/>
    </div>
    <mu-paper :z-index="1">
      <mu-data-table :loading="loading" :columns="columns" :data="filteredTemplates" stripe>
        <template slot-scope="{ row: tmpl }">
          <td>{{ tmpl.templateId }}</td>
          <td>{{ tmpl.name }}</td>
          <td>{{ tmpl.user.nickname }}</td>
          <td>操作</td>
        </template>
      </mu-data-table>
    </mu-paper>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator';
import debounce from 'lodash/debounce';
import { match } from '../services/utils';

@Component({
  name: 'template-table',
})
export default class extends Vue {
  @Prop({ type: Array, default: () => [] })
  templates;

  @Prop({ type: Boolean, default: false })
  loading;

  searchKey = '';
  searchComposing = false;
  search = debounce(function search(e) {
    if (this.searchComposing) return;
    this.searchKey = e.target.value;
  }, 300);

  sort = {
    name: '',
    order: 'asc',
  };

  columns = [
    { title: 'ID', width: 100, name: 'id', align: 'center', sortable: true },
    { title: '名称', width: 200, name: 'name', align: 'center', sortable: true },
    { title: '上传者', name: 'uploader', width: 120, align: 'center', sortable: true },
    { title: '操作', name: 'operation', width: 300, align: 'center', sortable: true },
  ];

  get filteredTemplates() {
    const searchKey = this.searchKey.trim();
    const keys = searchKey.split(/\s/).filter(key => key.length > 0);
    // 空白分隔的每个关键字都匹配
    return this.templates.filter(tmpl => keys.every((key) => {
      const nameMatch = () => match(tmpl.name, key);
      const nicknameMatch = () => match(tmpl.user.nickname, key);
      return nameMatch() || nicknameMatch();
    }));
  }
}
</script>

<style lang="less" scoped>
td {
  text-align: center;
}
.ctrl {
  display: flex;
  justify-content: flex-end;
}
</style>
