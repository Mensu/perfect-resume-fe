<template>
  <div>
    <mu-flex justify-content="center">
      <div class="template-table">
        <div class="ctrl">
          <mu-text-field type="text" label="搜索模板" label-float action-icon="search"
                        :value="searchKey"
                        @input.native="search($event)"
                        @compositionstart="searchComposing = true"
                        @compositionend="searchComposing = false"/>
        </div>
        <mu-paper :z-index="1">
          <mu-data-table :loading="loading" :columns="columns" :data="filteredTemplates"
                          stripe max-height="600" :sort.sync="sort">
            <template slot-scope="{ row: tmpl }">
              <td>{{ tmpl.templateId }}</td>
              <td>{{ tmpl.name }}</td>
              <td>{{ tmpl.user.nickname }}</td>
              <td>{{ tmpl.rating }}</td>
              <td>{{ tmpl.myRating === null ? '暂未评分' : tmpl.myRating }}</td>
              <td>
                <mu-button flat color="primary" @click="download(tmpl)">
                  下载
                </mu-button>
                <mu-button v-if="isAdmin"
                          flat color="red" @click="tmplToBeDeleted = tmpl">
                  删除
                </mu-button>
              </td>
            </template>
          </mu-data-table>
        </mu-paper>
      </div>
    </mu-flex>
    <mu-dialog v-if="tmplToBeDeleted" :open="!!tmplToBeDeleted" dialog-class="min-w-400"
                title="请确认您的操作" @close="close()">
      确定要删除《{{ tmplToBeDeleted.name }}》吗？
      <mu-button flat slot="actions" @click="close()">
        取消
      </mu-button>
      <mu-button flat slot="actions" color="primary" :disabled="tmplToBeDeleted.isBeingDeleted"
                  @click="doDelete(tmplToBeDeleted)">
        确定
      </mu-button>
    </mu-dialog>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import debounce from 'lodash/debounce';
import { match } from '../services/utils';
import { user as userstore } from '../store/modules/user';
import { downloadLink, avatar } from '../services/pipes';
import { template as templatestore } from '../store/modules/template';
import { DELETE } from '../store/modules/template/actions';
import { SnakeBar } from '../services/snakebar';

const UserModule = namespace(userstore.name);
const TmplModule = namespace(templatestore.name);

@Component({
  name: 'template-table',
})
export default class extends Vue {
  @UserModule.State nickname;
  @TmplModule.Action(DELETE) delete;

  @Prop({ type: Array, default: () => [] })
  templates;

  @Prop({ type: Boolean, default: false })
  loading;

  @Prop({ type: Boolean, default: false })
  isAdmin;

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
    { title: 'ID', name: 'templateId', width: 50, align: 'left', sortable: true },
    { title: '名称', name: 'name', width: 200, align: 'center', sortable: true },
    { title: '上传者', name: 'nickname', width: 150, align: 'center', sortable: true },
    { title: '分数', name: 'rating', width: 50, align: 'center', sortable: true },
    { title: '我的评分', name: 'myRating', width: 150, align: 'center', sortable: true },
    { title: '操作', name: 'operation', width: 250, align: 'center' },
  ];

  tmplToBeDeleted = null;

  get filteredTemplates() {
    const searchKey = this.searchKey.trim();
    const keys = searchKey.split(/\s/).filter(key => key.length > 0);
    const { name: sortKey } = this.sort;
    const factor = this.sort.order === 'asc' ? 1 : -1;
    let getValue = (tmpl, name) => tmpl[name];
    if (sortKey === 'nickname') {
      getValue = (tmpl, name) => tmpl.user[name];
    }
    // 空白分隔的每个关键字都匹配
    return this.templates
      .map(one => ({ ...one, isBeingDeleted: false }))
      .filter(tmpl => keys.every((key) => {
        const nameMatch = () => match(tmpl.name, key);
        const nicknameMatch = () => match(tmpl.user.nickname, key);
        return nameMatch() || nicknameMatch();
      }))
      .sort((a, b) => {
        const aval = getValue(a, sortKey);
        const bval = getValue(b, sortKey);
        if (aval === null || aval < bval) return -factor;
        else if (bval === null || aval > bval) return factor;
        return a.templateId - b.templateId;
      });
  }

  /**
   * @param {Template} template
   */
  download(template) {
    window.open(downloadLink(template), '_blank');
  }

  /**
   * @param {Template} tmpl
   */
  async doDelete(tmpl) {
    tmpl.isBeingDeleted = true;
    try {
      await this.delete(tmpl.templateId);
      SnakeBar.success('成功删除');
      this.close();
    } finally {
      tmpl.isBeingDeleted = false;
    }
  }

  close() {
    this.tmplToBeDeleted = null;
  }
}
</script>

<style lang="less" scoped>
.template-table {
  display: inline-block;
}
td {
  text-align: center;
  padding-left: 40px;
  &:last-child {
    padding-left: 20px;
  }
}
.ctrl {
  display: flex;
  justify-content: flex-end;
}
</style>
