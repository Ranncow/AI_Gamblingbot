/**
 * The view part for the `Gb_Front_Ui_Widget_Chat` widget.
 *
 * @namespace Gb_Front_Ui_Lib_Chat
 */
// MODULE'S VARS
const NS = 'Gb_Front_Ui_Lib_Chat';

// MODULE'S FUNCTIONS
/**
 * TeqFW DI factory function to get dependencies for the object.
 *
 * @param {Gb_Front_Defaults} DEF
 * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
 * @param {Gb_Front_Ui_Widget_Chat} wgChat
 *
 * @returns {Gb_Front_Ui_Lib_Chat.vueCompTmpl}
 */
export default function (
    {
        Gb_Front_Defaults$: DEF,
        TeqFw_Core_Shared_Api_Logger$: logger,
        Gb_Front_Ui_Widget_Chat$: wgChat,
    }
) {
    // VARS
    const template = `
<template v-for="item in items">
    <q-chat-message :text="uiMsg(item)" :sent="item?.out"/>
</template>
`;

    // MAIN
    /**
     * Template to create new component instances using Vue.
     */
    return {
        teq: {package: DEF.SHARED.NAME},
        name: NS,
        template,
        data() {
            return {
                /** @type {Gb_Front_Dto_Chat_Msg.Dto[]} */
                items: [],
            };
        },
        /**
         * @mixes Gb_Front_Ui_Widget_Chat.IView
         */
        methods: {
            /**
             * @param {Gb_Front_Dto_Chat_Msg.Dto} msg
             */
            pushMessage(msg) {
                this.items.push(msg);
            },
            /**
             * @param {Gb_Front_Dto_Chat_Msg.Dto} item
             * @return {(string)[]}
             */
            uiMsg(item) {
                const msg = item.body;
                return [msg];
            },
        },
        mounted() {
            // set this UI component as a view for the widget
            wgChat.setView(this);
        },
    };
}
