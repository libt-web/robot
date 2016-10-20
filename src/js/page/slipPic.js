define('slipPic',['jquery','page','tool'],function($,page,tool){
	var slipPic=function(app){
        this.app=app;
        this.name='slipPic'; 
		this.onStart=function(){
            var data={
                list:[
                    'http://img02.tooopen.com/images/20141231/sy_78327074576.jpg',
                    'http://img05.tooopen.com/images/20150202/sy_80219211654.jpg',
                    'http://img06.tooopen.com/images/20160810/tooopen_sy_175027421951.jpg',
                    'http://img06.tooopen.com/images/20160710/tooopen_sy_169923037699.jpg'
                ]
            }
            this.setContentView(data);
		};
        this.onRecover=function(event,view){
            var carousel=tool.slipPic(view.find('#slipPic'),{openAuto:true});
        };
	};
	slipPic.prototype=new page();
	return slipPic;
});