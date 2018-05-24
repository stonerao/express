module.exports = {
    isObject: Object => {
        if (typeof Objects !== 'object' || Array.isArray(Objects)) {
            return false;
        }
        return true;
    },
    GetCurrentDate : (timestamps = false) => {
        /**
         * JS获取当前时间
         * @params timestamps number
         * 传入时间戳。转换成时间戳时间
         * @returns {string} 
         */

        const add_zero = (temp) => {
            if (temp < 10) {
                return "0" + temp;
            }
            return temp;
        }
        //转换后是数值
        var d;
        if (timestamps) {
            if (typeof timestamps === 'string') {
                return
            }
            /* 13位时间戳 */
            if (String(timestamps).length === 13) {
                d = new Date(timestamps)
            }
            /* 10位时间搓 */
            if (String(timestamps).length === 10) {
                d = new Date(timestamps * 1000)
            }
        } else {
            d = new Date();
        }
        var y = d.getYear() + 1900;
        var month = add_zero(d.getMonth() + 1);
        var days = add_zero(d.getDate());
        var hours = add_zero(d.getHours());
        var minutes = add_zero(d.getMinutes());
        var seconds = add_zero(d.getSeconds());
        var str = y + '-' + month + '-' + days + ' ' + hours + ':' + minutes + ':' + seconds;
        return str;
    }
}