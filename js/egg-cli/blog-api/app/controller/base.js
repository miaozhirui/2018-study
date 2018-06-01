const { Controller } = require('egg');

class BaseController extends Controller{

    success(data) {

        this.ctx.body={
            code:0,
            data
        }
    }

    error(error) {

        console.log(error)
        this.ctx.body = {

            code:1, 
            data:error.toString()
        }
    }
}

module.exports = BaseController;