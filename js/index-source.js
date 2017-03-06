//原生JS模块（未学习jquery前编写）
window.onload = function(){
	//顶部向左无缝滚动
	var scroll = document.getElementById('scroll'),
	scrollText = document.getElementById('scroll-text'),
	timer = null;
	scrollText.innerHTML += scrollText.innerHTML;

	function startScroll(){
		if(scroll.scrollLeft>=scroll.offsetWidth){
			scroll.scrollLeft = 0;
		}else{
			scroll.scrollLeft++;
		}
	}
	timer = setInterval(startScroll,10);
	scroll.onmouseover = function(){
		clearInterval(timer);
	}
	scroll.onmouseout = function(){
		timer = setInterval(startScroll,10);
	}
	
	//tab切换效果
	var page = document.getElementById('page'),
	pageup = document.getElementById('pageup'),
	pagedown = document.getElementById('pagedown'),
	pageA = page.getElementsByTagName('a'),
	videoMain = document.getElementById('video-main'),
	videoMainWrap = document.getElementById('video-main-wrap'),
	Lis = videoMainWrap.getElementsByTagName('li'),
	Left = 780,
	target = 0,
	time = null;
	
	for(var i=0;i<pageA.length;i++){
		pageA[i].index = i;
		pageA[i].onmouseover = function(){
			clearInterval(time);
			for(var j=0;j<pageA.length;j++){
				pageA[j].className = "";
			}
			this.className = "page-active";
			scrollLeft(this.index);
		}
	}
	
	//跟随页码的值滚动不同
	function scrollLeft(i){
		clearInterval(time);
		target = i*Left;
		time = setInterval(function(){
			if(videoMain.scrollLeft==target){
				clearInterval(time);
			}else if(videoMain.scrollLeft>target){
				videoMain.scrollLeft-=20;
			}else{
				videoMain.scrollLeft+=20;
			}
		},10)
	}
	
	//下一页点击切换
	pagedown.onclick = function(){
		for(var i=0;i<pageA.length;i++){
			if(pageA[i].className=="page-active"){
				if(i!=(pageA.length-1)){
					scrollLeft(i+1);
					pageA[i].className = "";
					pageA[i+1].className = "page-active"
					break;
				}else{
					alert("没有下一页了！");
				}
			}
		}
	}
	
	//上一页点击切换
	pageup.onclick = function(){
		for(var i=0;i<pageA.length;i++){
			if(pageA[i].className=="page-active"){
				if(i!=0){
					scrollLeft(i-1);
					pageA[i].className = "";
					pageA[i-1].className = "page-active"
					break;
				}else{
					alert("没有上一页了！");
				}
			}
		}
	}
	
	//列表以及页码自动轮播
	function automatic(){
		for(var i=0;i<pageA.length;i++){
			Len = pageA.length - 1;
			if(pageA[i].className=="page-active"){
				if(i==Len){
					pageA[i].className = "";
					pageA[0].className = "page-active";
					scrollLeft(0);
					break;
				}else{
					pageA[i].className = "";
					pageA[i+1].className = "page-active";
					scrollLeft(i+1);
					break;
				}
			}
		}
	}
	var fixedTime = setInterval(automatic,2500);
	
	//鼠标事件触发轮播停止以及继续轮播
	page.onmouseover = function(){
		clearInterval(fixedTime);
	}
	page.onmouseout = function(){
		fixedTime = setInterval(automatic,2500);
	}
	videoMain.onmouseover = function(){
		clearInterval(fixedTime);
	}
	videoMain.onmouseout = function(){
		fixedTime = setInterval(automatic,2500);
	}
	
	//阻止a标签跳转
	var As = document.getElementsByTagName("a");
	for(var i=0;i<As.length;i++){
		As[i].onclick = stopDefault;
	}
	function stopDefault(event) {
		event = event || window.event;
		if(event.preventDefault) 
			event.preventDefault(); 
		else{
			event.returnValue = false; 
		}
	}
}