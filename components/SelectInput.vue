<script>
export default {
    props: {
        value: String,
        base: String,
        items: Array,
    },
    data: function(){
        return {
            select: this.value,
            input: this.value,
        }
    },
    computed: {
        list(){
            const {base, items} = this
            if(base) return items.filter(item => item != base)
            else return items
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
        autocomplete(){
            this.input = this.select
        },
        onSelected(){
            this.input = this.select
            this.$emit('input', this.input)
        },
    },
}
</script>
<template lang="pug">
    span.select-input
        input(v-model="input" @keypress.prevent="onInput" @blur="autocomplete" size="5")
        select(v-model="select" @change="onSelected")
            option(v-for="item in list" :key="item") {{ item }}
</template>