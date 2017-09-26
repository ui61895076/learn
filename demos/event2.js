function on(ele,type,fn){
		if (document.addEventListener) {//标准浏览器
			ele.addEventListener(type,fn,false);
			return;
		}else{
			if (!ele["myEvent"+type]) {//ele["myEvent"+type]这个自定义属性为事件池
				ele["myEvent"+type]=[];
				ele.attachEvent("on"+type,function(){run.call(ele)});
			}
			var ary=ele["myEvent"+type];
			for (var i=0;i<ary.length;i++) {
				if (ary[i]==fn)return;
			}
			ary.push(fn);
		}
	}
    //往事件池里添加的函数，解决顺序问题，方法按顺序执行的唯一入口。
	function run(e){
		e=e||window.event;
		if (!flag){
			e.target=e.srcElement;
			e.pageX=e.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft);
			e.pageY=e.clientY+(document.documentElement.scrollTop||document.body.scrollTop);
			e.preventDefault=function () {//阻止浏览器的默认行为
				e.returnValue=false;//用e.returnValue=false代替
			};
			e.stopPropagation=function () {//阻止事件的冒泡传播
				e.cancelBubble=true;//IE6-8用e.cancelBubble=true来代替
			}
		}
		var ary=this["myEvent"+e.type];
		for(var i=0;i<ary.length;i++){
			var val=ary[i];
			typeof val==="function"?val.call(this,e):(ary.splice(i,1),i--);
		}
	}
	//26，把事件池中的某一个方法移除
	function off(ele,type,fn){
		if (document.removeEventListener) {
			ele.removeEventListener(type,fn,false);
		}
		var ary=ele["myEvent"+type];
		if (ary&&ary.length) {
			var ary=ele["myEvent"+type];
			for(var i=0;i<ary.length;i++){
				var val=ary[i];
				if (val===fn) {
					ary[i]=null;//不改变数组的长度和索引值。解决数组塌陷
					break;
				}
			}
		}
	}