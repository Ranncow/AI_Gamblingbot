/**
 * The main layout for the regular pages.
 *
 * @namespace Gb_Front_Ui_Layout_Main
 */
// MODULE'S VARS
const NS = 'Gb_Front_Ui_Layout_Main';

// MODULE'S FUNCTIONS

/**
 * TeqFW DI factory function to get dependencies for the object.
 *
 * @param {Gb_Front_Defaults} DEF
 * @param {TeqFw_Vue_Front_Util} utilVue
 * @param {Gb_Front_Ui_Layout_Main_A_Navigator.vueCompTmpl} uiNavigator
 *
 * @returns {Gb_Front_Ui_Layout_Main.vueCompTmpl}
 */
export default function (
    {
        Gb_Front_Defaults$: DEF,
        TeqFw_Vue_Front_Util$: utilVue,
        Gb_Front_Ui_Layout_Main_A_Navigator$: uiNavigator,
    }
) {
    // VARS
    const template = `
<q-layout view="hHh lpR lFf">

    <q-header elevated>
        <q-toolbar class="q-pr-xs">
            <div class="q-gutter-sm">
                <q-btn flat dense icon="mdi-arrow-left" @click="onBack"/>
            </div>
            <q-toolbar-title class="q-pl-lg">
                {{$t('layout.main.a.title')}}
            </q-toolbar-title>
            <q-space/>
            <div class="q-gutter-sm">
                <q-btn flat icon="mdi-menu" @click="toggleNavigator" />
            </div>
        </q-toolbar>
    </q-header>

    <q-drawer v-model="ifNavigatorOpen" side="right" overlay elevated>
        <ui-navigator/>
    </q-drawer>

    <q-page-container>
        <router-view>
            <q-page class="t-lo-main-page">
                <slot/>
            </q-page>
        </router-view>
    </q-page-container>
</q-layout>
`;

    // MAIN
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Gb_Front_Ui_Layout_Main
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        components: {uiNavigator},
        data() {
            return {
                ifNavigatorOpen: false,
            };
        },
        methods: {
            onBack() {
                utilVue.goBack(this.$router, DEF.ROUTE_HOME);
            },
            toggleNavigator() {
                this.ifNavigatorOpen = !this.ifNavigatorOpen;
            }
        },
    };
}
