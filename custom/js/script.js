$(document).ready(function(){
	var cartJson = {};
	var itemsArray = [];
	cartJson.itemsArray = itemsArray;
	sessionStorage.setItem('cartJson',JSON.stringify(cartJson));
	var items = JSON.parse(sessionStorage.getItem('products'));
	console.log(items.length);
	var LineItems = JSON.parse(sessionStorage.getItem('LineItems'));
	console.log(LineItems.length);
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
			var ul_item = "<ul>"+product_name+" "+(i+1)+":";
			$.each(LineItems, function(index, value) {
				if (value.ProductCode == product_code) {
					console.log(value.ProductsLineList);
					$.each(value.ProductsLineList, function(index1, value1) {
						console.log(value1);
						var li_item = '<li><input type=radio name="product-line-items-selection'+i+'" value="'+value1.ProductLineItemCode+'">'+value1.ProductLineItemName+'</li>';
						ul_item += li_item;
					});
				}
				console.log("ul_itema:"+ul_item);
				ul_items += ul_item+"</ul>";
			});
		}
		console.log(ul_items);
		$('.customizeFoodBody').html(ul_items+'<button id=customizeFoodBut>Update &amp; Add to Cart</button><input type=hidden id=current_product_code value="'+product_code+'"/><input type=hidden id=current_product_name value="'+product_name+'"/><input type=hidden id=current_product_qty value="'+currentVal+'"/><div id=errorMsgs></div>');
		$('#customizeFood').modal('show');		
	});//cartList
	
	$('body').on('click','#customizeFoodBut',function(){	
	var currentCartJSON = JSON.parse(sessionStorage.getItem('cartJson'));
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
		currentCartJSON.itemsArray = selectedItem;
			console.log("finally:"+JSON.stringify(currentCartJSON));
				sessionStorage.setItem('cartJson',JSON.stringify(cartJson));


	}
	});
});
