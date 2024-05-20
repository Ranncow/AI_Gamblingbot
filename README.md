# AI_Gamblingbot

This is a test chatbot made with Tequila Framework.

## Configuration

Copy the `./cfg/init.json` into the `./cfg/local.json` and set up the local configuration:

```json
{
  "ai_gamblingbot": {
    "apiKey": "..."
  },
  "@teqfw/core": {
    "devMode": true
  },
  "@teqfw/web": {
    "server": {
      "port": 9999,
      "useHttp1": true,
      "useWebSocket": false
    },
    "urlBase": "localhost"
  }
}
```

## Installation

```shell
$ npm i
```

## Usage

```shell
$ npm start
...
MM/DD HH:MM:SS.MMM (info TeqFw_Web_Back_App_Server): Web server is started on port 9999 in HTTP/1 mode (without web sockets).
```

Open the URL: http://localhost:9999/#/