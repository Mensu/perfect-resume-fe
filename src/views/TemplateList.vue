<template>
  <div>
    <mu-card class="w-p25" v-for="tile in list" :key="tile.title">
      <mu-card-header :title="tile.author">
        <mu-avatar :src="tile.image" slot="avatar"/>
      </mu-card-header>
      <mu-card-media>
        <img :src="tile.image"/>
      </mu-card-media>
      <mu-card-title :title="tile.title" subTitle="Content Title"/>
      <mu-card-text>
        简介
      </mu-card-text>
      <mu-card-actions>
        <mu-flat-button label="下载" icon="file_download"/>
        <mu-flat-button label="打分" icon="star_border"/>
      </mu-card-actions>
    </mu-card>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { namespace, State, Action } from 'vuex-class';
import { template as templatestore } from '../store/modules/template';
import { FETCH_TEMPLATE_LIST } from '../store/modules/template/actions';

const TemplateState = namespace(templatestore.name, State);
const TemplateAction = namespace(templatestore.name, Action);

@Component({
  name: 'template-list',
})
export default class extends Vue {
  @TemplateState rawList;
  @TemplateAction(FETCH_TEMPLATE_LIST) fetchList;

  created() {
    this.fetchList();
  }

  get list() {
    return this.rawList;
  }
}
</script>

<style lang="less" scoped>
.mu-card {
  display: inline-block;
}
</style>
