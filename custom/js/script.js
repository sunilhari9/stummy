$(document).ready(function(){
	$('body').on('click','.glyphicon-minus,.glyphicon-chevron-left',function(){
		console.log("clicked minus");
		var currentVal = $(this).next().text() || $(this).next().val();
		console.log("clicked minus:"+currentVal);
		if(currentVal > 1){
			$(this).next().text(parseInt(currentVal)-1);
			$(this).next().val(parseInt(currentVal)-1);
		}
	});
	$('body').on('click','.glyphicon-plus,.glyphicon-chevron-right',function(){
		console.log("clicked plus");
		var currentVal = $(this).prev().text() || $(this).prev().val();
		if(currentVal >= 1){
			$(this).prev().text(parseInt(currentVal)+1);
			$(this).prev().val(parseInt(currentVal)+1);
		}
	});
});
