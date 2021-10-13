import fetch from "node-fetch";
import fs from 'fs';

getResultData();

async function getResultData () {
    const [usersETH, volumeETH, tradesETH , usersPolygon, volumePolygon, tradesPolygon, BSC, volumeLimitOrderProtocol, tradesLimitOrderProtocol, usersLimitOrderProtocol] = await Promise.all([
        ETHUsers(),
        TotalVolumeETH(),
        TotalTradesETH(),
        totalTradesPolygon(),
        totalUsersPolygon(),
        totalVolumePolygon(),
        totalTradesBSC(),
        totalVolumeLimitOrder(),
        totalTradesLimitOrder(),
        totalUsersLimitOrder(),
    ]);

    console.log(usersETH, volumeETH, tradesETH, usersPolygon, volumePolygon, tradesPolygon, BSC.trades, BSC.tradeAmount, BSC.uniqueWallets, volumeLimitOrderProtocol, tradesLimitOrderProtocol, usersLimitOrderProtocol);

    const resultData = {};

    resultData.ethereum = {
        "total-users": usersETH,
        "total-volume": volumeETH,
        "total-trades": tradesETH,
    }
    resultData.polygon = {
        "total-users": usersPolygon,
        "total-volume": volumePolygon,
        "total-trades": tradesPolygon,
    }
    resultData.binanceSmartChain = {
        "total-users": BSC.uniqueWallets,
        "total-volume": BSC.tradeAmount,
        "total-trades": BSC.trades,
    }
    resultData.limitOrderProtocol = {
        "total-volume": volumeLimitOrderProtocol,
        "total-trades": tradesLimitOrderProtocol,
        "total-users": usersLimitOrderProtocol,
    }


    fs.writeFileSync(`statistic.json`, JSON.stringify(resultData));
}

function ETHUsers () {
    let raw = JSON.stringify({
        "operationName": "FindResultDataByJob",
        "variables": {
            "job_id": "54cc45ff-b9b0-429d-ad08-ce58e22f4dfc"
        },
        "query": "query FindResultDataByJob($job_id: uuid!) {\n  query_results(where: {job_id: {_eq: $job_id}}) {\n    id\n    job_id\n    error\n    runtime\n    generated_at\n    columns\n    __typename\n  }\n  get_result_by_job_id(args: {want_job_id: $job_id}) {\n    data\n    __typename\n  }\n}\n"
    });

    let requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
        },
        body: raw,
        redirect: 'follow'
    };

    return fetch("https://core-hsr.duneanalytics.com/v1/graphql", requestOptions)
        .then(response => response.text())
        .then(result => {
            const {data} = JSON.parse(result);
            return data.get_result_by_job_id[0].data.users/1000;
        })
        .catch(error => console.log('error', error));

}

function TotalVolumeETH() {
    let raw = JSON.stringify({
        "operationName": "FindResultDataByJob",
        "variables": {
            "job_id": "05df403e-4408-4431-b886-d573d64beb23"
        },
        "query": "query FindResultDataByJob($job_id: uuid!) {\n  query_results(where: {job_id: {_eq: $job_id}}) {\n    id\n    job_id\n    error\n    runtime\n    generated_at\n    columns\n    __typename\n  }\n  get_result_by_job_id(args: {want_job_id: $job_id}) {\n    data\n    __typename\n  }\n}\n"
    });

    let requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
        },
        body: raw,
        redirect: 'follow'
    };

    return fetch("https://core-hsr.duneanalytics.com/v1/graphql", requestOptions)
        .then(response => response.text())
        .then(result => {
            const {data} = JSON.parse(result);
            return data.get_result_by_job_id[0].data.volume;
        })
        .catch(error => console.log('error', error));
}

function TotalTradesETH() {
    let raw = JSON.stringify({
        "operationName": "FindResultDataByJob",
        "variables": {
            "job_id": "44d4e45a-8360-4bdc-85f2-8596c83b58a3"
        },
        "query": "query FindResultDataByJob($job_id: uuid!) {\n  query_results(where: {job_id: {_eq: $job_id}}) {\n    id\n    job_id\n    error\n    runtime\n    generated_at\n    columns\n    __typename\n  }\n  get_result_by_job_id(args: {want_job_id: $job_id}) {\n    data\n    __typename\n  }\n}\n"
    });

    let requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
        },
        body: raw,
        redirect: 'follow'
    };

    return fetch("https://core-hsr.duneanalytics.com/v1/graphql", requestOptions)
        .then(response => response.text())
        .then(result => {
            const {data} = JSON.parse(result);
            return data.get_result_by_job_id[0].data.swaps;
        })
        .catch(error => console.log('error', error));
}
function totalTradesPolygon() {
    let raw = JSON.stringify({
        "operationName": "FindResultDataByJob",
        "query": "query FindResultDataByJob($job_id: uuid!) {\n  query_results(where: {job_id: {_eq: $job_id}}) {\n    id\n    job_id\n    error\n    runtime\n    generated_at\n    columns\n    __typename\n  }\n  get_result_by_job_id(args: {want_job_id: $job_id}) {\n    data\n    __typename\n  }\n}\n",
        "variables": {
            "job_id": "a67d5a5b-f111-4c1e-bb6a-4194d06001b2"
        }
    });

    let requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
        },
        body: raw,
        redirect: 'follow'
    };

    return fetch("https://core-hsr.duneanalytics.com/v1/graphql", requestOptions)
        .then(response => response.text())
        .then(result => {
            const {data} = JSON.parse(result);
            return data.get_result_by_job_id[0].data.unique_addresses;
        })
        .catch(error => console.log('error', error));
}
function totalUsersPolygon() {
    let raw = JSON.stringify({
        "operationName": "FindResultDataByJob",
        "variables": {
            "job_id": "1dad0e2b-a615-45d1-a1ad-6108fe659a42"
        },
        "query": "query FindResultDataByJob($job_id: uuid!) {\n  query_results(where: {job_id: {_eq: $job_id}}) {\n    id\n    job_id\n    error\n    runtime\n    generated_at\n    columns\n    __typename\n  }\n  get_result_by_job_id(args: {want_job_id: $job_id}) {\n    data\n    __typename\n  }\n}\n"
    });

    let requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
        },
        body: raw,
        redirect: 'follow'
    };

    return fetch("https://core-hsr.duneanalytics.com/v1/graphql", requestOptions)
        .then(response => response.text())
        .then(result => {
            const {data} = JSON.parse(result);
            return data.get_result_by_job_id[0].data.users;
        })
        .catch(error => console.log('error', error));
}

function totalVolumePolygon() {
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    return fetch("https://api.debank.com/project/chart?id=matic_1inch&type=trade_volume", requestOptions)
        .then(response => response.text())
        .then(result => {

            const z = JSON.parse(result)
            const totalVolumeByDays = z.data.data
            const volumes = totalVolumeByDays.map(value => {
                return value.value;
            })

            return volumes.reduce((previousValue, currentValue) => {
                return previousValue + currentValue;
            });
        })
        .catch(error => console.log('error', error));
}

function totalTradesBSC() {
    let raw = JSON.stringify({
        "query": "{\n  ethereum(network: bsc) {\n    dexTrades(any: {txTo: {is: \"0x11111112542D85B3EF69AE05771c2dCCff4fAa26\"}}) {\n      date: date {\n        date(format: \"%Y-%m\")\n      }\n      trades: count(uniq: txs)\n      tradeAmount(in: USD)\n      uniqueWallets: count(uniq: senders)\n    }\n  }\n}",
        "variables": "{}"
    });

    let requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
        },
        body: raw,
        redirect: 'follow'
    };

    return fetch("https://graphql.bitquery.io/", requestOptions)
        .then(response => response.text())
        .then(result => {
            const { data } = JSON.parse(result);
            const { dexTrades } = data.ethereum
            const trades = dexTrades.map(item => {
                return item.trades
            })
            const tradesSum = trades.reduce((previousValue, currentValue) => {
                return previousValue + currentValue;
            });

            const tradeAmounts = dexTrades.map(item => {
                return item.tradeAmount
            })
            const tradeAmountSum = tradeAmounts.reduce((previousValue, currentValue) => {
                return previousValue + currentValue;
            });

            const uniqueWallets = dexTrades.map(item => {
                return item.uniqueWallets
            })
            const uniqueWalletsSum = uniqueWallets.reduce((previousValue, currentValue) => {
                return previousValue + currentValue;
            });

            return {
                trades: tradesSum,
                tradeAmount: tradeAmountSum,
                uniqueWallets: uniqueWalletsSum,
            }
        })
        .catch(error => console.log('error', error));
}

function totalVolumeLimitOrder() {
    let raw = JSON.stringify({
        "operationName": "FindResultDataByJob",
        "variables": {
            "job_id": "665c12dd-9dc0-475c-b330-9a2950f182a1"
        },
        "query": "query FindResultDataByJob($job_id: uuid!) {\n  query_results(where: {job_id: {_eq: $job_id}}) {\n    id\n    job_id\n    error\n    runtime\n    generated_at\n    columns\n    __typename\n  }\n  get_result_by_job_id(args: {want_job_id: $job_id}) {\n    data\n    __typename\n  }\n}\n"
    });

    let requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
        },
        body: raw,
        redirect: 'follow'
    };

    return fetch("https://core-hsr.duneanalytics.com/v1/graphql", requestOptions)
        .then(response => response.text())
        .then(result => {
            const {data} = JSON.parse(result);
            return data.get_result_by_job_id[0].data.volume;
        })
        .catch(error => console.log('error', error));
}

function totalTradesLimitOrder() {
    let raw = JSON.stringify({
        "operationName": "FindResultDataByJob",
        "variables": {
            "job_id": "eaaed680-5eb4-4a33-a06c-c1ae14f76ef9"
        },
        "query": "query FindResultDataByJob($job_id: uuid!) {\n  query_results(where: {job_id: {_eq: $job_id}}) {\n    id\n    job_id\n    error\n    runtime\n    generated_at\n    columns\n    __typename\n  }\n  get_result_by_job_id(args: {want_job_id: $job_id}) {\n    data\n    __typename\n  }\n}\n"
    });

    let requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
        },
        body: raw,
        redirect: 'follow'
    };

    return fetch("https://core-hsr.duneanalytics.com/v1/graphql", requestOptions)
        .then(response => response.text())
        .then(result => {
            const {data} = JSON.parse(result);
            return data.get_result_by_job_id[0].data.swaps;
        })
        .catch(error => console.log('error', error));
}

function totalUsersLimitOrder() {
    let raw = JSON.stringify({
        "operationName": "FindResultDataByJob",
        "variables": {
            "job_id": "f7c32863-675d-4789-b88c-5bbb5f98aa4a"
        },
        "query": "query FindResultDataByJob($job_id: uuid!) {\n  query_results(where: {job_id: {_eq: $job_id}}) {\n    id\n    job_id\n    error\n    runtime\n    generated_at\n    columns\n    __typename\n  }\n  get_result_by_job_id(args: {want_job_id: $job_id}) {\n    data\n    __typename\n  }\n}\n"
    });

    let requestOptions = {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json',
        },
        body: raw,
        redirect: 'follow'
    };

    return fetch("https://core-hsr.duneanalytics.com/v1/graphql", requestOptions)
        .then(response => response.text())
        .then(result => {
            const {data} = JSON.parse(result);
            return data.get_result_by_job_id[0].data.users;
        })
        .catch(error => console.log('error', error));
}
