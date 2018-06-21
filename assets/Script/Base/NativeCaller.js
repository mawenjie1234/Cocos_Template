export const JNIType = {
	string: "Ljava/lang/String;",
	int: "I",
	long: "J",
	short: "S",
	boolean: "Z",
	float: "F",
	double: "D",
	void: "V",
}

// how to use :
// new NativeCaller(@className,@method)
//		.argument(@value, @name, @type)
//		.call(@returntype)
// @classname : if you need call CCNativeAPIProxy, use NativeCaller.defaultClassName, 
// @method : call the class method, in java is static method, in oc is + method
// @value : see the argument method in NativeCaller.
// @name : 
// @type
// @ returntype : if the method return void ,you can call it nothing, like new NativeCaller(classname, method).call(),
//   if the method had return type, you can use JNIType in NativeCall.

export default class NativeCaller {
	static get defaultClassName() {
		return "CCNativeAPIProxy"
	}

	constructor(className, method) {
		this._class = className || NativeCaller.defaultClassName
		if (cc.sys.os == cc.sys.OS_ANDROID) {
			this._class = "solitaire/" + this._class
		}
		this._method = method
		this._sigNames = []
		this._argValues = []
	}

	/// - Parameters:
	///   - name: 用于iOS的参数名称，第一个参数可为空字符串
	///   - type: 用于JNI的类型
	argument(value, name, type) {
		this._argValues.push(value)
		switch (cc.sys.os) {
		case cc.sys.OS_IOS:
			this._sigNames.push(name || "")
			break
		case cc.sys.OS_ANDROID:
			this._sigNames.push(type || this.checkTypeForValue(value))
		}
		return this
	}

	checkTypeForValue(value) {
		switch (typeof value) {
		case "string":
			return JNIType.string
		case "number":
			return value == Math.floor(value) ? JNIType.int : JNIType.float
		case "boolean":
			return JNIType.boolean
		default:
			if (value instanceof String) {
				return JNIType.string
			}
		}
	}

	call(returnType) {
		let method = this._method
		if (cc.sys.isBrowser) {
			cc.warn("NativeCaller.call() browser doesn't support: %s", method);
			return;
		}
		const args = this._argValues
		switch (cc.sys.os) {
		case cc.sys.OS_IOS:
			method += this._sigNames
				.map(item => item + ":")
				.join("")
			break
		case cc.sys.OS_ANDROID:
			// Android 参数格式是 方法签名是 args[0]
			let signature = "(" + this._sigNames.join("") + ")" + (returnType || JNIType.void);
			args.splice(0, 0, signature);
			break
		default:
			cc.warn("PlatformNotImplement: %s.%s", this._class, method)
			return
		}
		args.splice(0, 0, this._class, method)
		let ret
		try {
			ret = jsb.reflection.callStaticMethod.apply(jsb.reflection, args);
		} catch (e) {
			cc.error('NativeMethodInvokeFailed %s.%s error: %s', this._class, method, e);
		}
		return ret
	}
}
