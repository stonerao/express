/* const msg = (data, msg, state = 200) => {
    return {
        code: state,
        msg: msg,
        data: data
    }
} */
class msg {
    constructor() {

    }
    msg(data = false, msg = false, state = 200) {
        let obj = {
            code: state 
        }
        if (msg) {
            obj['msg'] = msg;
        }
        if (data) {
            obj['data'] = data;
        }
        return obj
    }
}
module.exports = new msg();