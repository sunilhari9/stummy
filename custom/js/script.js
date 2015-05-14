$(document).ready(function(){
var cartJson = {};
	var itemsArray = [];
	var items;
	var LineItems;
	
//if(sessionStorage.getItem('LineItems') == undefined){
$.getJSON( "custom/js/LineItems.json", function( items ) {
	sessionStorage.setItem('LineItems',JSON.stringify(items));
	init();
});
/*}else{
init();
}*/
    /*Modal window stlying Css class apply*/
     $(".customizeFoodHeader").parent().addClass("customizeFoodModel")
    /*End*/
	function init(){
		cartJson.itemsArray = itemsArray;
		items = JSON.parse(localStorage.getItem('products'));
		console.log(items.length);
		LineItems = JSON.parse(sessionStorage.getItem('LineItems'));
		console.log(LineItems.length);
	}
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
	$('body').on('click','.glyphicon-edit',function(){
		console.log("clicked edit");
		var currentVal = $(this).prev().prev().text() || $(this).prev().prev().val();
		console.log("currentVal:"+currentVal);
		var product_code = $(this).prev().prev().data('product-code');
		console.log("product_code:"+product_code);
		var product_name = $(this).prev().prev().data('product-name');
		console.log("product_name:"+product_name);
		var ul_items="";
		for(var i=0;i<parseInt(currentVal);i++){
			$.each(LineItems, function(index, value) {
				console.log("value.ProductCode:"+value.ProductCode);
				var ul_item = "";
				if (value.ProductCode == product_code) {
				ul_item = "<div class='product-name'>"+product_name+" "+(i+1)+":</div>"+"<ul class='product-line-items clearfix'>";
					console.log(value.ProductsLineList);
					var total = value.ProductsLineList.length;var inddex=0;
					$.each(value.ProductsLineList, function(index1, value1) {
						console.log(value1);
						var li_item = '';
						/*if(value1.default)
							li_item = '<li><input type=radio name="product-line-items-selection'+i+'" value="'+value1.ProductLineItemCode+'" checked=checked>'+value1.ProductLineItemName+'</li>';
						else*/
						li_item = '<li><input type=radio name="product-line-items-selection'+i+'" value="'+value1.ProductLineItemCode+'">'+value1.ProductLineItemName+'</li>';
						ul_item += li_item;
						inddex = index1+1;
					});
					//if(total == inddex)return false;
				}
				console.log("ul_itema:"+ul_item);
				ul_items += ul_item+"</ul>";
			});
		}
		console.log(ul_items);
		$('.customizeFoodBody').html(ul_items+'<button id="customizeFoodBut">Update &amp; Add to Cart</button><input type=hidden id=current_product_code value="'+product_code+'"/><input type=hidden id=current_product_name value="'+product_name+'"/><input type=hidden id=current_product_qty value="'+currentVal+'"/><div id=errorMsgs></div>');
		$('#customizeFood').modal('show');		
	});
	
	$('body').on('click','#customizeFoodBut',function(){	
	var currentCartJSON = {};
	if(sessionStorage.getItem('cartJson') != undefined && sessionStorage.getItem('cartJson').length>0)
		currentCartJSON = JSON.parse(sessionStorage.getItem('cartJson'));
	console.log(Object.keys(currentCartJSON).length);
	if(Object.keys(currentCartJSON).length == 0){
		currentCartJSON = {};
		currentCartJSON.itemsArray = [];
	}
	var currentItemsArray = currentCartJSON.itemsArray;
	console.log("currentItemsArray:"+currentItemsArray);
	
	var selectedLineItems = [];
	var selectedItem = {};
	selectedItem.product_code = $('#current_product_code').val();
	selectedItem.product_name = $('#current_product_name').val();
	selectedItem.product_qty = $('#current_product_qty').val();
	$('#errorMsgs').html('');
	for(var i=0;i<parseInt($('#current_product_qty').val());i++){
	console.log('insie'+$('input[name=product-line-items-selection'+i+']:checked').val());
		if($('input[name=product-line-items-selection'+i+']:checked').val() != undefined)
		{
			selectedLineItems.push($('input[name=product-line-items-selection'+i+']:checked').val());		
		}
		else
		{	
			if(parseInt($('#current_product_qty').val())>1)
				$('#errorMsgs').html("Choose any one option to proceed under each section");
			else
				$('#errorMsgs').html("Choose any one option to proceed");
		}
	}
	selectedItem.product_lineitems = selectedLineItems;
	
	
	if($('#errorMsgs').text().length == 0){
		currentItemsArray.push(selectedItem);
		currentCartJSON.itemsArray = currentItemsArray;
		console.log("finally:"+JSON.stringify(currentCartJSON));
		//currentItemsArray.push(currentCartJSON);
		//currentCartJSON.itemsArray = currentItemsArray;
		sessionStorage.setItem('cartJson',JSON.stringify(currentCartJSON));
		renderCart();
		$('#customizeFood').modal('hide');

	}
	});
	$('body').on('click','.glyphicon-shopping-cart',function(){
		console.log("clicked edit");
		var currentVal = $(this).prev().prev().text() || $(this).prev().prev().val();
		console.log("currentVal:"+currentVal);
		var product_code = $(this).prev().prev().data('product-code');
		console.log("product_code:"+product_code);
		var product_name = $(this).prev().prev().data('product-name');
		console.log("product_name:"+product_name);
		var ul_items="";
		var currentCartJSON = JSON.parse(sessionStorage.getItem('cartJson'));
		var currentItemsArray = currentCartJSON.itemsArray;
		console.log("currentItemsArray:"+currentItemsArray);
		var selectedLineItems = [];
		var selectedItem = {};
		selectedItem.product_code = product_code;
		selectedItem.product_name = product_name;
		selectedItem.product_qty = currentVal;
		for(var i=0;i<parseInt(currentVal);i++){
			$.each(LineItems, function(index, value) {
				if (value.ProductCode == product_code) {
					console.log(value.ProductsLineList);
					$.each(value.ProductsLineList, function(index1, value1) {
						selectedLineItems.push(value1.default);
					});
				}
			});
		}
		selectedItem.product_lineitems = selectedLineItems;		
		currentCartJSON.itemsArray = selectedItem;
		console.log("finally:"+JSON.stringify(currentCartJSON));
		sessionStorage.setItem('cartJson',JSON.stringify(cartJson));
	});
	var renderCart = function(){
		console.log("rendering the cart logic goes here:"+sessionStorage.getItem('cartJson'));
	};
});
