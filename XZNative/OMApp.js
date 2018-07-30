// XZApp.js 3.0.1

/********************************************************
 *                XZApp、XZApp.version                  *
 ********************************************************/

// 基本规范：
// 1. 所有回调中 this 指向 window 。
// 2. 所有交互方法，返回值为 callbackID 或 null 。

// isiOS:          { get: function () { return /\(i[^;]+;( U;)? CPU.+Mac OS X/.test(window.navigator.userAgent); } },
// isAndroid:      { get: function () { return /Android/i.test(window.navigator.userAgent);                      } },
// isInApp:        { get: function () { return /Onemena/i.test(window.navigator.userAgent);                      } },

// LOG 级别：级别不同，输出样式不同。
const XZAppLogLevelDefault = 0;
const XZAppLogLevelWarning = 1;
const XZAppLogLevelError = 2;

// 原生平台。
const XZAppPlatformIOS     = "iOS";
const XZAppPlatformAndroid = "Android";
const XZAppPlatformUnknown = "Unknown";

// 原生 App 主题设置，保存在 Cookie 中所使用的键名。
const XZAppCurrentThemeCookieKey = "XZAppCurrentThemeCookieKey";
// 原生 App 当前用户，保存在 Cookie 中所使用的键名。
const XZAppCurrentUserCookieKey = "XZAppCurrentUserCookieKey";

// 网络状态。
const XZAppNetworkStatusWiFi = "WiFi";

// 缓存类型。
const XZAppResourceCacheTypeImage = "image";


// 类定义。
class XZApp {
    
    /// 当前版本。
    static version = "4.0.0";
    
    /// 拓展静态方法。
    static defineProperty(name, callback) {
        if (!callback || typeof callback !== 'function') {
            return this;
        }
        let parameters = [];
        for (let i = 2; i < arguments.length; i++) {
            parameters.push(arguments[i]);
        }
        let descriptor = callback.apply(window, parameters);
        Object.defineProperty(this, name, descriptor);
        return this;
    }
    
    /// 拓展多个静态方法。
    static defineProperties(callback) {
        if (!callback || typeof callback !== 'function') {
            return this;
        }
        let parameters = [];
        for (let i = 1; i < arguments.length; i++) {
            parameters.push(arguments[i]);
        }
        let descriptor = callback.apply(window, parameters);
        Object.defineProperties(this, descriptor);
        return this;
    }
    
    /// 方法废弃 Log 输出。
    static deprecate(oldMethod, newMethod) {
        if (newMethod) {
            console.log("%c[XZApp] %c" + oldMethod + "%c 在当前版本 [" + this.version + "] 中已废弃，请使用 %c" + newMethod + "%c 代替！",
                "color: #357bbb; font-weight: bold;",
                "color: #cf5c4e; text-decoration: line-through;",
                "color: #cf5c4e;",
                "color: #4c9f67;",
                "font-weight: regular; color: #cf5c4e;");
        } else {
            console.log("%c[XZApp] %c" + oldMethod + "%c 在当前版本 [" + this.version + "] 中已废弃，请更新代码逻辑！",
                "color: #357bbb; font-weight: bold;",
                "color: #cf5c4e; text-decoration: line-through;",
                "color: #cf5c4e;");
        }
    }
    
    /// Log 输出。
    static log(message, level) {
        switch (level) {
            case XZAppLogLevelWarning:
                console.log("%c[XZApp] %c" + message, "color: #357bbb; font-weight: bold;", "background-color: #f18f38; color: #ffffff");
                break;
            
            case XZAppLogLevelError:
                console.log("%c[XZApp] %c" + message, "color: #357bbb; font-weight: bold;", "background-color: #e95648; color: #ffffff");
                break;
            
            case XZAppLogLevelDefault:
            default:
                console.log("%c[XZApp]", "color: #357bbb; font-weight: bold;", message);
                break;
        }
    }
    
    constructor() {
    
    }
    
    defineProperty(name, callback) {
        if (!callback || typeof callback !== 'function') {
            return this;
        }
        let parameters = [];
        for (let i = 2; i < arguments.length; i++) {
            parameters.push(arguments[i]);
        }
        let descriptor = callback.apply(window, parameters);
        Object.defineProperty(this, name, descriptor);
        return this;
    }
    
    defineProperties(callback) {
        if (!callback || typeof callback !== 'function') {
            return this;
        }
        let parameters = [];
        for (let i = 1; i < arguments.length; i++) {
            parameters.push(arguments[i]);
        }
        let descriptor = callback.apply(window, parameters);
        Object.defineProperties(this, descriptor);
        return this;
    }
    
}

/// XZApp.cookie XZApp.parseURLQuery

XZApp.defineProperties(function () {
    
    class XZAppCookie {
        
        _cookies = null;
        _keyedCookies = null;
        
        constructor() {
        
        }
        
        // 读取 cookie 中的所有值，并返回指定值。
        _readCookies(keyName) {
            if (!this._cookies) {
                let cookieString = document.cookie;
                if (!cookieString) {
                    return;
                }
                this._cookies = cookieString.split("; ");
                this._keyedCookies = {};
                while (this._cookies.length > 0) {
                    let tmp = (this._cookies.pop()).split("=");
                    if (!Array.isArray(tmp) || tmp.length !== 2) {
                        continue;
                    }
                    let cookieName = decodeURIComponent(tmp[0]);
                    this._keyedCookies[cookieName] = decodeURIComponent(tmp[1]);
                }
                /// 缓存只在当前 runLoop 中生效。
                window.setTimeout(() => {
                    this._cookies = null;
                    this._keyedCookies = null;
                });
            }
            if (this._keyedCookies.hasOwnProperty(keyName)) {
                return this._keyedCookies[keyName]
            }
            return undefined;
        }
        
        /// 设置/读取 cookie。
        value(name, value) {
            if (typeof value === 'undefined') { // 只有 name 表示获取值。
                return this._readCookies(name);
            }
            let date = new Date();
            if (!!value) { // null 值表示删除，否则就是设置新值。
                date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
                if (typeof value !== "string") {
                    value = JSON.stringify(value);
                }
                document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + "; expires=" + date.toGMTString();
            } else {
                date.setTime(date.getTime() - 1);
                document.cookie = encodeURIComponent(name) + "; expires=" + date.toGMTString();
            }
            // 如果当前有读取缓存，则同时将值存入缓存。
            if (!!this._keyedCookies) {
                this._keyedCookies[name] = value;
            }
            return this;
        }
        
        /// 同步。
        synchronize() {
            this._cookies = null;
            this._keyedCookies = null;
            return this;
        }
    }
    
    let _cookie = new XZAppCookie();
    
    // 将任意 Object 序列化成 URLQuery 部分。
    // - 如果是字符串，则对字符串 URL 编码并返回。
    // - null/undefined 返回空字符串 。
    // - 如果 JSON 序列化成功，返回 URL 编码后的 JSON 串；NaN JSON序列化后是 null 。
    // - 默认返回空字符串。
    function _parseURLQuery(anObject) {
        // 1. 数组直接 JSON
        if (Array.isArray(anObject)) {
            return encodeURIComponent(JSON.stringify(anObject));
        }
        if (!anObject) {
            return "";
        }
        switch (typeof anObject) {
            case 'string':
                return encodeURIComponent(anObject);
            case 'object':
                let queryString = "";
                for (let key in anObject) {
                    if (!anObject.hasOwnProperty(key)) {
                        continue;
                    }
                    if (queryString.length > 0) {
                        queryString += ("&" + encodeURIComponent(key));
                    } else {
                        queryString = encodeURIComponent(key);
                    }
                    if (!anObject[key]) {
                        continue;
                    }
                    if (typeof anObject[key] !== 'string') {
                        queryString += ("=" + encodeURIComponent(JSON.stringify(anObject[key])));
                    } else {
                        queryString += ("=" + encodeURIComponent(anObject[key]));
                    }
                }
                return queryString;
            case 'undefined':
                return '';
            default:
                return encodeURIComponent(JSON.stringify(anObject));
        }
    }
    
    return {
        cookie: {
            get: function () {
                return _cookie;
            }
        },
        parseURLQuery: {
            get: function () {
                return _parseURLQuery;
            }
        }
    };
});


/// XZApp.Method XZApp.registerMethod


window.XZApp.defineProperties(function () {
    
    // XZApp.Method
    let _Method = {};
    
    // 在 XZApp 中注册一个方法。
    // - 如果第二个参数为空，则方法的名称与方法相同。
    // - 第二个参数可以是一个 Object 。
    // - 允许的字符：大小写字母和下划线。
    function _registerMethod(method, name) {
        // 默认名字与方法相同
        if (typeof name === 'undefined') {
            name = method;
        }
        
        // 检查 method.name 。
        function _checkMethodName(name) {
            return ( (typeof name === 'string') || !(/[^a-zA-Z_]/.test(name)) )
        }
        
        
        // 检查 method 。
        function _checkMethodBody(method) {
            switch (typeof method) {
                case 'object':
                    for (let key in method) {
                        if (!method.hasOwnProperty(key)) {
                            continue;
                        }
                        if (!_checkMethodName(key)) {
                            return false;
                        }
                        if (!_checkMethodBody(method[key])) {
                            return false;
                        }
                    }
                    return true;
                case 'string':
                    return !(/[^a-zA-Z_]/.test(method));
                default:
                    return false
            }
        }
        
        if (!_checkMethodName(name)) {
            XZApp.log("注册失败。方法名 " + name + " 不合法，必须只能包含是字母、下划线的字符串。", XZAppLogLevelError);
            return false;
        }
        if (!_checkMethodBody(method)) {
            XZApp.log("注册失败。参数 " + method + " 不合法，必须只能包含是字母、下划线的字符串。", XZAppLogLevelError);
            return false;
        }
        if (_Method.hasOwnProperty(name)) {
            XZApp.log("注册失败，方法名 " + name + " 已存在。", XZAppLogLevelError);
            return false;
        }
        
        // 在对象的值中找到对象的路径。
        function _findPath(value, anObject, basePath) {
            if (!anObject) {
                return null;
            }
            switch (typeof anObject) {
                case 'string':
                    if (anObject === value) {
                        return basePath;
                    }
                    break;
                case 'object':
                    for (let key in anObject) {
                        if (!anObject.hasOwnProperty(key)) {
                            continue;
                        }
                        let path = _findPath(value, anObject[key], basePath + "." + key);
                        if (!!path) {
                            return path;
                        }
                    }
                    break;
                default:
                    XZApp.log("重大错误！检查方法名重复的逻辑不正确。", XZAppLogLevelError);
                    break;
            }
            return null;
        }
        
        // 遍历对象的值，callback(value) 的返回值决定是否继续遍历。
        function _enumerateValues(anObject, callback) {
            if (typeof anObject === 'object') {
                for (let key in anObject) {
                    if (!anObject.hasOwnProperty(key)) {
                        continue;
                    }
                    if (!_enumerateValues(anObject[key], callback)) {
                        break;
                    }
                }
                return true;
            }
            return callback(anObject);
        }
        
        // 遍历所有方法名，查找是否有重复。
        let findPath = null;
        _enumerateValues(method, function (value) {
            findPath = _findPath(value, _Method, "XZApp.Method");
            return !findPath;
        });
        
        if (!!findPath) {
            XZApp.log("方法 " + JSON.stringify(method) + " 注入失败，相同的方法 " + findPath + " 已存在。", XZAppLogLevelError);
            return false;
        }
        
        Object.defineProperty(_Method, name, {
            get: function () {
                return method;
            },
            enumerable: true
        });
        
        return true;
    }
    
    return {
        Method: {
            get: function () {
                return _Method;
            }
        },
        registerMethod: {
            get: function () {
                return _registerMethod;
            }
        }
    };
});



// XZApp.current, xzApp

(function () {
    const xzApp = new XZApp();
    
    Object.defineProperty(window, "xzApp", {
        get: function () {
            return xzApp;
        }
    });

    // 定义全局 XZApp.current 属性。
    window.XZApp.defineProperties(function () {
        return {
            current: {
                get: function () {
                    return xzApp;
                }
            }
        };
    });
})();


// xzApp.delegate xzApp.dispatchCallback xzApp.performMethod

window.xzApp.defineProperties(function () {
    // 代理
    let _delegate   = null;
    let _callbackID = 10000000;
    let _callbacks  = {};
    
    // 注册一个 callback ，并返回其 ID 。
    // 如果 callback 不合法，返回 null。
    function _registerCallback(callback) {
        if (!callback || (typeof callback !== 'function')) {
            return null;
        }
        let uid = "XZApp_CALLBACK_" + (_callbackID++);
        _callbacks[uid] = callback;
        return uid;
    }
    
    // 通过 callbackID 调度 callback 并执行。
    // - 在 callback 执行完毕后，从缓存清除。
    // - 执行结果为 callback 的运行结果。
    // - 所有回调函数的 this 对象都指向 window 对象。
    function _dispatchCallback(callbackID) {
        if (!callbackID) {
            return;
        }
        let callback = _callbacks[callbackID];
        delete _callbacks[callbackID];
        if (!callback) {
            return;
        }
        if (typeof callback !== 'function') {
            return;
        }
        let parameters = [];
        for (let i = 1; i < arguments.length; i++) {
            parameters.push(arguments[i]);
        }
        return callback.apply(window, parameters);
    }
    
    function _cancelCallback(callbackID) {
        if (!callbackID) {
            return;
        }
        if (_callbacks.hasOwnProperty(callbackID)) {
            delete _callbacks[callbackID];
        }
    }
    
    // 代理是函数。
    function _performMethodByUsingFunction(method, parameters, callback) {
        let callbackID = _registerCallback(callback);
        window.setTimeout(function () {
            _delegate(method, parameters, callbackID);
        });
        return callbackID;
    }
    
    // 安卓对象可以接收基本数据类型。
    function _performMethodByUsingBasicObject(method, parameters, callback) {
        let _arguments = [];
        if (Array.isArray(parameters) && parameters.length > 0) {
            for (let i = 0; i < parameters.length; i += 1) {
                let value = parameters[i];
                switch (typeof value) {
                    case 'number':
                    case 'string':
                    case 'boolean':
                        _arguments.push(value);
                        break;
                    default:
                        _arguments.push(JSON.stringify(value));
                        break;
                }
            }
        }
        let callbackID = _registerCallback(callback);
        if (callbackID) {
            _arguments.push(callbackID);
        }
        window.setTimeout(function () {
            _delegate[method].apply(window, _arguments);
        });
        return callbackID;
    }
    
    // 能接收任意数据类型的对象。
    function _performMethodByUsingObject(method, parameters, callback) {
        let _arguments = [];
        if (Array.isArray(parameters)) {
            for (let i = 0; i < parameters.length; i++) {
                _arguments.push(parameters[i]);
            }
        }
        let callbackID = _registerCallback(callback);
        if (callbackID) {
            _arguments.push(function () {
                let parameters = [callbackID];
                for (let i = 0; i < arguments.length; i++) {
                    parameters.push(arguments[i]);
                }
                _dispatchCallback.apply(window, parameters);
            });
        }
        window.setTimeout(function () {
            _delegate[method].apply(window, _arguments);
        });
        return callbackID;
    }
    
    // 没有代理，使用 URL 。
    function _performMethodByUsingURL(method, parameters, callback) {
        let url = "XZApp://" + method;
        
        if (!Array.isArray(parameters)) {
            parameters = [];
        }
        
        let callbackID = _registerCallback(callback);
        
        if (callbackID) {
            parameters.push(callbackID);
        }
        
        let queryString = window.XZApp.parseURLQuery(parameters);
        if (queryString) {
            url += ("?arguments=" + queryString);
        }
        
        let iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.setAttribute('src', url);
        document.body.appendChild(iframe);
        window.setTimeout(function () {
            document.body.removeChild(iframe);
        }, 2000);
        
        return callbackID;
    }
    
    // 执行 App 的一个方法。
    // - 如果有 callback 的话，返回 callbackID 。
    // - parameters 为数组，分别对应接口参数。
    function _performMethod(method, parameters, callback) {
        if (!method || (typeof method !== 'string')) {
            return null;
        }
        
        // 通过 URL 交互
        if (!_delegate) {
            return _performMethodByUsingURL(method, parameters, callback);
        }
        
        // 代理是函数
        if (typeof _delegate === 'function') {
            return _performMethodByUsingFunction(method, parameters, callback);
        }
        
        // 代理是对象，判断代理是否有对应的方法。
        if (!_delegate.hasOwnProperty(method) || (typeof _delegate[method] !== 'function')) {
            window.XZApp.log("xzApp.delegate 没有实现方法 " + method + "，操作无法进行。", XZAppLogLevelError);
            return null;
        }
        
        // 对象，使用简单数据。
        if (window.xzApp.system.isAndroid) {
            return _performMethodByUsingBasicObject(method, parameters, callback);
        }
        
        // 对象，使用原始数据。
        return _performMethodByUsingObject(method, parameters, callback);
    }
    
    // 保存 delegate 变更事件的监听回调。
    let _delegateChangeHandlers = [];
    
    // 添加一个 delegate 变更事件监听或调用。
    function _delegateChange(callback) {
        if (typeof callback !== "function") {
            for (let i = 0; i < _delegateChangeHandlers.length; i++) {
                _delegateChangeHandlers[i].apply(window);
            }
            return;
        }
        _delegateChangeHandlers.push(callback);
    }
    
    return {
        delegate: {
            get: function () {
                return _delegate;
            },
            set: function (newValue) {
                let oldValue = _delegate;
                _delegate = newValue;
                _delegateChange();
            }
        },
        performMethod: {
            get: function () {
                return _performMethod;
            }
        },
        dispatchCallback: {
            get: function () {
                return _dispatchCallback;
            }
        },
        cancelCallback: {
            get: function () {
                return _cancelCallback;
            }
        },
        delegateChange: {
            get: function () {
                return _delegateChange;
            }
        }
    };
});


// xzApp.ready

window.XZApp.registerMethod("ready");

window.XZApp.current.defineProperties(function () {
    // 标识 xzApp 是否初始化完成。
    let _isReady = false;
    // 保存 ready 后的回调。
    let _readyHandlers = null;
    // 保存属性拓展
    let _extensions = [];
    // App 的基本配置
    let _configuration = {
        isDebug:    true,
        platform:   XZAppPlatformUnknown, // 平台
        UDID:       "1234-567-8901"       // 唯一标识
    };
    
    /// xzApp 的拓展方法。
    function _extend(callback) {
        if (typeof callback !== 'function') {
            return this;
        }
        if (_isReady) {
            window.xzApp.defineProperties(callback, this);
        } else {
            _extensions.push(callback);
        }
        return this;
    }
    
    // App 完成初始化 xzApp 对象。触发回调。
    function _didReady(configuration) {
        _isReady = true;
        _configuration = configuration;
        while (_extensions.length > 0) {
            window.xzApp.defineProperties(_extensions.shift(), this);
        }
        if (!_readyHandlers) {
            window.xzApp.log('xzApp 初始化完成时，没有检测到任何需执行的回调，请确保在所有调用是在 xzApp 初始化完成之后进行的。', XZAppLogLevelWarning);
            return;
        }
        while (_readyHandlers.length > 0) {
            (_readyHandlers.shift()).apply(window);
        }
    }
    
    let _readyID = null;
    
    // 0.1 向 App 发送消息，HTML 页面准备完成，可以初始化 xzApp 对象了。
    // - App 需在完成初始化 xzApp 对象后调用 _readyCompletionHandler 函数。
    // - 此函数有固定的回调函数，不需要额外传入。
    function _sendReadyMessage() {
        if (_isReady) {
            return;
        }
        if (_readyID) {
            window.xzApp.cancelCallback(_readyID);
        }
        _readyID = _performMethod(window.XZApp.Method.ready, null, _didReady);
    }
    
    // 监听文档状态，发送 ready 事件。
    (function () {
        if (document.readyState === 'complete') {
            window.setTimeout(function () {
                _sendReadyMessage();
            });
        } else {
            let _eventListener = function () {
                document.removeEventListener("DOMContentLoaded", _eventListener);
                window.removeEventListener("load", _eventListener);
                window.setTimeout(function () {
                    _sendReadyMessage();
                });
            };
            document.addEventListener("DOMContentLoaded", _eventListener, false);
            window.addEventListener("load", _eventListener, false);
        }
    })();
    
    function _ready(callback) {
        // 如果 App 已经初始化，则异步执行 callback。
        if (_isReady) {
            setTimeout(callback);
            return this;
        }
        
        // App 尚未初始化，保存 callback 。
        if (!Array.isArray(_readyHandlers)) {
            _readyHandlers = [callback];
        } else {
            _readyHandlers.push(callback);
        }
        return this;
    }
    
    // 监听代理变更。
    window.xzApp.delegateChange(function () {
        // 如果文档已加载完成，但是 ready 状态并未改变，重新向代理发送 ready 事件。
        if (!_isReady && document.readyState === 'complete') {
            _sendReadyMessage();
        }
    });
    
    
    class XZAppSystem {
        static get platform() {
            return _configuration.platform;
        }
        static get isIOS() {
            return (_configuration.platform === XZAppPlatformIOS);
        }
        static get isAndroid() {
            return (_configuration.platform === XZAppPlatformAndroid);
        }
    }
    
    return {
        isDebug: {
            get: function () {
                return _configuration.isDebug;
            }
        },
        isReady: {
            get: function () {
                return _isReady;
            }
        },
        ready: {
            get: function () {
                return _ready;
            }
        },
        extend: {
            get: function () {
                return _extend;
            }
        },
        system: {
            get: function () {
                return XZAppSystem;
            }
        }
    };
});


// XZApp.current.currentTheme

window.XZApp.registerMethod('setCurrentTheme');

window.xzApp.extend(function (configuration) {
    let _currentTheme = configuration.currentTheme;
    let _currentThemeChangeHandlers = [];
    
    // 设置当前主题。
    function _setCurrentTheme(newValue, animated, needsSyncToApp) {
        _currentTheme = newValue;
        // 将主题保存到 cookie 中.
        window.XZApp.cookie.value(XZAppCurrentThemeCookieKey, newValue);
        // 同步到 App 说明更改主题是由 JS 触发的，则不发送事件；否则就发送事件。
        if (needsSyncToApp || typeof needsSyncToApp === "undefined") {
            window.xzApp.performMethod(window.XZApp.Method.setCurrentTheme, [newValue, animated], null);
        } else {
            _currentThemeChange();
        }
    }
    
    function _currentThemeChange(callback, animated) {
        if (typeof callback === 'function') {
            _currentThemeChangeHandlers.push(callback);
            return this;
        }
        for (let i = 0; i < _currentThemeChangeHandlers.length; i++) {
            _currentThemeChangeHandlers[i].apply(window);
        }
        return this;
    }
    
    (function () {
        function _pageShow() {
            let currentTheme = window.XZApp.cookie.value(XZAppCurrentThemeCookieKey);
            if (!currentTheme || currentTheme === window.xzApp.currentTheme) {
                return;
            }
            window.xzApp.setCurrentTheme(currentTheme, false, false);
            window.xzApp.currentThemeChange();
        }
        
        function _pageHide() {
            window.removeEventListener('pagehide', _pageHide);
            window.addEventListener('pageshow', _pageShow);
        }
        
        // 页面第一隐藏后，每次出现时，都从 Cookie 检查主题是否发生变更。
        window.addEventListener('pagehide', _pageHide);
    }).call(this);
    
    return {
        currentTheme: {
            get: function () {
                return _currentTheme;
            }
        },
        currentThemeChange: {
            get: function () {
                return _currentThemeChange;
            }
        },
        setCurrentTheme: {
            get: function () {
                return _setCurrentTheme;
            }
        }
    }
});



// XZApp.current.login

window.XZApp.registerMethod("login");

window.XZApp.current.extend(function () {
    
    // 1.1 HTML 调用原生的登录。
    function _login(callback) {
        if (!callback) {
            XZApp.log("Method `login` called without a callback is not allowed.", XZAppLogLevelWarning);
            return this;
        }
        return window.xzApp.performMethod(window.XZApp.Method.login, null, callback);
    }
    
    return {
        login: {
            get: function () {
                return _login;
            }
        }
    };
});


/********************************************************
 *            XZApp.current.currentUser                 *
 ********************************************************/

window.xzApp.extend(function (configuration) {
    // 存储监听
    let _currentUserChangeHandlers = [];
    
    function _currentUserChange(callback) {
        if (typeof callback === "function") {
            _currentUserChangeHandlers.push(callback);
            return this;
        }
        for (let i = 0; i < _currentUserChangeHandlers.length; i++) {
            _currentUserChangeHandlers[i].call(window);
        }
        return this;
    }
    
    class XZAppUser {
        constructor(userID, userName, userInfo, userVersion) {
            this._id = userID;
            this._name = userName;
            this._info = userInfo;
            this._version = userVersion;
        }
        
        get id() {
            return this._id;
        }
        
        get name() {
            return this._name;
        }
        
        get info() {
            return this._info;
        }
        
        get version() {
            return this._version;
        }
    }
    
    // 定义用户
    let _currentUser = new XZAppUser(configuration.currentUser.id, configuration.currentUser.name, configuration.currentUser.info, configuration.currentUser.version);
    
    // 设置当前用户，App 行为。
    function _setCurrentUser(UserInfo) {
        _currentUser = new XZAppUser(UserInfo.id, UserInfo.name, UserInfo.info, UserInfo.version);
        _currentUserChange();
    }
    
    (function () {
        // 在页面隐藏时绑定显示时事件。
        // 页面显示时，从 cookie 读取信息。
        function _pageShow() {
            let userInfo = window.XZApp.cookie.value(XZAppCurrentUserCookieKey);
            if (userInfo.id !== window.xzApp.id || userInfo.version !== window.xzApp.version) {
                window.xzApp.setCurrentUser(userInfo);
            }
        }
        
        // 页面第一次隐藏后，监听页面显示事件。
        function _pageHide() {
            window.addEventListener('pageshow', _pageShow);
            window.removeEventListener('pagehide', _pageHide);
        }
        
        // 绑定页面隐藏时的事件
        window.addEventListener('pagehide', _pageHide);
    })();
    
    
    return {
        setCurrentUser: {
            get: function () {
                return _setCurrentUser;
            }
        },
        currentUserChange: {
            get: function () {
                return _currentUserChange;
            }
        },
        currentUser: {
            get: function () {
                return _currentUser;
            }
        }
    };
});



// xzApp.open(page, parameters)

window.XZApp.registerMethod('open');

window.xzApp.extend(function () {
    
    function _open(page, parameters) {
        if (typeof page !== 'string') {
            window.XZApp.log("Method `open`'s page parameter must be a XZApp.Page value.", XZAppLogLevelError);
            return null;
        }
        let _arguments = [page];
        if (parameters) {
            _arguments.push(parameters);
        }
        return window.xzApp.performMethod(window.XZApp.Method.open, _arguments);
    }
    
    return {
        open: {
            get: function () {
                return _open;
            }
        }
    };
});


/// XZApp.current.navigation

window.XZApp.registerMethod(Object.freeze({
    push: 'push',
    pop: 'pop',
    popTo: 'popTo',
    bar: Object.freeze({
        setHidden: "setNavigationBarHidden",
        setTitle: "setNavigationBarTitle",
        setTitleColor: "setNavigationBarTitleColor",
        setBackgroundColor: "setNavigationBarBackgroundColor"
    })
}), 'navigation');

window.XZApp.current.extend(function (configuration) {
    // 3.4 Bar
    function XZAppNavigationBar(NavigationBarInfo) {
        let _title           = NavigationBarInfo.title;
        let _titleColor      = NavigationBarInfo.titleColor;
        let _backgroundColor = NavigationBarInfo.backgroundColor;
        let _isHidden        = NavigationBarInfo.isHidden;
        
        function _setTitle(newValue, needsSyncToApp) {
            if (typeof newValue !== 'string') {
                window.XZApp.log("The navigation.bar.title must be a string value.", XZAppLogLevelError);
                return this;
            }
            _title = newValue;
            if (needsSyncToApp) {
                window.XZApp.current.performMethod(window.XZApp.Method.navigation.bar.setTitle, [newValue]);
            }
            return this;
        }
        
        function _setTitleColor(newValue, needsSyncToApp) {
            if (typeof newValue !== 'string') {
                window.XZApp.log("The navigation.bar.titleColor must be a string value.", XZAppLogLevelError);
                return this;
            }
            _titleColor = newValue;
            if (needsSyncToApp) {
                window.XZApp.current.performMethod(window.XZApp.Method.navigation.bar.setTitleColor, [newValue]);
            }
            return this;
        }
        
        function _setHidden(newValue, animated, needsSyncToApp) {
            if (typeof newValue !== 'boolean') {
                window.XZApp.log("The navigation.bar.isHidden must be a boolean value.", XZAppLogLevelError);
                return this;
            }
            _isHidden = newValue;
            if (needsSyncToApp) {
                window.XZApp.current.performMethod(window.XZApp.Method.navigation.bar.setHidden, [newValue, animated]);
            }
            return this;
        }
        
        function _hide(animated) {
            _setHidden(true, animated, true);
            return this;
        }
        
        function _show(animated) {
            _setHidden(false, animated, true);
            return this;
        }
        
        function _setBackgroundColor(newValue, needsSyncToApp) {
            if (typeof newValue !== 'string') {
                window.XZApp.log("The navigation.bar.backgroundColor must be a string value.", 1);
                return this;
            }
            _backgroundColor = newValue;
            if (!needsSyncToApp) {
                return this;
            }
            window.XZApp.current.performMethod(window.XZApp.Method.navigation.bar.setBackgroundColor, [newValue]);
            return this;
        }
        
        Object.defineProperties(this, {
            title: {
                get: function () {
                    return _title;
                },
                set: function (newValue) {
                    _setTitle(newValue, true);
                }
            },
            titleColor: {
                get: function () {
                    return _titleColor;
                },
                set: function (newValue) {
                    _setTitleColor(newValue, true);
                }
            },
            backgroundColor: {
                get: function () {
                    return _backgroundColor;
                },
                set: function (newValue) {
                    _setBackgroundColor(newValue, true);
                }
            },
            isHidden: {
                get: function () {
                    return _isHidden;
                },
                set: function (newValue) {
                    _setHidden(newValue, false, true);
                }
            },
            setTitle: {
                get: function () {
                    return _setTitle;
                }
            },
            setTitleColor: {
                get: function () {
                    return _setTitleColor;
                }
            },
            setBackgroundColor: {
                get: function () {
                    return _setBackgroundColor;
                }
            },
            setHidden: {
                get: function () {
                    return _setHidden;
                }
            },
            hide: {
                get: function () {
                    return _hide;
                }
            },
            show: {
                get: function () {
                    return _show;
                }
            }
        });
    }
    
    function XZAppNavigation(NavigationInfo) {
        // 3.1 进入下级页面。
        let _push = function (url, animated) {
            if (typeof url !== 'string') {
                window.XZApp.log("Method `push` can not be called without a url parameter.", 0);
                return null;
            }
            // 判断 URL 是否是相对路径。
            if (!/^([a-z]+):\/\//i.test(url)) {
                url = window.location.protocol + "//" + window.location.host + url;
            }
            if (typeof animated !== 'boolean') {
                animated = true;
            }
            return window.XZApp.current.performMethod(window.XZApp.Method.navigation.push, [url, animated], null);
        };
        
        // 3.2 推出当前页面，使栈内页面数量 -1。
        let _pop = function (animated) {
            if (typeof animated !== 'boolean') {
                animated = true;
            }
            return window.XZApp.current.performMethod(window.XZApp.Method.navigation.pop, [animated], null);
        };
        
        // 3.3 移除栈内索引大于 index 的所有页面，即将 index 页面所显示的内容展示出来。
        let _popTo = function (index, animated) {
            if (typeof index !== 'number') {
                window.XZApp.log("Method `popTo` can not be called without a index parameter.", 1);
                return;
            }
            if (typeof animated !== 'boolean') {
                animated = true;
            }
            return window.XZApp.current.performMethod(window.XZApp.Method.navigation.popTo, [index, animated]);
        };
        
        let _bar = new XZAppNavigationBar(NavigationInfo.bar);
        
        Object.defineProperties(this, {
            push: {
                get: function () {
                    return _push;
                }
            },
            pop: {
                get: function () {
                    return _pop;
                }
            },
            popTo: {
                get: function () {
                    return _popTo;
                }
            },
            bar: {
                get: function () {
                    return _bar;
                }
            }
        });
    }
    
    let _navigation = new XZAppNavigation(configuration.navigation);
    
    return {
        'navigation': {
            get: function () {
                return _navigation;
            }
        }
    };
});


/********************************************************
 *                                                      *
 *                XZApp.current.present                 *
 *                                                      *
 ********************************************************/

window.XZApp.registerMethod("present");
window.XZApp.registerMethod("dismiss");

window.XZApp.current.extend(function () {
    
    function _present(url, arg1, arg2) {
        if (typeof url !== 'string') {
            window.XZApp.log("Method `present` first parameter must be a string value.", 1);
            return null;
        }
        let animated = arg1;
        let completion = arg2;
        if (typeof arg1 === 'function') {
            animated = true;
            completion = arg1;
        }
        if (typeof animated !== 'boolean') {
            animated = true;
        }
        return this.performMethod(window.XZApp.Method.present, [url, animated], completion);
    }
    
    function _dismiss(arg1, arg2) {
        let animated = arg1;
        let completion = arg2;
        if (typeof arg1 === 'function') {
            animated = true;
            completion = arg1;
        }
        if (typeof animated !== 'boolean') {
            animated = true;
        }
        return this.performMethod(window.XZApp.Method.dismiss, [animated], completion);
    }
    
    return {
        present: {
            get: function () {
                return _present;
            }
        },
        dismiss: {
            get: function () {
                return _dismiss;
            }
        }
    }
    
});


/********************************************************
 *                                                      *
 *             XZApp.current.networking                 *
 *                                                      *
 ********************************************************/

window.XZApp.registerMethod({
    http: "http"
}, "networking");

window.XZApp.current.extend(function (AppInfo) {
    
    function XZAppNetworking(NetworkingInfo) {
        let _status = NetworkingInfo.status;
        let _statusChangeHandlers = [];
        
        // HTTP 请求
        function _http(request, callback) {
            if (!request || typeof request !== 'object') {
                window.XZApp.log("Method `http` first parameter must be an request object.", XZAppLogLevelError);
                return null;
            }
            return window.XZApp.current.performMethod(window.XZApp.Method.networking.http, [request], callback);
        }
        
        // 网络状态监听。
        function _statusChange(callback) {
            if (typeof callback === "function") {
                _statusChangeHandlers.push(callback);
                return this;
            }
            for (let i = 0; i < _statusChangeHandlers.length; i++) {
                _statusChangeHandlers[i].call(window);
            }
        }
        
        // 供 App 切换状态
        function _setStatus(newValue) {
            _status = newValue;
            _statusChange();
        }
        
        Object.defineProperties(this, {
            isViaWiFi: {
                get: function () {
                    return (_status === XZAppNetworkStatusWiFi);
                }
            },
            status: {
                get: function () {
                    return _status;
                }
            },
            isReachable: {
                get: function () {
                    return !!_status
                }
            },
            statusChange: {
                get: function () {
                    return _statusChange;
                }
            },
            http: {
                get: function () {
                    return _http;
                }
            },
            setStatus: {
                get: function () {
                    return _setStatus;
                }
            }
        });
    }
    
    let _networking = new XZAppNetworking(AppInfo.networking);
    
    return {
        "networking": {
            get: function () {
                return _networking;
            }
        },
        "http": {
            get: function () {
                return _networking.http;
            }
        }
    };
});


/********************************************************
 *                XZApp.current.alert                   *
 ********************************************************/

window.XZApp.registerMethod("alert");

window.XZApp.current.extend(function () {
    function _alert(message, callback) {
        if (!message || typeof message !== 'object') {
            window.XZApp.log("Method `alert` first parameter must be an message object.", XZAppLogLevelError);
            return null;
        }
        return window.xzApp.performMethod(window.XZApp.Method.alert, [message], callback);
    }
    
    return {
        'alert': {
            get: function () {
                return _alert;
            }
        }
    };
});

/********************************************************
 *               XZApp.current.services                 *
 ********************************************************/

window.XZApp.registerMethod(Object.freeze({
    data: Object.freeze({
        numberOfRowsInList: "numberOfRowsInList",
        dataForRowAtIndex: "dataForRowAtIndex",
        cachedResourceForURL: "cachedResourceForURL"
    }),
    event: Object.freeze({
        didSelectRowAtIndex: "didSelectRowAtIndex",
        elementWasClicked: "elementWasClicked"
    }),
    analytics: Object.freeze({
        track: "track"
    })
}), "services");


window.XZApp.current.extend(function () {
    
    function XZAppDataService() {
        // 获取 list 的行数。
        // - list: string
        // - callback: (number)=>void
        function _numberOfRowsInList(documentName, listName, callback) {
            if (typeof documentName !== 'string' || typeof listName !== 'string') {
                window.XZApp.log("Method `numberOfRowsInList` first/second parameter must be a string value.", XZAppLogLevelError);
                return null;
            }
            let method = window.XZApp.Method.services.data.numberOfRowsInList;
            return window.XZApp.current.performMethod(method, [documentName, listName], callback);
        }
        
        // 加载数据
        // - list: XZAppList
        // - index: number
        // - callback: (data)=>void
        function _dataForRowAtIndex(documentName, listName, index, callback) {
            if (typeof documentName !== 'string' || typeof listName !== 'string' || typeof index !== 'number') {
                window.XZApp.log("Method `dataForRowAtIndex` first/second/third parameter must be a string/string/number value.", XZAppLogLevelError);
                return null;
            }
            let method = window.XZApp.Method.services.data.dataForRowAtIndex;
            return window.XZApp.current.performMethod(method, [documentName, listName, index], callback);
        }
        
        // 获取缓存。
        function _cachedResourceForURL(url, cacheType, completion) {
            // 检查 URL
            if (typeof url !== 'string') {
                window.XZApp.log("Method `cachedResourceForURL` url parameter must be a string value.", XZAppLogLevelError);
                return null;
            }
            // 检查 cacheType
            switch (typeof cacheType) {
                case 'function':
                    completion = cacheType;
                    cacheType = XZAppResourceCacheTypeImage;
                    break;
                case 'string':
                    break;
                default:
                    cacheType = XZAppResourceCacheTypeImage;
                    break;
            }
            // 检查 handler
            if (typeof completion !== 'function') {
                window.XZApp.log("Method `cachedResourceForURL` must have a callback handler.", XZAppLogLevelError);
                return null;
            }
            let method = window.XZApp.Method.services.data.cachedResourceForURL;
            return window.XZApp.current.performMethod(method, [url, cacheType], completion);
        }
        
        Object.defineProperties(this, {
            numberOfRowsInList: {
                get: function () {
                    return _numberOfRowsInList;
                }
            },
            dataForRowAtIndex: {
                get: function () {
                    return _dataForRowAtIndex;
                }
            },
            cachedResourceForURL: {
                get: function () {
                    return _cachedResourceForURL;
                }
            }
        });
    }
    
    function XZAppEventService() {
        // List 点击事件。
        function _didSelectRowAtIndex(documentName, listName, index, callback) {
            if (typeof documentName !== 'string' || typeof listName !== 'string' || typeof index !== 'number') {
                window.XZApp.log("Method `didSelectRowAtIndex` first/second/third parameter must be a string/string/number value.", 1);
                return null;
            }
            let method = window.XZApp.Method.services.event.didSelectRowAtIndex;
            return window.XZApp.current.performMethod(method, [documentName, listName, index], callback);
        }
        
        // 处理事件
        function _elementWasClicked(documentName, elementName, data, callback) {
            if (typeof documentName !== 'string' || typeof elementName !== 'string') {
                window.XZApp.log("Method `elementWasClicked` first/second parameter must be a string value.", 1);
                return null;
            }
            if (typeof data === 'function') {
                callback = data;
                data = null;
            }
            let method = window.XZApp.Method.services.event.elementWasClicked;
            return window.XZApp.current.performMethod(method, [documentName, elementName, data], callback);
        }
        
        Object.defineProperties(this, {
            didSelectRowAtIndex: {
                get: function () {
                    return _didSelectRowAtIndex;
                }
            },
            elementWasClicked: {
                get: function () {
                    return _elementWasClicked;
                }
            }
        });
    }
    
    function XZAppAnalytics() {
        function _track(event, parameters) {
            if (typeof event !== 'string') {
                window.XZApp.log("Method `track` first parameter must be a string value.", 1);
                return null;
            }
            return window.XZApp.current.performMethod(window.XZApp.Method.services.analytics.track, [event, parameters]);
        }
        
        Object.defineProperties(this, {
            track: {
                get: function () {
                    return _track;
                }
            }
        });
    }
    
    function XZAppServices() {
        let _data = new XZAppDataService();
        
        let _event = new XZAppEventService();
        
        let _analytics = new XZAppAnalytics();
        
        Object.defineProperties(this, {
            data: {
                get: function () {
                    return _data;
                }
            },
            event: {
                get: function () {
                    return _event;
                }
            },
            analytics: {
                get: function () {
                    return _analytics;
                }
            }
        });
    }
    
    let _services = new XZAppServices();
    
    return {
        'services': {
            get: function () {
                return _services;
            }
        }
    };
});





// XZApp.Delegate

function XZAppDelegate() {
    this.ready = function () {
        XZApp.log("代理方法 ready 方法没有处理！");
    };
    
    this.setCurrentTheme = function () {
        XZApp.log("代理方法 setCurrentTheme 方法没有处理！");
    };
    
    this.login = function () {
        XZApp.log("代理方法 login 方法没有处理！");
    };
    
    this.open = function () {
        XZApp.log("代理方法 open 方法没有处理！");
    };
    
    this.present = function () {
        XZApp.log("代理方法 present 方法没有处理！");
    };
    
    this.push = function () {
        XZApp.log("代理方法 push 方法没有处理！");
    };
    
    this.pop = function () {
        XZApp.log("代理方法 pop 方法没有处理！");
    };
    
    this.popTo = function () {
        XZApp.log("代理方法 popTo 方法没有处理！");
    };
    
    this.setNavigationBarHidden = function () {
        XZApp.log("代理方法 setNavigationBarHidden 方法没有处理！");
    };
    
    this.setNavigationBarTitle = function () {
        XZApp.log("代理方法 setNavigationBarTitle 方法没有处理！");
    };
    
    this.setNavigationBarTitleColor = function () {
        XZApp.log("代理方法 setNavigationBarTitleColor 方法没有处理！");
    };
    
    this.setNavigationBarBackgroundColor = function () {
        XZApp.log("代理方法 setNavigationBarBackgroundColor 方法没有处理！");
    };
    
    this.track = function () {
        XZApp.log("代理方法 track 方法没有处理！");
    };
    
    this.alert = function () {
        XZApp.log("代理方法 alert 方法没有处理！");
    };
    
    this.http = function () {
        XZApp.log("代理方法 http 方法没有处理！");
    };
    
    this.numberOfRowsInList = function () {
        XZApp.log("代理方法 numberOfRowsInList 方法没有处理！");
    };
    
    this.dataForRowAtIndex = function () {
        XZApp.log("代理方法 dataForRowAtIndex 方法没有处理！");
    };
    
    this.cachedResourceForURL = function () {
        XZApp.log("代理方法 cachedResourceForURL 方法没有处理！");
    };
    
    this.didSelectRowAtIndex = function () {
        XZApp.log("代理方法 didSelectRowAtIndex 方法没有处理！");
    };
    
    this.elementWasClicked = function () {
        XZApp.log("代理方法 elementWasClicked 方法没有处理！");
    };
}





