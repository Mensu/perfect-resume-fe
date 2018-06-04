<template>
  <mu-row justify-content="center">
    <mu-col class="horizontal-center" span="11" lg="9">
      <div class="menu">
        <mu-paper :z-depth="2">
          <mu-menu>
            <mu-list>
              <template v-for="(tab, idx) in tabs">
                <mu-list-item v-if="tab.to" :to="'/user-center/' + tab.to" :key="idx" button>
                  <mu-list-item-action>
                    <mu-icon :value="tab.icon"/>
                  </mu-list-item-action>
                  <mu-list-item-title>{{ tab.title }}</mu-list-item-title>
                </mu-list-item>
                <mu-divider v-else :key="idx"/>
              </template>
            </mu-list>
          </mu-menu>
        </mu-paper>
      </div>
      <div class="content">
        <mu-paper class="w-p100" :z-depth="2">
          <div class="content-block">
            <router-view/>
          </div>
        </mu-paper>
      </div>
    </mu-col>
  </mu-row>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'user-center',
})
export default class extends Vue {
  tabs = [{
    to: 'profile-setting',
    title: '个人设置',
    icon: 'settings',
  }, {
    // divider
  }, {
    to: 'templates?filter=uploaded',
    title: '我上传的模板',
    icon: 'content_copy',
  }, {
    to: 'templates?filter=rated',
    title: '我评分过的模板',
    icon: 'file_download',
  }];
}
</script>

<style lang="less" scoped>
.mu-paper {
  display: inline-block;
}
.horizontal-center {
  margin: auto;
  display: flex;
}
.menu {
  flex: 0 0 auto;
}
.content {
  flex: 1 1 auto;
  min-height: 600px;
  .mu-paper {
    height: 99%;
  }
}
</style>
