<template>
  <div class="rating-bar" :class="{ readonly: readOnly, 'has-val': val }">
    <div class="star-container">
      <mu-icon class="star" :class="{ current, half }" value=" "
              v-for="({ current, half }, idx) in icons" :key="idx"
              @click="$emit('input', idx + 1)" />
    </div>
    <div class="ml-10">
      <span v-if="readOnly">{{ value ? value + ' ' : '暂无评' }}</span>
      <span v-else class="description"> </span>
      <span>分</span>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  name: 'rating-bar',
})
export default class extends Vue {
  @Prop({ type: Number, default: 0 })
  value;

  @Prop({ type: Number, default: 5 })
  max;

  @Prop({ type: Boolean, default: false })
  readOnly;

  get val() {
    return Number.isFinite(this.value)
      && this.value >= 0 && this.value <= this.max ? this.value : 0;
  }

  get icons() {
    const int = Math.ceil(this.val);
    return [...Array(this.max)].map((_, i) => {
      if (i + 1 === int) {
        return { current: true, half: int > this.val };
      }
      return { current: false, half: false };
    });
  }
}
</script>

<style lang="less" scoped>
@import "../../node_modules/muse-ui/src/styles/themes/variables/light.less";
@dimStarColor: rgb(198, 209, 222);

.transition() {
  transition: all 0.3s ease-out;
}

.rating-bar {
  display: flex;
  align-items: center;
  counter-reset: value not-exist;
}

.star {
  vertical-align: top;
  .transition();
  transform: scale(1);
  &::before {
    .transition();
    content: 'star_border';
    color: @dimStarColor;
  }
}

.readonly, .has-val {
  .star {
    &::before {
      content: 'star';
      color: @primaryColor;
      counter-increment: value;
    }
    &.current {
      &.half::before {
        content: 'star_half';
      }
      & ~ .star::before {
        content: 'star_border';
        color: @dimStarColor;
        counter-increment: not-exist;
      }
    }
  }
}

:not(.readonly) > .star-container:hover {
  .star {
    &::before {
      content: 'star';
      color: @primaryColor;
      counter-increment: value;
    }
    &:hover {
      transform: scale(1.25);
      & ~ .star::before {
        content: 'star_border';
        color: @dimStarColor;
        counter-increment: not-exist;
      }
    }
  }
}

:not(.readonly) > .description::before {
  content: counter(value);
}

</style>
