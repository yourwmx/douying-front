// var api = require('')
import api from './api.js'
// 接口请求

var querySiteLocalClassify = function(e){
	return api.postRequest("/pc/dictionary/querySiteLocalClassify",e);
}
var updateUserById = function(e){
	return api.postRequest("/webauth/user/updateUserById",e);
}
module.exports = {
	querySiteLocalClassify,
	updateUserById
}