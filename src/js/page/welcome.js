define('welcome',['jquery','page'],function($,page){
	var welcome=function(app){
        this.app=app;
        this.name='welcome'; 
		this.onStart=function(){
			console.log('this is welcome start');
            var data={
                list:[
                    {name:'LiLei',age:'14'},
                    {name:'HanMeiMei',age:'15'}
                ]
            };
            this.setContentView(data);
		}
	};
	welcome.prototype=new page();
	return welcome;
});