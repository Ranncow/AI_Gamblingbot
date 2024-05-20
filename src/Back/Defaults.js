/**
 * Plugin constants (hardcoded configuration) for backend code.
 */
export default class Gb_Back_Defaults {

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
