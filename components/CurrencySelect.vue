<script>
import { currencies } from '~/logic/data'

export default {
    props: {
        //value: String,
        base: String,
    },
    data: () => ({
        value: '',
        input: '',
        selected: '',
    }),
    computed: {
        list(){
            const {base} = this
            if(base) return currencies.filter(item => item != base)
            else return currencies
        },
    },
    methods: {
        validate( event ){
            const { value, list } = this
            const input = (value + event.key).toUpperCase()
            console.log('input', input,value, this.input, event.key)
            if( input in list ){
                this.value = input
                this.$emit('input', input)
            }else if( ! list.some( item => item.includes(value, 0) ) ){
                event.preventDefault()
            }
        },
        select({target: {value}}){
            //this.input = value
            this.$emit('input', value)
        },
    },
}
</script>
<template lang="pug">
    span.currency-select
        input(v-model="value" @keypress="validate" size="5")
        select(v-model="value" @change="select")
            option(v-for="currency of list" :key="currency") {{ currency }}
</template>
<style scoped lang="scss">
    .currency-select input{
        margin-left: 1ex;
    }
</style>