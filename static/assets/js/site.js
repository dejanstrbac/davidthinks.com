/*
 * Libraries
 */
var Cookies = {
  getItem: function (sKey) {
    if (!sKey) { return null; }
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  },
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
  },
  removeItem: function (sKey, sPath, sDomain) {
    if (!this.hasItem(sKey)) { return false; }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
    return true;
  },
  hasItem: function (sKey) {
    if (!sKey) { return false; }
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  },
  keys: function () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    return aKeys;
  }
};


/*
 * Site functions
 */
var DavidThinks = {
  redirectToLocale: function (locale, setCookie) {
    if (typeof setCookie === 'undefined')
      setCookie = false;
    if (setCookie)
      Cookies.setItem('locale', locale, Infinity, '/');
    window.location.href = '/' + locale + '/index.html';
  }
};


document.addEventListener('DOMContentLoaded', function() {
  // Changing the dropdown will automatically switch the language
  // and redirect to the cover page.
  var localeSelect = document.querySelectorAll('.locale-select select')[0],
      cookieLocaleValue = Cookies.getItem('locale');

  if (cookieLocaleValue && (cookieLocaleValue !== localeSelect.value)) {
    if (window.confirm(localeConfirmCaption)) {
      return DavidThinks.redirectToLocale(cookieLocaleValue);
    } else {
      Cookies.setItem('locale', cookieLocaleValue, Infinity, '/');
    }
  }

  localeSelect.addEventListener('change', function(ev) {
    DavidThinks.redirectToLocale(this.value, true);
  });

}, false);