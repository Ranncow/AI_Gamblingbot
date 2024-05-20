/**
 * The right navigator.
 *
 * @namespace Gb_Front_Ui_Layout_Main_A_Navigator
 */
// MODULE'S VARS
const NS = 'Gb_Front_Ui_Layout_Main_A_Navigator';

// MODULE'S FUNCTIONS

/**
 * TeqFW DI factory function to get dependencies for the object.
 *
 * @param {Gb_Front_Defaults} DEF
 *
 * @returns {Gb_Front_Ui_Layout_Main_A_Navigator.vueCompTmpl}
 */
export default function (
    {
        Gb_Front_Defaults$: DEF,
    }
) {
    // VARS
    const template = `
<q-scroll-area class="fit">

    <q-list>

        <template v-for="(item, index) in items" :key="index">
            <q-item clickable :active="ifActive(item)" v-ripple v-on:click="onClick(item)">
                <q-item-section avatar>
                    <q-icon :name="item.icon"/>
                </q-item-section>
                <q-item-section>
                    {{ item.label }}
                </q-item-section>
            </q-item>
        </template>

    </q-list>
   
</q-scroll-area>
`;

    // MAIN
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Gb_Front_Ui_Layout_Main_A_Navigator
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        computed: {
            items() {
                return [
                    {
                        icon: 'mdi-home',
                        label: this.$t('layout.main.a.navigator.home'),
                        route: DEF.ROUTE_HOME,
                    },
                ];
            },
        },
        methods: {
            ifActive(item) {
                return (this.$router.currentRoute.value.fullPath === item?.route);
            },
            onClick(item) {
                this.$router.push(item?.route ?? DEF.ROUTE_HOME);
            },
        },
    };
}
