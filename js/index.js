$(function(){
	//	初始化
	function init(){
		$(".page2 .pic").eq(0).addClass("curr");
		$(".page2 .pic").eq(1).addClass("next");
		
		var nextTop = $(".page2 .curr").height()-10;
		
		$('.page2 .pic').each(function(){
			var currIndex = $(".page2 .curr").index();
			var thisIndex = $(this).index();
			var thisTop = nextTop + (thisIndex-currIndex-1)*100;
			$(this).css('top',thisTop);
		})
		$(".page2 .curr").css("top","0");
		$(".page2 .next").css('top',nextTop);
	}
		
	//	第一屏事件
	$(".page1")[0].addEventListener('touchstart',function(e){
		e.preventDefault();
		var touch = e.touches[0];
		startPosition = {
			y: touch.pageY
		}
		
	})
	$(".page1")[0].addEventListener('touchmove',function(e){
		e.preventDefault();
		var touch = e.touches[0];
		endPosition = {
			y: touch.pageY
		}
		deltaY = endPosition.y - startPosition.y;
	})
	$(".page1")[0].addEventListener('touchend',function(e){
		e.preventDefault();
		MdeltaY = Math.abs(deltaY);
		if((deltaY<0)&&(MdeltaY>80)){
			$("html,body").animate({scrollTop:$(".page2").offset().top},1000);
			setTimeout(function(){
				$(".rightBtn").fadeIn(1000);
				$(".blessing").fadeIn(1000);
				$(".praises").fadeIn(1000);
				$(".praise").eq(0).fadeIn(1000);
			},1000)
			
		}
	})
	
	//	第二屏事件
	var pics = document.querySelectorAll(".page2 .pic");
	for(var i=0;i<pics.length;i++){
		pics[i].addEventListener('touchstart', function (e) {
			e.preventDefault();
	        var touch = e.touches[0];
	        startPosition = {
	            y: touch.pageY
	        }
	        $(".praise").hide();
	    },true);
	    pics[i].addEventListener('touchmove',function(e){
	    	e.preventDefault();
	    	var touch = e.touches[0];
	    	endPosition = {
	    		y: touch.pageY
	    	}
	    	deltaY = endPosition.y - startPosition.y;
	    	
	    },true)
	    pics[i].addEventListener('touchend',function(e){
	    	e.preventDefault();
	    	MdeltaY = Math.abs(deltaY);
	    	if((deltaY<0)&&(MdeltaY>80)){
				if($(this).hasClass("curr")){
					$(this).next().next().addClass("next").siblings().removeClass("next");
					$(this).next().addClass("curr").removeClass("next").siblings().removeClass("curr");
				}else{
					$(this).next().addClass("next").siblings().removeClass("next");
					$(this).addClass("curr").removeClass("next").siblings().removeClass("curr");
				}
				
				var nextTop = $(".page2 .curr").height()-10;

				$('.page2 .pic').each(function(){
					var currIndex = $(".page2 .curr").index();
					var thisIndex = $(this).index();
					var thisTops = (thisIndex-currIndex)*100;
					var thisTopx = nextTop + (thisIndex-currIndex-1)*100;
					
					if(thisIndex>currIndex){
						$(this).animate({
							top:thisTopx
						},"slow")
					}else if(thisIndex<currIndex){
						$(this).animate({
							top: thisTops
						},"slow")
					}
					
					setTimeout(function(){
						$(".praise").eq(currIndex).fadeIn(300).siblings().hide();
					},700)
					
						
				})
				$(".page2 .curr").animate({
					top: 0
				},"slow");
				$(".page2 .next").animate({
					top: nextTop
				},"slow")
				
			}
	    	if((deltaY>0)&&(MdeltaY>80)){
	    		$('.page2 .pic').eq(0).addClass("curr").siblings().removeClass("curr");
				$('.page2 .pic').eq(0).next().addClass("next").siblings().removeClass("next");
				
				var nextTop = $(".page2 .curr").height()-10;
				$('.page2 .pic').each(function(){
					var currIndex = $(".page2 .curr").index();
					var thisIndex = $(this).index();
					var thisTop = nextTop + (thisIndex-currIndex-1)*100;
					$(this).stop().animate({
						top:thisTop
					},"slow");
					setTimeout(function(){
						$(".praise").eq(currIndex).fadeIn(300).siblings().hide();
					},700)
					
				})
				$(".page2 .curr").stop().animate({
					top: 0
				},"slow");
				$(".page2 .next").stop().animate({
					top: nextTop
				},"slow");
				
				
				
			}
	    	
	    },true)
	    
	}
	//	右侧按钮点击
	$(".rightBtn .switch").click(function(){
		$(this).fadeOut(1000);
		setTimeout(function(){
			$(".translucence").fadeIn(500);
			$(".rightBtn nav .a1").removeClass("Animation2");
			$(".rightBtn nav .a2").removeClass("Animation2");
			$(".rightBtn nav .a3").removeClass("Animation2");
			$(".rightBtn nav .a1").addClass("Animation");
			$(".rightBtn nav .a2").addClass("Animation");
			$(".rightBtn nav .a3").addClass("Animation");
			$(".rightBtn").css("width","5.25rem");
			$(".rightBtn .btns .close_btn").css("top","6.75rem");
			$(".rightBtn .btns .close_btn").fadeIn(3000);
		},1001)
		
	})
	//	右侧按钮点击关闭
	$(".rightBtn .btns .close_btn").click(function(){
		$(".translucence").fadeOut(3000);
		$(".rightBtn nav .a1").removeClass("Animation");
		$(".rightBtn nav .a2").removeClass("Animation");
		$(".rightBtn nav .a3").removeClass("Animation");
		$(".rightBtn nav .a1").addClass("Animation2");
		$(".rightBtn nav .a2").addClass("Animation2");
		$(".rightBtn nav .a3").addClass("Animation2");
		$(".rightBtn").css("width","auto");
		$(".rightBtn .btns .close_btn").fadeOut(500);
		setTimeout(function(){
			$(".rightBtn .switch").fadeIn(1000);
		},1800)
	})
	//	点击祝福按钮
	$(".blessing").click(function(){
		$(this).addClass("Animation");
		setTimeout(function(){
			$(".blessing2").fadeIn(800);
		},500)
	})
	//	点赞
	$(".praise").click(function(){
		event.stopPropagation();
		$(this).find("img").attr("src","images/icon_03_07.png");
		var num = $(this).find("span").html();
		num++;
		$(this).find("span").html(num);
	})
//-----------------------------------------------预加载---------------------------------------------------
	var loadCount = {        
            total:0,
            done:0,
            curr:0,
            process:0,
            output:0
    };
	var load = function(){
        
        var anmObjList = $('.anmObj');
        loadCount.total = anmObjList.length;
        loadAttr.part = 100 / loadCount.total;
        anmObjList.each(function(){
            var thisObj = $(this)[0];
            var img = new Image();
            var url = '';
            if(thisObj.nodeName == 'DIV'){
                url = thisObj.style.backgroundImage;
                url = url.substring(url.indexOf('http'),url.indexOf('jpg') +3);
            }else{
                url = thisObj.src;
            }
           
            img.src = url  ;
            if (img.complete) {
				//xa.debug.cache ++;
                isLoadDone();
            } else {
                img.onload = function () {
					//xa.debug.net ++;
                    isLoadDone();
                };
                img.onerror = function () {
					//xa.debug.error ++;
                    isLoadDone();
                    var errItem = $(thisObj).parents('.item');                    
                    if(errItem.attr('noteid') != 'cover' && errItem.attr('noteid') != 'bless' && errItem.attr('noteid') > 0 ){
                        errItem.remove();
                    }
                };
            }
        });
        
    };
    isLoadDone = function(){
        loadCount.done ++;
        clearTimeout(loadAttr.loadTimer);
        setLoading();
    };
    var loadAttr = {
        baseSpeed: 2000/ 100,
        loadTimer: 0,
        num:0,
        part: 0
    };
    setLoading = function(){
        var process = loadCount.done - loadCount.curr;    //未完成的  
        loadCount.curr += process;
        if(loadCount.done == loadCount.total){
            loadAttr.num = 100;
        }else{
            loadAttr.num += Math.floor(process * loadAttr.part);
        }        
        thisSpeed = loadAttr.baseSpeed -  loadAttr.baseSpeed * (loadAttr.num / 100);  
        thisSpeed = thisSpeed < 10 ? 10: thisSpeed;
        if(!loadAttr.num){
            return false;
        }
        loadCount.output++;
        loadAttr.num--;
        loadCount.output = loadCount.output > 100 ? 100 : loadCount.output;
        
        $('#loadingText').text('loading……' + loadCount.output + ' %');
        if (loadCount.output < 100) {
            loadAttr.loadTimer = setTimeout(setLoading, thisSpeed);
        }else{
            setTimeout(function(){
                clearTimeout(loadAttr.loadTimer);
                $('#loading').hide();
				$(".box").show();
				init();
//				document.getElementById('music').play();
            },200);
        }
    };
    load(); 
//----------------------------------------------预加载结束-----------------------------------------

	
	
	
})
