define('second',['jquery','page'],function($,page){
	var second=function(app){
        this.app=app;
        this.name='second'; 
		this.onStart=function(){
			console.log('this is second start');
            var data={
                title:'这是第二页'
            }
            this.setContentView(data);
		}
	};
	second.prototype=new page();
	return second;
});