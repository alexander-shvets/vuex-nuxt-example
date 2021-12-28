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
            userInput: '',
            store: this.$root.$store,
        }
    },
    computed: {
        ...Object.fromEntries(
            ['from', 'to', 'pay', 'get'].map(
                field => [field, {
                    get(){return this.store.state[field] || ''},
                    set( value ){this.store.commit('set', {[field]: value})}  
                }]
            )
        ),
        // result(){
        //     return Number(this.store.getters.result).toFixed(2)
        // },
    },
    watch: {
        from(){
            this.store.commit('pay')
        },
        to(){
            this.store.commit('get')
        },
        pay(){
            if( this.userInput == 'pay' ){
                this.store.commit('pay')
                this.userInput = ''
            }
        },
        get(){
            if( this.userInput == 'get' ){
                this.store.commit('get')
                this.userInput = ''
            }
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
            }else{
                this.userInput = event.target.name
            }
        },
    },
}
</script>
<template lang="pug">
    form.exchange(action="javascript:alert('Done')")
        label You pay
            input(v-model="pay" name="pay" @keypress="validateNumber" size="10")
            SelectInput(v-model="from" :base="to" :items="store.state.currencies")
        label You got
            input(v-model="get" name="get" @keypress="validateNumber" size="10")
            SelectInput(v-model="to" :base="from" :items="store.state.currencies")
        footer 
            button(:disabled="(pay + get) == 0") Exchange
</template>
<style scoped lang="scss">
    .exchange { 
        width: 30ex;
        font-size: 12pt;
    }
    .exchange > label {
        display: flex;
        justify-content: space-between;
        margin: 0.5ex 0ex;
    }
    footer {
        margin-top: 1ex;
        text-align: right;
    }
</style>