# cocos App Template
 注：cocos 1.9.2。
## [Cocos AppTemplate 简介](#1)
* [cocos creator 创建一个空项目](#1.1)  ✅
* [Dialog](#1.2)
    * [Dialog使用以及回调](#1.2.1)
    * [DialogManager介绍](#1.2.2)
    * [Dialog使用原则](#1.2.3)
* [Base](#1.3)
    * [EventDispatcher 使用说明](#1.3.1)✅
    * [Network](#1.3.2)✅
    * [NativeCaller](#1.3.3)✅
    * [Utilis](#1.3.4)
    * [i18n 多语言](#1.3.5)✅
    * [Storage 本地存储](#1.3.6)✅
* [Framework](#1.4)
    * [Ads 广告大集合](#1.4.1)
    * [IAP 内购](#1.4.2)
    * [Autopilot AB测试](#1.4.3)
    * [SessionManager](#1.4.4)
    * [Analytics 统计](#1.4.5)✅
    * [Platform](#1.4.6)
* [CommonUI](#1.5)
    * [Alert 标准小弹窗](#1.5.1)
    * [UIUtility 动画集合](#1.4.6)
* [创建自己的游戏需要做什么](#1.6)

---
## [Android](#2)
* [Android init](#2.1)
    * [Android 创建时 cocos的选择](#2.1.1)
    * [build.gradle 修改](#2.1.2)

* [Android Framework](#2.2)
    * [接入公司 Framework, ads等库](#2.2.1)
    * [实现 js 中platform中的内容](#2.2.2)
        * getConfig
        * mediasource
        * 
    * [session 通知js](#2.2.3)
    * [GDPR](#2.2.4)
    * [fullscreen ad](#2.2.5)
    * [reward video ](#2.2.6)
    * [express ad](#2.2.7)
    * [Android 添加 Autopilot](#2.2.8)
    * [Android 添加 notification](#2.2.9)
    * [IAP](#2.2.10)

---
## [IOS](#2)
* [IOS init](#2.1)
    * [IOS 创建时 cocos的选择](#2.1.1)
* [IOS Framework](#2.2)
    * [接入公司 Framework, ads等库](#2.2.1)
    * [实现 js 中platform中的内容](#2.2.2)
        * getConfig
        * mediasource
    * [session 通知js](#2.2.3)
    * [GDPR](#2.2.4)
    * [fullscreen ad](#2.2.5)
    * [reward video ](#2.2.6)
    * [express ad](#2.2.7)
    * [Android 添加 Autopilot](#2.2.8)
    * [Android 添加 notification](#2.2.9)
    * [IAP](#2.2.10)

---

<h2 id = 1>Cocos AppTemplate 简介</h2>
本章将介绍coco AppTemplate中的一些类的使用方法，并在介绍结尾处说明在创建好自己的游戏后需要做哪些操作 
<h3 id = 1.1>1.1cocos creator 创建一个空项目</h3>
<h3>1.2 Dialog</h3>
<h5>1.2.1 Dialog使用以及回调</h5>
<h5>1.2.2 DialogManager介绍</h5>
<h5>1.2.3 Dialog使用原则</h5>
<h3 id = 1.3>1.3 Base</h3>
<h5 id = 1.3.1>1.3.1 EventDispatcher 使用说明</h5>
<h5 id = 1.3.2>1.3.2 Network</h5>
<h5 id = 1.3.3>1.3.3 NativeCaller</h5>
<h5 id = 1.3.4>1.3.4 Utilis</h5>
<h5 id = 1.3.5>1.3.5 i18n 多语言</h5>
<h5 id = 1.3.6>1.3.6 Storage 本地存储</h5>

<h3 id = 1.4 >1.4 Framework</h3>
<h5 id = 1.4.1>1.4.1 Ads 广告大集合</h5>
<h5 id = 1.4.2>1.4.2 IAP 内购</h5>
<h5 id = 1.4.3>1.4.3 Autopilot AB测试</h5>
<h5 id = 1.4.4>1.4.4 SessionManager</h5>
<h5 id = 1.4.5>1.4.5 Analytics 统计</h5>
<h5 id = 1.4.6>1.4.6 Platform</h5>

<h3 id = 1.5>1.5 CommonUI</h3>
<h5 id = 1.5.1>1.5.1 Alert 标准小弹窗</h5>
<h5 id = 1.5.2>1.5.2 UIUtility 动画集合</h5>

<h3 id = 1.6>1.6创建自己的游戏需要做什么</h3>


<h2 id = 2 >Android</h2>
<h3 id = 2.1 >2.1 Android init </h3>


