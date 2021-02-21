// var api = require('')
import api from './api.js'
// 接口请求

var listMedias = function(e){
	return api.postRequest("/pc/media/listMedias",e);
}
var login = function(e){
	return api.postRequest("/webauth/user/login",e);
}
var addUser = function(e){
	return api.postRequest("/webauth/user/addUser",e);
}
var queryLikeMediaBusinessId = function(e){
	return api.postRequest("/pc/likeMediaBusiness/queryLikeMediaBusinessId",e);
}
var addLikeMediaBusiness = function(e){
	return api.postRequest("/pc/likeMediaBusiness/addLikeMediaBusiness",e);
}
var deleteLikeMediaBusiness = function(e){
	return api.postRequest("/pc/likeMediaBusiness/deleteLikeMediaBusiness",e);
}
var queryFocusUserBusinessId = function(e){
	return api.postRequest("/pc/focusUserBusiness/queryFocusUserBusinessId",e);
}
var addFocusUserBusiness = function(e){
	return api.postRequest("/pc/focusUserBusiness/addFocusUserBusiness",e);
}
var deleteFocusUserBusiness = function(e){
	return api.postRequest("/pc/focusUserBusiness/deleteFocusUserBusiness",e);
}
var listComments = function(e){
	return api.postRequest("/pc/comment/listComments",e);
}
var actionMediaComment = function(e){
	return api.postRequest("/pc/comment/actionMediaComment",e);
}
var queryLikeCommentBusinessId = function(e){
	return api.postRequest("/pc/likeCommentBusiness/queryLikeCommentBusinessId",e);
}
var addLikeCommentBusiness = function(e){
	return api.postRequest("/pc/likeCommentBusiness/addLikeCommentBusiness",e);
}
var deleteLikeCommentBusiness = function(e){
	return api.postRequest("/pc/likeCommentBusiness/deleteLikeCommentBusiness",e);
}
var listFocusUserIds = function(e){
	return api.postRequest("/pc/focusUserBusiness/listFocusUserIds",e);
}
module.exports = {
	listMedias,
	login,
	addUser,
	queryLikeMediaBusinessId,
	addLikeMediaBusiness,
	deleteLikeMediaBusiness,
	queryFocusUserBusinessId,
	addFocusUserBusiness,
	deleteFocusUserBusiness,
	listComments,
	actionMediaComment,
	queryLikeCommentBusinessId,
	addLikeCommentBusiness,
	deleteLikeCommentBusiness,
	listFocusUserIds
}