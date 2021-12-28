import { State } from "../logic/types"
import { currencies, percents } from "../logic/data"
import { exchange, generateRates, generateCommisions } from "../logic"

import { ActionContext } from "vuex"
type Action = ActionContext<State, State>

export const state = () => ({
    from: "EUR",
    to: "UAH",
    pay: 0,
    get: 0,
    rate: 1,
    commision: 0,
    currencies,
    rates: [],
    commisions: [],
} as State)

export const mutations = {
    set: (state: State, payload: Partial<State>) =>
        Object.assign(state, payload),
    pay: (state: State) => 
        state.get = Number(exchange(state.pay, state.from, state.to, state.rates, state.commisions).net.toFixed(2)),
    get: (state: State) => 
        state.pay = Number(exchange(state.get, state.to, state.from, state.rates, state.commisions).net.toFixed(2)),
}

export const actions = {
    updateRates({ commit }: Action) {
        const rates = generateRates(currencies)
        commit('set', {rates})
    },
    updateCommisions({ commit }: Action) {
        const commisions = generateCommisions(currencies, percents)
        commit('set', {commisions})
    },
}