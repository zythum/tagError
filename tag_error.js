(function(window,document){
	var  aWindow
		,output
		,msg
		,indentPxDOM
		,singleTagDOM
	var time = [
		 (new Date()).getTime().toString()
		,Math.random().toString().replace('.','')
		,''
	].join('_')
	var style = {
		tool: [
			 'padding:10px'
		 	,'margin:0'
		 	,'color:#fff'
			,'position:fixed'
			,'right:0'
			,'top:0'
			,'width:300px'
			,'background:#333'
			,'font-family: arial, sans-serif'
			,'box-shadow:0 0 3px #333'
			,'text-align:left'
			,'z-index:10000000'
		]
		,toolbreak: [
			 'padding:10px 0 0 0'
			,'margin:0'			
			,'text-align:left'
			,'line-height:14px'
			,'color:#fff'
			,'clear:both'
		]
		,toolspan: [
		 	 'padding:0'
		 	,'margin:0'
		 	,'font-size:14px'
		 	,'color:#fff'
		 	,'line-height:16px'
		 	,'display:block'
		 	,'float:left'
		 	,'width:80px'
		]
		,toolinput: [
			 'padding:0'
		 	,'margin:0 0 0 90px'
		 	,'color:#fff'
		 	,'line-height:16px'
		 	,'font-size:14px'
		 	,'width:30px'
		 	,'background:#333'
		 	,'border:none'
		 	,'text-align:left'
		 	,'display:block'
		]
		,toolarea: [
			 'padding:5px'
		 	,'margin:0 0 0 90px'
		 	,'color:#333'
		 	,'background:#eee'
		 	,'font-size:14px'
		 	,'text-align:left'
		 	,'border:none'
		 	,'height:100px'
		 	,'display:block'
		]
		,toolbtn: [
			 'padding:0'
		 	,'margin:0 auto'
		 	,'color:#fff'
		 	,'font-size:16px'
		 	,'width:200px'
		 	,'text-align:center'
		 	,'width:150px'
		 	,'height:30px'
		 	,'line-height:30px'
		 	,'box-shadow:0 0 2px #000'
		 	,'cursor:pointer'
		 	,'background-image:-webkit-linear-gradient(top, #555 0%,#444 100%)'
		 	,'background-image:-moz-linear-gradient(top, #555 0%,#444 100%)'
		 	,'background-image:-o-linear-gradient(top, #555 0%,#444 100%)'
		 	,'background-image:linear-gradient(top, #555 0%,#444 100%)'
		]
		,line: [
		 	 'padding:0'
		 	,'margin:0'
		 	,'color:#fff'
		 	,'font-family: arial, sans-serif'
		 	,'background:#333'
		 	,'text-align:left'
		 	,'display:block'
		 	,'text-indent:0'
			,'height:16px'
			,'line-height:16px'
			,'font-size:14px'
			,'text-overflow:ellipsis'
			,'white-space:nowrap'
			,'overflow:hidden'
			,'border-left:3px solid #999'
			,'letter-spacing:2px'
		]
		,error: [
			'background:red'
		]
		,body: [
			'background:#444'
		]
		,out: [			
			 'background:#333'
			,'overflow:auto'
			,'border:10px solid #333'
			,'box-shadow:0 0 3px #333'			
		]
		,msg: [
		 	 'padding:0'
		 	,'margin:0 0 10px 0'
		 	,'color:red'
		 	,'font-family: arial, sans-serif'
		 	,'background:#333'
		 	,'text-align:left'
		 	,'display:block'
		 	,'text-indent:0'
			,'height:16px'
			,'line-height:16px'
			,'font-size:14px'
			,'text-overflow:ellipsis'
			,'white-space:nowrap'
			,'overflow:hidden'
			,'border-bottom:3px solid #999'
			,'letter-spacing:2px'			
		]
	}
	var html = {
		tool: ''+
			'<div style="'+ style.toolbreak.join(';')+';' +'">'+
				'<span style="'+ style.toolspan.join(';')+';' +'">&#x663E;&#x793A;&#x7684;&#x7F29;&#x8FDB;:</span>'+
				'<input type="text" style="'+ style.toolinput.join(';')+';' +'" id="'+time+'indent" value="20">'+
			'</div>'+
			'<div style="'+ style.toolbreak.join(';')+';' +'">'+
				'<span style="'+ style.toolspan.join(';')+';' +'">&#x5408;&#x6CD5;&#x5355;&#x6807;&#x7B7E;:</span>'+
				'<textarea id="'+time+'single_tag" style="'+ style.toolarea.join(';')+';' +'">meta, link, base, img, br, hr, input</textarea>'+
			'</div>'+
			'<div style="'+ style.toolbreak.join(';')+';' +'">'+
				'<div id="'+time+'check_btn" style="'+ style.toolbtn.join(';')+';' +'">&#x68C0;&#x67E5;&#x6807;&#x7B7E;</div>'+
			'</div>'
	}
	var id = function(id){
		return document.getElementById(time+id)
	}
	var ajax = function (url, options){		
		var  request = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')
			,type = options.type || 'GET'
		options = options || {}
		request.open(type, url, true)
		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
		request.send()
		request.onreadystatechange = function (){
			if (request.readyState === 4 && request.status === 200 && options.success){
				options.success(request.responseText)
			}
		}
	}
	var addEvent = function(node, type, func){
		if( (typeof type).toUpperCase() == 'FUNCTION' ){
			func = type
			type = 'click'
		}
		node.addEventListener ? 
			node.addEventListener(type, func, false) :
			node.attachEvent('on' + type, func)
	}
	var handle = (function(conf){
		var //每个时间片处理的字符数
			 pieceLength = 500
			//每个时间片时间
			,pieceTime = 5
			//缩进的大小
			,indentPx = 20
			//==================================
			//单标签
			,singleTag = [
				 'meta'
				,'link'
				,'base'
				,'img'
				,'br'
				,'hr'
				,'input'
			]
			/*=================================
			* 执行队列。为了浏览器不会卡死
			arr = [{
			 	 func: function(){}
			 	,param: [1,2,4]
			 }...]
			*/
			,execLine = function(arr, callback){
				var  i = 0
					,len = arr.length
					,that = this
					,loop = function(){
						if(i < arr.length){
							arr[i].func.apply(that, arr[i].param)
							setTimeout(loop ,pieceTime)
							i = i+1
						}else{
							return callback()
						}
					}
				loop()
			}
			/*===============================
			* 组织标签数组,输出
			[
			  	"<!DOCTYPE HTML>",
			  	"",
			  	"<html lang="zh-CN">",
			  	"",
			  	"<head>",
			  	"",
			  	"<meta charset="UTF-8">",
			  	"",
			  	"<title>",
			  	"AGreatBeginning",
			  	"</title>",
			  	"",
			  	"<link rel="stylesheet" type="text/css" href="style/base.css" media="all" />",
			  	"",
			  	"<link rel="icon" href="favicon.ico" mce_href="favicon.ico" type="image/x-icon">",
			  	"",
			  	"<link rel="shortcut icon" href="favicon.ico" mce_href="favicon.ico" type="image/x-icon">",
				...
			]
			*/	
			,makeTagArr = function(htmlArr){
				var  tagArr = []
					,chars = {
						 start: '\<'
						,end: '\>'
						,quot: '\''
						,doubleQuot: '\"'
					}
					,state = {
						 inTag: false
						,inQuot: false
						,inDoubleQuot: false
					}
					,sortChar = function(aChar){
						if(aChar == chars.start && state.inDoubleQuot == false && state.inQuot == false){
							tagArr.push('')
							tagArr[ tagArr.length-1 ] += aChar
							state.inTag = true
							return
						}
						if(aChar == chars.end && state.inTag == true && state.inDoubleQuot == false && state.inQuot == false){
							tagArr[ tagArr.length-1 ] += aChar
							tagArr.push('')
							state.inTag = false
							return
						}
						if(aChar == chars.quot && state.inTag == true && state.inDoubleQuot == false && state.inQuot == false){
							tagArr[ tagArr.length-1 ] += aChar
							state.inQuot = true
							return
						}
						if(aChar == chars.quot && state.inTag == true && state.inQuot == true){
							tagArr[ tagArr.length-1 ] += aChar
							state.inQuot = false
							return
						}
						if(aChar == chars.doubleQuot && state.inTag == true && state.inDoubleQuot == false && state.inQuot == false){
							tagArr[ tagArr.length-1 ] += aChar
							state.inDoubleQuot = true
							return
						}
						if(aChar == chars.doubleQuot && state.inTag == true && state.inDoubleQuot == true){
							tagArr[ tagArr.length-1 ] += aChar
							state.inDoubleQuot = false
							return
						}		
						tagArr[ tagArr.length-1 ] += aChar
					}
					,len = htmlArr.length
					,i
				for(i=0;i<len;i++){
					sortChar(htmlArr[i])
				}
				return tagArr
			}
			/*================================================
			* 检查标签数组
			*/
			
			,check = function(tagArr){
				var  i=0
					,j=0
					,len=tagArr.length
					,aTag
					,prevTag
					,match
					,singleTagLength = singleTag.length
					,isSingleTag
					,indentArr = []
					,checkStorage = [
					//{
					// tagName:
					//,content:
					//,line:
					//}
					]
					,checkExp = {
						 startTag: /^<([-A-Za-z0-9_]+)((?:\s+[\w-]+(?:[\s|]*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/
						,endTag: /^<\/([-A-Za-z0-9_]+)[^>]*>/
					}
					,hasError = false
					,errorLine = []
				for(i; i<len; i++){
					isSingleTag = false
					aTag = tagArr[i]
					//如果开始标签
					if( match = aTag.match(checkExp.startTag) ){
						//如果单标签
						for(j=0; j<singleTagLength; j++){
							if(match[1] == singleTag[j]){
								isSingleTag = true;
								break;
							}
						}
						if(isSingleTag == true){
							indentArr.push(checkStorage.length)
							continue
						}
						//不是但标签
						indentArr.push(checkStorage.length)
						checkStorage.push({
							 tagName: match[1]
							,content: aTag
							,line: i
						})				
						continue
					}
					//如果结束标签
					if( match = aTag.match(checkExp.endTag) ){				
						prevTag = checkStorage[checkStorage.length-1]
						if(!prevTag){
							hasError = true
							errorLine = [i]
							break
						}else if(prevTag.tagName != match[1]){
							hasError = true
							errorLine = [prevTag.line, i]
							break
						}else{
							checkStorage.pop()
							indentArr.push(checkStorage.length)
							continue
						}
					}
					//如果是文字			
					indentArr.push(checkStorage.length)
				}
				if(i==len && checkStorage.length != 0){
					hasError = true
					errorLine = [checkStorage[checkStorage.length-1].line]
				}
				return 	{
					 hasError: hasError
					,errorLine: errorLine
					,errorContent: tagArr[errorLine]
					,indentArr: indentArr
				}
			}
			,show = function(out, tagArr, err){
				var  i
					,len = tagArr.length
					,aLine
					,className
					,isError = function(line){
						var  errorLine
							,errorLineLength
							,i
						if(err){
							errorLine = err.errorLine
							errorLineLength = errorLine.length
							for(i=0 ;i<errorLineLength; i++){
								if(errorLine[i] == line){
									return true
								}
							}				
						}
						return false
					}
				for(i=0; i<len; i++){
					if(!/^[\ |\r|\n|\t]*$/.test(tagArr[i])){
						aLine = document.createElement('div')
						aLine.appendChild( document.createTextNode(tagArr[i]) )
						aLine.style.cssText += ';'+( !isError(i) ? style.line.join(';') : style.line.concat(style.error).join(';') )+';'
						if(err && err.indentArr && err.indentArr[i]){
							aLine.style.marginLeft = err.indentArr[i]*indentPx + 'px'
						}
						out.appendChild(aLine);
					}
				}
				msg.innerHTML = err ? (err.hasError ? 'HAS TAG ARROR' : 'NO TAG ERROR') : ''
			}

			//=================================================
			//start
			,parseParam = function(conf){
				if( (typeof conf).toUpperCase() == 'OBJECT' ){
					pieceLength = conf.pieceLength || pieceLength
					//每个时间片时间
					,pieceTime = conf.pieceTime || pieceTime
					//缩进的大小
					,indentPx = conf.indentPx || indentPx
					//单标签
					,singleTag = conf.singleTag || singleTag
				}
			}
			,parse = function(input,output,conf){
				var html = input
					,out = output
					,htmlArr = []
					,tagArr = []
					,execArr = []
					,htmlLength
					,pieceNum					
					,err
					,i
				parseParam(conf)
				htmlLength = html.length
				pieceNum = htmlLength/pieceLength + 1
				html = html
					.replace(/<script[^>]*?>(.|\n|\r|\ )*?<\/script>/gim,'<script>...</script>')
					.replace(/<style[^>]*?>(.|\n|\r|\ )*?<\/style>/gim,'<style>...</style>')
					.replace(/<textarea[^>]*?>(.|\n|\r|\ )*?<\/textarea>/gim,'<textarea>...</textarea>')
				
				for(i=0;i<pieceNum;i=i+1){
					execArr.push({
						 func: function(piece){
						 	htmlArr = htmlArr.concat(piece.split(''))
						 	msg.innerHTML += '.'
						}
						,param:[ html.slice( i*pieceLength, (i+1)*pieceLength ) ]
					})
				}
				execLine(execArr,function(){
					tagArr = makeTagArr(htmlArr)
					err = check(tagArr)
					show(out,tagArr, err)
				})
			}
		return {
			parse : parse
		}
	})()	
	var build = function(){		
		aWindow = window.open('javascript:void(0)')
		output = document.createElement('div')
		msg = document.createElement('div')
		msg.style.cssText += ';'+style.msg.join(';')+';'
		output.style.cssText += ';'+style.out.join(';')+';'
		aWindow.document.body.style.cssText += ';'+style.body.join(';')+';'		
		msg.innerHTML = 'GETING SOURSE...'
		output.appendChild(msg)		
		aWindow.document.body.appendChild(output)
	}	
	var parse = function(conf){
		ajax(window.location.href,{
			success: function(html){
				msg.innerHTML = 'CHECKING...'
				handle.parse(html,output,conf)
			}
		})
	}
	var run = function(conf){
		build();
		parse(conf);
	}
	var getConf = function(){
		return {
			 indentPx: indentPxDOM.value
			,singleTag: singleTagDOM.value.replace(/[\n|\t|\r\ ]/g, '').split(',')
		}
	}	
	var showTool = function(){
		var tool = document.createElement('div')
		tool.style.cssText += ';'+style.tool.join(';')+';'
		tool.innerHTML = html.tool		
		document.body.appendChild(tool)
		indentPxDOM = id('indent')
		singleTagDOM = id('single_tag')
		addEvent(id('check_btn'), function(){
			run(getConf())
		})
	}		
	showTool()
})(window,document)	