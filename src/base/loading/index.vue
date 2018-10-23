<template>
  <div class="define_loading">
    <mt-spinner type="fading-circle"
                color="#bd9d62"
                class="spinner_box"
                v-show="show"></mt-spinner>
  </div>
</template>
<script>
  export default {
    props: ['show'],
    data () {
      return {
        showSpinner: null
      }
    },
    watch: {
      'showSpinner': function (n, o) {
        this.setSpinner()
      }
    },
    methods: {
      setSpinner () {
        this.showSpinner = this.show
      }
    }
  }
</script>
<style lang="less" scoped></style>
