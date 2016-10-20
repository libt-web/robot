define('main',['jquery'],function($){
	var Router=function(){
		var self=this,
            currentPageName='',
            $mainApp=$('#mainApp');
		this.pages={
			'welcome':null,
            'lazyload':null,
		};
		this.parseURL=function(url){
			var result={query:{}};
			result.hash=url.substr(url.indexOf('#')+1,(url.indexOf('?')>=0)?url.indexOf('?')-1:url.length);
			var query=(url.indexOf('?')>=0)?url.substr(url.indexOf('?')+1,url.length):'';
			var parms=query.split('&');
			$.each(parms,function(index,str){
				var list=str.split('=');
				result.query[''+list[0]]=list[1];
			});
			return result;
		};
		this.loadPage=function(page,info){
			if(currentPageName && self.pages[currentPageName])
				self.pages[currentPageName].stop();
			currentPageName=info.hash;
            page.start($mainApp,info);
		};
		this.urlChange=function(){
			var info=self.parseURL(location.hash);
			if(self.pages[info.hash+'']){
				self.loadPage(self.pages[info.hash+''],info);
			}else{
				require([info.hash],function(page){
					self.pages[info.hash+'']=new page(self);
					self.loadPage(self.pages[info.hash+''],info);
				});
			}
		};
		$(window).on('hashchange',self.urlChange);
		if(location.hash==null||location.hash==''){
			location.hash='welcome?u=123';
		}
		$(window).trigger('hashchange');
	}
	router=new Router();
});