import { Currency, Pair, Rate, Commision } from "./types"
const { random, floor } = Math

export function convert(
    amount: number,
    from: Currency, to: Currency,
    rates: Rate[], commisions: Commision[]
){
    const pair = ({ base, quote }: Pair) => 
        from === base && to === quote;
    const { rate } = rates.find(pair) as Rate
    const { commision } = commisions.find(pair) as Commision
    const gross = amount * rate
    return gross - commision * (gross / 100)
}

export const generatePairs = ( currencies: Readonly<Currency[]> ): Pair[] =>
    currencies.map( base => 
        currencies.map( quote => ({ base, quote }) )
    ).flat()
    .filter(({ base, quote }) => base != quote)

export const addCommisions = (
    pairs: Pair[], 
    percents: number[]
): Commision[] => 
    pairs.map( fields => ({
        ...fields,
        commision: takeRandom(percents)
    }))

export const addRates = ( pairs: Pair[] ): Rate[] =>
    pairs.map( fields => ({
        ...fields,
        rate: random() * 100
    }))

function takeRandom( values: any[] ){
    const maxIndex = values.length - 1
    const randomIndex = floor(random() * maxIndex)
    return values[randomIndex]
}