<script>
import { mapState, mapMutations } from 'vuex'
import CurrencySelect from './CurrencySelect.vue'
console.log(mapState)
export default {
    components: { CurrencySelect },
    props: {
        updateInterval: 30,
    },
    data: () => ({
        interval: NaN,
    }),
    computed: {
        ...mapState(
            ['from', 'to', 'amount', 'result']
        ),
        ...mapMutations({
            amount(amount){ this.$store.commit('set', {amount}) }
        }),
    },
    
    mounted(){
        const { updateInterval } = this
        if( updateInterval ){
            const {dispatch} = this.$store
            this.interval = setInterval(
                () => dispatch('update'),
                updateInterval * 1000
            )
        }
    },
    unmounted(){
        if( this.interval ){
            clearInterval(this.interval)
            this.interval = NaN
        }
    },
    methods: {
        validateNumber( event ){
            const value = event.key + event.target.value
            if( value != parseFloat(value) ){
                event.preventDefault()
            }
        },
    },
}
</script>
<template lang="pug">
    div.converter
        label Amount:
            input(v-model="amount" @keypress="validateNumber" size="4")
        label.currency.from From:
            CurrencySelect(:value="from")
        label.currency.to To:
            CurrencySelect(:value="to" :base="from")
        label.result {{ result }} {{ to }}
</template>
<style scoped lang="scss">
.converter{
    width: max-content;
}
.converter > label{
    display: block;
}
</style>