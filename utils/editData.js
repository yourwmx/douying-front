// var api = require('')
import api from './api.js'
// 接口请求

var findUserById = function(e){
	return api.postRequest("/webauth/user/findUserById",e);
}
var updateUserById = function(e){
	return api.postRequest("/webauth/user/updateUserById",e);
}
module.exports = {
	findUserById,
	updateUserById
}