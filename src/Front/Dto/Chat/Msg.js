/**
 * The base message object for the chat.
 */
// MODULE'S VARS
const NS = 'Gb_Front_Dto_Chat_Msg';

// MODULE'S CLASSES
/**
 * @memberOf Gb_Front_Dto_Chat_Msg
 */
class Dto {
    static namespace = NS;
    /**
     * Text representation
     * @type {string}
     */
    body;
    /**
     * 'true' if the message is outgoing.
     * @type {boolean}
     */
    out;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto
 */
export default class Gb_Front_Dto_Chat_Msg {
    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
        }
    ) {
        /**
         * @param {Gb_Front_Dto_Chat_Msg.Dto} [data]
         * @return {Gb_Front_Dto_Chat_Msg.Dto}
         */
        this.createDto = function (data) {
            // create new DTO
            const res = new Dto();
            // cast known attributes
            res.body = cast.string(data?.body);
            res.out = cast.boolean(data?.out);
            return res;
        };
    }
}
