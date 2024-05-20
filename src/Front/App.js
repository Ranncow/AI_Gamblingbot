/**
 * The web application initializes the Vue app and then mounts it to the given DOM element on the page.
 *
 * @implements TeqFw_Web_Front_Api_App
 */
export default class Gb_Front_App {
    /**
     * @param {TeqFw_Di_Api_Container} container
     * @param {Gb_Front_Defaults} DEF
     * @param {TeqFw_Vue_Front_Ext_Vue} extVue
     * @param {TeqFw_Ui_Quasar_Front_Ext} extQuasar
     * @param {TeqFw_Web_Front_Mod_Config} modCfg
     * @param {TeqFw_I18n_Front_Mod_I18n} modI18n
     * @param {TeqFw_Ui_Quasar_Front_Lib_Spinner.vueCompTmpl} uiSpinner
     * @param {Gb_Front_Ui_Layout_Blank.vueCompTmpl} layoutBlank
     * @param {Gb_Front_Ui_Layout_Center.vueCompTmpl} layoutCenter
     * @param {Gb_Front_Ui_Layout_Main.vueCompTmpl} layoutMain
     * @param {Gb_Front_Ui_App.vueCompTmpl} uiApp
     */
    constructor(
        {
            container,
            Gb_Front_Defaults$: DEF,
            TeqFw_Vue_Front_Ext_Vue: extVue,
            TeqFw_Ui_Quasar_Front_Ext: extQuasar,
            TeqFw_Web_Front_Mod_Config$: modCfg,
            TeqFw_I18n_Front_Mod_I18n$: modI18n,
            TeqFw_Ui_Quasar_Front_Lib_Spinner$: uiSpinner,
            Gb_Front_Ui_Layout_Blank$: layoutBlank,
            Gb_Front_Ui_Layout_Center$: layoutCenter,
            Gb_Front_Ui_Layout_Main$: layoutMain,
            Gb_Front_Ui_App$: uiApp,
        }
    ) {
        // VARS
        let _app; // root vue component for the application
        let _print; // function to printout logs to UI or console
        const {
            /** @type {{createApp:function}} */
            Vue,
            /** @type {{createRouter:function, createWebHashHistory:function}} */
            VueRouter,
        } = extVue;

        const {default: quasar} = extQuasar;

        // INSTANCE METHODS

        this.init = async function (fnPrintout) {
            // FUNCS

            /**
             * Create printout function to log application startup events (to page or to console).
             * @param {function(string)} fn
             * @return {function(string)}
             */
            function createPrintout(fn) {
                return (typeof fn === 'function') ? fn : (msg) => console.log(msg);
            }

            /**
             * Setup working languages and fallback language and add translation function to the Vue.
             *
             * @param {Object} app
             * @return {Promise<void>}
             * @memberOf Gb_Front_App.init
             */
            async function initI18n(app) {
                await modI18n.init(['en', 'ru'], 'en');
                const i18n = modI18n.getI18n();
                // add translation function to Vue
                const appProps = app.config.globalProperties;
                // noinspection JSPrimitiveTypeWrapperUsage
                appProps.$t = function (key, options) {
                    // add package name if namespace is omitted in the key
                    // noinspection JSUnresolvedVariable
                    const ns = this.$options.teq?.package;
                    if (ns && key.indexOf(':') <= 0) key = `${ns}:${key}`;
                    return i18n.t(key, options);
                };
            }


            /**
             * Set up Quasar UI.
             *  - icons: https://quasar.dev/start/umd
             *
             * @param {{use:function, iconSet: Object}} app
             * @param quasar
             */
            function initQuasarUi(app, quasar) {
                app.use(quasar, {config: {}});
                // https://quasar.dev/start/umd
                // noinspection JSUnresolvedVariable
                quasar.iconSet.set(quasar.iconSet.svgMaterialIcons);
            }

            /**
             * Add global components to the Vue app.
             * @param {{component:function}} app
             */
            function initUiComponents(app) {
                // ... and add global available components
                app.component('layoutBlank', layoutBlank);
                app.component('layoutCenter', layoutCenter);
                app.component('layoutMain', layoutMain);
                app.component('uiSpinner', uiSpinner);
            }

            /**
             * @param {{use:function}} app Vue 3 app
             * @param {Gb_Front_Defaults} DEF
             * @param {TeqFw_Di_Api_Container} container
             * @memberof Gb_Front_App
             */
            function initRouter(app, DEF, container) {
                /** @type {{addRoute, beforeEach}} */
                const router = VueRouter.createRouter({
                    history: VueRouter.createWebHashHistory(),
                    routes: [],
                });
                // setup application routes (load es6-module on demand using DI-container)
                router.addRoute({
                    path: DEF.ROUTE_HOME,
                    component: () => container.get('Gb_Front_Ui_Route_Home$'),
                });
                //
                app.use(router);
            }

            // MAIN
            let res = false;
            try {
                _print = createPrintout(fnPrintout);
                _print(`Initializing the frontend application...`);
                // create root vue component
                _app = Vue.createApp(uiApp);
                initUiComponents(_app);
                _print(`Global Vue components are added. Initializing Quasar UI...`);
                initQuasarUi(_app, quasar);
                _print(`Quasar UI is initialized. Loading the front app configuration...`);
                await modCfg.init();
                _print(`The app config is loaded. Initializing the i18n...`);
                await initI18n(_app);
                _print(`i18n resources are loaded. Initializing the Vue Router...`);
                initRouter(_app, DEF, container);
                _print(`The Vue Router is initialized. The front app initialization is complete.`);
                res = true;
            } catch (e) {
                _print(e?.message);
            }
            return res;
        };

        /**
         * Mount root vue component of the application to DOM element.
         *
         * @see https://v3.vuejs.org/api/application-api.html#mount
         *
         * @param {Element|string} elRoot
         */
        this.mount = function (elRoot) {
            _app.mount(elRoot);
        };

        /**
         * Launch re-installation app.
         * @param {Element|string} elRoot
         */
        this.reinstall = function (elRoot) {
            _print(`
It is required to reinstall app. Please clean up all data in DevTools 
(F12 / Application / Storage / Clear site data).
Then reload this page.
`);
        };
    }
}
