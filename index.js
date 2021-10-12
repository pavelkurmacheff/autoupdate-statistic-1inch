import fetch from "node-fetch";
import fs from 'fs';

getResultData();

async function getResultData () {
    const [a, b, c, d, e, f] = await Promise.all([
        ETHUsers(),
        TotalVolumeETH(),
        TotalTradesETH(),
        totalTradesPolygon(),
        totalUsersPolygon(),
        totalVolumePolygon(),
    ]);

    console.log(a, b, c, d, e, f);

    const resultData = {};

    resultData.eth = {
        "total-users": a,
        "total-volume": b,
        "total-trades": c,
    }
    resultData.polygon = {
        "total-users": d,
        "total-volume": e,
        "total-trades": f,
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

