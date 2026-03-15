// This file contains functions to call the backend API endpoints
// Each function corresponds to an endpoint and returns the JSON response
// The BASE_URL variable should be updated to match the backend server's address
const BASE_URL = "http://127.0.0.1:8000";

export async function getSummary(ticker, timeframe = "1mo", threshold = 0.3, capital = 10000) {
    if (ticker === "DEMO") {
        const res = await fetch(`${BASE_URL}/api/demo?capital=${capital}`)
        const data = await res.json()
        return data.summary
    }
    const res = await fetch(`${BASE_URL}/api/summary?ticker=${ticker}&timeframe=${timeframe}&threshold=${threshold}&capital=${capital}`)
    return res.json()
}

export async function getSignals(ticker, timeframe = "1mo", threshold = 0.3, capital = 10000) {
    if (ticker === "DEMO") {
        const res = await fetch(`${BASE_URL}/api/demo?capital=${capital}`)
        const data = await res.json()
        return data.signals
    }
    const res = await fetch(`${BASE_URL}/api/signals?ticker=${ticker}&timeframe=${timeframe}&threshold=${threshold}&capital=${capital}`)
    return res.json()
}

export async function getHeadlines(ticker, timeframe = "1mo") {
    if (ticker === "DEMO") {
        const res = await fetch(`${BASE_URL}/api/demo`)
        const data = await res.json()
        return data.headlines
    }
    const res = await fetch(`${BASE_URL}/api/headlines?ticker=${ticker}&timeframe=${timeframe}`)
    return res.json()
}

export async function getBacktest(ticker, timeframe = "1mo", threshold = 0.3, capital = 10000) {
    if (ticker === "DEMO") {
        const res = await fetch(`${BASE_URL}/api/demo?capital=${capital}`)
        const data = await res.json()
        return data.backtest
    }
    const res = await fetch(`${BASE_URL}/api/backtest?ticker=${ticker}&timeframe=${timeframe}&threshold=${threshold}&capital=${capital}`)
    return res.json()
}

export async function getMovers() {
    const res = await fetch(`${BASE_URL}/api/movers`)
    return res.json()
}

// DEMO DATA
export async function getDemo(capital = 10000) {
    const res = await fetch(`${BASE_URL}/api/demo?capital=${capital}`)
    return res.json()
}