/**
 * The UI component to get the input from a user.
 *
 * This is a sample of the component that is used on the Home page only (namespace: Gb_Front_Ui_Route_Home_A_)
 *
 * @namespace Gb_Front_Ui_Route_Home_A_Input
 */
// MODULE'S VARS
const NS = 'Gb_Front_Ui_Route_Home_A_Input';
const EVT_OK = 'onOk';

// MODULE'S FUNCTIONS

/**
 * TeqFW DI factory function to get dependencies for the object.
 *
 * @param {Gb_Front_Defaults} DEF
 *
 * @returns {Gb_Front_Ui_Route_Home_A_Input.vueCompTmpl}
 */
export default function (
    {
        Gb_Front_Defaults$: DEF,
    }
) {
    // VARS
    const template = `
<div class="row items-end q-gutter-md" style="width: 100%; display: flex;">
    <q-input v-model="fldMessage"
             autogrow
             dense
             outlined
             style="flex-grow: 1;"
    />
    <q-btn :label="$t('btn.ok')" round @click="onOk"/> 
</div>
`;

    // MAIN
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Gb_Front_Ui_Route_Home_A_Input
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        data() {
            return {
                fldMessage: null,
            };
        },
        methods: {
            onOk() {
                const msg = String(this.fldMessage);
                this.$emit(EVT_OK, msg);
                this.fldMessage = null;
            },
        },
        emits: [EVT_OK],
    };
}
