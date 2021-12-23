<script>
import CurrencySelect from './CurrencySelect.vue'

export default {
    components: { CurrencySelect },
    props: {
        updateInterval: {type:Number, default:30},
    },
    data: () => ({
        interval: NaN,
    }),
    computed: {
        ...Object.fromEntries(
            ['from', 'to', 'amount', 'result'].map(
                field => [field, {
                    get(){return this.$root.$store.state[field]},
                    set( value ){this.$root.$store.commit('set', {[field]: value})}  
                }]
            )
        ),
    },
    
    mounted(){
        const { updateInterval } = this
        if( updateInterval ){
            const {dispatch} = this.$root.$store
            console.log('dispatch', this.$root.$store)
            const update = () => {
                dispatch('updateRates')
                dispatch('updateCommisions')
            }

            this.interval = setInterval(update, updateInterval * 1000)
            update()
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
            CurrencySelect(v-model="from")
        label.currency.to To:
            CurrencySelect(v-model="to" :base="from")
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