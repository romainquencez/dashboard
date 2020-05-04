<template>
  <section class="section has-background-white-ter">
    <div class="columns">
      <div class="column is-2"></div>
      <div class="column is-8">
        <search></search>
      </div>
    </div>
  </section>
</template>

<script>
import Search from '@/components/Search.vue'

export default {
  name: 'App',
  components: { Search }
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
