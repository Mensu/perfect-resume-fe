<template>
  <div class="ctrl">
    <mu-button color="primary" @click="$emit('upload-btn-click')">
      <mu-icon left value="cloud_upload"/>
      我也要上传
    </mu-button>
    <mu-text-field type="text" label="搜索模板" label-float action-icon="search"
                    :value="value"
                    @input.native="search($event)"
                    @compositionstart="searchComposing = true"
                    @compositionend="searchComposing = false"/>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import debounce from 'lodash/debounce';

@Component({
  name: 'control',
})
export default class extends Vue {
  value = '';
  searchComposing = false;
  search = debounce(function search(e) {
    if (this.searchComposing) return;
    this.value = e.target.value;
    this.$emit('input', this.value);
  }, 300);
}
</script>

<style lang="less" scoped>
.ctrl {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
