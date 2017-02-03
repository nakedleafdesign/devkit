// import UaClass from 'components/uaClass.js';
// UaClass();
(function () {
var $element = $('html');
var _ua = (function (u) {
    return {
        Tablet: (u.indexOf("windows") != -1 && u.indexOf("touch") != -1)
            || u.indexOf("ipad") != -1
            || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1)
            || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1)
            || u.indexOf("kindle") != -1
            || u.indexOf("silk") != -1
            || u.indexOf("playbook") != -1,
        Mobile: (u.indexOf("windows") != -1 && u.indexOf("phone") != -1)
            || u.indexOf("iphone") != -1
            || u.indexOf("ipod") != -1
            || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
            || (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1)
            || u.indexOf("blackberry") != -1
    };
})(window.navigator.userAgent.toLowerCase());
if (_ua.Mobile) {
    $.cookie === 'mobile' ? $.removeCookie('uaCookie') : $.cookie('uaCookie', 'mobile');
    $element.addClass('mobile');
}
else if (_ua.Tablet) {
    $.cookie === 'tablet' ? $.removeCookie('uaCookie') : $.cookie('uaCookie', 'tablet');
    $element.addClass('tablet');
}
else {
    $.cookie === 'desktop' ? $.removeCookie('uaCookie') : $.cookie('uaCookie', 'desktop');
    $element.addClass('desktop');
}
})();
//window load時
//-----------------------------------
$(window).load(function () {
});
//リサイズされたら
//-----------------------------------
$(window).resize(function () {
});
//document ready時
//-----------------------------------
$(document).ready(function () {
});
