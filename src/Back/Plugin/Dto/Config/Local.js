/**
 * Local configuration DTO for the plugin.
 * @see TeqFw_Core_Back_Config
 */
// MODULE'S VARS
const NS = 'Gb_Back_Plugin_Dto_Config_Local';

// MODULE'S CLASSES
/**
 * @memberOf Gb_Back_Plugin_Dto_Config_Local
 */
class Dto {
    static namespace = NS;
    /**
     * The API key to connect to the Open AI.
     * @type {string}
     */
    apiKey;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto
 */
export default class Gb_Back_Plugin_Dto_Config_Local {
    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
        }
    ) {

        /**
         * @param {Gb_Back_Plugin_Dto_Config_Local.Dto} data
         * @return {Gb_Back_Plugin_Dto_Config_Local.Dto}
         */
        this.createDto = function (data) {
            // create new DTO and populate it with initialization data
            const res = Object.assign(new Dto(), data);
            // cast known attributes
            res.apiKey = cast.string(data?.apiKey);
            return res;
        };
    }
}