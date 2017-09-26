~function(){
	
	
			function bind(curEle,evenType,evenFn){
		if('addEventListener' in window){
			curEle.addEventListener(evenType,evenFn,false);
			return ;
		}//3个问题都是出现在attachEvent中的；
	
		//curEle.attachEvent('on'+evenType,evenFn.call(curEle));这样.call的方法可以将this的指向改成curEle,但是写法不对，这样是运行后的结果返回给了点击事件；
//		curEle.attachEvent('on'+evenType,function(){
//			evenFn.call(curEle);
//		});//这样写解决了，点击后才执行方法，但是这是个匿名的函数；在解除绑定的时候无法找到对应的，fn 的地址是两个不同的；
       var temp=function(){
       	evenFn.call(curEle);
       };
       temp.photo=evenFn;
       if(!curEle['mybind'+evenType]){
          curEle['mybind'+evenType]=[];	
       }
       var ary=curEle['mybind'+evenType];
       for(var i=0;i<ary.length;i++){
       	    if(ary[i].photo===evenFn){
       	    	return;
       	    }
       }
       ary.push(temp);
       for(var i=0;i<ary.length;i++){
       	  if(ary[i].photo===evenFn){
       	  	curEle.attachEvent('on'+evenType,ary[i]);
       	  }
       }
       
       
	}
	
	function unBind(curEle,evenType,evenFn){
		if('removeEventListener' in window){
			curEle.removeEventListener(evenType,evenFn,false);
			return;
		}
		var ary=curEle['mybind'+evenType];
		
		 for(var i=0;i<ary.length;i++){
       	  if(ary[i].photo===evenFn){
       	  	curEle.detachEvent('on'+evenType,ary[i]);
       	  }
       }
		
	}
	///以上的bind  unBind 方法实现了，绑定 取消绑定的兼容性及this 的指向问题，以及重复的问题；但是attachEvent的顺序问题没有解决；
	
	//顺序问题是出现在浏览器自带的事件池中，我们无法修改，只能自己模拟一个事件池进行相应的操作；
	
    function on(curEle,evenType,evenFn){
    	if(!curEle['mybind'+evenType]){
    		curEle['mybind'+evenType]=[];
    	}
    	
    	var ary=curEle['mybind'+evenType];
    	
    	for(var i=0;i<ary.length;i++){
    		if(ary[i]===evenFn){
    			return;
    		}
    		
    	}
    	
    	ary.push(evenFn);
    	
    	bind(curEle,evenType,run)
    }//模拟事件池，在里面添加方法
    
    function off(curEle,evenType,evenFn){
    	var ary=curEle['mybind'+evenType];
    	if(!ary){
    		return;
    	}
    	
    	for(var i=0;i<ary.length;i++){
    		if(ary[i]===evenFn){
    			ary[i]=null;
    		}
    	}
    	
    }//移除模拟事件迟中的方法
    
   function run(e){
    	e=e||window.event;
    	e.target=e.target||e.srcElement;
    	var ary=this['mybind'+e.type];
    	for(var i=0;i<ary.length;i++){
    		if(typeof ary[i]=='function'){
    			ary[i].call(this,e)
    		}else{
    			ary.splice(i,1);
    			i--;
    		}
    		
    	}
    }
	window.myBind={
		on:on,
		off:off,
		bind:bind,
		unBind:unBind
	}
}()
