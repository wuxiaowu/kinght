/**
 * Date: 13-4-17
 * Time: 01:53
 * 封装一些调用系统的方法
 */
function WLCommon() {

    /**
     * 提示框
     * @param title      提示标题
     * @param content    消息内容
     * @param callback   回调函数
     * @param dialogCloseCallback 窗口关闭后会调用的函数
     */
    this.alert = function (title, content, callback, dialogCloseCallback) {
        alert(content);
    }

    /**
     * 通知框
     * @param title      提示标题
     * @param content    消息内容
     * @param callback   回调函数
     * @param dialogCloseCallback 窗口关闭后会调用的函数
     */
    this.notify = function (title, content, callback, dialogCloseCallback) {
        alert(content);
    }

    /**
     * 确认框
     * @param title      提示标题
     * @param content    消息内容
     * @param callback   回调函数
     * @param dialogCloseCallback 窗口关闭后会调用的函数
     */
    this.showConfirmDialog = function (title, content, callback, dialogCloseCallback) {
        if(confirm(content)){
            if(callback) {
                callback();
            }
        }
        if(dialogCloseCallback){
            dialogCloseCallback();
        }
    }
}

