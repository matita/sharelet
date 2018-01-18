(function () {

    var params = getUrlParams(location.search);

    var link = {
        url: params.url || location.href,
        title: params.title || (!params.url && document.title) || ''
    };

    var intents = [
        { id: 'fb', name: 'Facebook', icon: 'images/facebook.svg', tpl: 'http://www.facebook.com/sharer.php?u={url}' },
        { id: 'tw', name: 'Twitter', icon: 'images/twitter.svg', tpl: 'https://twitter.com/intent/tweet?url={url}&text={title}' },
        { id: 'gp', name: 'Google Plus', icon: 'images/google-plus.svg', tpl: 'https://plus.google.com/share?url={url}' },
        { id: 'rd', name: 'Reddit', icon: 'images/reddit.svg', tpl: 'http://www.reddit.com/submit?url={url}&title={title}' },
        { id: 'tg', name: 'Telegram', icon: 'images/telegram.svg', tpl: 'https://telegram.me/share/url?url={url}&text=' },
        { id: 'pn', name: 'Pinterest', icon: 'images/pinterest.svg', tpl: 'http://www.pinterest.com/pin/create/button/?url={url}&description={title}' },
        { id: 'Pk', name: 'Pocket', icon: 'images/pocket.svg', tpl: 'http://getpocket.com/edit?url={url}' },
        { id: 'bf', name: 'Buffer', icon: 'images/buffer2.svg', tpl: 'http://bufferapp.com/add?url={url}&text={title}' },
        { id: 'li', name: 'LinkedIn', icon: 'images/linkedin.svg', tpl: 'http://www.linkedin.com/shareArticle?url={url}&title={title}&summary=&source=' },
        { id: 'em', name: 'Email', icon: 'images/email.svg', tpl: 'mailto:?subject={title}&body={url}' }
    ]

    document.getElementById('main').innerHTML = 
        linkView(link) + 
        sharer({ link: link, intents: intents });

    /** views **/

    function linkView(props) {
        return '<div class="link">' +
            '<h2 class="link-title">' + props.title + '</h2>' +
            '<p class="link-url">' + props.url + '</p>' +
        '</div>';
    }

    function sharer(props) {
        return '<div class="sharer">' +
            '<h2 class="sharer-title">Share</h2>' +
            props.intents.map(function(intent) { 
                return shareBtn({ 
                    id: intent.id, 
                    name: intent.name, 
                    url: tmpl(intent.tpl, props.link),
                    icon: intent.icon
                });
            }).join('') +
        '</div>';
    }

    function shareBtn(props) {
        return '<a class="share-btn share-btn-' + props.id + '" href="' + props.url + '" title="' + props.name + '">' +
            '<img class="share-btn-img" src="' + props.icon + '">' +
        '</a>';
    }

    function tmpl(text, params) {
        return text.replace(/\{(\w+)\}/g, function (match, key) {
            return encodeURIComponent(params[key]);
        });
    }

    function buildUrl(baseUrl, params) {
        var query = params ? '?' + Object.keys(params)
            .map(function(k) { return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]); })
            .join('&') : '';
        return baseUrl + query;
    }

    function getUrlParams(query) {
        return query.replace(/^\?/, '')
            .split('&')
            .map(function(e) { return e.split('='); })
            .reduce(function(p, e) { p[decodeURIComponent(e[0])] = decodeURIComponent(e[1]); return p; }, {});
    }

})();