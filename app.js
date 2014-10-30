(function() {
	var app = angular.module('WebShare', []);
	
	app.controller('IntentsController', function() {
		var me = this;
		
		me.params = window.location.search.substr(1).split('&')
			.reduce(function(params, exp) {
				if (exp) {
					exp = exp.split('=');
					params[exp[0]] = decodeURIComponent(exp[1]);
				}
				return params;
			}, {});
			
			
		if (!me.params.url) {
			me.params.url = window.location.href;
			me.params.title = document.title;
		}
		
		
		me.intents = [
			{ 
				name: 'Add to Pocket', 
				icon: 'http://getpocket.com/favicon.ico', 
				tpl: 'http://getpocket.com/edit?url={url}' 
			}, { 
				name: 'Share by email', 
				icon: 'http://www.durbin.senate.gov/public/_skins/durbin/images//share/email_32.png', 
				tpl: 'mailto:?subject={title}&body={url}' 
			}, { 
				name: 'Buffer', 
				icon: 'https://bufferapp.com/favicon.ico', 
				tpl: 'http://bufferapp.com/add?url={url}&text={title}' 
			}, { 
				name: 'Share on Facebook', 
				icon: 'http://www.ripleys.com/wp-content/uploads/2014/04/facebook.png', 
				tpl: 'http://www.facebook.com/sharer.php?u={url}' 
			}, { 
				name: 'Share on Twitter', 
				icon: 'https://abs.twimg.com/favicons/favicon.ico', 
				tpl: 'https://twitter.com/intent/tweet?url={url}&text={title}' 
			}, { 
				name: 'Share on GPlus', 
				icon: 'https://www.gstatic.com/images/icons/gplus-32.png', 
				tpl: 'https://plus.google.com/share?url={url}' 
			}, { 
				name: 'Shorten with bit.ly', 
				icon: 'http://g.etfv.co/http://bitly.com', 
				tpl: 'https://bitly.com/a/bitmarklet?u={url}' 
			}, { 
				name: 'Add to URLi.st', 
				icon: 'http://urli.st/favicon.ico', 
				tpl: 'http://urli.st/bookmarklet/add?url={url}&title={title}' 
			}, { 
				name: 'Download YouTube video', 
				icon: 'http://deturl.com/favicon.ico', 
				tpl: 'http://deturl.com/{url}' 
			}, { 
				name: 'Post to Reddit', 
				icon: 'http://reddit.com/favicon.ico', 
				tpl: 'http://www.reddit.com/submit?url={url}&title={title}' 
			}, { 
				name: 'Pin on Pinterest', 
				icon: 'http://passets-ak.pinterest.com/webapp/style/app/desktop/images/favicon.c37ee67b.png', 
				tpl: 'http://www.pinterest.com/pin/create/button/?url={url}&description={title}' 
			}
		];
		
		
		me.render = function(intent) {
			return intent.tpl.replace(/\{(\w+)\}/g, function(match, name) {
				return encodeURIComponent(me.params[name] || '');
			});
		};
		
	});
})();