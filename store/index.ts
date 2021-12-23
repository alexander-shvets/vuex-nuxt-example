import { State } from "./types"
import { currencies, percents } from "./data"
import { convert, generatePairs, addRates, addCommisions } from "./logic"

import { ActionContext } from "vuex"
type Action = ActionContext<State, State>

export const state = () => ({
    from: "USD",
    to: "UAH",
    amount: 0,

    rates: [],
    commisions: [],
} as State)

export const getters = {
    result: ({ amount, from, to, rates, commisions }: State) => 
        convert(amount, from, to, rates, commisions)
}

export const mutations = {
    set: (state: State, data: Partial<State>) =>
        Object.assign(state, data)
}

export const actions = () => {
    const pairs = generatePairs(currencies)
    return {
        async update({ dispatch, commit }: Action) {
            await Promise.all([
                dispatch('updateRates'),
                dispatch('updateCommisions'),
            ])
            commit('update')
        },

        updateRates({ commit, state }: Action) {
            state.rates = addRates(pairs)
            commit('updateRates')
        },
        updateCommisions({ commit, state }: Action) {
            state.commisions = addCommisions(pairs, percents)
            commit('updateCommisions')
        },
    }
}