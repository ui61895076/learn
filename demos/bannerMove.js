~function(){
	function BannerMove(id,ajaxUrl,interval){
	this.banner1=document.getElementById(id);
	this.ajaxUrl=ajaxUrl;
	this.interval=interval||3000;
	this.warp=utils.getElementsByClassName('warp',this.banner1)[0];
	this.bannerList=utils.getElementsByClassName('banInner',this.warp);
	this.listImg=this.warp.getElementsByTagName('img');
	this.bannerTip=utils.getElementsByClassName('bannerTip',this.banner1)[0];
	this.bannerTipUl=utils.firstChild(this.bannerTip);
	this.next=utils.getElementsByClassName('next',this.banner1)[0];
	this.prev=utils.getElementsByClassName('prev',this.banner1)[0];
	this.tipLi=this.bannerTipUl.getElementsByTagName('li');
	this.step=0;
	this.timer=null;
	this.jsonDate=null;
	this.init();	
	
}

BannerMove.prototype={
   constructor:BannerMove,
   //ajax获取数据；
   getAjax:function(){
   	var _this=this;
    	var val=null;
		var xml=new XMLHttpRequest();
		xml.open('get',this.ajaxUrl,false);
		xml.onreadystatechange=function(){
			if(xml.readyState===4&&/^2\d{2}$/.test(xml.status)){
				val=xml.responseText;
				_this.jsonDate=utils.jsonParse(val);
			}
		}
		xml.send();
   },
   //数据绑定；
   bindDate:function(){
   
   	var str="";
		var str2="";
		
	   	for(var i=0;i<this.jsonDate.length;i++){
	   		str+='<div class="banInner">';
	   	    str+='<a href="javascript:;">';
	   	    str+=' <img data-src="'+this.jsonDate[i]["bannerSrc"]+'" src="img/timg1.gif"/>';
	   	    str+='</a>';
	   	    str+='</div>';
	   	    str2+= i==0?'<li class="bg"></li>':'<li></li>';
	   	  
	   	}
	     	str+='<div class="banInner">';
	   	    str+='<a href="javascript:;">';
	   	    str+=' <img data-src="'+this.jsonDate[0]["bannerSrc"]+'" src="img/timg.gif"/>';
	   	    str+='</a>';
	   	    str+='</div>'
	   		this.warp.innerHTML=str;
	   		utils.css(this.warp,"width",(this.jsonDate.length+1)*1000);
	   		this.bannerTipUl.innerHTML=str2;
   },
   
   //图片预加载
   lazyImg:function(){
   		for(var i=0;i<this.jsonDate.length+1;i++){
   			var _this=this;
	  		(function(i){
	  		var oImg=new Image();
	  			oImg.src=_this.listImg[i].getAttribute('data-src');
	  			oImg.onload=function(){
	  		    _this.listImg[i].src=oImg.src;
	  		  
	  	        }
	  		})(i)
	  		  oImg=null;
	  	}
   },
   
   //图片滚动
   moveBanner:function(){
   	    this.step++;
		if(this.step>=5){
			utils.css(this.warp,'left',0);
			this.step=1;
		}
		move(this.warp,{left:-(this.step*1000)},500,9);
	    this.Tip();
	    
   },
   //焦点轮播
   Tip:function(){
   	    for(var i=0;i<this.tipLi.length;i++){
			i===this.step?utils.addClass(this.tipLi[i],'bg'):utils.removeClass(this.tipLi[i],'bg');
			
		}
		    if(this.step>=4){
		 		utils.addClass(this.tipLi[0],'bg')
		 	}
   },
   
   //焦点事件
   eventTip:function(){
    	 var _this=this;
     	for(var i=0;i<this.tipLi.length;i++){
			this.tipLi[i].index=i;
			
			this.tipLi[i].onclick=function(){
				
				_this.step=this.index;
			   _this.Tip()
				move(_this.warp,{left:-(_this.step*1000)},500,9);
			}
		}
   },
   
   //点击事件
   eventClick:function(){
   	var _this=this;
   	this.banner1.onmouseover=function(){
		window.clearInterval(_this.timer);
	};
	this.banner1.onmouseout=function(){
			_this.timer=window.setInterval(function(){
   			_this.moveBanner();
   			},_this.interval);
	}
    
    this.next.onclick=function(){
    	
    	_this.moveBanner();
    };
    this.prev.onclick=function(){
    	if(_this.step<=0){
    		_this.step=4;
    		utils.css(_this.warp,'left',-_this.step*1000);
    	}
    	_this.step--;
    	_this.Tip()
        move(_this.warp,{left:-(_this.step*1000)},500,9);
    	
    }
   },
   init:function(){
   	var _this=this;
   	this.getAjax();
   	this.bindDate();
   	this.lazyImg();
   	this.eventTip();
   	this.eventClick();
   	this.timer=window.setInterval(function(){
   			_this.moveBanner();
   		},this.interval);
   		 
   }
  
}
window.BannerMove=BannerMove;
}()

