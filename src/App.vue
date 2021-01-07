<template>
  <section
    class="section"
    :class="`has-background-${isDark ? 'black' : 'white-ter'}`"
  >
    <div class="columns">
      <div class="column is-2"></div>
      <div class="column is-8">
        <search :is-dark="isDark"></search>
      </div>
    </div>
  </section>
</template>

<script>
import Search from '@/components/Search.vue'

export default {
  name: 'App',
  components: { Search },
  computed: {
    isDark () {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    }
  }
}
</script>

<style scoped>
.small-margin-bottom {
  margin-bottom: .75rem;
}
.section {
  min-height: 100vh;
}
</style>

<style lang="scss">
@import "@/scss/buefy";
</style>
