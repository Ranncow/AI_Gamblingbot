/**
 * The model to encapsulate functionality related to the chat messages.
 */
export default class Gb_Front_Mod_Chat {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {TeqFw_Web_Api_Front_Web_Connect} api
     * @param {Gb_Shared_Web_Api_Chat_Send} endSend
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            TeqFw_Web_Api_Front_Web_Connect$: api,
            Gb_Shared_Web_Api_Chat_Send$: endSend,
        }
    ) {
        // VARS

        // FUNCS

        // INSTANCE METHODS

        /**
         * @param {string} msg - the text message to OpenAI
         * @return {Promise<string>} - the text response from OpenAI
         */
        this.send = async function (msg) {
            try {
                const req = endSend.createReq();
                req.body = msg;
                // noinspection JSValidateTypes
                /** @type {Gb_Shared_Web_Api_Chat_Send.Response} */
                const rs = await api.send(req, endSend);
                return rs?.body;
            } catch (e) {
                logger.exception(e);
            }
            return undefined;
        };
    }
}
