~function(){
	function createXHR(){
	var xhr=null,
	    ary=[
	    function (){
	    	return new XMLHttpRequest;
	    },
	    function(){
	    	return new ActiveXObject('Microsoft.XMLHTTP');
	    },
	    function (){
	    	return new ActiveXObject('Msxml2.XMLHTTP');
	    },
	     function (){
	    	return new ActiveXObject('Msxml3.XMLHTTP');
	    }
	    ];
	    
	    for(var i=0,len=ary.length;i<len;i++){
	    	var curAry=ary[i];
	    	try{
	    		xhr=curAry();
	    		createXHR=curAry;//惰性思想，当页面第二次用的时候不需要重新在判断一次了；
	    		break;
	    	}catch(e){
	    		
	    	}
	    }
	    
	    return xhr;
}


function ajax(option){
	var _default={
		type:'get',// 类型
		url:'',//地址
		dataType:'json',
		async:'true',//异步
		data:null,//主体内容
		getHead:null,//一个函数，获取头部信息
		success:null//一 个函数，或 得值后做什么
	};
	for(var key in option){
		if(option.hasOwnProperty(key)){//需要判断是否为私有属性，不判断会将Object 自定义原型的属性也会循环出来；
			_default[key]=option[key];	
		}
	}
	
	if(_default.type=='get'){
		_default.url.indexOf('?')>=0?_default.url+='&':_default.url+='?';
		_default.url+='_='+Math.random();
	}
	
	var xhr=createXHR();
	xhr.open(_default.type,_default.url,_default.async);
	xhr.onreadystatechange=function(){
		if(/^2\d{2}/.test(xhr.status)){
			if(xhr.readyState===2){
				if(typeof _default.getHead==='function'){
					_default.getHead.call(xhr)
				}
				
			}
			if(xhr.readyState===4){
				var val=xhr.responseText;
				if(_default.dataType=='json'){
					val='JSON' in window?JSON.parse(val):eval("("+val+")");
				}
				
				if(typeof _default.success==='function'){
					_default.success.call(xhr,val)
				}
				
			}
		}
	}
	xhr.send(_default.data);
}

window.ajax=ajax;
}()

