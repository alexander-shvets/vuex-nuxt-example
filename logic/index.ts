import { Currency, Pair, Rate, Commision } from "./types"

export function exchange(
    amount: number,
    from: Currency, to: Currency,
    rates: Rate[], commisions: Commision[]
){
    const pair = ({ base, quote }: Pair) => 
        from === base && to === quote;
    const rate = rates.find(pair)?.rate || 1
    const commision = commisions.find(pair)?.commision || 0
    const gross = amount * rate
    return gross - commision * (gross / 100)
}

export const generateCommisions = ( 
    currencies: Readonly<Currency[]>, 
    percents: number[] 
): Commision[] =>
    currencies.flatMap( base => 
        currencies.map( quote => ({ 
            base, quote, 
            commision: takeRandom(percents) 
        }))
    )


export function generateRates(currencies: Readonly<Currency[]>){
    let rates = new Array(currencies.length)
    return currencies.flatMap( (base, baseIndex) => {
        rates[baseIndex] = new Array(currencies.length)
        return currencies.map( (quote, quoteIndex) => {
            let rate = rates[quoteIndex] && rates[quoteIndex][baseIndex]
            if( rate ){
                rate = 1 / rate
            }else{
                rates[baseIndex][quoteIndex] = 
                rate = (base === quote ? 1 : random(10, 100))
            }
            console.log(base, quote, rate.toFixed(2))
            return {base, quote, rate}
        })
    })
}

function takeRandom( values: any[] ){
    const maxIndex = values.length - 1
    const randomIndex = Math.floor(Math.random() * maxIndex)
    return values[randomIndex]
}

function random(min = 0, max = 100) {
    return Math.random() * (max - min) + min
}