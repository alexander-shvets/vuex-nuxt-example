<script>
import { currencies } from '~/logic/data'

export default {
    props: {
        value: String,
        base: String,
    },
    data: () => ({
        input: '',
        select: '',
    }),
    computed: {
        list(){
            const {base} = this
            if(base) return currencies.filter(item => item != base)
            else return currencies
        },
    },
    methods: {
        onInput({key}){
            const { input, list } = this
            const value = (input + key).toUpperCase()
            if( value ){
                const selectIndex = list.findIndex( item => item.indexOf(value) === 0)
                if( selectIndex >= 0 ){
                    const listValue = list[selectIndex]
                    this.input = value
                    this.select = listValue
                    this.$emit('input', listValue)
                }
            }
        },
        onSelected({target: {value}}){
            this.input = value
            this.$emit('input', value)
        },
    },
}
</script>
<template lang="pug">
    span.currency-select
        input(v-model="input" @keypress.prevent="onInput" size="5")
        select(v-model="select" @change="onSelected")
            option(v-for="currency of list" :key="currency") {{ currency }}
</template>
<style scoped lang="scss">
    .currency-select input{
        margin-left: 1ex;
    }
</style>