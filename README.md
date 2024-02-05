ResearchOps Student Proxy
================

ResearchOps Student Proxy hjelper Team Metrikk Arkitektene hente ut data fra Amplitude og Siteimprove.

---

# APIer

- Siteimprove
- Amplitude

## Proxy endepunkt

http://localhost:8085/<api_navn>/<api_endepunkt>

## Slik bruker du ResearchOps Student Proxy

1. Last ned koden fra GitHub
2. Installer pakker ved å kjøre NPM install
3. Legg til en .env fil i rotmappen tilsendt av Team ResearchOps
4. Kjør koden ved å kjøre `npm start`
5. Du kan nå gjøre GET forespørsler til proxyens endepunkt

## Siteimprove

### Proxy endepunkt

http://localhost:8085/siteimprove/<siteimprove_api_endepunkt>

### Tilgjengelige Siteimprove API endepunkter

Inkluderer tilgang til samtlige av Siteimprove sine api endepunkt med GET requests, med unntak av /settings/users/.

### Dokumentasjon

[Siteimprove API Dokumentasjon](https://api.siteimprove.com/v2/documentation)

### Data format

Dataene vises i JSON format.

### Eksempel på bruk av API

Følgende henter ut en liste over alle nettsider lagt til i Siteimprove:
http://localhost:8085/siteimprove/sites

## Amplitude

### Proxy endepunkt

http://localhost:8085/amplitude/<amplitude_api_endepunkt>

### Tilgjengelige Amplitude APIer med GET requests

- [Dashhboard REST API](https://www.docs.developers.amplitude.com/analytics/apis/dashboard-rest-api/)
- [Behavioral Cohorts API](https://www.docs.developers.amplitude.com/analytics/apis/behavioral-cohorts-api/)
- [Chart Annotations API](https://www.docs.developers.amplitude.com/analytics/apis/chart-annotations-api/)
- [Export API](https://www.docs.developers.amplitude.com/analytics/apis/export-api/)

### Dokumentasjon

[Amplitude API Dokumentasjon](https://developers.amplitude.com/docs/dashboard-rest-api)

### Data format

Dataene vises i JSON format.

### Eksempel på bruk av API

Følgende henter ut data tilknyttet en graf i Amplitude:
http://localhost:8085/amplitude/100004455/api/3/chart/e-qkzbeqxh/query

# Henvendelser og veiledning

Spørsmål knyttet til koden kan stilles
som [issues her på GitHub](https://github.com/navikt/reops-proxy/issues). Henvendelser kan sendes via Slack i
kanalen [#researchops](https://nav-it.slack.com/archives/C02UGFS2J4B).