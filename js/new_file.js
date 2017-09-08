//文档加载后执行
$(document).ready(function(){
	var close = getClass("span","close"),  //关闭按钮
	    drag = document.getElementById("drag"), //拖拽区域
	    state = getClass("div","select"),  //在线状态
	    statelist = document.getElementById("select-list"), //在线状态列表
	    Input = document.getElementsByTagName("input"); //input集合
	    id = "online"; //默认状态是在线
	loginplane = getClass("div","loginplane"); //登录面板
	    
	//关闭qq登录面板
	addEvent(close,"click",function(){
	    loginplane.style.display = "none";
	});
	    
	//面板拖拽
	addEvent(drag,"mousedown",function(e){
		offsetx = getEven(e).clientX - loginplane.offsetLeft;
		offsety = getEven(e).clientY - loginplane.offsetTop;
		//鼠标移动
		addEvent(document,"mousemove",planeDrag);
		//鼠标释放
		document.onmouseup = function(){
			stopEvent(document,"mousemove",planeDrag);
	    };
	});
    
    //输入框失去焦点和获取焦点事件
    for(var i in Input){
    	var value ;
    	Input[i].onfocus = function(){
    		value = this.value;
    		this.value = "";
    	};
    	Input[i].onblur = function(){
    	    this.value = value;
    	};
    }
    
    //设置在线状态
    addEvent(state,"click",function(e){
    	var li = statelist.getElementsByTagName("li"),
    		select = getClass("div","select"),
    		logo = select.getElementsByTagName("b"),
    		txt = select.getElementsByTagName("span");
    	preventBubble(getEven(e));
    	    
    	//显示下拉列表
        statelist.style.display = "block";
    	//鼠标移动时列表样式
    	for(var i in li){
    		li[i].onmousemove = function(){
    			
    			this.style.backgroundColor = "#ccc";
    		};
    		li[i].onmouseleave = function(){
    			this.style.backgroundColor = "#fff";
    		};
    		li[i].onclick = function(e){
    			    preventBubble(getEven(e));
    			    $(logo[0]).removeClass(id);
    			    txt[0].innerText = this.getElementsByTagName("span")[0].innerText;
    			    id = this.id;
	                $(logo[0]).addClass(id);
	                statelist.style.display = "none";
    		};
    	}
    });
    
    //鼠标点击其他地方在线状态菜单隐藏
    document.onclick = function(){
    	statelist.style.display = "none";
    }
  
});

//面板拖拽
function planeDrag(e){
	var maxw = getClientW() - loginplane.offsetWidth; 
	var maxh = getClientH() - loginplane.offsetHeight;
	var w = getEven(e).clientX - offsetx;
	var h = getEven(e).clientY - offsety;
	if(w < 0){
		w = 0;
	}else if(w > maxw){
		w = maxw;
	}
	if(h < 0){
		h = 0;
	}
	else if(h > maxh){
		h = maxh;
	}
	loginplane.style.left = w + "px"
	loginplane.style.top = h + "px";
}
