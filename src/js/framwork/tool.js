define('tool',['jquery'],function($){
   var tool={
       /*
    图片队列加载器 by libotao 2016-08-24

    调用示例：
    ImgList: 通过jquery获取的元素集合 $('img')等
    html中元素需将图片路径放置在data-url中

    js部分：
    var lazyload= Lazyload(ImgList);
    lazyload.startLoad();
    html部分：
    <img data-url="style/images/youxuan.png">

	*/
       lazyLoad:function(doms){
        var loadDoms=doms;              //加载img 元素队列
        var index=0;                    //记录当前加载哪个img元素
        var domCount=doms.length;       //元素队列 长度
        var isEmpty=function(str){
            if(str==null||str==undefined||str.length==0) return true;
            return false;
        }
        //加载下一个
        var next=function(){
            //如果加载到队列末尾，不加载
            if(index>=domCount) return;
            //获取要加载的元素
            $thisDom=$(doms[index]);
            //如果已经加载过了，则不加载
            var src=$thisDom.attr('src');
            if(!isEmpty(src)) return;
            //获取记录的url
            var url=$thisDom.data('url');
            if(!isEmpty(url))
            //加载
            $thisDom.attr('src',url);
            //设置隐藏元素，但不影响其他元素布局
            $thisDom.css({
                'opacity':'0'
            });
            index++;
        };
        //元素加载完成函数
        $(doms).bind('load',function(){
                            //显示当前元素
            $(this).css({
                'transition':'opacity .3s',
                'opacity':'1'
            });
            //加载下一个
            next();
        });
        return {
            //开始加载
            startLoad:function(){
                if(domCount>0)next();
            }
        }
    },
       //轮播图组件
      slipPic:function($Window,option){
        var config={
            itemWidth:$Window.width(),
            itemNum:$Window.find('.img-item').length,
            openBtn:true,
            openDots:false,
            openAuto:true,
            animTime:800,
            waitTime:3000,
        };
        config=$.extend({},config,option);
        var nowLeft=0-config.itemWidth;
        var Rounder=null;
        var $group=$Window.find('.img-group');
        var isAnimting=false;
        var pathList=[];

        for(var i=1,len=config.itemNum;i<=len;i++){
            pathList.push(0-(config.itemWidth*i));
        }

        $group.prepend($group.find('.img-item').eq((config.itemNum-1)).clone());
        config.itemNum++;
        $group.append($group.find('.img-item').eq(1).clone());
        config.itemNum++;
        $group.css('width',(config.itemWidth*config.itemNum)+'px');
        $group.find('.img-item').css('width',config.itemWidth+'px');
        $group.css('transform','translate('+nowLeft+'px)');

        var prev=function(){
            if(isAnimting) return;
            nowLeft+=config.itemWidth;
            move();
        }
        var move=function(){
            isAnimting=true;
            $group.css({
                'transition':' transform '+config.animTime+'ms',
                'transform':'translate('+nowLeft+'px)'
            });
            setTimeout(function(){
                if(nowLeft>=0){
                    nowLeft=0-((config.itemNum-2)*config.itemWidth);
                    $group.css({
                        'transition':'',
                        'transform':'translate('+nowLeft+'px)'
                    })
                }else if(nowLeft<=0-((config.itemNum-1)*config.itemWidth)){
                    nowLeft=0-config.itemWidth;
                    $group.css({
                        'transition':'',
                        'transform':'translate('+nowLeft+'px)'
                    })
                }
                isAnimting=false;
            },config.animTime);
        };
        var next=function(){
            if(isAnimting) return;
            nowLeft-=config.itemWidth;
            move();
        };
        if(config.openBtn){
            $Window.addClass('showBtns');
            var $before=$('<div class="before"><</div>');
            var $after=$('<div class="after">></div>');
            $before.on('click',prev);
            $after.on('click',next);
            $Window.append($before).append($after);
        }
        if(config.openAuto){
            Rounder=setInterval(next,config.waitTime);
        }
        return{
            showPath:function(which){
                which=which-1;
                if(which>=pathList.length) return;
                nowLeft=pathList[which];
                move();
            }
        }
    }
}
    return tool;
});