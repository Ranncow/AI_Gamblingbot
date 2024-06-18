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

### DB initialization

```shell
$ npm run db-init
...
06/18 07:09:29.240 (info TeqFw_Db_Back_Cli_Init): Database structure is recreated.

...
```

### XML data parsing

Total content items are 4313 but this parser understands just 4266 records.

```shell
$ node ./bin/tequila.mjs app-parse -f ./path/to/file/xml
...
06/18 07:15:33.319 (info Gb_Back_Cli_Parse): The job is done. Content (starts/ends): 4292/4292. Processed: 4266. IDs/Types: 4292/4266.


...
```

### Web server

```shell
$ npm start
...
MM/DD HH:MM:SS.MMM (info TeqFw_Web_Back_App_Server): Web server is started on port 9999 in HTTP/1 mode (without web sockets).
```

Open the URL: http://localhost:9999/#/