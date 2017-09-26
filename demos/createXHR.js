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
	    		createXHR=curAry;
	    		break;
	    	}catch(e){
	    		
	    	}
	    }
	    
	    return xhr;
}



