<script>
import Vue from 'vue'
export default Vue.extend({name: 'IndexPage'})
</script>
<template>
    <Exchange :update-interval="30" />
</template>
<style lang="scss">
    body{
        padding: 5ex;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
</style>