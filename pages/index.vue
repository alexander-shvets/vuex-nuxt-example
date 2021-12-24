<script>
import Vue from 'vue'
export default Vue.extend({name: 'IndexPage'})
</script>
<template>
    <Converter :update-interval="30" />
</template>
<style lang="scss">
    body{
      padding: 5ex;
    }
</style>