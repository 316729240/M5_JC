﻿(function ($) {

    $.extend({
        metadata: {
            defaults: {
                type: 'class',
                name: 'metadata',
                cre: /({.*})/,
                single: 'metadata'
            },
            setType: function (type, name) {
                this.defaults.type = type;
                this.defaults.name = name;
            },
            get: function (elem, opts) {
                var settings = $.extend({}, this.defaults, opts);
                // check for empty string in single property
                if (!settings.single.length) settings.single = 'metadata';

                var data = $.data(elem, settings.single);
                // returned cached data if it already exists
                if (data) return data;

                data = "{}";

                if (settings.type == "class") {
                    var m = settings.cre.exec(elem.className);
                    if (m)
                        data = m[1];
                } else if (settings.type == "elem") {
                    if (!elem.getElementsByTagName)
                        return undefined;
                    var e = elem.getElementsByTagName(settings.name);
                    if (e.length)
                        data = $.trim(e[0].innerHTML);
                } else if (elem.getAttribute != undefined) {
                    var attr = elem.getAttribute(settings.name);
                    if (attr)
                        data = attr;
                }

                if (data.indexOf('{') < 0)
                    data = "{" + data + "}";

                data = eval("(" + data + ")");

                $.data(elem, settings.single, data);
                return data;
            }
        }
    });

    /**
     * Returns the metadata object for the first member of the jQuery object.
     *
     * @name metadata
     * @descr Returns element's metadata object
     * @param Object opts An object contianing settings to override the defaults
     * @type jQuery
     * @cat Plugins/Metadata
     */
    $.fn.metadata = function (opts) {
        return $.metadata.get(this[0], opts);
    };

})(jQuery);
$.metadata.setType("attr", "vtype");

/*****************************************************************
                  jQuery Validate扩展验证方法  (linjq)       
*****************************************************************/
$(function () {
    // 判断整数value是否等于0 
    jQuery.validator.addMethod("isIntEqZero", function (value, element) {
        value = parseInt(value);
        return this.optional(element) || value == 0;
    }, "整数必须为0");

    // 判断整数value是否大于0
    jQuery.validator.addMethod("isIntGtZero", function (value, element) {
        value = parseInt(value);
        return this.optional(element) || value > 0;
    }, "整数必须大于0");

    // 判断整数value是否大于或等于0
    jQuery.validator.addMethod("isIntGteZero", function (value, element) {
        value = parseInt(value);
        return this.optional(element) || value >= 0;
    }, "整数必须大于或等于0");

    // 判断整数value是否不等于0 
    jQuery.validator.addMethod("isIntNEqZero", function (value, element) {
        value = parseInt(value);
        return this.optional(element) || value != 0;
    }, "整数必须不等于0");

    // 判断整数value是否小于0 
    jQuery.validator.addMethod("isIntLtZero", function (value, element) {
        value = parseInt(value);
        return this.optional(element) || value < 0;
    }, "整数必须小于0");

    // 判断整数value是否小于或等于0 
    jQuery.validator.addMethod("isIntLteZero", function (value, element) {
        value = parseInt(value);
        return this.optional(element) || value <= 0;
    }, "整数必须小于或等于0");

    // 判断浮点数value是否等于0 
    jQuery.validator.addMethod("isFloatEqZero", function (value, element) {
        value = parseFloat(value);
        return this.optional(element) || value == 0;
    }, "浮点数必须为0");

    // 判断浮点数value是否大于0
    jQuery.validator.addMethod("isFloatGtZero", function (value, element) {
        value = parseFloat(value);
        return this.optional(element) || value > 0;
    }, "浮点数必须大于0");

    // 判断浮点数value是否大于或等于0
    jQuery.validator.addMethod("isFloatGteZero", function (value, element) {
        value = parseFloat(value);
        return this.optional(element) || value >= 0;
    }, "浮点数必须大于或等于0");

    // 判断浮点数value是否不等于0 
    jQuery.validator.addMethod("isFloatNEqZero", function (value, element) {
        value = parseFloat(value);
        return this.optional(element) || value != 0;
    }, "浮点数必须不等于0");

    // 判断浮点数value是否小于0 
    jQuery.validator.addMethod("isFloatLtZero", function (value, element) {
        value = parseFloat(value);
        return this.optional(element) || value < 0;
    }, "浮点数必须小于0");

    // 判断浮点数value是否小于或等于0 
    jQuery.validator.addMethod("isFloatLteZero", function (value, element) {
        value = parseFloat(value);
        return this.optional(element) || value <= 0;
    }, "浮点数必须小于或等于0");

    // 判断浮点型  
    jQuery.validator.addMethod("isFloat", function (value, element) {
        return this.optional(element) || /^[-\+]?\d+(\.\d+)?$/.test(value);
    }, "只能包含数字、小数点等字符");

    // 匹配integer
    jQuery.validator.addMethod("isInteger", function (value, element) {
        return this.optional(element) || (/^[-\+]?\d+$/.test(value) && parseInt(value) >= 0);
    }, "匹配integer");

    // 判断数值类型，包括整数和浮点数
    jQuery.validator.addMethod("isNumber", function (value, element) {
        return this.optional(element) || /^[-\+]?\d+$/.test(value) || /^[-\+]?\d+(\.\d+)?$/.test(value);
    }, "匹配数值类型，包括整数和浮点数");

    // 只能输入[0-9]数字
    jQuery.validator.addMethod("isDigits", function (value, element) {
        return this.optional(element) || /^\d+$/.test(value);
    }, "只能输入0-9数字");

    // 判断中文字符 
    jQuery.validator.addMethod("isChinese", function (value, element) {
        return this.optional(element) || /^[\u0391-\uFFE5]+$/.test(value);
    }, "只能包含中文字符。");

    // 判断英文字符 
    jQuery.validator.addMethod("isEnglish", function (value, element) {
        return this.optional(element) || /^[A-Za-z]+$/.test(value);
    }, "只能包含英文字符。");

    // 手机号码验证    
    jQuery.validator.addMethod("isMobile", function (value, element) {
        var length = value.length;
        return this.optional(element) || (length == 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(value));
    }, "请正确填写您的手机号码。");

    // 邮箱手机号码验证    
    jQuery.validator.addMethod("isME", function (value, element) {
        var length = value.length;
        var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        return this.optional(element) || reg.test(value) || (length == 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(value));
    }, "请正确填写一个您的手机号码或邮箱地址。");
    // 电话号码验证    
    jQuery.validator.addMethod("isPhone", function (value, element) {
        var tel = /^(\d{3,4}-?)?\d{7,9}$/g;
        return this.optional(element) || (tel.test(value));
    }, "请正确填写您的电话号码。");

    // 联系电话(手机/电话皆可)验证   
    jQuery.validator.addMethod("isTel", function (value, element) {
        var length = value.length;
        var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        var tel = /^(\d{3,4}-?)?\d{7,9}$/g;
        return this.optional(element) || tel.test(value) || (length == 11 && mobile.test(value));
    }, "请正确填写您的联系方式");

    // 匹配qq      
    jQuery.validator.addMethod("isQq", function (value, element) {
        return this.optional(element) || /^[1-9]\d{4,12}$/;
    }, "匹配QQ");

    // 邮政编码验证    
    jQuery.validator.addMethod("isZipCode", function (value, element) {
        var zip = /^[0-9]{6}$/;
        return this.optional(element) || (zip.test(value));
    }, "请正确填写您的邮政编码。");

    // 匹配密码，以字母开头，长度在6-12之间，只能包含字符、数字和下划线。      
    jQuery.validator.addMethod("isPwd", function (value, element) {
        return this.optional(element) || /^[a-zA-Z]\\w{6,12}$/.test(value);
    }, "以字母开头，长度在6-12之间，只能包含字符、数字和下划线。");

    // 身份证号码验证
    jQuery.validator.addMethod("isIdCardNo", function (value, element) {
        //var idCard = /^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/;   
        return this.optional(element) || isIdCardNo(value);
    }, "请输入正确的身份证号码。");

    // IP地址验证   
    jQuery.validator.addMethod("ip", function (value, element) {
        return this.optional(element) || /^(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.)(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.){2}([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))$/.test(value);
    }, "请填写正确的IP地址。");

    // 字符验证，只能包含中文、英文、数字、下划线等字符。    
    jQuery.validator.addMethod("stringCheck", function (value, element) {
        return this.optional(element) || /^[a-zA-Z0-9\u4e00-\u9fa5-_]+$/.test(value);
    }, "只能包含中文、英文、数字、下划线等字符");

    // 匹配english  
    jQuery.validator.addMethod("isEnglish", function (value, element) {
        return this.optional(element) || /^[A-Za-z]+$/.test(value);
    }, "匹配english");

    // 匹配汉字  
    jQuery.validator.addMethod("isChinese", function (value, element) {
        return this.optional(element) || /^[\u4e00-\u9fa5]+$/.test(value);
    }, "匹配汉字");

    // 匹配中文(包括汉字和字符) 
    jQuery.validator.addMethod("isChineseChar", function (value, element) {
        return this.optional(element) || /^[\u0391-\uFFE5]+$/.test(value);
    }, "匹配中文(包括汉字和字符) ");

    // 判断是否为合法字符(a-zA-Z0-9-_)
    jQuery.validator.addMethod("isRightfulString", function (value, element) {
        return this.optional(element) || /^[A-Za-z0-9]+$/.test(value);
    }, "只能包含英文字母及数字");
    // 判断是否为合法字符(a-zA-Z0-9-_)
    jQuery.validator.addMethod("isPassword", function (value, element) {
        return this.optional(element) || /(?=.*[0-9])(?=.*[a-zA-Z]).{6,20}$/.test(value);
    }, "密码必须包含至少一个字母或数字的6至20个字符");

    // 判断是否包含中英文特殊字符，除英文"-_"字符外
    jQuery.validator.addMethod("isContainsSpecialChar", function (value, element) {
        var reg = RegExp(/[(\ )(\`)(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\+)(\=)(\|)(\{)(\})(\')(\:)(\;)(\')(',)(\[)(\])(\.)(\<)(\>)(\/)(\?)(\~)(\！)(\@)(\#)(\￥)(\%)(\…)(\&)(\*)(\（)(\）)(\—)(\+)(\|)(\{)(\})(\【)(\】)(\‘)(\；)(\：)(\”)(\“)(\’)(\。)(\，)(\、)(\？)]+/);
        return this.optional(element) || !reg.test(value);
    }, "含有中英文特殊字符");
    jQuery.validator.addMethod("isDate", function(value, element){
        var ereg = /^(\d{1,4})(-|\/)(\d{1,2})(-|\/)(\d{1,2})$/;
        var r = value.match(ereg);
        if (r == null) {
            return false;
        }
        var d = new Date(r[1], r[3] - 1, r[5]);
        var result = (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[5]);
        
        return this.optional(element) || (result);
    }, "请输入正确的日期");
        // 判断是否包含中英文特殊字符，除英文"-_"字符外
        jQuery.validator.addMethod("minDate", function (value, element,param ) {
            var mindate=param.toDate();
            return value.toDate()>=mindate;
        }, "日期必须大于等于{0}");
            // 判断是否包含中英文特殊字符，除英文"-_"字符外
            jQuery.validator.addMethod("maxDate", function (value, element,param ) {
                var maxdate=param.toDate();
                return value.toDate()<=maxdate;
            }, "日期必须小于等于{0}");
        
    //身份证号码的验证规则
    function isIdCardNo(num) {
        //if (isNaN(num)) {alert("输入的不是数字！"); return false;} 
        var len = num.length, re;
        if (len == 15)
            re = new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{2})(\w)$/);
        else if (len == 18)
            re = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/);
        else {
            //alert("输入的数字位数不对。"); 
            return false;
        }
        var a = num.match(re);
        if (a != null) {
            if (len == 15) {
                var D = new Date("19" + a[3] + "/" + a[4] + "/" + a[5]);
                var B = D.getYear() == a[3] && (D.getMonth() + 1) == a[4] && D.getDate() == a[5];
            }
            else {
                var D = new Date(a[3] + "/" + a[4] + "/" + a[5]);
                var B = D.getFullYear() == a[3] && (D.getMonth() + 1) == a[4] && D.getDate() == a[5];
            }
            if (!B) {
                //alert("输入的身份证号 "+ a[0] +" 里出生日期不对。"); 
                return false;
            }
        }
        if (!re.test(num)) {
            //alert("身份证最后一位只能是数字和字母。");
            return false;
        }
        return true;
    }

});