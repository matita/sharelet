(function () {

  var params = getUrlParams(location.search);

  var link = {
    url: params.url || location.href,
    title: params.title || params.url || document.title || ''
  };

  var intents = [
    { id: 'md', name: 'Copy Markdown Link', icon: '🔗', tpl: 'javascript:copy(\'[{title}]({url})\')' },
    { id: 'fl', name: 'Copy Formatted Link', icon: '🔗', tpl: 'javascript:copy(\'&lt;a href=&quot;{url}&quot;&gt;{title}&lt;/a&gt;\')' },
    { id: 'fb', name: 'Facebook', icon: 'images/facebook.svg', tpl: 'http://www.facebook.com/sharer.php?u={url}' },
    { id: 'tw', name: 'Twitter', icon: 'images/twitter.svg', tpl: 'https://twitter.com/intent/tweet?url={url}&text={title}' },
    { id: 'wa', name: 'Whatsapp', icon: 'images/whatsapp.svg', tpl: 'https://web.whatsapp.com/send?phone&text={title}+{url}&source&data' },
    { id: 'tg', name: 'Telegram', icon: 'images/telegram.svg', tpl: 'https://telegram.me/share/url?url={url}&text=' },
    { id: 'te', name: 'Teams', icon: 'images/teams.svg', tpl: 'https://teams.microsoft.com/share?href={url}' },
    { id: 'rd', name: 'Reddit', icon: 'images/reddit.svg', tpl: 'http://www.reddit.com/submit?url={url}&title={title}' },
    { id: 'pn', name: 'Pinterest', icon: 'images/pinterest.svg', tpl: 'http://www.pinterest.com/pin/create/button/?url={url}&description={title}' },
    { id: 'Pk', name: 'Pocket', icon: 'images/pocket.svg', tpl: 'http://getpocket.com/edit?url={url}' },
    { id: 'bf', name: 'Buffer', icon: 'images/buffer2.svg', tpl: 'http://bufferapp.com/add?url={url}&text={title}' },
    { id: 'li', name: 'LinkedIn', icon: 'images/linkedin.svg', tpl: 'http://www.linkedin.com/shareArticle?url={url}&title={title}&summary=&source=' },
    { id: 'em', name: 'Email', icon: 'images/email.svg', tpl: 'mailto:?subject={title}&body={url}' }
  ]

  document.getElementById('main').innerHTML = [
    linkView(link),
    (!!params.url ? '' : bookmarklet()),
    sharer({ link: link, intents: intents })
  ].join('');

  var bookmarkletLink = document.querySelector('.bookmarklet');
  if (bookmarkletLink)
    bookmarkletLink.onclick = preventClickBookmarklet;

  /** views **/

  function linkView(props) {
    return (
      '<div class="link">' +
        '<div class="link-data">' +
          '<h2 class="link-title">' + props.title + '</h2>' +
          '<p class="link-url">' + props.url + '</p>' +
        '</div>' +
        '<div class="link-qr">' +
          qr(props.url) +
        '</div>' +
      '</div>'
    );
  }

  function bookmarklet() {
    return (
      '<div class="bookmarklet-wrapper">' +
        '<a class="bookmarklet" href="javascript:(function() { window.open(\'https://matita.github.io/sharelet/?v=0.1&url=\' + encodeURIComponent(window.location.href) + \'&title=\' + encodeURIComponent(document.title), \'\', \'width=865,height=525\'); })()">≺ Sharelet!</a>' +
        '<span class="bookmarklet-desc">Drag it to the bookmarks bar and click it on any web page</span>' +
      '</div>'
    );
  }

  function sharer(props) {
    return (
      '<div class="sharer">' +
        props.intents.map(shareBtn.bind(null, props.link)).join('') +
      '</div>'
    );
  }

  function shareBtn(link, intent) {
    var url = tmpl(intent.tpl, link);

    return (
      '<a class="share-btn share-btn-' + intent.id + '" href="' + url + '" title="' + intent.name + '">' +
        (/\.\w{3}$/.test(intent.icon)
          ? '<img class="share-btn-img" src="' + intent.icon + '">'
          : '<span class="share-btn-icon">' + intent.icon + '</span>'
        ) +
      '</a>'
    );
  }

  function qr(text) {
    return text
      ? '<img src="https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=' + encodeURIComponent(text) + '" width="200" height="200">'
      : '';
  }

  function tmpl(text, params) {
    return text.replace(/\{(\w+)\}/g, function (match, key) {
      return encodeURIComponent(params[key]);
    });
  }

  function preventClickBookmarklet(e) {
    e.preventDefault();
    var desc = document.querySelector('.bookmarklet-desc');
    desc.classList.add('shake');
    setTimeout(function () {
      desc.classList.remove('shake');
    }, 1200);
  }

  function getUrlParams(query) {
    return query.replace(/^\?/, '')
      .split('&')
      .map(function(e) { return e.split('='); })
      .reduce(function(p, e) { p[decodeURIComponent(e[0])] = decodeURIComponent(e[1]); return p; }, {});
  }

  function copyToClipboard(str) {
    var el = document.createElement("div");
    el.contentEditable = true;
    el.innerHTML = str;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    var range;
    var selection;
    if (document.body.createTextRange) {
      range = document.body.createTextRange();
      range.moveToElement(el);
      range.select();
    } else if (window.getSelection) {
      selection = window.getSelection();
      range = document.createRange();
      range.selectNodeContents(el);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    document.body.removeChild(el);
  }

  window.copy = function(text) {
    copyToClipboard(text);
    setTimeout(() => window.close(),1000)
  };

})();
