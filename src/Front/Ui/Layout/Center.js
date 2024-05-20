/**
 * The blank and centered layout for the regular pages.
 *
 * @namespace Gb_Front_Ui_Layout_Center
 */
// MODULE'S VARS
const NS = 'Gb_Front_Ui_Layout_Center';

// MODULE'S FUNCTIONS

/**
 * TeqFW DI factory function to get dependencies for the object.
 *
 * @param {Gb_Front_Defaults} DEF
 *
 * @returns {Gb_Front_Ui_Layout_Center.vueCompTmpl}
 */
export default function (
    {
        Gb_Front_Defaults$: DEF,
    }
) {
    // VARS
    const template = `
<div class="t-lo-center">
    <slot></slot>
</div> 
`;

    // MAIN
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Gb_Front_Ui_Layout_Center
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
    };
}
