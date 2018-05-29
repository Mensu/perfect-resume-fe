<template>
  <mu-row justify-content="center">
    <mu-col class="horizontal-center" span="11" lg="9">
      <div class="menu">
        <mu-paper :z-depth="2">
          <mu-menu>
            <mu-list>
              <mu-list-item button>
                <mu-list-item-action>
                  <mu-icon value="settings"/>
                </mu-list-item-action>
                <mu-list-item-title>个人设置</mu-list-item-title>
              </mu-list-item>
              <mu-list-item button>
                <mu-list-item-action>
                  <mu-icon value="person_add"/>
                </mu-list-item-action>
                <mu-list-item-title>密码设置</mu-list-item-title>
              </mu-list-item>
              <mu-divider/>
              <mu-list-item button>
                <mu-list-item-action>
                  <mu-icon value="content_copy"/>
                </mu-list-item-action>
                <mu-list-item-title>我上传的模板</mu-list-item-title>
              </mu-list-item>
              <mu-list-item button>
                <mu-list-item-action>
                  <mu-icon value="file_download"/>
                </mu-list-item-action>
                <mu-list-item-title>我评分过的模板</mu-list-item-title>
              </mu-list-item>
            </mu-list>
          </mu-menu>
        </mu-paper>
      </div>
      <div class="content">
        <mu-paper class="w-p100" :z-depth="2">
          <div class="content-block">
            <h1 class="fs-24 lh-36">内容</h1>
            <hr/>
            ...
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
export default class extends Vue {}
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
