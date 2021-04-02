// const commonUrl ="http://127.0.0.1:8080"  //公共路径
const commonUrl ="http://120.25.107.83:8080"  //公共路径
// post请求封装
function postRequest(url, data) {
	var promise = new Promise((resolve, reject) => {
		var that = this;
		var postData = data;
		uni.request({
			url: commonUrl + url,
			data: postData,
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded'
			},
			success: function(res) {
				// 此处的code=0，只是个举例，有的可能是1等其他的，具体的看后台决定；
                //res.data.data也根据自己的后台返回层级决定，
                //有的可能是res.data.data.data等其他形式。
                //返回什么就相应的做调整
				// if (res.statusCode == 200 && res.data.code == 0) {
				// 	resolve(res.data.data);
				// } else {
				// 	// 请求服务器成功，但是由于服务器没有数据返回，
    //                  //此时无code。会导致这个空数据
				// 	// 不下去，导致报错，所以还是要resolve下，这样起码有个返回值，
    //                 //不会被阻断在那里执行不下去！
				// 	resolve(res.data.data);
				// }
				resolve(res.data)
			},
			error: function(e) {
				reject('网络出错');
			}
		})
	});
	return promise;
}
// post请求封装
function jsonRequest(url, data) {
	var promise = new Promise((resolve, reject) => {
		var that = this;
		var postData = data;
		uni.request({
			url: commonUrl + url,
			data: postData,
			method: 'POST',
			header: {
				'content-type': 'application/json'
			},
			success: function(res) {
				// 此处的code=0，只是个举例，有的可能是1等其他的，具体的看后台决定；
                //res.data.data也根据自己的后台返回层级决定，
                //有的可能是res.data.data.data等其他形式。
                //返回什么就相应的做调整
				// if (res.statusCode == 200 && res.data.code == 0) {
				// 	resolve(res.data.data);
				// } else {
				// 	// 请求服务器成功，但是由于服务器没有数据返回，
    //                  //此时无code。会导致这个空数据
				// 	// 不下去，导致报错，所以还是要resolve下，这样起码有个返回值，
    //                 //不会被阻断在那里执行不下去！
				// 	resolve(res.data.data);
				// }
				resolve(res.data)
			},
			error: function(e) {
				reject('网络出错');
			}
		})
	});
	return promise;
}
// get请求封装
function getRequest(url, data) {
	var promise = new Promise((resolve, reject) => {
		var that = this;
		var postData = data;
		uni.request({
			url: commonUrl + url,
			data: postData,
			method: 'GET',
			header: {
				'content-type': 'application/json'
			},
			success: function(res) {
				// if (res.statusCode == 200 && res.data.code == 0) {
				// 	resolve(res.data.data);
				// } else {
				// 		resolve(res.data.data);
				// }
				resolve(res.data)
			},
			error: function(e) {
				reject('网络出错');
			}
		})
	});
	return promise;
}
module.exports = {
	postRequest,
	getRequest,
	jsonRequest
}