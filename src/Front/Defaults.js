/**
 * Plugin constants (hardcoded configuration) for frontend code.
 */
export default class Gb_Front_Defaults {

    ROUTE_HOME = '/';


    /** @type {Gb_Shared_Defaults} */
    SHARED;

    /**
     * @param {Gb_Shared_Defaults} SHARED
     */
    constructor(
        {
            Gb_Shared_Defaults$: SHARED,
        }
    ) {
        this.SHARED = SHARED;
        Object.freeze(this);
    }
}
