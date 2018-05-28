<template>
  <mu-row>
    <mu-col class="horizontal-center" tablet="100" desktop="80">
      <div class="menu">
        <mu-paper>
          <mu-menu>
            <mu-menu-item title="个人设置" leftIcon="settings"/>
            <mu-menu-item title="密码设置" leftIcon="person_add"/>
            <mu-divider/>
            <mu-menu-item title="我上传的模板" leftIcon="content_copy"/>
            <mu-menu-item title="我评分过的模板" leftIcon="file_download"/>
          </mu-menu>
        </mu-paper>
      </div>
      <div class="content">
        <mu-paper class="w-p100">
          <mu-content-block>
            <h1 class="fs-24 lh-36">内容</h1>
            <hr/>
            ...
          </mu-content-block>
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
