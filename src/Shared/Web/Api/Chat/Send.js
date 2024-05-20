/**
 * Send the message to the OpenAI and get the response.
 */
// MODULE'S VARS
const NS = 'Gb_Shared_Web_Api_Chat_Send';

// MODULE'S CLASSES
/**
 * @memberOf Gb_Shared_Web_Api_Chat_Send
 */
class Request {
    static namespace = NS;
    /**
     * The text message to send to the OpenAI.
     * @type {string}
     */
    body;
}

/**
 * @memberOf Gb_Shared_Web_Api_Chat_Send
 */
class Response {
    static namespace = NS;
    /**
     * The response from the OpenAI.
     * @type {string}
     */
    body;
}

/**
 * @implements TeqFw_Web_Api_Shared_Api_Endpoint
 */
export default class Gb_Shared_Web_Api_Chat_Send {
    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
        }
    ) {
        // INSTANCE METHODS

        /**
         * @param {Gb_Shared_Web_Api_Chat_Send.Request} [data]
         * @return {Gb_Shared_Web_Api_Chat_Send.Request}
         */
        this.createReq = function (data) {
            // create new DTO
            const res = new Request();
            // cast known attributes
            res.body = cast.string(data?.body);
            return res;
        };

        /**
         * @param {Gb_Shared_Web_Api_Chat_Send.Response} [data]
         * @returns {Gb_Shared_Web_Api_Chat_Send.Response}
         */
        this.createRes = function (data) {
            // create new DTO
            const res = new Response();
            // cast known attributes
            res.body = cast.string(data?.body);
            return res;
        };
    }

}
