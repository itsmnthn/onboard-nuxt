<template>
  <div>
    <Navbar />
    <Nuxt />
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'nuxt-class-component'
import Navbar from '~/components/navbar.vue'

export default
@Component({
  props: {},
  components: {
    Navbar,
  },
})
class LayoutDefault extends Vue {}
</script>

<style></style>
