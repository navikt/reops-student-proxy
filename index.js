require("dotenv").config();
const express = require('express');
const axios = require('axios');
const cors = require("cors");
const {config} = require("./config/config");
let app = express();

app.use(cors())

app.get('/siteimprov*', (req, res) => {
    let apiUrl = "https://api.siteimprove.com/v2";
    req.url = req.url.replace(/\/siteimprove/, '')
    if (req.url.match(/users/)) {
        res.end("APIet har blitt blokkert av Team ResearchOps i NAV, ta kontakt med oss for hjelp.")
    } else {
        const options = {
            headers: {Authorization: "Basic " + process.env.SITEIMPROVE},
        };
        axios.get(apiUrl + req.url, options).then(function (response) {
            res.json(response.data)
        }).catch(function (error) {
            console.log(error)
            res.end("Kunne ikke koble til Siteimprove APIet: " + error)
        });
    }
});

// Amplitude Prosjekt: Jobbsøknad Demo
app.get('/amplitude/100004455/api/*', (req, res) => {
    const requestUrl = req.url.replace(/\/amplitude\/100004455/, '')
    const authToken = process.env.AMPLITUDE_100004455
    amplitudeProxy(authToken, requestUrl, res)
});

// Amplitude Prosjekt: Blogg
app.get('/amplitude/100002286/api/*', (req, res) => {
    const requestUrl = req.url.replace(/\/amplitude\/100002286/, '')
    const authToken = process.env.AMPLITUDE_100002286
    amplitudeProxy(authToken, requestUrl, res)
});

const amplitudeProxy = (authToken, requestUrl, proxyResponse) => {
    let apiUrl = "https://analytics.eu.amplitude.com";
    const options = {headers: {Authorization: "Basic " + authToken}};

    if (proxyRouteIsBlocked(requestUrl)) {
        proxyResponse.end("APIet har blitt blokkert av Team ResearchOps i NAV, ta kontakt med oss for hjelp.")
    } else if (requestUrl.match(/export/)) {
        fetchAmplitudeExportData(apiUrl + requestUrl, options, proxyResponse)
    } else {
        fetchAmplitudeJsonData(apiUrl + requestUrl, options, proxyResponse)
    }
}

const proxyRouteIsBlocked = (requestUrl) => {
    const blockedRoutes = [/deletions/, /taxonomy/, /release/, /scim/, /batch/]
    return blockedRoutes.some((route) => requestUrl.match(route))
}

const fetchAmplitudeExportData = (url, options, proxyResponse) => {
    axios.get(url, {...options, responseType: "stream"})
        .then((resp) => {
            resp.data.on('data', data => proxyResponse.write(data));
            resp.data.on('end', () => proxyResponse.end());
        })
        .catch((error) => {
            console.log(error)
            const statusCode = error.response ? error.response.status : 500
            proxyResponse.status(statusCode)
            proxyResponse.end("Kunne ikke koble til Amplitude APIet: " + error)
        });
}

const fetchAmplitudeJsonData = (url, options, proxyResponse) => {
    axios.get(url, options)
        .then((resp) => proxyResponse.json(resp.data))
        .catch((error) => {
            console.log(error)
            const statusCode = error.response ? error.response.status : 500
            proxyResponse.status(statusCode)
            proxyResponse.end("Kunne ikke koble til Amplitude APIet: " + error)
        });
}

app.get('/reops', (req, res) => {
    res.end("it works")
});

app.get("/isAlive", (req, res) => res.sendStatus(200));
app.get("/isReady", (req, res) => res.sendStatus(200));
app.get("/", (req, res) => res.sendStatus(200));

app.listen(8085, function () {
    console.log("Express Started on Port 8085");
});
