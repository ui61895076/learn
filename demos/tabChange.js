~function(){
	//必须结构一样，传入的是Id
	function TabChange(id){
		this.tabChange=document.getElementById(id);
	    this.tabList=utils.getElementsByClassName('tabList',this.tabChange)[0];
		this.alistLi=this.tabList.getElementsByTagName('li');
		this.tabCont=utils.getElementsByClassName('tabCont',this.tabChange)[0];
		this.atabContBlock=utils.getElementsByClassName('tabContBlock',this.tabCont);
		return this.init();
	}
	
	TabChange.prototype={
		constructor:TabChange,
		//头部切换
		listChange:function(){
		
		for(var i=0;i<this.alistLi.length;i++){
			var _this=this;
			this.alistLi[i].index=i;
			this.alistLi[i].onmouseenter=function(){
				utils.addClass(this,'selectbg');
				var siblingsLi=utils.siblings(this);
				for(var j=0;j<siblingsLi.length;j++){
					utils.removeClass(siblingsLi[j],'selectbg')
				}
				_this.contChange(this.index);
			}
		}
		},
		//内容切换
		contChange:function(aListIndex){
		    for(var i=0;i<this.atabContBlock.length;i++){
			    aListIndex==i?utils.css(this.atabContBlock[i],'display','block'):utils.css(this.atabContBlock[i],'display','none');
		    }
		},
		init:function(){
			this.listChange();
		}
	}
	window.TabChange=TabChange;
}()
