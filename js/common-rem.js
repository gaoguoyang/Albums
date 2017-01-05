	
$(function(){
	function resetPage() {
			
		// rem设置
		//设置font-size
		var fontsize = 16 * $(window).width() / 320;
			if(fontsize > 24){
				fontsize = 24;
			}
		
		$('html').css('font-size',fontsize);
	}
	resetPage();
	window.onresize = function(){
		resetPage();
	}
})

