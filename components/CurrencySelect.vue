<script>
import { currencies } from '~/store/data'

export default {
    props: {
        value: String,
        base: String,
    },
    // model: {
    //     prop: 'value',
    //     event: 'input'
    // },
    data: () => ({
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
            //const input = this.input.toUpperCase()
            if( input in list ){ 
                //this.value = input
            }else if( ! list.some( item => item.includes(value, 0) ) ){
                event.preventDefault()
            }
            this.$emit('input', value)
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
        input(v-model="value" @keypress="validate" size="4")
        select(v-model="value" @change="select")
            option(v-for="currency of list" :key="currency") {{ currency }}
</template>