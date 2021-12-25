<script>
export default {
    props: {
        value: String,
        items: Array,
        base:  String,
    },
    data(){
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
    watch: {
        select(value){
            this.$emit('input', value)
        }
    },
    methods: {
        onInput({key}){
            const { input, list } = this
            const value = (input + key).toUpperCase()
            if( value ){
                const selectIndex = list.findIndex( item => item.indexOf(value) === 0)
                if( selectIndex >= 0 ){
                    this.input = value
                    this.select = list[selectIndex]
                }
            }
        },
        autocomplete(){
            this.input = this.select
        },
    },
}
</script>
<template lang="pug">
    span.select-input
        input(v-model="input" @keypress.prevent="onInput" @blur="autocomplete" size="5")
        select(v-model="select" @change="autocomplete")
            option(v-for="item in list" :key="item") {{ item }}
</template>
<style lang="scss" scoped>
    input, select {
        margin: 0px;
        padding: 2px 4px;
        border: 1px solid;
        border-radius: 3px;
    }
    input {
        padding-right: 14px;
        margin-right: -24px;
        margin-left: -24px;
    }
    select {
        margin: 4px 2px;
        padding: 0px;
        border-left: none;
        border: none;
        width: 20px;
        overflow: hidden;
    }
</style>