(function ($) {
    if ($ == null || $ == undefined) {
        throw "没有提前载入jQuery 插件，无法初始化APP";
    }

    var config = {
        //serviceUrl: "http://192.9.200.96:8083/ChainWayInsurance/rest/",
        serviceUrl: "http://120.24.227.202:8080/ChainWayInsurance/rest/",  //数据接口
        webUrl: "http://www.chbcar.com/YJZB/",
        //imgUrl: "http://192.9.200.96:8083/ChainWayInsurance/servlet/ShowImageServlet.do?",
        imgUrl: "http://120.24.227.202:8080/ChainWayInsurance/servlet/ShowImageServlet.do?",
        aliPayUrl: "http://120.24.227.202:8080/EmatchCHBServiceTest/alipay/alipayConfirmOrder.jsp",//阿里支付页面
        //baiduLocationKey: "attWmB1DfsvNGfhrvuaXZqrG",//百度定位 Key
        baiduLocationUrl: 'http://api.map.baidu.com/geocoder/v2/?ak=attWmB1DfsvNGfhrvuaXZqrG&callback=?&location=##@LocX@##,##@Locy@##&output=json&pois=0',
        wxAppId: "wx225401c6017c7b3f",//微信公众号ID
        loadingHtml: '<div id="App_Loading" class="mask-lyout"><div class="loading-mask"><div><p>'
        + '<i class="fa fa-spinner fa-spin fa-2x"></i></p><p>请稍候...</p>'
        + '</div></div></div>',
        alertHtml: '<div id="App_alert" class="mask-lyout"><div class="alert-mask"><div class="alert-body">'
        + '<p id="alert-icon"></p><p id="alert-msg"></p></div>'
        + '<div class="alert-action"><button id="alert_btn">确定</button></div></div></div>',
        confrimHtml: '<div id="App_confrim" class="mask-lyout"><div class="confrim-mask"><div class="confrim-body">'
        + '<p><i class="fa fa-warning fa-2x"></i></p><p id="conrim-msg"></p></div>'
        + '<div class="confrim-action"><button id="confrim_ok_btn" class="ok">确定</button>'
        + '<button id="confrim_cancel_btn" class="cancel">取消</button></div></div></div>'

    };
    String.prototype.trim = function (str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
    };
    String.prototype.trimL = function (str) {
        return str.replace(/^\s*/g, '');
    };
    String.prototype.trimR = function (str) {
        return str.replace(/\s*$/, '');
    }
    var popup = (function () {
        var isShow = function (DomId) {
            var isShow = $("#" + DomId).data("isShow");
            return (isShow == null || isShow == undefined) ? false : isShow;
        };
        var HIDE = function (DomId) {
            $("#" + DomId).removeClass("anim-fadeIn").addClass("anim-fadeOut");
            setTimeout(function () {
                $("#" + DomId).removeClass("anim-fadeOut").hide();
            }, 800);
            $("#" + DomId).data("isShow", false);
        };
        var SHOW = function (DomId) {
            $("#" + DomId).show().addClass("anim-fadeIn");
            $("#" + DomId).data("isShow", true);
        };
        var alertIcons = {
            "success": '<i class="fa fa-check fa-2x"></i>',
            "error": '<i class="fa fa-close fa-2x"></i>',
            "warning": '<i class="fa fa-warning fa-2x"></i>',
            "msg": '<i class="fa fa-lightbulb-o fa-2x"></i>'
        }
        return {
            IsShow: function (witch) {
                var popups = {
                    "loading": "App_Loading",
                    "confrim": "App_confrim",
                    "alert": "App_alert",
                }
                return isShow(popups[witch]);
            },
            ToggleLoading: function (show) {
                show = show ? show : false;
                if (!show) {//hide
                    HIDE("App_Loading");
                } else {//show
                    if ($("#App_Loading").length <= 0) {
                        $("body").append(config.loadingHtml);
                    }
                    SHOW("App_Loading");
                }
            },
            ShowAlert: function (msg, type, callback) {
                type = (type) ? type : "msg";
                if (!isShow("App_alert")) {
                    if ($("#App_alert").length <= 0) {
                        $("body").append(config.alertHtml);
                    }
                    $("#App_alert #alert-msg").text(msg);
                    $("#App_alert #alert-icon").html(alertIcons[type]);
                    SHOW("App_alert");
                    $("#App_alert").off("click", "#alert_btn");
                    $("#App_alert").on("click", "#alert_btn", function () {
                        HIDE("App_alert");
                        if (callback) callback();
                    });
                }
            },
            ShowConfrim: function (msg, okCall, cancelCall) {
                if (!isShow("App_confrim")) {
                    if ($("#App_confrim").length <= 0) {
                        $("body").append(config.confrimHtml);
                    }
                    $("#App_confrim #conrim-msg").text(msg);
                    SHOW("App_confrim");
                    $("#App_confrim").off("click", "#confrim_ok_btn");
                    $("#App_confrim").on("click", "#confrim_ok_btn", function () {
                        HIDE("App_confrim");
                        if (okCall) okCall();
                    });
                    $("#App_confrim").off("click", "#confrim_cancel_btn");
                    $("#App_confrim").on("click", "#confrim_cancel_btn", function () {
                        HIDE("App_confrim");
                        if (cancelCall) cancelCall();
                    });
                }
            },
            //option {domId,closeId}
            modal: function (option, status) {
                status = status ? status : "open";
                if (option.domId == undefined || option.domId == null) return;
                if (status == "close") {
                    HIDE(option.domId);
                } else {
                    SHOW(option.domId);
                }
                var node = $("#" + option.domId + " fa-close");
                $("#" + option.domId + " .fa-close").bind("click", function (e) {
                    HIDE(option.domId);
                });
                $("#" + option.domId).bind("click", function (e) {
                    HIDE(option.domId);
                });
                $("#" + option.domId + " .modal-mask").bind("click", function (e) {
                    return false;
                });
            },
            ShowPopup: function (domId, status) {
                status = status ? status : "open";
                if (domId == undefined || domId == null) return;
                if (status == "close") {
                    HIDE(domId);
                } else {
                    SHOW(domId);
                }
                $("#" + domId + " .fa-close").bind("click", function (e) {
                    HIDE(domId);
                });
            },
            FadeInSomeThing: function (selector) {
                $(selector).show().addClass("anim-fadeIn");
                setTimeout(function () {
                    $(selector).removeClass("anim-fadeIn");
                }, 800);
            }
        }
    } ());
    var util = {
        isEmpty: function (str) {
            if (str == undefined || str == null || str == "null" || str.length == 0 || str == "undefined")
                return true;
            return false;
        },
        isMobile: function (str) {
            return (/^1[3|4|5|8|7]\d{9}/.test(str));
        },
        isEmail: function (str) {
            return (/\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/.test(str));
        },
        isIDCard: function (str) {
            return (/\d{17}[\d|x]|\d{15}/.test(str));
        },
        isInWx: function () {
            var ua = navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
                return true;
            } else {
                return false;
            }
        },
        servicePost: function (url, query, successCall, showLoading) {
            showLoading = (showLoading == undefined) ? true : false;
            if (showLoading) popup.ToggleLoading(true);
            $.post(config.serviceUrl + url, query,
                function (str) {
                    if (showLoading) popup.ToggleLoading(false);
                    if (typeof (str) == "object") {
                        str = JSON.stringify(str);
                    }
                    if (successCall) successCall(str);
                }
            );
        },
        serviceGet: function (queryUrl, successCall, showLoading) {
            showLoading = (showLoading == undefined) ? true : false;
            if (showLoading) popup.ToggleLoading(true);
            $.get(config.serviceUrl + queryUrl,
                function (str) {
                    if (showLoading) popup.ToggleLoading(false);
                    if (typeof (str) == "object") {
                        str = JSON.stringify(str);
                    }
                    if (successCall) successCall(str);
                }
            );
        },
        goNext: function (url, backLength) {
            var back = "Back.html?index=" + ((backLength > 0) ? -1 : backLength);
            if (backLength != undefined)
                history.replaceState(null, "", back);
            window.location.href = url;
        },
        saveLocal: function (name, value) {
            if (typeof (value) == "object") {
                value = JSON.stringify(value);
            }
            localStorage[name] = value;
        },
        getLocal: function (name) {
            var value = localStorage[name];
            if (value == null || value == undefined) return null;
            if (value.indexOf("{") >= 0) {
                value = JSON.parse(value);
            }
            return value;
        },
        setParm: function (name, value) {
            if (typeof (value) == "object")
                sessionStorage[name] = JSON.stringify(value);
            else
                sessionStorage[name] = value;
        },
        getParm: function (name) {
            var str = sessionStorage.getItem(name);
            if (this.isEmpty(str)) return null;
            if (str.indexOf("{") >= 0) {
                sessionStorage.removeItem(name);
                return JSON.parse(str);
            } else {
                sessionStorage.removeItem(name);
                return str;
            }
        }
    };
    var controler = (function () {
        var taskTeams = {};
        var taskMap = {};
        var checkTaskTeam = function (teamName) {
            var team = taskTeams[teamName];
            var isOk = true;
            for (var item in team.list) {
                isOk = isOk && team.list[item];
            }
            if (isOk) team.readyFunc();
        };
        var handbarTmps = {};
        var getHandleBar = function (tmpId) {
            if (handbarTmps[tmpId]) {
                return handbarTmps[tmpId];
            }
            var handle = Handlebars.compile($("#" + tmpId).html());
            handbarTmps[tmpId] = handle;
            return handle;
        }
        //页面下拉加载器
        var page = function (option) {
            var _this = this;
            this.contentPage = 1;
            this.pageSize = option.pageSize;
            this.canLoad = true;
            this.isLoading = false;
            this.LessThanSize = option.lessThanSize;
            this.CanLoad = option.canLoad;
            this.CanNotLoad = option.canNotLoad;
            this.scrollContainer = option.scrollContainer;
            this.scrollItem = option.scrollItem;
            this.scrollFixHeight = option.scrollFixHeight || 0;
            this.scrollCallTask = option.scrollCallTask;
            this.isLoadingCall = option.isLoadingCall;
            this.scrollMsgItem = option.scrollMsgItem;
            this.isEmptyFunc=option.isEmptyFunc;
            $(this.scrollContainer).attr("style", "height:" + (window.document.body.clientHeight-this.scrollFixHeight) + "px;overflow:scroll");
            $(this.scrollContainer).bind("scroll", function () {
                var totalHeight = $(_this.scrollItem).height() + _this.scrollFixHeight;
                var contentHeight = $(_this.scrollContainer).scrollTop() + window.document.body.clientHeight;
                //console.log(totalHeight+"/"+contentHeight+"/"+_this.isLoading+"/"+_this.canLoad);
                if (contentHeight >= totalHeight && !_this.isLoading && _this.canLoad) {
                    console.log("触发滑动");
                    _this.contentPage++;
                    controler.launchTask(_this.scrollCallTask);
                }
            });
            $(this.scrollMsgItem).bind("click", function (e) {
                if (!_this.isLoading && _this.canLoad) {
                    console.log("触发点击");
                    _this.contentPage++;
                    controler.launchTask(_this.scrollCallTask);
                }
            });
        }
        page.prototype = {
            set isLoading(value) {
                //console.log("触发isloading");
                if (value) {
                    if (this.isLoadingCall) this.isLoadingCall();
                }
                this._isLoading = value;
            },
            get isLoading() { return this._isLoading; },
            set contentPage(value) {
                //console.log("触发contentPage");
                if (value < 1) {
                    this._contentPage = 1;
                } else
                    this._contentPage = value;
            },
            get contentPage() { return this._contentPage }
        };
        page.prototype.AddList = function (name, thisPage) {
            var refreshStatus = function (_this) {
                if (thisPage.length < _this.pageSize) {
                    _this.canLoad = false;
                    if(model[name].length==0){
                        if(_this.isEmptyFunc) _this.isEmptyFunc();
                        else $(_this.scrollMsgItem).html('<p>没有数据...</p>');
                    }
                    else if (model[name].length <= _this.pageSize) {
                        if (_this.LessThanSize) _this.LessThanSize();
                    } else {
                        if (_this.CanNotLoad) _this.CanNotLoad();
                    }
                } else {
                    if (_this.CanLoad) _this.CanLoad();
                }
            }
            if (model[name]) {
                model.Append(name, thisPage);
            } else {
                model[name] = thisPage;
            }
            refreshStatus(this);
        };
        return {
            //注册控制器任务
            registeTask: function (taskName, taskFunc, taskTeamName) {
                taskMap[taskName] = {
                    name: taskName,
                    func: taskFunc,
                    team: taskTeamName,
                };
                if (taskTeamName) {
                    if (taskTeams[taskTeamName]) {
                        var team = taskTeams[taskTeamName];
                        team.list[taskName] = false;
                    } else throw "没有注册任务组" + taskTeamName;
                }
            },
            //绑定元素事件任务（支持两个selector jquery格式）
            bindDomAndTask: function (selector, event, taskName) {
                selector = selector ? selector : "";
                event = event ? event : "click";
                var domSes = selector.split(" ");
                if (domSes.length == 1) {
                    $(domSes[0]).unbind(event);
                    $(domSes[0]).bind(event, function (e) {
                        controler.launchTask(taskName, this);
                    });
                } else {
                    $(domSes[0]).off(event, domSes[1]);
                    $(domSes[0]).on(event, domSes[1], function () {
                        controler.launchTask(taskName, this);
                    });
                }
            },
            //注册任务组
            registeTeam: function (teamName, readyFunc, startFuc) {
                taskTeams[teamName] = {
                    list: {}, "readyFunc": readyFunc, "startFunc": startFuc
                }
            },
            //启动任务组
            launchTeam: function (teamName) {
                var _this = this;
                var team = taskTeams[teamName];
                if (team) {
                    team.startFunc();
                    $.each(team.list, function (indexInArray, valueOfElement) {
                        team.list[indexInArray] = false;
                        _this.launchTask(indexInArray);
                    });
                }
            },
            //告诉任务组此任务完成
            callTeam: function (taskName) {
                if (taskMap[taskName]) {
                    var task = taskMap[taskName];
                    if (task.team != null) {
                        taskTeams[task.team].list[taskName] = true;
                        checkTaskTeam(task.team);
                    }
                }
            },
            //激活任务
            launchTask: function (taskName, data) {
                if (taskMap[taskName]) {
                    var task = taskMap[taskName];
                    task.func(data);
                }
            },
            //填充HandleBar模板
            fillTmp: function (tmpId, data) {
                if (Handlebars == null || Handlebars == undefined) {
                    throw "没有提前载入Handlebar组件";
                }
                var complier = getHandleBar(tmpId);
                if (complier == null || complier == undefined) throw "没有相应模板";
                return complier(data);
            },
            PageControler: page,
            registeHashChange: function (events) {
                window.onhashchange = function () {
                    var pageUrl = window.location.hash;
                    $.each(events, function (i, n) {
                        if (n.url == pageUrl) {
                            if (n.func) n.func();
                        }
                    });
                };
            }
        }
    } ());
    var model = (function () {
        var modelData = function () { };
        var queryString = function () {
            var args = new Object();
            var query = window.location.search.substring(1);//获取查询串
            var pairs = query.split("&");//在逗号处断开
            for (var i = 0; i < pairs.length; i++) {
                var pos = pairs[i].indexOf('=');//查找name=value
                if (pos == -1) {//如果没有找到就跳过
                    continue;
                }
                var argname = pairs[i].substring(0, pos);//提取name
                var value = pairs[i].substring(pos + 1);//提取value
                args[argname] = unescape(value);//存为属性
            }
            return args;//返回对象
        };
        modelData.prototype.param = queryString();
        modelData.prototype.Append = function (oldOneName, newOne) {
            if (typeof (this[oldOneName]) != typeof (newOne)) throw "两对象类型不同，无法组合";
            if (typeof (this[oldOneName]) == "string") {

            } else if (this[oldOneName] instanceof Array) {
                this[oldOneName] = this[oldOneName].concat(newOne);
            }

        };
        modelData.prototype.searchArray = function (path, query) {
            query = query.split('=');
            path = path.split('/');
            var data = this;
            var searchItem = function (item) {
                for (var a in item) {
                    if (a == query[0] && item[a] == query[1]) {
                        return item;
                    }
                }
                return null;
            }
            for (var i = 0; i < path.length; i++) {
                var name = path[i];
                data = data[name + ""];
                if (data == undefined) throw "错误路径";
            }
            if (data instanceof Array) {
                for (i = 0; i < data.length; i++) {
                    var item = searchItem(data[i]);
                    if (item) return item;
                }
            } else {
                var item = searchItem(data);
                if (item) return item;
            }
            return null;
        }
        return new modelData();
    } ());
    var Wx = {
        //初始化微信接口
        setUp: function (jsApiList, readyFunc, errorFunc) {
            if (wx == undefined || wx == null) throw "没有提前载入wxSDK";
            wx.ready(readyFunc);
            wx.error(errorFunc);
            var wxsetup = {
                url: window.location.href
            };
            util.servicePost("wechatpayservice/getJsSignature", wxsetup, function (str) {
                var data = JSON.parse(str);
                data = data.result;
                var configValue = {
                    debug: false,
                    appId: config.wxAppId, // 必填，公众号的唯一标识
                    timestamp: parseInt(data.timeStamp), // 必填，生成签名的时间戳
                    nonceStr: data.nonceStr, // 必填，生成签名的随机串
                    signature: data.signture, // 必填，签名，见附录1
                    jsApiList: jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                };
                wx.config(configValue);
            });
        },
        //网页授权跳转:scope snsapi_base(静默授权) snsapi_userinfo(用户点击授权)
        redirect: function (href, scope) {
            scope = scope || "snsapi_base";
            var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=#@APPID@#&redirect_uri=#@REDIRECT_URI@#&response_type=code&scope=#@SCOPE@#&state=STATE#wechat_redirect"
            url = url.replace("#@APPID@#", config.wxAppId);
            url = url.replace("#@REDIRECT_URI@#", encodeURIComponent(href));
            url = url.replace("#@SCOPE@#", scope);
            window.location.href = url;
        },
        saveWxUser: function (data) {
            util.saveLocal("WxUser", data);
        }
    };
    Wx.user = util.getLocal("WxUser");
    var location = (function () {
        var locationKey = "APP_Location";
        var locationData = {};
        var saveLocation = function () {
            localStorage[locationKey] = JSON.stringify(locationData);
        };
        return {
            getLocation: function () {
                var locStr = localStorage[locationKey];
                if (util.isEmpty(locStr)) {
                    return null;
                }
                return JSON.parse(locStr);
            },
            startGetLocation: function (needLoading) {
                if (needLoading) {
                    popup.ToggleLoading(true);
                    controler.registeTask("closeLoading", function () { popup.ToggleLoading(false); });
                }
                function getCitySuccess(str) {
                    locationData.city = str.result.addressComponent.city.replace("市", "");
                    locationData.address = str.result.addressComponent.province + "#" + str.result.addressComponent.city + "#" + str.result.addressComponent.district;
                    saveLocation();
                    if (needLoading) controler.launchTask("closeLoading");
                };
                function LocationSuccess(position) {
                    locationData.x = position.coords.latitude;
                    locationData.y = position.coords.longitude;
                    callBaiduForResult(locationData.x, locationData.y);
                };
                function callBaiduForResult(x, y) {
                    var url = _this.LBSurl.replace("##@LocX@##", x + "");
                    url = url.replace("##@Locy@##", y + "");
                    $.getJSON(url, getCitySuccess);
                }
                if (util.isInWx()) {
                    wx.getLocation({
                        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                        success: function (res) {
                            locationData.x = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                            locationData.y = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                            callBaiduForResult(locationData.x, locationData.y);
                        }
                    });
                } else {
                    navigator.geolocation.getCurrentPosition(LocationSuccess, error, {
                        // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
                        timeout: 5000,
                    });
                }
            }
        }
    } ());
    //
    window.APP = {
        "popup": popup,
        "util": util,
        "controler": controler,
        "model": model,
        "Wx": Wx,
        "location": location,
        "config": config
    };
    //检查登陆情况
    (function () {
        var user = util.getLocal("user");
        var needCheck = true;
        var notNeedList = ["index.html","login.html", "SignUp.html", "ForgetPass.html", "PlanDetail.html", "Main.html"];
        var url = window.location.href;
        url=url.substr(url.lastIndexOf("/")+1,url.length);
        if(util.isEmpty(url)) url="index.html";
        $.each(notNeedList, function (indexInArray, valueOfElement) {
            if (url.indexOf(valueOfElement) >= 0) needCheck = false;
        });
        //console.log(needCheck+"/"+user);
        if (user == null && needCheck) {
            window.location.href="login.html";
        }
    } ());
    //console.log("APP框架加载完成");
} (window.jQuery));
