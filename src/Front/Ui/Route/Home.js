/**
 * The base screen for the application's homepage.
 *
 * @namespace Gb_Front_Ui_Route_Home
 */
// MODULE'S VARS
const NS = 'Gb_Front_Ui_Route_Home';
const REF_SCROLL = 'scroll';

// MODULE'S FUNCTIONS

/**
 * TeqFW DI factory function to get dependencies for the object.
 *
 * @param {Gb_Front_Defaults} DEF
 * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
 * @param {Gb_Front_Ui_Widget_Chat} wgChat
 * @param {Gb_Front_Mod_Chat} modChat
 * @param {Gb_Front_Ui_Lib_Chat.vueCompTmpl} uiChat
 * @param {Gb_Front_Ui_Route_Home_A_Input.vueCompTmpl} uiInput
 * @param {Gb_Front_Dto_Chat_Msg} dtoMsg
 *
 * @returns {Gb_Front_Ui_Route_Home.vueCompTmpl}
 */
export default function (
    {
        Gb_Front_Defaults$: DEF,
        TeqFw_Core_Shared_Api_Logger$$: logger,
        Gb_Front_Ui_Widget_Chat$: wgChat,
        Gb_Front_Mod_Chat$: modChat,
        Gb_Front_Ui_Lib_Chat$: uiChat,
        Gb_Front_Ui_Route_Home_A_Input$: uiInput,
        Gb_Front_Dto_Chat_Msg$: dtoMsg,
    }
) {
    // VARS
    const template = `
<layout-main>
    <div class="t-lo-main-container">
        <div class="t-lo-main-content">
            <q-scroll-area ref="${REF_SCROLL}"
                           @scroll="onScroll"
                           style="height: calc(100vh - 50px - 125px); width: 100%;"
            >
                <div class="q-pa-xs q-gutter-xs">
                    <ui-chat/>
                </div>
            </q-scroll-area>
        </div>
        <ui-input class="t-lo-main-input" @onOk="doInput"/>
    </div>
    <ui-spinner :loading="ifLoading"/>
</layout-main>
`;

    // MAIN
    /**
     * Template to create new component instances using Vue.
     *
     * @const {Object} vueCompTmpl
     * @memberOf Gb_Front_Ui_Route_Home
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        components: {uiChat, uiInput},
        data() {
            return {
                ifLoading: false,
            };
        },
        methods: {
            /**
             * Compose the DTO and display the message in the chat.
             * @param {string} msg
             */
            async doInput(msg) {
                const msgOut = dtoMsg.createDto();
                msgOut.body = msg;
                msgOut.out = true;
                wgChat.pushMessage(msgOut);
                this.doScrollBottom();
                try {
                    const rs = await modChat.send(msg);
                    const msgIn = dtoMsg.createDto();
                    msgIn.body = rs;
                    msgIn.out = false;
                    wgChat.pushMessage(msgIn);
                    this.doScrollBottom();
                } catch (e) {
                    logger.exception(e);
                }
            },
            doScrollBottom() {
                const scroll = this.$refs[REF_SCROLL];
                if (scroll) {
                    setTimeout(() => {scroll.setScrollPosition('vertical', 150000, 2000);}, 0);
                }
            },
        },
    };
}
