define('lazyload',['jquery','page','tool'],function($,page,tool){
	var lazyload=function(app){
        this.app=app;
        this.name='lazyload'; 
		this.onStart=function(){
            var data={
                imgList:[
                    'http://t2.27270.com/uploads/tu/201607/177/htjyjifo2co.jpg',
                    'http://t2.27270.com/uploads/tu/201607/177/b21uhjaq1k0.jpg',
                    'http://t2.27270.com/uploads/tu/201607/177/gjogybvbziu.jpg',
                    'http://t2.27270.com/uploads/tu/201607/177/hskcleyueht.jpg'
                ]
            }
            this.setContentView(data);
		};
        this.onRecover=function(event,view){
            var lazyLoad=new tool.lazyLoad(view.find('img'));
            lazyLoad.startLoad();
        }
	};
	lazyload.prototype=new page();
	return lazyload;
});