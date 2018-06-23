class HttpRequestQueue {
	constructor() {
		this._queue = []
	}

	startRequestFirstIfNeeded() {
		if (this._queue.length == 0) {
			return
		}
		const req = this._queue[0]
		if (req.readyState == 0) {
			req.startRequest()
		}
	}

	addRequestWithCompletion(req, completion) {
		req.completeHandler = (req, err) => {
			if (completion instanceof Function) {
				completion(req, err)
			}
			const index = this._queue.indexOf(req)
			if (index >= 0) {
				this._queue.splice(index, 1)
			}
			this.startRequestFirstIfNeeded()
		}
		this._queue.push(req)
		this.startRequestFirstIfNeeded()
	}
}

export default class HttpRequest {
	static get sharedQueue() {
		if (!this._queue) {
			this._queue = new HttpRequestQueue()
		}
		return this._queue
	}

	constructor(url, method, postData) {
		this._requestInfo = {}
		this._http = new XMLHttpRequest();

		this.url = url
		this.method = method
		this.postData = postData
	}

	get method() {return this._requestInfo.method}
	set method(v) {this._requestInfo.method = v}

	get url() {return this._requestInfo.url}
	set url(v) {this._requestInfo.url = v}
	
	setHeader(k, v) {
		if (!this._requestInfo.headers) {
			this._requestInfo.headers = {}
		}
		this._requestInfo.headers[k] = v
	}

	get postData() {return this._requestInfo.postData}
	set postData(v) {this._requestInfo.postData = v}
	
	set progressHandler(v) {this._requestInfo.progressHandler = v}
	
	/// - Parameter Function 请求完成、终止、错误时的响应函数，参数为请求对象和错误信息
	set completeHandler(v) {this._requestInfo.completeHandler = v}

	get readyState() {return this._http.readyState}
	get responseText() {return this._http.responseText}

	startRequest() {
		const postData = this.postData
		this._http.open(this.method || (postData ? "post" : "get"), this.url, true)
		const headers = this._requestInfo.headers
		if (headers) {
			for (let k in headers) {
				this._http.setRequestHeader(k, headers[k])
			}
		}
		if (!headers || !headers["Content-type"]) {
			this._http.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
		}
		this._http.onerror = e => {
			this.callCompletionWithError({errorType: "error", status: this._http.status, text: this._http.statusText})
		}
		this._http.onabort = e => {
			this.callCompletionWithError({errorType: "aborted"})
		}
		this._http.onprogress = e => {
			if (this._requestInfo.progressHandler instanceof Function && e && e.lengthComputable) {
				this._requestInfo.progressHandler(e.loaded / e.total)
			}
		}
		this._http.onload = e => {
			const status = this._http.status
			if (status == 200 || status == 204 || status === 0) {
				this.callCompletionWithError(null)
			} else {
				this.callCompletionWithError({errorType: "status", status: status, url: http.responseURL});
			}
		}
		this._http.send(postData)
	}

	/// 请求完成或错误的处理函数。
	callCompletionWithError(err) {
		var http = this._http;
		http.onerror = http.onabort = http.onprogress = http.onload = null;
		if (this._requestInfo.completeHandler instanceof Function) {
			this._requestInfo.completeHandler(this, err)
		}
		delete this._requestInfo
	}
}
