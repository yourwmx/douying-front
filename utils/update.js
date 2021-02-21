// var api = require('')
import api from './api.js'
// 接口请求

var updateUserById = function(e){
	return api.postRequest("/webauth/user/updateUserById",e);
}
module.exports = {
	updateUserById
}