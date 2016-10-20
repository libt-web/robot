exports["localhost"] = {
    "root": "E:\\github\\robot\\src\\",
    "port": 9006,
	//简单代理设置
    "agent":{
        get :function(path){
            //检测代理链接字符
            if(path.indexOf("/synergyMallServcie/")>=0){
                console.log(path);
                return{
                    host:"127.0.0.1",//转发目的地服务器
                    port:'8080'//转发目的地服务器端口
                }
            }
        }
    }
};
