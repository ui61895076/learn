var http=require('http');
var url=require('url');
var fs=require('fs');

var server1=http.createServer(function(req,res){
	var urlObj=url.parse(req.url,true);
	var pathname=urlObj.pathname;
	var query=urlObj.query;
	
	//静态资源文件的请求
	var reg=/\.(ico|json|css|js|jpeg|png|gif|txt|html)/i;
	if(reg.test(pathname)){
		var suffix=reg.exec(pathname)[1].toUpperCase();
	var suffixName='text/plain';
	switch(suffix){
		case 'CSS':
		 suffixName='text/css';
		 break;
		case 'JS':
		suffixName='application/x-javascript';
		break;
		case 'JPEG':
		suffixName='image/jpeg';
		break;
		case 'ICO':
		suffixName='image/x-icon';
		break;
		case 'GIF':
		suffixName='image/gif';
		break;
		case 'TXT':
		suffixName='text/plain';
		break;
		case 'PNG':
		suffixName='image/png';
		break; 
		case 'JSON':
		suffixName='application/json';
		break; 
		case 'HTML':
		suffixName='text/html';
		break; 
	}
	 
	 try{
		var con= fs.readFileSync('.'+pathname,'utf-8');
	    res.writeHead(200,{'content-type':suffixName+';chartset=utf-8;'});
	    res.end(con);
	 }catch(e){
		res.writeHead(404,{'content-type':'text/plain;charset=utf-8;'});
	    res.end('404');
	 }
	
	}
	
	
	//获取所有信息数据；
	var customPath='./custom.json';
	if(pathname=='/css'){
		var cons=fs.readFileSync(customPath,'utf-8');
	    res.writeHead(200,{'content-type':'application/json;charset=utf-8'})
	    res.end(cons);
	    
	
	}
	
	
});

server1.listen(8080,function(){
	console.log('server listening 8080 port success')
})
