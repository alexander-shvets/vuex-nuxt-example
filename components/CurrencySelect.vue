<script>
import { currencies } from '~/store/data'

export default {
    props: {
        value: String,
        base: String,
    },
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
            const { input, list } = this
            //const input = this.input.toUpperCase()
            if( input in list ){ 
                //this.value = input
            }else if( ! list.some( item => item.includes(input, 0) ) ){
                event.preventDefault()
            }
        },
        select({target: {value}}){
            //this.input = value
        },
    },
}
</script>
<template lang="pug">
    span.currency-select
        input(v-model="input" @keypress="validate" size="4")
        select(v-model="input" @change="select")
            option(v-for="currency of list" :key="currency") {{ currency }}
</template>