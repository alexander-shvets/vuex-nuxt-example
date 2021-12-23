import {currencies} from "./data"

export type Currency = (typeof currencies)[number]

export interface State {
    from: Currency,
    to: Currency,
    amount: number,

    rates: Rate[],
    commisions: Commision[],
}

export interface Pair {
    base: Currency,
    quote: Currency,
}

export interface Commision extends Pair {
    commision: number,
}

export interface Rate extends Pair {
    rate: number,
}