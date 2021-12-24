<script>
import SelectInput from './SelectInput.vue'
import { currencies } from '~/logic/data'

export default {
    components: { SelectInput },
    props: {
        updateInterval: Number,
    },
    data(){
        return {
            interval: NaN,
            currencies,
            store: this.$root.$store,
        }
    },
    computed: {
        ...Object.fromEntries(
            ['from', 'to', 'amount'].map(
                field => [field, {
                    get(){return this.store.state[field] || ''},
                    set( value ){this.store.commit('set', {[field]: value})}  
                }]
            )
        ),
        result(){
            return Number(this.store.getters.result).toFixed(2)
        },
    },
    
    mounted(){
        const { updateInterval } = this
        if( updateInterval ){
            const {dispatch} = this.store
            const update = () => {
                dispatch('updateRates')
                dispatch('updateCommisions')
            }
            update()
            this.interval = setInterval(update, updateInterval * 1000)
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
    form.converter(action="javascript:alert('Done')")
        label Amount:
            input(v-model="amount" @keypress="validateNumber" size="5")
        label.currency.from From:
            SelectInput(v-model="from" :base="to" :items="currencies")
        label.currency.to To:
            SelectInput(v-model="to" :base="from" :items="currencies")
        label.result {{ result }} {{ result ? to : '' }}
        footer
            button(:disabled="amount == 0") Convert
</template>
<style scoped lang="scss">
    .converter{
        width: max-content;
    }
    .converter > label{
        display: flex;
        justify-content: space-between;
        margin: 0.2ex;
    }
</style>