/**
 * The root UI component to use with `createApp`.
 *
 * @namespace Gb_Front_Ui_App
 */
// MODULE'S VARS
const NS = 'Gb_Front_Ui_App';

// MODULE'S FUNCTIONS

/**
 * TeqFW DI factory function to get dependencies for the object.
 *
 * @param {Gb_Front_Defaults} DEF
 * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
 *
 * @returns {Gb_Front_Ui_App.vueCompTmpl}
 */
export default function (
    {
        Gb_Front_Defaults$: DEF,
        TeqFw_Core_Shared_Api_Logger$$: logger,
    }
) {
    // VARS
    const template = `<router-view/>`;

    // MAIN
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Gb_Front_Ui_App
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        async created() {
            const router = this.$router;
            logger.info(`Started with route: '${JSON.stringify(router?.currentRoute.value)}'`);
        },
    };
}
