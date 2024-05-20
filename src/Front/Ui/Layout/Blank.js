/**
 * The blank layout for the regular pages.
 *
 * @namespace Gb_Front_Ui_Layout_Blank
 */
// MODULE'S VARS
const NS = 'Gb_Front_Ui_Layout_Blank';

// MODULE'S FUNCTIONS

/**
 * TeqFW DI factory function to get dependencies for the object.
 *
 * @param {Gb_Front_Defaults} DEF
 *
 * @returns {Gb_Front_Ui_Layout_Blank.vueCompTmpl}
 */
export default function (
    {
        Gb_Front_Defaults$: DEF,
    }
) {
    // VARS
    const template = `
<div>
    <slot></slot>
</div>
`;

    // MAIN
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Gb_Front_Ui_Layout_Blank
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
    };
}
