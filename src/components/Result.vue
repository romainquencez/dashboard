<template>
  <div  class="result">
    <div class="media">
      <div class="media-left">
        <figure
          v-if="icon"
          class="image is-16x16"
        >
          <img :src="icon" />
        </figure>
      </div>
      <div class="media-content">
        <div class="has-text-weight-bold">
          {{ result.name }}
        </div>
        <div class="has-text-grey">
          {{ result.url }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Result',
  props: {
    result: {
      type: Object,
      required: true
    }
  },
  computed: {
    icon () {
      if (this.result.icon) {
        return require('@/assets/icons/' + this.result.icon + '.png')
      }
      return null
    }
  }
}
</script>

<style scoped>
.result {
  padding-left: .5rem !important;
}
.media-left {
  margin-right: .5rem !important;
}
.image img {
  padding-top: .25rem;
}
</style>
