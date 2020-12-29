<template>
  <div class="container">
    <h1>Example onboard nuxt vue</h1>
    <br />
    <Login />
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'nuxt-class-component'
import Login from '~/components/login.vue'

export default
@Component({
  props: {},
  components: {
    Login,
  },
})
class LayoutDefault extends Vue {}
</script>

<style></style>
