var liveGameWindow = null;
var HGameWindow = null;
var EGameWindow = null;
var BGameWindow = null;
var MGameWindow = null;
var KenoWindow = null;
var ILottoWindow = null;
var Mark6Window = null;
var HappyLottoWindow = null;
var M4DWindow = null;
var V4DWindow = null;
var RGameWindow = null;
var tryPlayWindow = null;
var WGameWindow = null;
var ABetGameWindow = null;
var AGameWindow = null;
var BEGameWindow = null;
var PGGameWindow = null;
var PTGameWindow = null;
var MGameEgameWindow = null;
var QTGameWindow = null;
var SAEGameWindowname = null;
var SAGameWindow = null;
var TGPGameWindow = null;
var GDGameWindow = null;
var GGGameWindow = null;

function closeGamesWindow() {

    if (navigator.userAgent.indexOf("Chrome") != -1 || navigator.userAgent.indexOf("Firefox") != -1) {
        if (BEGameWindow) {
            BEGameWindow.close();
        }
        if (PGGameWindow) {
            PGGameWindow.close();
        }
        if (PTGameWindow) {
            PTGameWindow.close();
        }

        if (QTGameWindow) {
            QTGameWindow.close();
        }

        if (tryPlayWindow) {
            tryPlayWindow.close();
        }
        if (WGameWindow) {
            WGameWindow.close();
        }
        if (ABetGameWindow) {
            ABetGameWindow.close();
        }
        if (AGameWindow) {
            AGameWindow.close();
        }
        if (MGameEgameWindow) {
            MGameEgameWindow.close();
        }

        if (liveGameWindow) {
            liveGameWindow.close();
        }
        if (HGameWindow) {
            HGameWindow.close();
        }
        if (EGameWindow) {
           EGameWindow.close();
        }
        if (BGameWindow) {
            BGameWindow.close();
        }
        if (MGameWindow) {
            MGameWindow.close();
        }
        if (KenoWindow) {
            KenoWindow.close();
        }
        if (ILottoWindow) {
            ILottoWindow.close();
        }
        if (Mark6Window) {
            Mark6Window.close();
        }
        if (HappyLottoWindow) {
            HappyLottoWindow.close();
        }
        if (M4DWindow) {
            M4DWindow.close();
        }
        if (V4DWindow) {
            V4DWindow.close();
        }
        if (RGameWindow) {
            RGameWindow.close();
        }
        if (SAEGameWindowname) {
            SAEGameWindowname.close();
        }
        if (SAGameWindow) {
            SAGameWindow.close();
        }
        if (TGPGameWindow) {
            TGPGameWindow.close();
        }
        if (GDGameWindow) {
            GDGameWindow.close();
        }
        if (GGGameWindow) {
            GGGameWindow.close();
        }
    }
    else {

        if (BEGameWindow && BEGameWindow.open) {
            BEGameWindow.close();
        }
        if (PGGameWindow && PGGameWindow.open) {
            PGGameWindow.close();
        }
        if (PTGameWindow && PTGameWindow.open) {
            PTGameWindow.close();
        }

        if (QTGameWindow && QTGameWindow.open) {
            QTGameWindow.close();
        }

        if (tryPlayWindow && tryPlayWindow.open) {
            tryPlayWindow.close();
        }
        if (WGameWindow && WGameWindow.open) {
            WGameWindow.close();
        }
        if (ABetGameWindow && ABetGameWindow.open) {
            ABetGameWindow.close();
        }
        if (AGameWindow && AGameWindow.open) {
            AGameWindow.close();
        }
        if (MGameEgameWindow && MGameEgameWindow.open) {
            MGameEgameWindow.close();
        }

        if (liveGameWindow && liveGameWindow.open) {
            liveGameWindow.close();
        }
        if (HGameWindow && HGameWindow.open) {
            HGameWindow.close();
        }

        if (EGameWindow && EGameWindow.open) {
           EGameWindow.close();
        }
        if (BGameWindow && BGameWindow.open) {
            BGameWindow.close();
        }
        if (MGameWindow && MGameWindow.open) {
            MGameWindow.close();
        }
        if (KenoWindow && KenoWindow.open) {
            KenoWindow.close();
        }
        if (ILottoWindow && ILottoWindow.open) {
            ILottoWindow.close();
        }
        if (Mark6Window && Mark6Window.open) {
            Mark6Window.close();
        }
        if (HappyLottoWindow && HappyLottoWindow.open) {
            HappyLottoWindow.close();
        }
        if (M4DWindow && M4DWindow.open) {
            M4DWindow.close();
        }
        if (V4DWindow && V4DWindow.open) {
            V4DWindow.close();
        }
        if (RGameWindow && RGameWindow.open) {
            RGameWindow.close();
        }
        if (SAEGameWindowname && SAEGameWindowname.open) {
            SAEGameWindowname.close();
        }
        if (SAGameWindow && SAGameWindow.open) {
            SAGameWindow.close();
        }
        if (TGPGameWindow && TGPGameWindow.open) {
            TGPGameWindow.close();
        }
        if (GDGameWindow && GDGameWindow.open) {
            GDGameWindow.close();
        }
        if (GGGameWindow && GGGameWindow.open) {
            GGGameWindow.close();
        }
    }
    return true;
}



//var cs_timeout = 0;
////BEGIN LivePerson Monitor
//window.lpTag = window.lpTag || {}; if (typeof window.lpTag._tagCount === 'undefined') { window.lpTag = { site: '86507088' || '', section: lpTag.section || '', autoStart: lpTag.autoStart === false ? false : true, ovr: lpTag.ovr || {}, _v: '1.5.1', _tagCount: 1, protocol: location.protocol, events: { bind: function (app, ev, fn) { lpTag.defer(function () { lpTag.events.bind(app, ev, fn); }, 0); }, trigger: function (app, ev, json) { lpTag.defer(function () { lpTag.events.trigger(app, ev, json); }, 1); } }, defer: function (fn, fnType) { if (fnType == 0) { this._defB = this._defB || []; this._defB.push(fn); } else if (fnType == 1) { this._defT = this._defT || []; this._defT.push(fn); } else { this._defL = this._defL || []; this._defL.push(fn); } }, load: function (src, chr, id) { var t = this; setTimeout(function () { t._load(src, chr, id); }, 0); }, _load: function (src, chr, id) { var url = src; if (!src) { url = this.protocol + '//' + ((this.ovr && this.ovr.domain) ? this.ovr.domain : 'lptag.liveperson.net') + '/tag/tag.js?site=' + this.site; } var s = document.createElement('script'); s.setAttribute('charset', chr ? chr : 'UTF-8'); if (id) { s.setAttribute('id', id); } s.setAttribute('src', url); document.getElementsByTagName('head').item(0).appendChild(s); }, init: function () { this._timing = this._timing || {}; this._timing.start = (new Date()).getTime(); var that = this; if (window.attachEvent) { window.attachEvent('onload', function () { that._domReady('domReady'); }); } else { window.addEventListener('DOMContentLoaded', function () { that._domReady('contReady'); }, false); window.addEventListener('load', function () { that._domReady('domReady'); }, false); } if (typeof (window._lptStop) == 'undefined') { this.load(); } }, start: function () { this.autoStart = true; }, _domReady: function (n) { if (!this.isDom) { this.isDom = true; this.events.trigger('LPT', 'DOM_READY', { t: n }); } this._timing[n] = (new Date()).getTime(); }, vars: lpTag.vars || [], dbs: lpTag.dbs || [], ctn: lpTag.ctn || [], sdes: lpTag.sdes || [], ev: lpTag.ev || [] }; lpTag.init(); } else { window.lpTag._tagCount += 1; }
////END LivePerson Monitor
function cs() {
//    //var cs = window.open("https://server.iad.liveperson.net/hc/88694637/?cmd=file&file=visitorWantsToChat&site=88694637&&SESSIONVAR!skill=cs-zh_cn", "livechat", "height=430, width=550, toolbar= no,directions=no,alwaysRaised=yes,hotkeys =yes, menubar=no, scrollbars=no, resizable=no, location=no, status=no,top=100,left=300");
//    //var cs = window.open("https://server.iad.liveperson.net/hc/86507088/?cmd=file&file=visitorWantsToChat&site=86507088&SV!skill=ClubS Skill", "livechat", "height=600, width=800, toolbar= no,directions=no,alwaysRaised=yes,hotkeys =yes, menubar=no, scrollbars=no, resizable=no, location=no, status=no,top=100,left=300");
//    //cs.focus();    
//    if ($("#LP_DIV_1438269812450 DIV")[0] != null) {
//        $("#LP_DIV_1438269812450 DIV")[0].click();
//    }
//    else {
//        if (cs_timeout < 15) {
//            setTimeout(cs, 2000);
//            cs_timeout++;
//        }
//    }

    var cs = window.open("https://chatserver.comm100.com/chatwindow.aspx?planId=441&visitType=1&byHref=1&partnerid=-1&siteId=217937", "livechat", "height=740, width=600, toolbar= no,directions=no,alwaysRaised=yes,hotkeys =yes, menubar=no, scrollbars=no, resizable=no, location=no, status=no,top=100,left=300");
    cs.focus();
}

function notice() {
    var nt = window.open("../Notice.aspx", "notice", "height=768, width=1040, toolbar= no,directions=no,alwaysRaised=yes,hotkeys =yes, menubar=no, scrollbars=yes, resizable=no, location=no, status=no,top=100,left=300");
    nt.focus();
}

/* bookmark */
function addBookmark(title, url, msg, msgFF) {
    try {
        window.external.AddFavorite(url, title);
    } catch (e) {
        if (window.sidebar) { // Firefox
            //window.sidebar.addPanel(title, url, ""); //Dont use until the FF bug is fixed
            alert(msgFF);
        }
        else if (window.opera && window.print) { // Opera
            var elem = document.createElement('a');
            elem.setAttribute('href', url);
            elem.setAttribute('title', title);
            elem.setAttribute('rel', 'sidebar');
            elem.click();
        }
        else { alert(msg); }
    }
}
function setHomepage(obj, url, msg, msgFF) {
    try {
        obj.style.behavior = 'url(#default#homepage)';
        obj.setHomePage(url);
    } catch (e) {
        if (window.sidebar) {
            if (window.netscape) {
                try {
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                } catch (e) { alert(msg); }
            }
            var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
            prefs.setCharPref('browser.startup.homepage', url);
        }
        else { alert(msg); }
    }
}