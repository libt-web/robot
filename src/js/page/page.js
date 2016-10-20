define(['jquery','artTemp'],function($,artTemp){
    //页面视图管理器
	var page=function(){
        this.$mainView=null;//本页主视图
        this.param=null;//数据存储位置
        this.$parentView=null;//父视图
        this.tempRender=null;//本页渲染器
        //显示函数
        this.show=function(data){
            var html=this.tempRender(data),
                $view=$(html);
            this.$mainView.html($view);
            this.$parentView.append(this.$mainView);
            this.fadeIn();
            this.recover();
        }
        //页面启动函数
		this.start=function($window,info){
			console.log('base start');
            if(!this.$mainView){
                this.$parentView=$window;
                this.param=info;
                this.$mainView=$('<div class="page"></div>');
                this.$mainView.attr('id',this.name);
                this.$mainView.bind('transitionend',function(){
                    
                });
            }
            //结束页面处理会调用当前页启动方法
            if(this.onStart) this.onStart();
		};
        //页面停止函数
		this.stop=function(){
			this.fadeOut();
		};
        //页面从缓存恢复函数
        this.recover=function(){
            var selfView=this.$mainView;
            var eventControl={
                bind:function(event,domStr,func){
                    selfView.on(event,domStr,func);
                }
            }
            if(this.onRecover) this.onRecover(eventControl,selfView);
        }
	};
    //加载主页模板数据函数
    page.prototype.setContentView=function(data){
        var self=this;
        data=data||{};
        if(this.tempRender){
            this.show(data);
        }
        $.get('../../tmp/page/'+self.name+'.html',function(res){
            self.tempRender=artTemp.compile(res);
            self.show(data);
        })
    };
    //页面淡入动画方法
    page.prototype.fadeIn=function(){
        var $view=this.$mainView;
        $view.fadeIn();
    };
    //页面淡出动画方法
    page.prototype.fadeOut=function(){
        var $view=this.$mainView;
        $view.hide().remove();
    };
	return page;
});