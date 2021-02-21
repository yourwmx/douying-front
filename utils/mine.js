// var api = require('')
import api from './api.js'
// 接口请求

var findUserById = function(e){
	return api.postRequest("/webauth/user/findUserById",e);
}
var updateUserById = function(e){
	return api.postRequest("/webauth/user/updateUserById",e);
}
var addFocusUserBusiness = function(e){
	return api.postRequest("/pc/focusUserBusiness/addFocusUserBusiness",e);
}
var deleteFocusUserBusiness = function(e){
	return api.postRequest("/pc/focusUserBusiness/deleteFocusUserBusiness",e);
}
module.exports = {
	findUserById,
	updateUserById,
	addFocusUserBusiness,
	deleteFocusUserBusiness
}