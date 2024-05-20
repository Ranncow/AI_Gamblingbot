/**
 * Propagate the event among the participants.
 */
// MODULE'S IMPORTS
import OpenAI from 'openai';

// MODULE'S CLASSES
/**
 * @implements TeqFw_Web_Api_Back_Api_Service
 */
export default class Gb_Back_Web_Api_Chat_Send {
    /**
     * @param {Gb_Back_Defaults} DEF
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {TeqFw_Core_Back_Config} config
     * @param {Gb_Shared_Web_Api_Chat_Send} endpoint
     */
    constructor(
        {
            Gb_Back_Defaults$: DEF,
            TeqFw_Core_Shared_Api_Logger$$: logger,
            TeqFw_Core_Back_Config$: config,
            Gb_Shared_Web_Api_Chat_Send$: endpoint,
        }
    ) {
        // VARS
        const apiKey = initApiKey();
        const openai = new OpenAI({apiKey});

        // FUNCS
        /**
         * Extract the Open AI API key from the local configuration.
         * @return {string}
         */
        function initApiKey() {
            const ns = DEF.SHARED.NAME;
            /** @type {Gb_Back_Plugin_Dto_Config_Local.Dto} */
            const cfg = config.getLocal(ns);
            return cfg.apiKey;
        }

        // INSTANCE METHODS

        this.getEndpoint = () => endpoint;

        this.init = async function () { };

        /**
         * @param {Gb_Shared_Web_Api_Chat_Send.Request|Object} req
         * @param {Gb_Shared_Web_Api_Chat_Send.Response|Object} res
         * @param {TeqFw_Web_Api_Back_Api_Service_Context} context
         * @returns {Promise<void>}
         */
        this.process = async function (req, res, context) {
            const rs = endpoint.createRes();
            try {
                logger.info(`Request: ${JSON.stringify(req)}`);
                const msgOut = req.body;
                const completion = await openai.chat.completions.create({
                    messages: [
                        {role: 'system', content: 'You are a helpful assistant.'},
                        {role: 'user', content: msgOut},
                    ],
                    model: 'gpt-3.5-turbo',
                });
                rs.body = completion?.choices?.[0]?.message?.content;
                Object.assign(res, rs); // compose the API response after the RDB commit
                logger.info(`Response: ${JSON.stringify(res)}`);
            } catch (error) {
                logger.error(error);
            }
        };
    }


}
