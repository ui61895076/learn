/*
 *getWIn:获取屏幕的scrollTop|scrollLeft  width  height  ,可以设置；
 * 
 *
 * 
 * 
 * 
 * 
 * 
 * 
 * by YangHaiBin QQ61895076   on 2017/07
 */

var utils=(function(){
	var flag='getComputedStyle' in  window;
	function getWin(attr,value){
		if(typeof value==='undefined'){
			return document.documentElement[attr]||document.body[attr];
		}else{
			document.documentElement[attr]=value;
			document.body[attr]=value;
		}
	 }//获取屏幕的高度  滚动条高度;
	
	function getCss(curEl,attr){
		 var val=null;
        var reg1=/^-?(\d+([.]\d+)?)(px|rem|em|pt)?$/i;
        
        if('getComputedStyle' in window){
        	
            val= window.getComputedStyle(curEl,null)[attr];//标准浏览器
        }else{
        	
           if(attr=='opacity'){
           	
               val=curEl.currentStyle['filter'];
               var reg2=/alpha[(]opacity[=](\d+([.]\d+)?)[)]/i;
               val=reg2.exec(val)[1]/100;
           }else{
           
               val=curEl.currentStyle[attr];
           }
        }
        return reg1.test(val)? parseFloat(val):val;
	}//获取内部，外部的样式；
	
	function offset(ele){
			var curTop=ele.offsetTop;
      		var curLeft=ele.offsetLeft;
      		var par=ele.offsetParent;
      		while(par){
      			if(window.navigator.userAgent.indexOf('MSIE 8.0')===-1){
      				curTop+=ele.clientTop;
      				curLeft+=ele.clientLeft;
      			}
      			curTop+=par.offsetTop;
      			curLeft+=par.offsetLeft;
      			par=par.offsetParent;
      			
      		}
      		return {top:curTop,left:curLeft}
	}//获取元素到body的距离；
	function listToArray(ele){
		var ary=[];
		if(flag){
			ary=[].slice.call(ele);
		}else{
			for(var i=0;i<ele.length;i++){
				ary[ary.length]=ele[i]
			}
		}
		return ary;
	}//将类数组 转成数组；
	function children(ele,tagName){
		var ary=[];
		if(flag){
			ary=utils.listToArray(ele.children);
		}else{
			ary=utils.listToArray(ele.childNodes);
			for(var i=0;i<ary.length;i++){
				var curNode=ary[i];
				if(curNode.nodeType==1){
					ary[ary.length]=curNode;
				}
				curNode=null;
			}
		}
		if(typeof tagName=='string'){
			
		  for(var i=0;i<ary.length;i++){
			var aryNode=ary[i];
			if(aryNode.nodeName.toLowerCase()!==tagName.toLowerCase()){
				ary.splice(i,1);
				i--;
				
			}
			aryNode=null;
		  }
		}

		return ary;
	};//获取元素的子节点元素(注意，标签嵌套规范)；
	
	function prev(ele){
		if(flag){
			return ele.previousElementSibling;
		}else{
			var pre=ele.previousSibling;
			while(pre&&pre.nodeType!==1){
				pre=pre.previousSibling
			}
			return pre;
		}
	}//获取上一个哥哥元素节点/
	
	function next(ele){
		if(flag){
			return ele.nextElementSibling;
		}else{
			var next=ele.nextSibling;
			while(next&&next.nodeType!==1){
				next=next.nextSibling
			}
			return next;
		}
	}//获取下一个哥哥元素节点/
	
	function prevAll(ele){
		var ary=[];
		var pre=this.prev(ele);
		while(pre){
			ary.unshift(pre)
			pre=this.prev(pre);
			
		}
		return ary;
	}//获取元素的所有个哥哥元素；
	
	function nextAll(ele){
		var ary=[];
		var next=this.next(ele);
		while(next){
			ary.push(next)
			next=this.next(next);
			
		}
		return ary;
	}//获取元素的所有个弟弟元素；
	
	function sibling(ele){
		var ary=[];
		var pre=this.prev(ele);
		var nex=this.next(ele);
		pre?ary.push(pre):null;
		nex?ary.push(nex):null;
		return ary;		
	}//获取相邻的两个兄弟节点
	
	function siblings(ele){
		return this.prevAll(ele).concat(this.nextAll(ele))
	}//获取所有兄弟节点；
	
	function index(ele){
		return this.prevAll(ele).length;
	}//获取当前元素的索引
	
	function firstChild(ele){
		var allNode=this.children(ele);
		return allNode.length>0?allNode[0]:null;		
	}//获取这个元素中的第一个子节点；
	
	function lastChild(ele){
		var allNode=this.children(ele);
		return allNode.length>0?allNode[allNode.length-1]:null;		
	}//获取这个元素中最后一个子节点；
	
	
	function append(ele,container){
		container.appendChild(ele);
	}//将以个元素添加到容器的结尾部分；
	
	function prepend(ele,container){
		var fir=this.firstChild(container);
		if(fir){
			container.insertBefore(ele,fir)
			return;
		}else{
			container.appendChild(ele);
		}
	}//将以个元素添加到容器的开头部分；
	
	
	function insertBefore(newEle,oldEle){
		oldEle.parentNode.insertBefore(newEle,oldEle);
	}//将以个元素添加另一个元素的前面；
	
	function insertAfter(newEle,oldEle){
		var after=this.next(oldEle);
		if(after){
			oldEle.parentNode.insertBefore(newEle,this.next(oldEle))
		   return;
		}else{
			oldEle.parentNode.appendChild(newEle);
		}
		
	}//将以个元素添加另一个元素的后面；
	
	function addClass(ele,className){
		var ary=[];
		ary=className.replace(/^ +| +$/g,'').split(/ +/g);
		for(var i=0;i<ary.length;i++){
				var curClass=ary[i];
			if(!this.hasClass(ele,curClass)){
				ele.className+=' '+curClass;
			};
		}
	}//添加css类
	
	function hasClass(ele,className){
		var reg=new RegExp("(^| +)"+className+"( +|$)");
		return reg.test(ele.className);
	}//判断是否包含这个类；
	function removeClass(ele,className){
		var ary=[];
		ary=className.replace(/^ +| +$/g,'').split(/ +/g);
		for(var i=0;i<ary.length;i++){
			var curClass=ary[i];
			if(this.hasClass(ele,curClass)){
				var reg=new RegExp('(^| +)'+curClass+'( +|$)','g');
				ele.className=ele.className.replace(reg,' ')
			};
		}
	}//删除css样式类
	
	function getElementsByClassName(className,context){
		context=context||document;
		if(flag){
			return this.listToArray(context.getElementsByClassName(className));
		}
		var ary=[];
		var aryClassName=className.replace(/(^ +)|( +$)/g,'').split(/ +/g);
		var nodeList=context.getElementsByTagName('*');
		for(var i=0;i<nodeList.length;i++){
			var curNode=nodeList[i];
			var isOk=true;
			for(var j=0;j<aryClassName.length;j++){
				var reg=new RegExp('(^| +)'+aryClassName[j]+'( +|$)');
				if(!reg.test(curNode.className)){
					isOk=false;
					break;
				};
			};
			if(isOk){
				ary.push(curNode);
			}
		};
		return ary
	}//通过className 来获取元素
	
	function setCss(){
		if(arguments[0]==='float'){
			this['style']['cssFloat']=arguments[1];
			this['style']['styleFloat']=arguments[1];
			return
		}
		if(arguments[0]==='opacity'){
			this['style'][arguments[0]]=arguments[1];
			this['style']['filter']='alpha(opacity='+arguments[1]*100+')';
			return;
		}
		
		var reg=/^width|height|left|top|bottom|right|(margin(Left|Right|Top|Bottom)?)|(padding(Left|Right|Top|Bottom)?)$/;
		if(reg.test(arguments[0])){
			if(!isNaN(arguments[1])){
			    arguments[1]+='px'	
			};
		};
		
		 this['style'][arguments[0]]=arguments[1]	
	}
	
   function setGroupCss(){
	    option=arguments[0]||0;
	    if(Object.prototype.toString.call(option)!=='[object Object]'){	
		   return;
	    }
	 
	    for(var key in option){		 
			   if(option.hasOwnProperty(key)){
				  setCss.call(this,key,option[key]);
			    }	
	    }
	
    }//批量设置css 
    
    function css(ele){
    	
    	var ary=Array.prototype.slice.call(arguments,1);
    	
		if(typeof arguments[1]==='string'){			
			if(typeof arguments[2]=='undefined'){//!arguments[2]
				
				return utils.getCss.apply(this,arguments)
				//return utils.getCss(ele,arguments[1]);
			}
			
			setCss.apply(ele,ary);
			//utils.setCss(ele,arguments[1],arguments[2]);
			
		}
		if(Object.prototype.toString.call(arguments[1])=='[object Object]'){
			setGroupCss.apply(ele,ary)
			//utils.setGroupCss(ele,arguments[1]);
		}
	}
	
	function jsonParse(str){
		var val=null;
		try{
			val=JSON.parse(str);
		}catch(e){
			val=eval("("+str+")");
		}
		return val;
	}
	return {
	        getWin:getWin,//获取浏览器的宽高；
	        getCss:getCss,//获取计算后的样式值；
	        offset:offset,//获取元素距离body 的距离；
	        listToArray:listToArray,//将类数组转成数组；
	        children:children,//获取元素的子元素
	        prev:prev,//获取元素的上一个兄弟元素
	        next:next,//获取元素的下一个兄弟元素
	        prevAll:prevAll,//获取元素的上所有兄弟元素
	        nextAll:nextAll,//获取元素的下所有兄弟元素
	        sibling:sibling,//获取元素的上下两个兄弟 元素
	        siblings:siblings,//获取元素的所有兄弟元素
	        index:index,//获取元素的所有
	        firstChild:firstChild,//获取第一个元素
	        lastChild:lastChild,//获取最后一个元素
	        append:append,//在容器的末尾添加
	        prepend:prepend,//在容器的开头添加
	        insertBefore:insertBefore,//在指定元素的前面添加
	        insertAfter:insertAfter,//在指定元素的末尾添加
	        addClass:addClass,//添加css类
	        hasClass:hasClass,//判断是否包含css类
	        removeClass:removeClass,//删除css类
	        getElementsByClassName:getElementsByClassName,//通过className 来获取元素
//	        setCss:setCss,//单个设置css
//	        setGroupCss:setGroupCss,//批量设置Css
	        css:css,
	        jsonParse:jsonParse//字符串 转json格式对象；
      }
      
	
})()
