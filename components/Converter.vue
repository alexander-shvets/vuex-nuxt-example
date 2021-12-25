<script>
import SelectInput from './SelectInput.vue'

export default {
    components: { SelectInput },
    props: {
        updateInterval: Number,
    },
    data(){
        return {
            interval: NaN,
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
        label You pay
            input(v-model="amount" @keypress="validateNumber" size="10")
        label.from in currency
            SelectInput(v-model="from" :base="to" :items="store.state.currencies")
        label.to out currency
            SelectInput(v-model="to" :base="from" :items="store.state.currencies")
        label 
            span You got 
            span.result {{ result }} {{ to }}
        footer 
            button(:disabled="amount == 0") Exchange
</template>
<style scoped lang="scss">
    .converter{
        width: 19ex;
        font-size: 12pt;
    }
    .converter > label {
        display: flex;
        justify-content: space-between;
        margin: 0.5ex 0ex;
    }
    footer{
        margin-top: 1ex;
        text-align: right;
    }
</style>