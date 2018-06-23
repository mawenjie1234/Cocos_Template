var HMAC_SHA256 = require('SHA256').HMAC_SHA256;

function EncryptionUtils() {

}

EncryptionUtils.createToken = function(contentString, hashKey) {
    return HMAC_SHA256.MAC(hashKey, contentString);
}

EncryptionUtils.unobfuscateString = function(s) {
    if (s.length != 32) {
        return null;
    } else {
        var i, v;
        var key = new Array(33);
        key[32] = String.fromCharCode(0);

        for (i = 0; i < 32; ++i) {
            v = s.charCodeAt(i);
            if (v <= 112) {
                if (v <= 94) {
                    if (v <= 81) {
                        if (v <= 54) {
                            if (v <= 46) {
                                if (v <= 41) {
                                    if (v <= 33) {
                                        if (v <= 32) {
                                            if (v == 32) {
                                                key[i] = String.fromCharCode(102);
                                            }
                                        } else {
                                            key[i] = String.fromCharCode(136);
                                            if (v == 33) {
                                                key[i] = String.fromCharCode(118);
                                            }
                                        }
                                    } else {
                                        key[i] = String.fromCharCode(162);
                                        if (v <= 37) {
                                            if (v <= 35) {
                                                if (v <= 34) {
                                                    if (v == 34) {
                                                        key[i] = String.fromCharCode(114);
                                                    }
                                                } else {
                                                    key[i] = String.fromCharCode(54);
                                                    if (v == 35) {
                                                        key[i] = String.fromCharCode(72);
                                                    }
                                                }
                                            } else {
                                                key[i] = String.fromCharCode(218);
                                                if (v <= 36) {
                                                    if (v == 36) {
                                                        key[i] = String.fromCharCode(59);
                                                    }
                                                } else {
                                                    key[i] = String.fromCharCode(64);
                                                    if (v == 37) {
                                                        key[i] = String.fromCharCode(87);
                                                    }
                                                }
                                            }
                                        } else {
                                            key[i] = String.fromCharCode(48);
                                            if (v <= 38) {
                                                if (v == 38) {
                                                    key[i] = String.fromCharCode(86);
                                                }
                                            } else {
                                                key[i] = String.fromCharCode(145);
                                                if (v <= 40) {
                                                    if (v <= 39) {
                                                        if (v == 39) {
                                                            key[i] = String.fromCharCode(109);
                                                        }
                                                    } else {
                                                        key[i] = String.fromCharCode(140);
                                                        if (v == 40) {
                                                            key[i] = String.fromCharCode(73);
                                                        }
                                                    }
                                                } else {
                                                    key[i] = String.fromCharCode(216);
                                                    if (v == 41) {
                                                        key[i] = String.fromCharCode(71);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    key[i] = String.fromCharCode(179);
                                    if (v <= 42) {
                                        if (v == 42) {
                                            key[i] = String.fromCharCode(43);
                                        }
                                    } else {
                                        key[i] = String.fromCharCode(227);
                                        if (v <= 44) {
                                            if (v <= 43) {
                                                if (v == 43) {
                                                    key[i] = String.fromCharCode(70);
                                                }
                                            } else {
                                                key[i] = String.fromCharCode(2);
                                                if (v == 44) {
                                                    key[i] = String.fromCharCode(96);
                                                }
                                            }
                                        } else {
                                            key[i] = String.fromCharCode(146);
                                            if (v <= 45) {
                                                if (v == 45) {
                                                    key[i] = String.fromCharCode(90);
                                                }
                                            } else {
                                                key[i] = String.fromCharCode(219);
                                                if (v == 46) {
                                                    key[i] = String.fromCharCode(122);
                                                }
                                            }
                                        }
                                    }
                                }
                            } else {
                                key[i] = String.fromCharCode(115);
                                if (v <= 53) {
                                    if (v <= 49) {
                                        if (v <= 48) {
                                            if (v <= 47) {
                                                if (v == 47) {
                                                    key[i] = String.fromCharCode(107);
                                                }
                                            } else {
                                                key[i] = String.fromCharCode(67);
                                                if (v == 48) {
                                                    key[i] = String.fromCharCode(69);
                                                }
                                            }
                                        } else {
                                            key[i] = String.fromCharCode(160);
                                            if (v == 49) {
                                                key[i] = String.fromCharCode(110);
                                            }
                                        }
                                    } else {
                                        key[i] = String.fromCharCode(13);
                                        if (v <= 52) {
                                            if (v <= 51) {
                                                if (v <= 50) {
                                                    if (v == 50) {
                                                        key[i] = String.fromCharCode(47);
                                                    }
                                                } else {
                                                    key[i] = String.fromCharCode(77);
                                                    if (v == 51) {
                                                        key[i] = String.fromCharCode(57);
                                                    }
                                                }
                                            } else {
                                                key[i] = String.fromCharCode(185);
                                                if (v == 52) {
                                                    key[i] = String.fromCharCode(45);
                                                }
                                            }
                                        } else {
                                            key[i] = String.fromCharCode(76);
                                            if (v == 53) {
                                                key[i] = String.fromCharCode(50);
                                            }
                                        }
                                    }
                                } else {
                                    key[i] = String.fromCharCode(57);
                                    if (v == 54) {
                                        key[i] = String.fromCharCode(124);
                                    }
                                }
                            }
                        } else {
                            key[i] = String.fromCharCode(169);
                            if (v <= 67) {
                                if (v <= 64) {
                                    if (v <= 55) {
                                        if (v == 55) {
                                            key[i] = String.fromCharCode(37);
                                        }
                                    } else {
                                        key[i] = String.fromCharCode(41);
                                        if (v <= 56) {
                                            if (v == 56) {
                                                key[i] = String.fromCharCode(92);
                                            }
                                        } else {
                                            key[i] = String.fromCharCode(57);
                                            if (v <= 58) {
                                                if (v <= 57) {
                                                    if (v == 57) {
                                                        key[i] = String.fromCharCode(83);
                                                    }
                                                } else {
                                                    key[i] = String.fromCharCode(83);
                                                    if (v == 58) {
                                                        key[i] = String.fromCharCode(125);
                                                    }
                                                }
                                            } else {
                                                key[i] = String.fromCharCode(84);
                                                if (v <= 61) {
                                                    if (v <= 59) {
                                                        if (v == 59) {
                                                            key[i] = String.fromCharCode(84);
                                                        }
                                                    } else {
                                                        key[i] = String.fromCharCode(213);
                                                        if (v <= 60) {
                                                            if (v == 60) {
                                                                key[i] = String.fromCharCode(116);
                                                            }
                                                        } else {
                                                            key[i] = String.fromCharCode(210);
                                                            if (v == 61) {
                                                                key[i] = String.fromCharCode(121);
                                                            }
                                                        }
                                                    }
                                                } else {
                                                    key[i] = String.fromCharCode(176);
                                                    if (v <= 62) {
                                                        if (v == 62) {
                                                            key[i] = String.fromCharCode(100);
                                                        }
                                                    } else {
                                                        key[i] = String.fromCharCode(95);
                                                        if (v <= 63) {
                                                            if (v == 63) {
                                                                key[i] = String.fromCharCode(108);
                                                            }
                                                        } else {
                                                            key[i] = String.fromCharCode(85);
                                                            if (v == 64) {
                                                                key[i] = String.fromCharCode(32);
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    key[i] = String.fromCharCode(125);
                                    if (v <= 66) {
                                        if (v <= 65) {
                                            if (v == 65) {
                                                key[i] = String.fromCharCode(111);
                                            }
                                        } else {
                                            key[i] = String.fromCharCode(150);
                                            if (v == 66) {
                                                key[i] = String.fromCharCode(103);
                                            }
                                        }
                                    } else {
                                        key[i] = String.fromCharCode(184);
                                        if (v == 67) {
                                            key[i] = String.fromCharCode(91);
                                        }
                                    }
                                }
                            } else {
                                key[i] = String.fromCharCode(26);
                                if (v <= 77) {
                                    if (v <= 74) {
                                        if (v <= 70) {
                                            if (v <= 69) {
                                                if (v <= 68) {
                                                    if (v == 68) {
                                                        key[i] = String.fromCharCode(97);
                                                    }
                                                } else {
                                                    key[i] = String.fromCharCode(24);
                                                    if (v == 69) {
                                                        key[i] = String.fromCharCode(115);
                                                    }
                                                }
                                            } else {
                                                key[i] = String.fromCharCode(142);
                                                if (v == 70) {
                                                    key[i] = String.fromCharCode(89);
                                                }
                                            }
                                        } else {
                                            key[i] = String.fromCharCode(104);
                                            if (v <= 72) {
                                                if (v <= 71) {
                                                    if (v == 71) {
                                                        key[i] = String.fromCharCode(88);
                                                    }
                                                } else {
                                                    key[i] = String.fromCharCode(15);
                                                    if (v == 72) {
                                                        key[i] = String.fromCharCode(41);
                                                    }
                                                }
                                            } else {
                                                key[i] = String.fromCharCode(38);
                                                if (v <= 73) {
                                                    if (v == 73) {
                                                        key[i] = String.fromCharCode(117);
                                                    }
                                                } else {
                                                    key[i] = String.fromCharCode(198);
                                                    if (v == 74) {
                                                        key[i] = String.fromCharCode(52);
                                                    }
                                                }
                                            }
                                        }
                                    } else {
                                        key[i] = String.fromCharCode(213);
                                        if (v <= String.fromCharCode(76)) {
                                            if (v <= 75) {
                                                if (v == 75) {
                                                    key[i] = String.fromCharCode(62);
                                                }
                                            } else {
                                                key[i] = String.fromCharCode(224);
                                                if (v == 76) {
                                                    key[i] = String.fromCharCode(85);
                                                }
                                            }
                                        } else {
                                            key[i] = String.fromCharCode(96);
                                            if (v == 77) {
                                                key[i] = String.fromCharCode(39);
                                            }
                                        }
                                    }
                                } else {
                                    key[i] = String.fromCharCode(0);
                                    if (v <= 80) {
                                        if (v <= 78) {
                                            if (v == 78) {
                                                key[i] = String.fromCharCode(81);
                                            }
                                        } else {
                                            key[i] = String.fromCharCode(32);
                                            if (v <= 79) {
                                                if (v == 79) {
                                                    key[i] = String.fromCharCode(63);
                                                }
                                            } else {
                                                key[i] = String.fromCharCode(109);
                                                if (v == 80) {
                                                    key[i] = String.fromCharCode(35);
                                                }
                                            }
                                        }
                                    } else {
                                        key[i] = String.fromCharCode(247);
                                        if (v == 81) {
                                            key[i] = String.fromCharCode(79);
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        key[i] = String.fromCharCode(141);
                        if (v <= 87) {
                            if (v <= 84) {
                                if (v <= 82) {
                                    if (v == 82) {
                                        key[i] = String.fromCharCode(65);
                                    }
                                } else {
                                    key[i] = String.fromCharCode(131);
                                    if (v <= 83) {
                                        if (v == 83) {
                                            key[i] = String.fromCharCode(123);
                                        }
                                    } else {
                                        key[i] = String.fromCharCode(219);
                                        if (v == 84) {
                                            key[i] = String.fromCharCode(58);
                                        }
                                    }
                                }
                            } else {
                                key[i] = String.fromCharCode(76);
                                if (v <= 86) {
                                    if (v <= 85) {
                                        if (v == 85) {
                                            key[i] = String.fromCharCode(51);
                                        }
                                    } else {
                                        key[i] = String.fromCharCode(123);
                                        if (v == 86) {
                                            key[i] = String.fromCharCode(34);
                                        }
                                    }
                                } else {
                                    key[i] = String.fromCharCode(10);
                                    if (v == 87) {
                                        key[i] = String.fromCharCode(77);
                                    }
                                }
                            }
                        } else {
                            key[i] = String.fromCharCode(233);
                            if (v <= 91) {
                                if (v <= 89) {
                                    if (v <= 88) {
                                        if (v == 88) {
                                            key[i] = String.fromCharCode(66);
                                        }
                                    } else {
                                        key[i] = String.fromCharCode(152);
                                        if (v == 89) {
                                            key[i] = String.fromCharCode(105);
                                        }
                                    }
                                } else {
                                    key[i] = String.fromCharCode(242);
                                    if (v <= 90) {
                                        if (v == 90) {
                                            key[i] = String.fromCharCode(61);
                                        }
                                    } else {
                                        key[i] = String.fromCharCode(70);
                                        if (v == 91) {
                                            key[i] = String.fromCharCode(113);
                                        }
                                    }
                                }
                            } else {
                                key[i] = String.fromCharCode(86);
                                if (v <= 92) {
                                    if (v == 92) {
                                        key[i] = String.fromCharCode(80);
                                    }
                                } else {
                                    key[i] = String.fromCharCode(166);
                                    if (v <= 93) {
                                        if (v == 93) {
                                            key[i] = String.fromCharCode(104);
                                        }
                                    } else {
                                        key[i] = String.fromCharCode(189);
                                        if (v == 94) {
                                            key[i] = String.fromCharCode(40);
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    key[i] = String.fromCharCode(223);
                    if (v <= 99) {
                        if (v <= 98) {
                            if (v <= 97) {
                                if (v <= 96) {
                                    if (v <= 95) {
                                        if (v == 95) {
                                            key[i] = String.fromCharCode(48);
                                        }
                                    } else {
                                        key[i] = String.fromCharCode(45);
                                        if (v == 96) {
                                            key[i] = String.fromCharCode(120);
                                        }
                                    }
                                } else {
                                    key[i] = String.fromCharCode(180);
                                    if (v == 97) {
                                        key[i] = String.fromCharCode(99);
                                    }
                                }
                            } else {
                                key[i] = String.fromCharCode(3);
                                if (v == 98) {
                                    key[i] = String.fromCharCode(55);
                                }
                            }
                        } else {
                            key[i] = String.fromCharCode(62);
                            if (v == 99) {
                                key[i] = String.fromCharCode(106);
                            }
                        }
                    } else {
                        key[i] = String.fromCharCode(157);
                        if (v <= 103) {
                            if (v <= 100) {
                                if (v == 100) {
                                    key[i] = String.fromCharCode(95);
                                }
                            } else {
                                key[i] = String.fromCharCode(187);
                                if (v <= 101) {
                                    if (v == 101) {
                                        key[i] = String.fromCharCode(74);
                                    }
                                } else {
                                    key[i] = String.fromCharCode(33);
                                    if (v <= 102) {
                                        if (v == 102) {
                                            key[i] = String.fromCharCode(54);
                                        }
                                    } else {
                                        key[i] = String.fromCharCode(240);
                                        if (v == 103) {
                                            key[i] = String.fromCharCode(38);
                                        }
                                    }
                                }
                            }
                        } else {
                            key[i] = String.fromCharCode(167);
                            if (v <= 107) {
                                if (v <= 106) {
                                    if (v <= 105) {
                                        if (v <= 104) {
                                            if (v == 104) {
                                                key[i] = String.fromCharCode(76);
                                            }
                                        } else {
                                            key[i] = String.fromCharCode(240);
                                            if (v == 105) {
                                                key[i] = String.fromCharCode(82);
                                            }
                                        }
                                    } else {
                                        key[i] = String.fromCharCode(250);
                                        if (v == 106) {
                                            key[i] = String.fromCharCode(44);
                                        }
                                    }
                                } else {
                                    key[i] = String.fromCharCode(26);
                                    if (v == 107) {
                                        key[i] = String.fromCharCode(119);
                                    }
                                }
                            } else {
                                key[i] = String.fromCharCode(2);
                                if (v <= 110) {
                                    if (v <= 108) {
                                        if (v == 108) {
                                            key[i] = String.fromCharCode(101);
                                        }
                                    } else {
                                        key[i] = String.fromCharCode(88);
                                        if (v <= 109) {
                                            if (v == 109) {
                                                key[i] = String.fromCharCode(98);
                                            }
                                        } else {
                                            key[i] = String.fromCharCode(116);
                                            if (v == 110) {
                                                key[i] = String.fromCharCode(78);
                                            }
                                        }
                                    }
                                } else {
                                    key[i] = String.fromCharCode(42);
                                    if (v <= 111) {
                                        if (v == 111) {
                                            key[i] = String.fromCharCode(68);
                                        }
                                    } else {
                                        key[i] = String.fromCharCode(128);
                                        if (v == 112) {
                                            key[i] = String.fromCharCode(60);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                key[i] = String.fromCharCode(211);
                if (v <= 120) {
                    if (v <= 115) {
                        if (v <= 113) {
                            if (v == 113) {
                                key[i] = String.fromCharCode(126);
                            }
                        } else {
                            key[i] = String.fromCharCode(7);
                            if (v <= 114) {
                                if (v == 114) {
                                    key[i] = String.fromCharCode(46);
                                }
                            } else {
                                key[i] = String.fromCharCode(131);
                                if (v == 115) {
                                    key[i] = String.fromCharCode(112);
                                }
                            }
                        }
                    } else {
                        key[i] = String.fromCharCode(185);
                        if (v <= 117) {
                            if (v <= 116) {
                                if (v == 116) {
                                    key[i] = String.fromCharCode(33);
                                }
                            } else {
                                key[i] = String.fromCharCode(146);
                                if (v == 117) {
                                    key[i] = String.fromCharCode(42);
                                }
                            }
                        } else {
                            key[i] = String.fromCharCode(89);
                            if (v <= 119) {
                                if (v <= 118) {
                                    if (v == 118) {
                                        key[i] = String.fromCharCode(93);
                                    }
                                } else {
                                    key[i] = String.fromCharCode(213);
                                    if (v == 119) {
                                        key[i] = String.fromCharCode(94);
                                    }
                                }
                            } else {
                                key[i] = String.fromCharCode(217);
                                if (v == 120) {
                                    key[i] = String.fromCharCode(49);
                                }
                            }
                        }
                    }
                } else {
                    key[i] = String.fromCharCode(22);
                    if (v <= 122) {
                        if (v <= 121) {
                            if (v == 121) {
                                key[i] = String.fromCharCode(64);
                            }
                        } else {
                            key[i] = String.fromCharCode(108);
                            if (v == 122) {
                                key[i] = String.fromCharCode(36);
                            }
                        }
                    } else {
                        key[i] = String.fromCharCode(41);
                        if (v <= 123) {
                            if (v == 123) {
                                key[i] = String.fromCharCode(67);
                            }
                        } else {
                            key[i] = String.fromCharCode(161);
                            if (v <= 124) {
                                if (v == 124) {
                                    key[i] = String.fromCharCode(75);
                                }
                            } else {
                                key[i] = String.fromCharCode(14);
                                if (v <= 125) {
                                    if (v == 125) {
                                        key[i] = String.fromCharCode(56);
                                    }
                                } else {
                                    key[i] = String.fromCharCode(204);
                                    if (v == 126) {
                                        key[i] = String.fromCharCode(53);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        var result = "";
        for (var index = 0; index < 32; index++) {
            result += key[index];
        }
        return result;
    }
}

module.exports = EncryptionUtils;