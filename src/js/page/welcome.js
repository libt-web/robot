define('welcome',['jquery','page'],function($,page){
	var welcome=function(app){
        this.app=app;
        this.name='welcome'; 
		this.onStart=function(){
            var data={
                list:[
                    {text:'图片依次加载',href:'#lazyload'},
                    {text:'轮播图',href:'#slipPic'},
                    {text:'Confirm 弹窗',href:'#lazyload'}
                ]
            };
            this.setContentView(data);
            
		};
        this.onRecover=function(event){
            event.bind('click','#mainList li',function(){
                var href=$(this).data('href');
                location.href=href;
            });
        };
	};
	welcome.prototype=new page();
	return welcome;
});