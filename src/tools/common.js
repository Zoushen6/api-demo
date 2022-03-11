
export default {
    /**
     * getUrlParam 获取url参数
     * @param  {String} strName 参数名
     * @param  {String} strHref 带&参数url链接
     * @return {String} 返回一个参数值
     */
    getUrlParam(strName, strHref) {
        strHref = strHref || document.location.toString();
        const intPos = strHref.indexOf("?");
        const strRight = strHref.substr(intPos + 1);
        const arrTmp = strRight.split("&");
        for (let i = 0; i < arrTmp.length; i++) {
            const dIntPos = arrTmp[i].indexOf("=");
            const paraName = arrTmp[i].substr(0, dIntPos);
            const paraData = arrTmp[i].substr(dIntPos + 1);
            if (paraName != '' && paraName.toUpperCase() == strName.toUpperCase()) {
                return paraData;
            }
        }
        return "";
    },

    /**
     * getUrlObject 获取url参数对象
     * @param  {String} strHref 域名字符串
     * @return {Object} 返回一个对象
     */
    getUrlObject(strHref) {
        strHref = strHref || document.location.toString();
        const intPos = strHref.split('?')[1];
        if (!intPos) {
            return '';
        }
        const arr = strHref.split('?')[1].split('&');
        const theRequest = {};
        for (let i = 0; i < arr.length; i++) {
            const kye = arr[i].split("=")[0]
            const value = arr[i].split("=")[1]
            // 给对象赋值
            theRequest[kye] = value
        }
        return theRequest;
    },

    /**
     * formatDate 格式时间化
     * @param  {number} date    时间戳
     * @param  {number} fmt     yyyy年MM月dd日
     * @return {Object} 返回一个对象
     */
    formatDate(date, fmt) {
        date = new Date(date * 1000);
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
        }
        const o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        };

        function padLeftZero(str) {
            return (`00${str}`).substr(str.length);
        }

        for (const k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
                const str = `${o[k]}`;
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
            }
        }
        return fmt;
    },

    table: [1, 1000, 60000, 3600000, 86400000, 31536000000],

    /**
     * 毫秒转时间
     * @param ms 待转换秒数
     * @param max 最长接收几个单位
     * @param minUnit 最小单位的index 例：minUnit=2,最小单位为分钟
     * @param maxUnit 最小单位的index 例：maxUnit=3,最大单位为小时
     * @returns {Array}
     */
    formatMs(ms, max, minUnit, maxUnit) {
        let res = [0, 0, 0, 0, 0, 0], count = 0;
        if (ms === 0 || max <= 0) return res;
        for (let idx = maxUnit; idx >= minUnit; idx--) {
            if (ms > this.table[idx]) {
                res[idx] = (Math.floor(ms / this.table[idx]));
                ms %= this.table[idx];
                count++;
                if (count >= max) break;
            }
        }
        return res;
    },

    /**
     * 毫秒转时间
     * @param ms 待转换秒数
     * @param minUnit 最小单位的index 例：minUnit=2,最小单位为分钟
     * @param maxUnit 最小单位的index 例：maxUnit=3,最大单位为小时
     * @returns {Object} unitIndex是单位 res是结果 left是四舍五入的数值 unitMax是四舍五入的单位值
     */
    formatMsOne(ms, minUnit, maxUnit) {
        let res = {unitIndex: 0, res: 0, left: 0, unitMax: 0};
        if (ms === 0) return res;
        for (let idx = maxUnit; idx >= minUnit; idx--) {
            if (ms > this.table[idx]) {
                res.unitIndex = idx;
                res.res = (Math.floor(ms / this.table[idx]));
                res.left = res.unitIndex >= minUnit ? ms % this.table[idx] : 0;
                res.unitMax = res.unitIndex >= minUnit ? this.table[idx] : 0;
                break;
            }
        }

        return res;
    },

    /**
     * 毫秒转两位小数秒
     * @param ms
     * @returns {string}
     */
    msToS(ms) {
        return ((Math.round(ms / 10)) / 100).toFixed(2);
    },

    // https://github.com/reduxjs/redux/blob/master/src/compose.js
    /**
     * 链式调用 注意调用顺序与入参相反
     * @param funcs
     * @returns {*|(function(*): *)}
     */
    compose(...funcs) {
        if (funcs.length === 0) {
            return arg => arg;
        }
        if (funcs.length === 1) {
            return funcs[0];
        }
        return funcs.reduce((a, b) => (...args) => a(b(...args)));
    },

    /**
     * 自定义函数名：PrefixZero
     * @param num： 被操作数
     * @param n： 固定的总位数
     * @return {string}
     */
    PrefixZero(num, n) {
        return (Array(n).join('0') + num).slice(-n);
    },

    /**
     * 获取当前时间yyyy-mm-dd
     * @param nS TIMESTAMP
     * @returns {string}
     */
    getNewDay(nS) {
        const newDate = nS ? new Date(nS) : new Date();
        let sMonth = newDate.getMonth() + 1;
        let sDate = newDate.getDate();
        let addZero = (number) => {
            return number < 10 ? '0' + number : number;
        };
        return newDate.getFullYear() + '-' + addZero(sMonth) + '-' + addZero(sDate);
    },

    /**
     *
     * @param Url
     * 下载图片的时候需要默认传一个判断字段title==‘pic’
     */
    downLoadPicture(Url,title) {
        var request = new XMLHttpRequest();
        request.responseType = "blob";//定义响应类型
        request.open("GET", Url);
        request.onload = function () {
            var url = window.URL.createObjectURL(this.response);
            var name = url.split("/")[url.split("/").length - 1];
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.href = url;
            a.download = title?title:name;
            a.click();
        }
        request.send();
    },

    /**
     * actet-stream流获取并下载文件
     * @param res xhr请求结果
     * @returns {boolean}
     */
    downloadFileBlob(res) {
        //这里res.data是返回的blob对象
        let blob = new Blob([res.data], {type: 'application/actet-stream;charset=utf-8'});
        //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
        let contentDisposition = res.headers['content-disposition'];
        let regExp = new RegExp("filename\\*=utf-8\\'\\'(\\S+)");
        let result = regExp.exec(contentDisposition);
        //解析中文编码
        if (!result || !result[1]) return false;
        let filename = decodeURI(result[1]);
        let downloadElement = document.createElement('a');
        let href = window.URL.createObjectURL(blob); //创建下载的链接
        downloadElement.style.display = 'none';
        downloadElement.href = href;
        downloadElement.download = filename; //下载后文件名
        document.body.appendChild(downloadElement);
        downloadElement.click(); //点击下载
        document.body.removeChild(downloadElement); //下载完成移除元素
        window.URL.revokeObjectURL(href); //释放掉blob对象
        return true;
    }
    ,

    /**
     * urlEncode 对象转url参数格式
     * @param  {Object} param  将要转为URL参数字符串的对象
     * @param  {String} key    参数字符串的前缀
     * @param  {Boolean} encode true/false 是否进行URL编码,默认为true
     * @return {String}        返回一个字符串
     */
    urlEncode(param, key, encode) {
        if (param == null) return "";
        let urlStr = "";
        const t = typeof param;
        if (t == "string" || t == "number" || t == "boolean") {
            urlStr
                += `&${
                key
            }=${
                encode == null || encode ? encodeURIComponent(param) : param}`;
        } else {
            for (const i in param) {
                const k = key == null
                    ? i
                    : key + (param instanceof Array ? `[${i}]` : `[${i}]`);
                urlStr += this.urlEncode(param[i], k, encode);
            }
        }
        return urlStr;
    }
    ,

    /**
     * toThousands 格式化数字加逗号
     * @param  {Number} num 一串正整数
     * @return {String}     加逗号的数字字符串
     */
    toThousands(num) {
        let result = [],
            counter = 0;
        if (typeof (num) === 'number' && String(num).indexOf(".") >= 0) {
            num = num.toFixed(2);
            return num;
        } else {
            num = (num || 0).toString().split('');
            for (let i = num.length - 1; i >= 0; i--) {
                counter++;
                result.unshift(num[i]);
                if (!(counter % 3) && i != 0) {
                    result.unshift(',');
                }
            }
            return result.join('');
        }
    }
    ,

    /**
     * formatNumb 格式化数字，超万以万为单位(不四舍五入)
     * @param  {Number} num 一串正整数
     * @return {String}     加逗号的数字字符串
     */
    formatNumbW(numb) {
        if (numb > 9999) {
            if (numb > 99999999) {
                numb = `${Math.floor((numb / 100000000) * 1000) / 1000}亿`;
            } else {
                numb = `${Math.floor((numb / 10000) * 10) / 10}万`;
            }
        }
        return numb;
    }
    ,

    /**
     * [setLocalStorage 添加有时间戳的Storage]
     * @param {String} key   键
     * @param {String} value 键值
     */
    setLocalStorage(key, value) {
        const curtime = new Date().getTime(); // 获取当前时间 ，转换成JSON字符串序列
        const valueDate = JSON.stringify({
            val: value,
            timer: curtime
        });
        localStorage.setItem(key, valueDate);
    }
    ,

    /**
     * getLocalStorage 获取带有时效的Storage
     * @param  {String} key 键
     * @param  {Number} day 天数
     */
    getLocalStorage(key, day) {
        day = day ? day : 1;
        const exp = 60 * 60 * 24 * 1000 * day; // 一天的秒数
        let newValue;
        if (localStorage.getItem(key)) {
            const vals = localStorage.getItem(key); // 获取本地存储的值
            const dataObj = JSON.parse(vals); // 将字符串转换成JSON对象
            // 如果(当前时间 - 存储的元素在创建时候设置的时间) > 过期时间
            const isTimed = (new Date().getTime() - dataObj.timer) > exp;
            if (isTimed) {
                console.log("存储已过期");
                localStorage.removeItem(key);
                return null;
            } else {
                newValue = dataObj.val;
            }
            return newValue;
        } else {
            return null;
        }
    }
    ,

    /**
     * find 获取字符串指定字符下标
     * @param  {String} str 要查询的字符串
     * @param  {String} cha 要查询的字符
     * @param  {Number} num 要第几个字符的下标,从0开始计算
     * @return {Number}     获得所查字符的下标
     */
    findStrIndex(str, cha, num) {
        var x = str.indexOf(cha);
        for (var i = 0; i < num; i++) {
            x = str.indexOf(cha, x + 1);
        }
        return x;
    }
    ,

    /**
     * deepCopy 原生深拷贝
     * @param  {Object} p 拷贝的对象
     * @param  {Object} c 需要拷贝的对象
     * @return {Object}   返回拷贝后的对象
     */
    deepCopy(p, c) {
        var c = c || {};
        for (var i in p) {
            if (typeof p[i] === 'object') {
                c[i] = (p[i].constructor === Array) ? [] : {};
                this.deepCopy(p[i], c[i]);
            } else {
                c[i] = p[i];
            }
        }
        return c;
    }
    ,

    /**
     * Get the raw type string of a value e.g. [object Object]
     */
    _toString: Object.prototype.toString,

    /**
     * get the typeInfo of param
     * @param value
     * @returns {string} typeInfo:[Array Function，String,Object,RegExp]
     */
    toRawType(value) {
        return this._toString.call(value).slice(8, -1)
    }
    ,

    /**
     * Strict object type check. Only returns true
     * for plain JavaScript objects.
     */
    isArray(obj) {
        return this.toRawType(obj) === 'Array'
    }
    ,

    isFunction(obj) {
        return this.toRawType(obj) === 'Function'
    }
    ,

    isString(obj) {
        return this.toRawType(obj) === 'String'
    }
    ,

    isObject(obj) {
        return this.toRawType(obj) === 'Object'
    }
    ,

    isRegExp(v) {
        return this.toRawType(v) === 'RegExp'
    }
    ,

    /**
     * Check whether the object has the property.
     */
    hasOwnProperty: Object.prototype.hasOwnProperty,

    hasOwn(obj, key) {
        return this.hasOwnProperty.call(obj, key);
    }

}
