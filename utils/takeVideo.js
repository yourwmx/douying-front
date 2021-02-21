// var api = require('')
import api from './api.js'
// 接口请求

var listMusics = function(e){
	return api.postRequest("/pc/music/listMusics",e);
}

module.exports = {
	listMusics
}