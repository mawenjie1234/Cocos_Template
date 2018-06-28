require = function() {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw a.code = "MODULE_NOT_FOUND", a;
        }
        var p = n[i] = {
          exports: {}
        };
        e[i][0].call(p.exports, function(r) {
          var n = e[i][1][r];
          return o(n || r);
        }, p, p.exports, r, e, n, t);
      }
      return n[i].exports;
    }
    for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
    return o;
  }
  return r;
}()({
  AnalyticsManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dcde0E+tyJDTb2mv0xM6PEu", "AnalyticsManager");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _createClass = function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          "value" in descriptor && (descriptor.writable = true);
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        protoProps && defineProperties(Constructor.prototype, protoProps);
        staticProps && defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    var _class, _temp;
    var _NativeCaller = require("../../Base/NativeCaller");
    var _NativeCaller2 = _interopRequireDefault(_NativeCaller);
    var _Storage = require("../../Base/Storage");
    var _Storage2 = _interopRequireDefault(_Storage);
    var _DateUtils = require("../../Base/DateUtils");
    var _DateUtils2 = _interopRequireDefault(_DateUtils);
    var _Platform = require("../Platform/Platform");
    var _Platform2 = _interopRequireDefault(_Platform);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    var AnalyticsManager = (_temp = _class = function() {
      function AnalyticsManager() {
        _classCallCheck(this, AnalyticsManager);
      }
      _createClass(AnalyticsManager, null, [ {
        key: "flurry",
        value: function flurry(key) {
          this.log(key);
        }
      }, {
        key: "log",
        value: function log(eventName, args) {
          cc.log(eventName, args ? JSON.stringify(args) : "");
          new _NativeCaller2.default(_NativeCaller2.default.defaultClassName, "logEventWithJSON").argument(args ? JSON.stringify(args) : "", "", _NativeCaller.JNIType.string).call(_NativeCaller.JNIType.void);
        }
      }, {
        key: "logOnceInDay",
        value: function logOnceInDay(eventName, args) {
          var date = new Date();
          var tadayString = _DateUtils2.default.toYYYYMMDDString(date);
          var key = eventName + "@logOnceInDay";
          var lastSendTimeString = _Storage2.default.shared.loadData(key);
          var lastSendDate = new Date();
          lastSendDate.setTime(lastSendTimeString);
          if (lastSendTimeString && _DateUtils2.default.toYYYYMMDDString(lastSendDate) == tadayString) cc.log("ignore this event"); else {
            _Storage2.default.shared.saveData(key, date.getTime());
            this.log(eventName, args);
          }
        }
      }, {
        key: "logGA",
        value: function logGA(category, action, label, value) {
          if (_Platform2.default.isIOS) return;
          new _NativeCaller2.default(_NativeCaller2.default.defaultClassName, "logGAEvent").argument(category, "", _NativeCaller.JNIType.string).argument(action, "", _NativeCaller.JNIType.string).argument(label, "", _NativeCaller.JNIType.string).argument(String(value), "", _NativeCaller.JNIType.string).call(_NativeCaller.JNIType.void);
        }
      }, {
        key: "logFBEvent",
        value: function logFBEvent(event) {
          if (!_Platform2.default.isAndroid) return;
          new _NativeCaller2.default(_NativeCaller2.default.defaultClassName, "logFBEvent").argument(event, "", _NativeCaller.JNIType.string).call(_NativeCaller.JNIType.void);
        }
      }, {
        key: "shared",
        get: function get() {
          this._init || (this._init = new AnalyticsManager());
          return this._init;
        }
      } ]);
      return AnalyticsManager;
    }(), _class.logFirebaseEvent = function(eventName, args) {
      if (_Platform2.default.isIOS) return;
      new _NativeCaller2.default(_NativeCaller2.default.defaultClassName, "logFirebaseEvent").argument(eventName, "", _NativeCaller.JNIType.string).argument(args ? JSON.stringify(args) : "", "", _NativeCaller.JNIType.string).call(_NativeCaller.JNIType.void);
    }, _temp);
    exports.default = AnalyticsManager;
    module.exports = exports["default"];
    cc._RF.pop();
  }, {
    "../../Base/DateUtils": "DateUtils",
    "../../Base/NativeCaller": "NativeCaller",
    "../../Base/Storage": "Storage",
    "../Platform/Platform": "Platform"
  } ],
  DateUtils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1dad33/G1NOgb+5Xo/nWyhC", "DateUtils");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _createClass = function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          "value" in descriptor && (descriptor.writable = true);
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        protoProps && defineProperties(Constructor.prototype, protoProps);
        staticProps && defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    var _class, _temp;
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    var i18n = require("i18n");
    var DateUtils = (_temp = _class = function() {
      function DateUtils() {
        _classCallCheck(this, DateUtils);
      }
      _createClass(DateUtils, null, [ {
        key: "toYYYYMMDDString",
        value: function toYYYYMMDDString(date) {
          return date instanceof Date ? "" + date.getFullYear() + (date.getMonth() + 1) + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) : "";
        }
      } ]);
      return DateUtils;
    }(), _class.totalDaysInMonth = function(year, month) {
      var thisMonth = new Date(year, month);
      var nextMonthYear = year;
      var nextMonthMonth = month + 1;
      var nextMonth = new Date(nextMonthYear, nextMonthMonth);
      var days = (nextMonth.getTime() - thisMonth.getTime()) / 864e5;
      return Math.round(days);
    }, _class.i18nMonth = function(month) {
      var I18nMonthsKey = [ "TID_SYS_JAN", "TID_SYS_FEB", "TID_SYS_MAR", "TID_SYS_APR", "TID_SYS_MAY", "TID_SYS_JUN", "TID_SYS_JUL", "TID_SYS_AUG", "TID_SYS_SEP", "TID_SYS_OCT", "TID_SYS_NOV", "TID_SYS_DEC" ];
      return i18n.t(I18nMonthsKey[month]);
    }, _temp);
    exports.default = DateUtils;
    module.exports = exports["default"];
    cc._RF.pop();
  }, {
    i18n: "i18n"
  } ],
  EncryptionUtil: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dc8ef//vMFA+YhWN8OeIZBJ", "EncryptionUtil");
    "use strict";
    var HMAC_SHA256 = require("SHA256").HMAC_SHA256;
    function EncryptionUtils() {}
    EncryptionUtils.createToken = function(contentString, hashKey) {
      return HMAC_SHA256.MAC(hashKey, contentString);
    };
    EncryptionUtils.unobfuscateString = function(s) {
      if (32 != s.length) return null;
      var i, v;
      var key = new Array(33);
      key[32] = String.fromCharCode(0);
      for (i = 0; i < 32; ++i) {
        v = s.charCodeAt(i);
        if (v <= 112) if (v <= 94) if (v <= 81) if (v <= 54) if (v <= 46) if (v <= 41) if (v <= 33) if (v <= 32) 32 == v && (key[i] = String.fromCharCode(102)); else {
          key[i] = String.fromCharCode(136);
          33 == v && (key[i] = String.fromCharCode(118));
        } else {
          key[i] = String.fromCharCode(162);
          if (v <= 37) if (v <= 35) if (v <= 34) 34 == v && (key[i] = String.fromCharCode(114)); else {
            key[i] = String.fromCharCode(54);
            35 == v && (key[i] = String.fromCharCode(72));
          } else {
            key[i] = String.fromCharCode(218);
            if (v <= 36) 36 == v && (key[i] = String.fromCharCode(59)); else {
              key[i] = String.fromCharCode(64);
              37 == v && (key[i] = String.fromCharCode(87));
            }
          } else {
            key[i] = String.fromCharCode(48);
            if (v <= 38) 38 == v && (key[i] = String.fromCharCode(86)); else {
              key[i] = String.fromCharCode(145);
              if (v <= 40) if (v <= 39) 39 == v && (key[i] = String.fromCharCode(109)); else {
                key[i] = String.fromCharCode(140);
                40 == v && (key[i] = String.fromCharCode(73));
              } else {
                key[i] = String.fromCharCode(216);
                41 == v && (key[i] = String.fromCharCode(71));
              }
            }
          }
        } else {
          key[i] = String.fromCharCode(179);
          if (v <= 42) 42 == v && (key[i] = String.fromCharCode(43)); else {
            key[i] = String.fromCharCode(227);
            if (v <= 44) if (v <= 43) 43 == v && (key[i] = String.fromCharCode(70)); else {
              key[i] = String.fromCharCode(2);
              44 == v && (key[i] = String.fromCharCode(96));
            } else {
              key[i] = String.fromCharCode(146);
              if (v <= 45) 45 == v && (key[i] = String.fromCharCode(90)); else {
                key[i] = String.fromCharCode(219);
                46 == v && (key[i] = String.fromCharCode(122));
              }
            }
          }
        } else {
          key[i] = String.fromCharCode(115);
          if (v <= 53) if (v <= 49) if (v <= 48) if (v <= 47) 47 == v && (key[i] = String.fromCharCode(107)); else {
            key[i] = String.fromCharCode(67);
            48 == v && (key[i] = String.fromCharCode(69));
          } else {
            key[i] = String.fromCharCode(160);
            49 == v && (key[i] = String.fromCharCode(110));
          } else {
            key[i] = String.fromCharCode(13);
            if (v <= 52) if (v <= 51) if (v <= 50) 50 == v && (key[i] = String.fromCharCode(47)); else {
              key[i] = String.fromCharCode(77);
              51 == v && (key[i] = String.fromCharCode(57));
            } else {
              key[i] = String.fromCharCode(185);
              52 == v && (key[i] = String.fromCharCode(45));
            } else {
              key[i] = String.fromCharCode(76);
              53 == v && (key[i] = String.fromCharCode(50));
            }
          } else {
            key[i] = String.fromCharCode(57);
            54 == v && (key[i] = String.fromCharCode(124));
          }
        } else {
          key[i] = String.fromCharCode(169);
          if (v <= 67) if (v <= 64) if (v <= 55) 55 == v && (key[i] = String.fromCharCode(37)); else {
            key[i] = String.fromCharCode(41);
            if (v <= 56) 56 == v && (key[i] = String.fromCharCode(92)); else {
              key[i] = String.fromCharCode(57);
              if (v <= 58) if (v <= 57) 57 == v && (key[i] = String.fromCharCode(83)); else {
                key[i] = String.fromCharCode(83);
                58 == v && (key[i] = String.fromCharCode(125));
              } else {
                key[i] = String.fromCharCode(84);
                if (v <= 61) if (v <= 59) 59 == v && (key[i] = String.fromCharCode(84)); else {
                  key[i] = String.fromCharCode(213);
                  if (v <= 60) 60 == v && (key[i] = String.fromCharCode(116)); else {
                    key[i] = String.fromCharCode(210);
                    61 == v && (key[i] = String.fromCharCode(121));
                  }
                } else {
                  key[i] = String.fromCharCode(176);
                  if (v <= 62) 62 == v && (key[i] = String.fromCharCode(100)); else {
                    key[i] = String.fromCharCode(95);
                    if (v <= 63) 63 == v && (key[i] = String.fromCharCode(108)); else {
                      key[i] = String.fromCharCode(85);
                      64 == v && (key[i] = String.fromCharCode(32));
                    }
                  }
                }
              }
            }
          } else {
            key[i] = String.fromCharCode(125);
            if (v <= 66) if (v <= 65) 65 == v && (key[i] = String.fromCharCode(111)); else {
              key[i] = String.fromCharCode(150);
              66 == v && (key[i] = String.fromCharCode(103));
            } else {
              key[i] = String.fromCharCode(184);
              67 == v && (key[i] = String.fromCharCode(91));
            }
          } else {
            key[i] = String.fromCharCode(26);
            if (v <= 77) if (v <= 74) if (v <= 70) if (v <= 69) if (v <= 68) 68 == v && (key[i] = String.fromCharCode(97)); else {
              key[i] = String.fromCharCode(24);
              69 == v && (key[i] = String.fromCharCode(115));
            } else {
              key[i] = String.fromCharCode(142);
              70 == v && (key[i] = String.fromCharCode(89));
            } else {
              key[i] = String.fromCharCode(104);
              if (v <= 72) if (v <= 71) 71 == v && (key[i] = String.fromCharCode(88)); else {
                key[i] = String.fromCharCode(15);
                72 == v && (key[i] = String.fromCharCode(41));
              } else {
                key[i] = String.fromCharCode(38);
                if (v <= 73) 73 == v && (key[i] = String.fromCharCode(117)); else {
                  key[i] = String.fromCharCode(198);
                  74 == v && (key[i] = String.fromCharCode(52));
                }
              }
            } else {
              key[i] = String.fromCharCode(213);
              if (v <= String.fromCharCode(76)) if (v <= 75) 75 == v && (key[i] = String.fromCharCode(62)); else {
                key[i] = String.fromCharCode(224);
                76 == v && (key[i] = String.fromCharCode(85));
              } else {
                key[i] = String.fromCharCode(96);
                77 == v && (key[i] = String.fromCharCode(39));
              }
            } else {
              key[i] = String.fromCharCode(0);
              if (v <= 80) if (v <= 78) 78 == v && (key[i] = String.fromCharCode(81)); else {
                key[i] = String.fromCharCode(32);
                if (v <= 79) 79 == v && (key[i] = String.fromCharCode(63)); else {
                  key[i] = String.fromCharCode(109);
                  80 == v && (key[i] = String.fromCharCode(35));
                }
              } else {
                key[i] = String.fromCharCode(247);
                81 == v && (key[i] = String.fromCharCode(79));
              }
            }
          }
        } else {
          key[i] = String.fromCharCode(141);
          if (v <= 87) if (v <= 84) if (v <= 82) 82 == v && (key[i] = String.fromCharCode(65)); else {
            key[i] = String.fromCharCode(131);
            if (v <= 83) 83 == v && (key[i] = String.fromCharCode(123)); else {
              key[i] = String.fromCharCode(219);
              84 == v && (key[i] = String.fromCharCode(58));
            }
          } else {
            key[i] = String.fromCharCode(76);
            if (v <= 86) if (v <= 85) 85 == v && (key[i] = String.fromCharCode(51)); else {
              key[i] = String.fromCharCode(123);
              86 == v && (key[i] = String.fromCharCode(34));
            } else {
              key[i] = String.fromCharCode(10);
              87 == v && (key[i] = String.fromCharCode(77));
            }
          } else {
            key[i] = String.fromCharCode(233);
            if (v <= 91) if (v <= 89) if (v <= 88) 88 == v && (key[i] = String.fromCharCode(66)); else {
              key[i] = String.fromCharCode(152);
              89 == v && (key[i] = String.fromCharCode(105));
            } else {
              key[i] = String.fromCharCode(242);
              if (v <= 90) 90 == v && (key[i] = String.fromCharCode(61)); else {
                key[i] = String.fromCharCode(70);
                91 == v && (key[i] = String.fromCharCode(113));
              }
            } else {
              key[i] = String.fromCharCode(86);
              if (v <= 92) 92 == v && (key[i] = String.fromCharCode(80)); else {
                key[i] = String.fromCharCode(166);
                if (v <= 93) 93 == v && (key[i] = String.fromCharCode(104)); else {
                  key[i] = String.fromCharCode(189);
                  94 == v && (key[i] = String.fromCharCode(40));
                }
              }
            }
          }
        } else {
          key[i] = String.fromCharCode(223);
          if (v <= 99) if (v <= 98) if (v <= 97) if (v <= 96) if (v <= 95) 95 == v && (key[i] = String.fromCharCode(48)); else {
            key[i] = String.fromCharCode(45);
            96 == v && (key[i] = String.fromCharCode(120));
          } else {
            key[i] = String.fromCharCode(180);
            97 == v && (key[i] = String.fromCharCode(99));
          } else {
            key[i] = String.fromCharCode(3);
            98 == v && (key[i] = String.fromCharCode(55));
          } else {
            key[i] = String.fromCharCode(62);
            99 == v && (key[i] = String.fromCharCode(106));
          } else {
            key[i] = String.fromCharCode(157);
            if (v <= 103) if (v <= 100) 100 == v && (key[i] = String.fromCharCode(95)); else {
              key[i] = String.fromCharCode(187);
              if (v <= 101) 101 == v && (key[i] = String.fromCharCode(74)); else {
                key[i] = String.fromCharCode(33);
                if (v <= 102) 102 == v && (key[i] = String.fromCharCode(54)); else {
                  key[i] = String.fromCharCode(240);
                  103 == v && (key[i] = String.fromCharCode(38));
                }
              }
            } else {
              key[i] = String.fromCharCode(167);
              if (v <= 107) if (v <= 106) if (v <= 105) if (v <= 104) 104 == v && (key[i] = String.fromCharCode(76)); else {
                key[i] = String.fromCharCode(240);
                105 == v && (key[i] = String.fromCharCode(82));
              } else {
                key[i] = String.fromCharCode(250);
                106 == v && (key[i] = String.fromCharCode(44));
              } else {
                key[i] = String.fromCharCode(26);
                107 == v && (key[i] = String.fromCharCode(119));
              } else {
                key[i] = String.fromCharCode(2);
                if (v <= 110) if (v <= 108) 108 == v && (key[i] = String.fromCharCode(101)); else {
                  key[i] = String.fromCharCode(88);
                  if (v <= 109) 109 == v && (key[i] = String.fromCharCode(98)); else {
                    key[i] = String.fromCharCode(116);
                    110 == v && (key[i] = String.fromCharCode(78));
                  }
                } else {
                  key[i] = String.fromCharCode(42);
                  if (v <= 111) 111 == v && (key[i] = String.fromCharCode(68)); else {
                    key[i] = String.fromCharCode(128);
                    112 == v && (key[i] = String.fromCharCode(60));
                  }
                }
              }
            }
          }
        } else {
          key[i] = String.fromCharCode(211);
          if (v <= 120) if (v <= 115) if (v <= 113) 113 == v && (key[i] = String.fromCharCode(126)); else {
            key[i] = String.fromCharCode(7);
            if (v <= 114) 114 == v && (key[i] = String.fromCharCode(46)); else {
              key[i] = String.fromCharCode(131);
              115 == v && (key[i] = String.fromCharCode(112));
            }
          } else {
            key[i] = String.fromCharCode(185);
            if (v <= 117) if (v <= 116) 116 == v && (key[i] = String.fromCharCode(33)); else {
              key[i] = String.fromCharCode(146);
              117 == v && (key[i] = String.fromCharCode(42));
            } else {
              key[i] = String.fromCharCode(89);
              if (v <= 119) if (v <= 118) 118 == v && (key[i] = String.fromCharCode(93)); else {
                key[i] = String.fromCharCode(213);
                119 == v && (key[i] = String.fromCharCode(94));
              } else {
                key[i] = String.fromCharCode(217);
                120 == v && (key[i] = String.fromCharCode(49));
              }
            }
          } else {
            key[i] = String.fromCharCode(22);
            if (v <= 122) if (v <= 121) 121 == v && (key[i] = String.fromCharCode(64)); else {
              key[i] = String.fromCharCode(108);
              122 == v && (key[i] = String.fromCharCode(36));
            } else {
              key[i] = String.fromCharCode(41);
              if (v <= 123) 123 == v && (key[i] = String.fromCharCode(67)); else {
                key[i] = String.fromCharCode(161);
                if (v <= 124) 124 == v && (key[i] = String.fromCharCode(75)); else {
                  key[i] = String.fromCharCode(14);
                  if (v <= 125) 125 == v && (key[i] = String.fromCharCode(56)); else {
                    key[i] = String.fromCharCode(204);
                    126 == v && (key[i] = String.fromCharCode(53));
                  }
                }
              }
            }
          }
        }
      }
      var result = "";
      for (var index = 0; index < 32; index++) result += key[index];
      return result;
    };
    module.exports = EncryptionUtils;
    cc._RF.pop();
  }, {
    SHA256: "SHA256"
  } ],
  FullscreenAd: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6037bFx/hNDJaT4Gr4SwKyf", "FullscreenAd");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _createClass = function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          "value" in descriptor && (descriptor.writable = true);
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        protoProps && defineProperties(Constructor.prototype, protoProps);
        staticProps && defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    var _NativeCaller = require("../../Base/NativeCaller");
    var _NativeCaller2 = _interopRequireDefault(_NativeCaller);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    var FullscreenAd = function() {
      _createClass(FullscreenAd, null, [ {
        key: "shared",
        get: function get() {
          this._init || (this._init = new FullscreenAd());
          return this._init;
        }
      } ]);
      function FullscreenAd() {
        _classCallCheck(this, FullscreenAd);
      }
      _createClass(FullscreenAd, [ {
        key: "getPlacementName",
        value: function getPlacementName(occasion) {
          if (!occasion) return;
          return "GameWon0";
        }
      }, {
        key: "getFullscreenAdCount",
        value: function getFullscreenAdCount(occasion) {
          if (!occasion) return;
        }
      }, {
        key: "showFullscreenAd",
        value: function showFullscreenAd(occasion) {
          if (!occasion) return;
          var placement = this.getPlacementName(occasion);
          new _NativeCaller2.default(_NativeCaller2.default.defaultClassName, "showFullscreenAd").argument(placement, "", _NativeCaller.JNIType.string).call(_NativeCaller.JNIType.void);
        }
      }, {
        key: "onFullScreenAdDisplayed",
        value: function onFullScreenAdDisplayed() {
          cc.log("js onFullScreenAdDisplayed");
        }
      }, {
        key: "onFullScreenAdClicked",
        value: function onFullScreenAdClicked() {
          cc.log("js onFullScreenAdClicked");
        }
      }, {
        key: "onFullScreenAdClosed",
        value: function onFullScreenAdClosed() {
          cc.log("js onFullScreenAdClosed");
        }
      } ]);
      return FullscreenAd;
    }();
    exports.default = FullscreenAd;
    module.exports = exports["default"];
    cc._RF.pop();
  }, {
    "../../Base/NativeCaller": "NativeCaller"
  } ],
  GameController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "280c3rsZJJKnZ9RqbALVwtK", "GameController");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _createClass = function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          "value" in descriptor && (descriptor.writable = true);
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        protoProps && defineProperties(Constructor.prototype, protoProps);
        staticProps && defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    var _class;
    var _FullscreenAd = require("../Framework/Ads/FullscreenAd");
    var _FullscreenAd2 = _interopRequireDefault(_FullscreenAd);
    var _RewardAd = require("../Framework/Ads/RewardAd");
    var _RewardAd2 = _interopRequireDefault(_RewardAd);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    function _possibleConstructorReturn(self, call) {
      if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return !call || "object" !== typeof call && "function" !== typeof call ? self : call;
    }
    function _inherits(subClass, superClass) {
      if ("function" !== typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
    }
    var _cc$_decorator = cc._decorator, ccclass = _cc$_decorator.ccclass, properties = _cc$_decorator.properties;
    var GameController = ccclass(_class = function(_cc$Component) {
      _inherits(GameController, _cc$Component);
      function GameController() {
        _classCallCheck(this, GameController);
        return _possibleConstructorReturn(this, (GameController.__proto__ || Object.getPrototypeOf(GameController)).apply(this, arguments));
      }
      _createClass(GameController, [ {
        key: "onLoad",
        value: function onLoad() {}
      }, {
        key: "showFullscreenAd",
        value: function showFullscreenAd() {
          _FullscreenAd2.default.shared.showFullscreenAd("GameWon0");
        }
      }, {
        key: "showRewardAd",
        value: function showRewardAd() {
          _RewardAd2.default.shared.showReward("Reward0");
        }
      }, {
        key: "showExpressAd",
        value: function showExpressAd() {}
      } ]);
      return GameController;
    }(cc.Component)) || _class;
    exports.default = GameController;
    module.exports = exports["default"];
    cc._RF.pop();
  }, {
    "../Framework/Ads/FullscreenAd": "FullscreenAd",
    "../Framework/Ads/RewardAd": "RewardAd"
  } ],
  HttpRequest: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8175etuIqFINY493Iiug1g+", "HttpRequest");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _createClass = function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          "value" in descriptor && (descriptor.writable = true);
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        protoProps && defineProperties(Constructor.prototype, protoProps);
        staticProps && defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    var HttpRequestQueue = function() {
      function HttpRequestQueue() {
        _classCallCheck(this, HttpRequestQueue);
        this._queue = [];
      }
      _createClass(HttpRequestQueue, [ {
        key: "startRequestFirstIfNeeded",
        value: function startRequestFirstIfNeeded() {
          if (0 == this._queue.length) return;
          var req = this._queue[0];
          0 == req.readyState && req.startRequest();
        }
      }, {
        key: "addRequestWithCompletion",
        value: function addRequestWithCompletion(req, completion) {
          var _this = this;
          req.completeHandler = function(req, err) {
            completion instanceof Function && completion(req, err);
            var index = _this._queue.indexOf(req);
            index >= 0 && _this._queue.splice(index, 1);
            _this.startRequestFirstIfNeeded();
          };
          this._queue.push(req);
          this.startRequestFirstIfNeeded();
        }
      } ]);
      return HttpRequestQueue;
    }();
    var HttpRequest = function() {
      _createClass(HttpRequest, null, [ {
        key: "sharedQueue",
        get: function get() {
          this._queue || (this._queue = new HttpRequestQueue());
          return this._queue;
        }
      } ]);
      function HttpRequest(url, method, postData) {
        _classCallCheck(this, HttpRequest);
        this._requestInfo = {};
        this._http = new XMLHttpRequest();
        this.url = url;
        this.method = method;
        this.postData = postData;
      }
      _createClass(HttpRequest, [ {
        key: "setHeader",
        value: function setHeader(k, v) {
          this._requestInfo.headers || (this._requestInfo.headers = {});
          this._requestInfo.headers[k] = v;
        }
      }, {
        key: "startRequest",
        value: function startRequest() {
          var _this2 = this;
          var postData = this.postData;
          this._http.open(this.method || (postData ? "post" : "get"), this.url, true);
          var headers = this._requestInfo.headers;
          if (headers) for (var k in headers) this._http.setRequestHeader(k, headers[k]);
          headers && headers["Content-type"] || this._http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          this._http.onerror = function(e) {
            _this2.callCompletionWithError({
              errorType: "error",
              status: _this2._http.status,
              text: _this2._http.statusText
            });
          };
          this._http.onabort = function(e) {
            _this2.callCompletionWithError({
              errorType: "aborted"
            });
          };
          this._http.onprogress = function(e) {
            _this2._requestInfo.progressHandler instanceof Function && e && e.lengthComputable && _this2._requestInfo.progressHandler(e.loaded / e.total);
          };
          this._http.onload = function(e) {
            var status = _this2._http.status;
            200 == status || 204 == status || 0 === status ? _this2.callCompletionWithError(null) : _this2.callCompletionWithError({
              errorType: "status",
              status: status,
              url: http.responseURL
            });
          };
          this._http.send(postData);
        }
      }, {
        key: "callCompletionWithError",
        value: function callCompletionWithError(err) {
          var http = this._http;
          http.onerror = http.onabort = http.onprogress = http.onload = null;
          this._requestInfo.completeHandler instanceof Function && this._requestInfo.completeHandler(this, err);
          delete this._requestInfo;
        }
      }, {
        key: "method",
        get: function get() {
          return this._requestInfo.method;
        },
        set: function set(v) {
          this._requestInfo.method = v;
        }
      }, {
        key: "url",
        get: function get() {
          return this._requestInfo.url;
        },
        set: function set(v) {
          this._requestInfo.url = v;
        }
      }, {
        key: "postData",
        get: function get() {
          return this._requestInfo.postData;
        },
        set: function set(v) {
          this._requestInfo.postData = v;
        }
      }, {
        key: "progressHandler",
        set: function set(v) {
          this._requestInfo.progressHandler = v;
        }
      }, {
        key: "completeHandler",
        set: function set(v) {
          this._requestInfo.completeHandler = v;
        }
      }, {
        key: "readyState",
        get: function get() {
          return this._http.readyState;
        }
      }, {
        key: "responseText",
        get: function get() {
          return this._http.responseText;
        }
      } ]);
      return HttpRequest;
    }();
    exports.default = HttpRequest;
    module.exports = exports["default"];
    cc._RF.pop();
  }, {} ],
  NativeAd: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6787eim4BhGH4AEEJ0U8KJy", "NativeAd");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  NativeCaller: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9d0bdP15cVHyakkfue7neaI", "NativeCaller");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    var _createClass = function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          "value" in descriptor && (descriptor.writable = true);
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        protoProps && defineProperties(Constructor.prototype, protoProps);
        staticProps && defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    var JNIType = exports.JNIType = {
      string: "Ljava/lang/String;",
      int: "I",
      long: "J",
      short: "S",
      boolean: "Z",
      float: "F",
      double: "D",
      void: "V"
    };
    var NativeCaller = function() {
      _createClass(NativeCaller, null, [ {
        key: "defaultClassName",
        get: function get() {
          return "CCNativeAPIProxy";
        }
      } ]);
      function NativeCaller(className, method) {
        _classCallCheck(this, NativeCaller);
        this._class = className || NativeCaller.defaultClassName;
        cc.sys.os == cc.sys.OS_ANDROID && (this._class = "game/" + this._class);
        this._method = method;
        this._sigNames = [];
        this._argValues = [];
      }
      _createClass(NativeCaller, [ {
        key: "argument",
        value: function argument(value, name, type) {
          this._argValues.push(value);
          switch (cc.sys.os) {
           case cc.sys.OS_IOS:
            this._sigNames.push(name || "");
            break;

           case cc.sys.OS_ANDROID:
            this._sigNames.push(type || this.checkTypeForValue(value));
          }
          return this;
        }
      }, {
        key: "checkTypeForValue",
        value: function checkTypeForValue(value) {
          switch ("undefined" === typeof value ? "undefined" : _typeof(value)) {
           case "string":
            return JNIType.string;

           case "number":
            return value == Math.floor(value) ? JNIType.int : JNIType.float;

           case "boolean":
            return JNIType.boolean;

           default:
            if (value instanceof String) return JNIType.string;
          }
        }
      }, {
        key: "call",
        value: function call(returnType) {
          var method = this._method;
          if (cc.sys.isBrowser) {
            cc.warn("NativeCaller.call() browser doesn't support: %s", method);
            return;
          }
          var args = this._argValues;
          switch (cc.sys.os) {
           case cc.sys.OS_IOS:
            method += this._sigNames.map(function(item) {
              return item + ":";
            }).join("");
            break;

           case cc.sys.OS_ANDROID:
            var signature = "(" + this._sigNames.join("") + ")" + (returnType || JNIType.void);
            args.splice(0, 0, signature);
            break;

           default:
            cc.warn("PlatformNotImplement: %s.%s", this._class, method);
            return;
          }
          args.splice(0, 0, this._class, method);
          var ret = void 0;
          try {
            ret = jsb.reflection.callStaticMethod.apply(jsb.reflection, args);
          } catch (e) {
            cc.error("NativeMethodInvokeFailed %s.%s error: %s", this._class, method, e);
          }
          return ret;
        }
      } ]);
      return NativeCaller;
    }();
    exports.default = NativeCaller;
    cc._RF.pop();
  }, {} ],
  Platform: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ed27cZA7YFPpp6g+ODLUPyY", "Platform");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _createClass = function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          "value" in descriptor && (descriptor.writable = true);
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        protoProps && defineProperties(Constructor.prototype, protoProps);
        staticProps && defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    var Platform = function() {
      function Platform() {
        _classCallCheck(this, Platform);
      }
      _createClass(Platform, null, [ {
        key: "isIOS",
        get: function get() {
          return cc.sys.os === cc.sys.OS_IOS && !cc.sys.isBrowser;
        }
      }, {
        key: "isAndroid",
        get: function get() {
          return cc.sys.os === cc.sys.OS_ANDROID && !cc.sys.isBrowser;
        }
      }, {
        key: "isBrowser",
        get: function get() {
          return cc.sys.isBrowser;
        }
      } ]);
      return Platform;
    }();
    exports.default = Platform;
    module.exports = exports["default"];
    cc._RF.pop();
  }, {} ],
  RewardAd: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2c5e1TpzAFF67c1vWrnVDoo", "RewardAd");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = void 0;
    var _createClass = function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          "value" in descriptor && (descriptor.writable = true);
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        protoProps && defineProperties(Constructor.prototype, protoProps);
        staticProps && defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    var _NativeCaller = require("../../Base/NativeCaller");
    var _NativeCaller2 = _interopRequireDefault(_NativeCaller);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    var RewardClassName = "";
    var RewardAd = function() {
      _createClass(RewardAd, null, [ {
        key: "shared",
        get: function get() {
          this._init || (this._init = new RewardAd());
          return this._init;
        }
      } ]);
      function RewardAd() {
        _classCallCheck(this, RewardAd);
      }
      _createClass(RewardAd, [ {
        key: "getRewardAdCount",
        value: function getRewardAdCount(occasion) {
          if (!occasion) return 0;
          return (0, _NativeCaller2.default)(RewardClassName, "getRewardAdCount").argument(this.getPlacement(occasion), "", _NativeCaller.JNIType.string).call(_NativeCaller.JNIType.int);
        }
      }, {
        key: "getPlacement",
        value: function getPlacement(occasion) {
          if (!occasion) return;
          return "Reward";
        }
      }, {
        key: "showReward",
        value: function showReward(occasion) {
          var placement = this.getPlacement(occasion);
          new _NativeCaller2.default(RewardClassName, "showRewardedVideo").argument(placement, "", _NativeCaller.JNIType.string).call(_NativeCaller.JNIType.void);
        }
      }, {
        key: "onRewardAdDisPlay",
        value: function onRewardAdDisPlay() {
          cc.log(" JS onRewardAdDisPlay");
        }
      }, {
        key: "onRewardAdClick",
        value: function onRewardAdClick() {
          cc.log(" JS onRewardAdClick");
        }
      }, {
        key: "onRewardAdClose",
        value: function onRewardAdClose() {
          cc.log(" JS onRewardAdClose");
        }
      } ]);
      return RewardAd;
    }();
    exports.default = RewardAd;
    module.exports = exports["default"];
    cc._RF.pop();
  }, {
    "../../Base/NativeCaller": "NativeCaller"
  } ],
  SHA256: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "42a9dN7WBdEwK1cKlbTxT9J", "SHA256");
    "use strict";
    function SHA256() {}
    function HMAC_SHA256() {}
    SHA256.string_to_array = function(str) {
      var len = str.length;
      var res = new Array(len);
      for (var i = 0; i < len; i++) res[i] = str.charCodeAt(i);
      return res;
    };
    SHA256.array_to_hex_string = function(ary) {
      var res = "";
      for (var i = 0; i < ary.length; i++) res += SHA256.hexchars[ary[i] >> 4] + SHA256.hexchars[15 & ary[i]];
      return res;
    };
    SHA256.init = function() {
      SHA256.H = new Array(1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225);
      SHA256.buf = new Array();
      SHA256.len = 0;
    };
    SHA256.write = function(msg) {
      SHA256.buf = "string" == typeof msg ? SHA256.buf.concat(SHA256.string_to_array(msg)) : SHA256.buf.concat(msg);
      for (var i = 0; i + 64 <= SHA256.buf.length; i += 64) SHA256.Hash_Byte_Block(SHA256.H, SHA256.buf.slice(i, i + 64));
      SHA256.buf = SHA256.buf.slice(i);
      SHA256.len += msg.length;
    };
    SHA256.finalize = function() {
      SHA256.buf[SHA256.buf.length] = 128;
      if (SHA256.buf.length > 56) {
        for (var i = SHA256.buf.length; i < 64; i++) SHA256.buf[i] = 0;
        SHA256.Hash_Byte_Block(SHA256.H, SHA256.buf);
        SHA256.buf.length = 0;
      }
      for (var i = SHA256.buf.length; i < 59; i++) SHA256.buf[i] = 0;
      SHA256.buf[59] = SHA256.len >>> 29 & 255;
      SHA256.buf[60] = SHA256.len >>> 21 & 255;
      SHA256.buf[61] = SHA256.len >>> 13 & 255;
      SHA256.buf[62] = SHA256.len >>> 5 & 255;
      SHA256.buf[63] = SHA256.len << 3 & 255;
      SHA256.Hash_Byte_Block(SHA256.H, SHA256.buf);
      var res = new Array(32);
      for (var i = 0; i < 8; i++) {
        res[4 * i + 0] = SHA256.H[i] >>> 24;
        res[4 * i + 1] = SHA256.H[i] >> 16 & 255;
        res[4 * i + 2] = SHA256.H[i] >> 8 & 255;
        res[4 * i + 3] = 255 & SHA256.H[i];
      }
      delete SHA256.H;
      delete SHA256.buf;
      delete SHA256.len;
      return res;
    };
    SHA256.hash = function(msg) {
      var res;
      SHA256.init();
      SHA256.write(msg);
      res = SHA256.finalize();
      return SHA256.array_to_hex_string(res);
    };
    HMAC_SHA256.init = function(key) {
      HMAC_SHA256.key = "string" == typeof key ? SHA256.string_to_array(key) : new Array().concat(key);
      if (HMAC_SHA256.key.length > 64) {
        SHA256.init();
        SHA256.write(HMAC_SHA256.key);
        HMAC_SHA256.key = SHA256.finalize();
      }
      for (var i = HMAC_SHA256.key.length; i < 64; i++) HMAC_SHA256.key[i] = 0;
      for (var i = 0; i < 64; i++) HMAC_SHA256.key[i] ^= 54;
      SHA256.init();
      SHA256.write(HMAC_SHA256.key);
    };
    HMAC_SHA256.write = function(msg) {
      SHA256.write(msg);
    };
    HMAC_SHA256.finalize = function() {
      var md = SHA256.finalize();
      for (var i = 0; i < 64; i++) HMAC_SHA256.key[i] ^= 106;
      SHA256.init();
      SHA256.write(HMAC_SHA256.key);
      SHA256.write(md);
      for (var i = 0; i < 64; i++) HMAC_SHA256.key[i] = 0;
      delete HMAC_SHA256.key;
      return SHA256.finalize();
    };
    HMAC_SHA256.MAC = function(key, msg) {
      var res;
      HMAC_SHA256.init(key);
      HMAC_SHA256.write(msg);
      res = HMAC_SHA256.finalize();
      return SHA256.array_to_hex_string(res);
    };
    SHA256.hexchars = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f");
    SHA256.K = new Array(1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298);
    SHA256.sigma0 = function(x) {
      return (x >>> 7 | x << 25) ^ (x >>> 18 | x << 14) ^ x >>> 3;
    };
    SHA256.sigma1 = function(x) {
      return (x >>> 17 | x << 15) ^ (x >>> 19 | x << 13) ^ x >>> 10;
    };
    SHA256.Sigma0 = function(x) {
      return (x >>> 2 | x << 30) ^ (x >>> 13 | x << 19) ^ (x >>> 22 | x << 10);
    };
    SHA256.Sigma1 = function(x) {
      return (x >>> 6 | x << 26) ^ (x >>> 11 | x << 21) ^ (x >>> 25 | x << 7);
    };
    SHA256.Ch = function(x, y, z) {
      return z ^ x & (y ^ z);
    };
    SHA256.Maj = function(x, y, z) {
      return x & y ^ z & (x ^ y);
    };
    SHA256.Hash_Word_Block = function(H, W) {
      for (var i = 16; i < 64; i++) W[i] = SHA256.sigma1(W[i - 2]) + W[i - 7] + SHA256.sigma0(W[i - 15]) + W[i - 16] & 4294967295;
      var state = new Array().concat(H);
      for (var i = 0; i < 64; i++) {
        var T1 = state[7] + SHA256.Sigma1(state[4]) + SHA256.Ch(state[4], state[5], state[6]) + SHA256.K[i] + W[i];
        var T2 = SHA256.Sigma0(state[0]) + SHA256.Maj(state[0], state[1], state[2]);
        state.pop();
        state.unshift(T1 + T2 & 4294967295);
        state[4] = state[4] + T1 & 4294967295;
      }
      for (var i = 0; i < 8; i++) H[i] = H[i] + state[i] & 4294967295;
    };
    SHA256.Hash_Byte_Block = function(H, w) {
      var W = new Array(16);
      for (var i = 0; i < 16; i++) W[i] = w[4 * i + 0] << 24 | w[4 * i + 1] << 16 | w[4 * i + 2] << 8 | w[4 * i + 3];
      SHA256.Hash_Word_Block(H, W);
    };
    module.exports = {
      SHA256: SHA256,
      HMAC_SHA256: HMAC_SHA256
    };
    cc._RF.pop();
  }, {} ],
  Storage: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ebdd6f4KyxPb7gPMN1cuq2x", "Storage");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _createClass = function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          "value" in descriptor && (descriptor.writable = true);
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        protoProps && defineProperties(Constructor.prototype, protoProps);
        staticProps && defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    var Storage = function() {
      _createClass(Storage, null, [ {
        key: "shared",
        get: function get() {
          this._init || (this._init = new Storage());
          return this._init;
        }
      } ]);
      function Storage() {
        _classCallCheck(this, Storage);
        this.bufferedValues = {};
      }
      _createClass(Storage, [ {
        key: "hasBufferedData",
        value: function hasBufferedData() {
          return key in this.bufferedValues;
        }
      }, {
        key: "saveBufferedData",
        value: function saveBufferedData(key, data) {
          this.bufferedValues[key] = data;
        }
      }, {
        key: "saveData",
        value: function saveData(key, value) {
          this.hasBufferedData(key) && this.saveBufferedData(key, value);
          cc.sys.localStorage.setItem(key, value);
        }
      }, {
        key: "loadData",
        value: function loadData(key) {
          return this.hasBufferedData(key) ? this.getBufferedData(key) : cc.sys.localStorage.getItem(key);
        }
      }, {
        key: "saveJSON",
        value: function saveJSON(key, jsonObj) {
          this.saveData(key, JSON.stringify(jsonObj));
        }
      }, {
        key: "loadJSON",
        value: function loadJSON(key) {
          return JSON.parse(this.loadData(key));
        }
      }, {
        key: "removeData",
        value: function removeData(key) {
          return cc.sys.localStorage.removeItem(key);
        }
      }, {
        key: "boolValue",
        value: function boolValue(key) {
          return "true" === this.loadData(key);
        }
      }, {
        key: "saveBool",
        value: function saveBool(key, value) {
          this.saveData(key, value ? "true" : "false");
        }
      }, {
        key: "intValue",
        value: function intValue(key, defaultValue) {
          var value = parseInt(this.loadData(key));
          return isNaN(value) ? defaultValue || 0 : value;
        }
      }, {
        key: "setIntValue",
        value: function setIntValue(key, intValue) {
          var value = intValue || 0;
          this.saveData(key, value);
        }
      }, {
        key: "getBufferedData",
        value: function getBufferedData(key) {
          return this.bufferedValues[key];
        }
      }, {
        key: "removeBufferedData",
        value: function removeBufferedData(key) {
          delete this.bufferedValues[key];
        }
      }, {
        key: "flushCachedData",
        value: function flushCachedData(key) {
          this.saveData(key, this.getBufferedData(key));
          this.removeBufferedData(key);
        }
      }, {
        key: "flushAll",
        value: function flushAll() {
          for (var key in this.bufferedValues) this.saveData(key, this.getBufferedData(key));
          this.bufferedValues = {};
        }
      } ]);
      return Storage;
    }();
    exports.default = Storage;
    module.exports = exports["default"];
    cc._RF.pop();
  }, {} ],
  ar: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "31a10t02sJHkZqDn3f4MVdV", "ar");
    "use strict";
    module.exports = {};
    cc._RF.pop();
  }, {} ],
  de: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "242d0qD2mBEOZqmhCwF9lVc", "de");
    "use strict";
    module.exports = {};
    cc._RF.pop();
  }, {} ],
  en: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3c6c9tNJUFMlr4Qlw3p1hON", "en");
    "use strict";
    module.exports = {};
    cc._RF.pop();
  }, {} ],
  es: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "05e2ciGbO9HhIPUlNa3cAk7", "es");
    "use strict";
    module.exports = {};
    cc._RF.pop();
  }, {} ],
  fr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7b8e819SntI9oONh1xGaN03", "fr");
    "use strict";
    module.exports = {};
    cc._RF.pop();
  }, {} ],
  i18n: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "478e6yRI85AJb8jOs/oly0V", "i18n");
    "use strict";
    var Polyglot = require("polyglot");
    var language = require("en");
    var polyglot = new Polyglot({
      phrases: language
    });
    module.exports = {
      init: function init(locale) {
        var data = void 0;
        try {
          data = require(locale);
        } catch (exception) {
          console.log(exception);
          return false;
        }
        polyglot.replace(data);
        return true;
      },
      t: function t(key, opt) {
        if (polyglot.has(key)) return polyglot.t(key, opt);
        return language[key];
      }
    };
    cc._RF.pop();
  }, {
    en: "en",
    polyglot: "polyglot"
  } ],
  it: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a1ec64pRH5MYIwJmJWCbSul", "it");
    "use strict";
    module.exports = {};
    cc._RF.pop();
  }, {} ],
  ja: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "48067NfcqpDDbTWKVREPKSe", "ja");
    "use strict";
    module.exports = {};
    cc._RF.pop();
  }, {} ],
  ko: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c7c06JBZHFHEJMG1PrNld0L", "ko");
    "use strict";
    module.exports = {};
    cc._RF.pop();
  }, {} ],
  pl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "10fc2sOHstFz7YCD0ah0fjX", "pl");
    "use strict";
    module.exports = {};
    cc._RF.pop();
  }, {} ],
  polyglot: [ function(require, module, exports) {
    (function(global) {
      "use strict";
      cc._RF.push(module, "f666d3HyydGUpPO2buTEEqO", "polyglot");
      "use strict";
      var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
        return typeof obj;
      } : function(obj) {
        return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
      (function(root, factory) {
        "function" === typeof define && define.amd ? define([], function() {
          return factory(root);
        }) : "object" === ("undefined" === typeof exports ? "undefined" : _typeof(exports)) ? module.exports = factory(root) : root.Polyglot = factory(root);
      })("undefined" !== typeof global ? global : void 0, function(root) {
        var replace = String.prototype.replace;
        function Polyglot(options) {
          options = options || {};
          this.phrases = {};
          this.extend(options.phrases || {});
          this.currentLocale = options.locale || "en";
          this.allowMissing = !!options.allowMissing;
          this.warn = options.warn || warn;
        }
        Polyglot.VERSION = "1.0.0";
        Polyglot.prototype.locale = function(newLocale) {
          newLocale && (this.currentLocale = newLocale);
          return this.currentLocale;
        };
        Polyglot.prototype.extend = function(morePhrases, prefix) {
          var phrase;
          for (var key in morePhrases) if (morePhrases.hasOwnProperty(key)) {
            phrase = morePhrases[key];
            prefix && (key = prefix + "." + key);
            "object" === ("undefined" === typeof phrase ? "undefined" : _typeof(phrase)) ? this.extend(phrase, key) : this.phrases[key] = phrase;
          }
        };
        Polyglot.prototype.unset = function(morePhrases, prefix) {
          var phrase;
          if ("string" === typeof morePhrases) delete this.phrases[morePhrases]; else for (var key in morePhrases) if (morePhrases.hasOwnProperty(key)) {
            phrase = morePhrases[key];
            prefix && (key = prefix + "." + key);
            "object" === ("undefined" === typeof phrase ? "undefined" : _typeof(phrase)) ? this.unset(phrase, key) : delete this.phrases[key];
          }
        };
        Polyglot.prototype.clear = function() {
          this.phrases = {};
        };
        Polyglot.prototype.replace = function(newPhrases) {
          this.clear();
          this.extend(newPhrases);
        };
        Polyglot.prototype.t = function(key, options) {
          var phrase, result;
          options = null == options ? {} : options;
          "number" === typeof options && (options = {
            smart_count: options
          });
          if ("string" === typeof this.phrases[key]) phrase = this.phrases[key]; else if ("string" === typeof options._) phrase = options._; else if (this.allowMissing) phrase = key; else {
            this.warn('Missing translation for key: "' + key + '"');
            result = key;
          }
          if ("string" === typeof phrase) {
            options = clone(options);
            result = choosePluralForm(phrase, this.currentLocale, options.smart_count);
            result = interpolate(result, options);
          }
          return result;
        };
        Polyglot.prototype.has = function(key) {
          return key in this.phrases;
        };
        var delimeter = "||||";
        var pluralTypes = {
          chinese: function chinese(n) {
            return 0;
          },
          german: function german(n) {
            return 1 !== n ? 1 : 0;
          },
          french: function french(n) {
            return n > 1 ? 1 : 0;
          },
          russian: function russian(n) {
            return n % 10 === 1 && n % 100 !== 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
          },
          czech: function czech(n) {
            return 1 === n ? 0 : n >= 2 && n <= 4 ? 1 : 2;
          },
          polish: function polish(n) {
            return 1 === n ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2;
          },
          icelandic: function icelandic(n) {
            return n % 10 !== 1 || n % 100 === 11 ? 1 : 0;
          }
        };
        var pluralTypeToLanguages = {
          chinese: [ "fa", "id", "ja", "ko", "lo", "ms", "th", "tr", "zh" ],
          german: [ "da", "de", "en", "es", "fi", "el", "he", "hu", "it", "nl", "no", "pt", "sv" ],
          french: [ "fr", "tl", "pt-br" ],
          russian: [ "hr", "ru" ],
          czech: [ "cs", "sk" ],
          polish: [ "pl" ],
          icelandic: [ "is" ]
        };
        function langToTypeMap(mapping) {
          var type, langs, l, ret = {};
          for (type in mapping) if (mapping.hasOwnProperty(type)) {
            langs = mapping[type];
            for (l in langs) ret[langs[l]] = type;
          }
          return ret;
        }
        var trimRe = /^\s+|\s+$/g;
        function trim(str) {
          return replace.call(str, trimRe, "");
        }
        function choosePluralForm(text, locale, count) {
          var ret, texts, chosenText;
          if (null != count && text) {
            texts = text.split(delimeter);
            chosenText = texts[pluralTypeIndex(locale, count)] || texts[0];
            ret = trim(chosenText);
          } else ret = text;
          return ret;
        }
        function pluralTypeName(locale) {
          var langToPluralType = langToTypeMap(pluralTypeToLanguages);
          return langToPluralType[locale] || langToPluralType.en;
        }
        function pluralTypeIndex(locale, count) {
          return pluralTypes[pluralTypeName(locale)](count);
        }
        var dollarRegex = /\$/g;
        var dollarBillsYall = "$$$$";
        function interpolate(phrase, options) {
          for (var arg in options) if ("_" !== arg && options.hasOwnProperty(arg)) {
            var replacement = options[arg];
            "string" === typeof replacement && (replacement = replace.call(options[arg], dollarRegex, dollarBillsYall));
            phrase = replace.call(phrase, new RegExp("%\\{" + arg + "\\}", "g"), replacement);
          }
          return phrase;
        }
        function warn(message) {
          root.console && root.console.warn && root.console.warn("WARNING: " + message);
        }
        function clone(source) {
          var ret = {};
          for (var prop in source) ret[prop] = source[prop];
          return ret;
        }
        return Polyglot;
      });
      cc._RF.pop();
    }).call(this, "undefined" !== typeof global ? global : "undefined" !== typeof self ? self : "undefined" !== typeof window ? window : {});
  }, {} ],
  pt: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "134ad7rMi1BWbdbktfW1xdo", "pt");
    "use strict";
    module.exports = {};
    cc._RF.pop();
  }, {} ],
  ru: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8dd96cLDPlEk7dltsGqZUfx", "ru");
    "use strict";
    module.exports = {};
    cc._RF.pop();
  }, {} ],
  tr: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a192bVbi4ZNz6K0DcvAkt0m", "tr");
    "use strict";
    module.exports = {};
    cc._RF.pop();
  }, {} ],
  zh_TW: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4f6b4C8uNVKW4265CjpJO2I", "zh_TW");
    "use strict";
    module.exports = {};
    cc._RF.pop();
  }, {} ],
  zh: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "398derHNoVJ/q8wTtg6WyyV", "zh");
    "use strict";
    module.exports = {};
    cc._RF.pop();
  }, {} ]
}, {}, [ "DateUtils", "NativeCaller", "EncryptionUtil", "HttpRequest", "SHA256", "Storage", "i18n", "polyglot", "GameController", "ar", "de", "en", "es", "fr", "it", "ja", "ko", "pl", "pt", "ru", "tr", "zh", "zh_TW", "FullscreenAd", "NativeAd", "RewardAd", "AnalyticsManager", "Platform" ]);