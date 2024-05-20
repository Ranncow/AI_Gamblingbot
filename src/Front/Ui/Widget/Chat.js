/**
 * The widget that represents the chat in the app.
 */
// MODULE'S INTERFACES
// noinspection JSUnusedLocalSymbols
/**
 * The view for this presenter must implement this interface.
 * @interface
 * @memberOf Gb_Front_Ui_Widget_Chat
 * @mixin
 */
class IView {
    /**
     * Display the new message in the view.
     * @param {Gb_Front_Dto_Chat_Msg.Dto} msg
     */
    pushMessage(msg) { };
}

// MODULE'S CLASSES
export default class Gb_Front_Ui_Widget_Chat {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
        }
    ) {
        // VARS
        /** @type {Gb_Front_Ui_Widget_Chat.IView} */
        let _view;

        // INSTANCE METHODS

        /**
         * Push one message into the chat.
         * @param {Gb_Front_Dto_Chat_Msg.Dto} msg
         */
        this.pushMessage = function (msg) {
            if (_view) _view.pushMessage(msg);
        };

        /**
         * @param {Gb_Front_Ui_Widget_Chat.IView} view
         */
        this.setView = function (view) {
            _view = view;
        };

    }
}
