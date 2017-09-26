var an=(function(){
	
	function linear(t,d,b,c){
			return t/d*c+b;
	}
	var animation={
		Linear:linear
	}
	
	
	function move(ele,target,duration,callback){
		var change={},begin={};
		var time=0;
		for(var key in target){
			if(target.hasOwnProperty(key)){
				begin[key]=utils.css(ele,key);
				change[key]=target[key]-begin[key];
			}
		}
		ele.timer=window.setInterval(function(){
			if(time>=duration){
				callback&&callback.call(ele);
			   window.clearInterval(ele.timer);
			   utils.css(ele,target);
			return;
		}
			time+=10;
			for(var key in target){
				if(target.hasOwnProperty(key)){
					utils.css(ele,key,animation.Linear(time,duration,begin[key],change[key]));
				}
		    }
			
		},10)
	}
	
	return {
			move:move
	};
})()
