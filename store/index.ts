import { State } from "../logic/types"
import { currencies, percents } from "../logic/data"
import { exchange, generatePairs, addRates, addCommisions } from "../logic"

import { ActionContext } from "vuex"
type Action = ActionContext<State, State>

export const state = () => ({
    from: "EUR",
    to: "UAH",
    amount: 0,

    currencies,
    rates: [],
    commisions: [],
} as State)

export const getters = {
    result: ({ amount, from, to, rates, commisions }: State) => 
        exchange(amount, from, to, rates, commisions)
}

export const mutations = {
    set: (state: State, payload: Partial<State>) =>
        Object.assign(state, payload)
}

export const actions = {
    updateRates({ commit }: Action) {
        const pairs = generatePairs(currencies)
        const rates = addRates(pairs)
        commit('set', {rates})
    },
    updateCommisions({ commit }: Action) {
        const pairs = generatePairs(currencies)
        const commisions = addCommisions(pairs, percents)
        commit('set', {commisions})
    },
}