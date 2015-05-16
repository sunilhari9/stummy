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
	function init(){
		cartJson.itemsArray = itemsArray;
		items = JSON.parse(localStorage.getItem('products'));
		LineItems = JSON.parse(sessionStorage.getItem('LineItems'));
		renderCart();
	}
	$('body').on('click','.cartMinus1,.glyphicon-chevron-left',function(){		
		var currentVal = $(this).next().text() || $(this).next().val();
		if(currentVal > 1){
			$(this).next().text(parseInt(currentVal)-1);
			$(this).next().val(parseInt(currentVal)-1);
		}
	});
	$('body').on('click','.cartPlus1,.glyphicon-chevron-right',function(){
		var currentVal = $(this).prev().text() || $(this).prev().val();
		if(currentVal >= 1){
			$(this).prev().text(parseInt(currentVal)+1);
			$(this).prev().val(parseInt(currentVal)+1);
		}
	});
	$('body').on('click','.glyphicon-edit',function(){
		var currentVal = $(this).prev().prev().text() || $(this).prev().prev().val();
		var product_code = $(this).prev().prev().data('product-code');
		var product_name = $(this).prev().prev().data('product-name');
		var ul_items="";
		for(var i=0;i<parseInt(currentVal);i++){
			$.each(LineItems, function(index, value) {
				var ul_item = "";
				if (value.ProductCode == product_code) {
				ul_item = "<div class='product-name'>"+product_name+" "+(i+1)+":</div>"+"<ul class='product-line-items clearfix'>";
					$.each(value.ProductsLineList, function(index1, value1) {
						var li_item = '<li><input type=radio name="product-line-items-selection'+i+'" value="'+value1.ProductLineItemCode+'">'+value1.ProductLineItemName+'</li>';
						ul_item += li_item;
					});
				}
				ul_items += ul_item+"</ul>";
			});
		}
		$('.customizeFoodBody').html(ul_items+'<button id="customizeFoodBut">Update &amp; Add to Cart</button><input type=hidden id=current_product_code value="'+product_code+'"/><input type=hidden id=current_product_name value="'+product_name+'"/><input type=hidden id=current_product_qty value="'+currentVal+'"/><div id=errorMsgs></div>');
		$('#customizeFood').modal('show');		
	});
	
	$('body').on('click','#customizeFoodBut',function(){	
		var currentCartJSON = {};
		if(localStorage.getItem('cartJson') != undefined && localStorage.getItem('cartJson').length>0)
			currentCartJSON = JSON.parse(localStorage.getItem('cartJson'));
		if(Object.keys(currentCartJSON).length == 0){
			currentCartJSON = {};
			currentCartJSON.itemsArray = [];
		}
		var currentItemsArray = currentCartJSON.itemsArray;		
		if(currentItemsArray.length > 0){
			if(!existsProduct(currentItemsArray,$('#current_product_code').val()))
				saveItemToCart();
			else{
				updateItemToCart();
				$('#customizeFood').modal('hide');
			}
		}else
			saveItemToCart();		
	});
	
	var saveItemToCart = function(){
		var selectedLineItems = [];
		var selectedItem = {};
		var currentCartJSON = {};
		if(localStorage.getItem('cartJson') != undefined && localStorage.getItem('cartJson').length>0)
			currentCartJSON = JSON.parse(localStorage.getItem('cartJson'));
		if(Object.keys(currentCartJSON).length == 0){
			currentCartJSON = {};
			currentCartJSON.itemsArray = [];
		}
		var currentItemsArray = currentCartJSON.itemsArray;
		selectedItem.product_code = $('#current_product_code').val();
		selectedItem.product_name = $('#current_product_name').val();
		selectedItem.product_qty = $('#current_product_qty').val();
		$('#errorMsgs').html('');
		for(var i=0;i<parseInt($('#current_product_qty').val());i++){
			if($('input[name=product-line-items-selection'+i+']:checked').val() != undefined)
				selectedLineItems.push($('input[name=product-line-items-selection'+i+']:checked').val());
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
			localStorage.setItem('cartJson',JSON.stringify(currentCartJSON));
			renderCart();
			$('#customizeFood').modal('hide');
			$('.messagesBar').html("Cart updated successfully");
			$('.messagesBar').show('slow').delay(3000).fadeOut('slow');
		}
	};
	
	function existsProduct(array,product_code){
		var flag = false;
		for (var i = 0; i < array.length; i++) {
			if (array[i].product_code == product_code) {
				flag = true;
			}
		}
		return flag;
	};
	
	var updateItemToCart = function(){
		var selectedLineItems = [];
		var selectedItem = {};
		var currentCartJSON = {};
		if(localStorage.getItem('cartJson') != undefined && localStorage.getItem('cartJson').length>0)
			currentCartJSON = JSON.parse(localStorage.getItem('cartJson'));
		if(Object.keys(currentCartJSON).length == 0){
			currentCartJSON = {};
			currentCartJSON.itemsArray = [];
		}
		var currentItemsArray = currentCartJSON.itemsArray;
		$('#errorMsgs').html('');
		for(var i=0;i<parseInt($('#current_product_qty').val());i++){
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
		if($('#errorMsgs').text().length == 0){
			for (var i=0; i<currentItemsArray.length; i++) {
			  if (currentItemsArray[i].product_code == $('#current_product_code').val()) {
				currentItemsArray[i].product_qty = parseInt(currentItemsArray[i].product_qty) + parseInt($('#current_product_qty').val());
				$.merge(currentItemsArray[i].product_lineitems,selectedLineItems);
				break;
			  }
			}	
			currentCartJSON.itemsArray = currentItemsArray;
			localStorage.setItem('cartJson',JSON.stringify(currentCartJSON));
			renderCart();
			$('#customizeFood').modal('hide');
			$('.messagesBar').html("Cart updated successfully");
			$('.messagesBar').show('slow').delay(3000).fadeOut('slow');
		}
	};
	$('body').on('click','.glyphicon-shopping-cart',function(){
		var currentVal = $(this).siblings( ".quantity" ).text();
		console.log("sibling:"+$(this).siblings( ".quantity" ).data('product-code'));
		var product_code = $(this).siblings( ".quantity" ).data('product-code');
		var product_name = $(this).siblings( ".quantity" ).data('product-name');
		var ul_items="";		
		var currentCartJSON = {};
		if(localStorage.getItem('cartJson') != undefined && localStorage.getItem('cartJson').length>0)
			currentCartJSON = JSON.parse(localStorage.getItem('cartJson'));
		if(Object.keys(currentCartJSON).length == 0){
			currentCartJSON = {};
			currentCartJSON.itemsArray = [];
		}
		var currentItemsArray = currentCartJSON.itemsArray;
		var selectedLineItems = [];
		var selectedItem = {};
		selectedItem.product_code = product_code;
		selectedItem.product_name = product_name;
		selectedItem.product_qty = currentVal;
		for(var i=0;i<parseInt(currentVal);i++){
			$.each(LineItems, function(index, value) {
				if (value.ProductCode == product_code) {
					$.each(value.ProductsLineList, function(index1, value1) {
						if(value1.default)
							selectedLineItems.push(value1.ProductLineItemCode);
					});
				}
			});
		}
		if(currentItemsArray.length > 0){
			if(!existsProduct(currentItemsArray,product_code))
			{ 
				selectedItem.product_lineitems = selectedLineItems;
				currentCartJSON.itemsArray.push(selectedItem);
			}
			else{
				for (var i=0; i<currentItemsArray.length; i++) {
				  if (currentItemsArray[i].product_code == product_code) {
					currentItemsArray[i].product_qty = parseInt(currentItemsArray[i].product_qty) + parseInt(currentVal);
					$.merge(currentItemsArray[i].product_lineitems,selectedLineItems);
					break;
				  }
				}
			}
		}else{
			selectedItem.product_lineitems = selectedLineItems;
			currentCartJSON.itemsArray.push(selectedItem);
		}
		localStorage.setItem('cartJson',JSON.stringify(currentCartJSON));
		renderCart();
		$('.messagesBar').html("Cart updated successfully");
		$('.messagesBar').show('slow').delay(3000).fadeOut('slow');
	});
	$('body').on('click','.cartMinus',function(){		
		var currentVal = $(this).next().text() || $(this).next().val();
		console.log("currentVal:"+currentVal);
		if(currentVal > 1){
			$(this).next().text(parseInt(currentVal)-1);
			$(this).next().val(parseInt(currentVal)-1);
		
		currentVal = parseInt(currentVal)-1;
		console.log("currentVal:"+currentVal);
		//var currentVal = $(this).siblings( ".quantity" ).text();
		console.log("sibling:"+$(this).siblings( ".quantity" ).data('product-code'));
		var product_code = $(this).siblings( ".quantity" ).data('product-code');
		var product_name = $(this).siblings( ".quantity" ).data('product-name');
		var ul_items="";		
		var currentCartJSON = {};
		if(localStorage.getItem('cartJson') != undefined && localStorage.getItem('cartJson').length>0)
			currentCartJSON = JSON.parse(localStorage.getItem('cartJson'));
		if(Object.keys(currentCartJSON).length == 0){
			currentCartJSON = {};
			currentCartJSON.itemsArray = [];
		}
		var currentItemsArray = currentCartJSON.itemsArray;
		var selectedLineItems = [];
		var selectedItem = {};
		selectedItem.product_code = product_code;
		selectedItem.product_name = product_name;
		selectedItem.product_qty = currentVal;
		//for(var i=0;i<parseInt(currentVal);i++){
			$.each(LineItems, function(index, value) {
				if (value.ProductCode == product_code) {
					$.each(value.ProductsLineList, function(index1, value1) {
						if(value1.default)
							selectedLineItems.push(value1.ProductLineItemCode);
					});
				}
			});
		//}

		for (var i=0; i<currentItemsArray.length; i++) {
		  if (currentItemsArray[i].product_code == product_code) {
			currentItemsArray[i].product_qty = parseInt(currentVal);
			//$.merge(currentItemsArray[i].product_lineitems, selectedLineItems);
			//console.log(currentItemsArray[i].product_lineitems);
			//console.log(JSON.stringify(currentItemsArray[i].product_lineitems));
			currentItemsArray[i].product_lineitems.pop();
			//console.log(currentItemsArray[i].product_lineitems);
			break;
		  }
		}			
		localStorage.setItem('cartJson',JSON.stringify(currentCartJSON));
		renderCart();
		$('.messagesBar').html("Cart updated successfully");
		$('.messagesBar').show('slow').delay(3000).fadeOut('slow');
		}
	});
	$('body').on('click','.cartPlus',function(){
		var currentVal = $(this).prev().text() || $(this).prev().val();
		if(currentVal >= 1){
			$(this).prev().text(parseInt(currentVal)+1);
			$(this).prev().val(parseInt(currentVal)+1);
		}
	});
	var renderCart = function(){
		var cartTotalItems = JSON.parse(localStorage.getItem('cartJson'));
		if(cartTotalItems != undefined){
			cartTotalItemsLength = cartTotalItems.itemsArray.length
			if(cartTotalItemsLength > 0){
				$('.cartItemCount').html(cartTotalItemsLength);
				$('.cartItemCount').addClass('active');
				$clone = $('.cartListTemplate').clone();
				$('#cartItemDesc').html('');
				for(var index = 0;index<cartTotalItemsLength;index++){
					var eachItemData = cartTotalItems.itemsArray[index];
					$clone.find('.quantity').text(eachItemData.product_qty);
					console.log(eachItemData.product_code);
					$clone.find('.quantity').attr('data-product-code',eachItemData.product_code);
					$clone.find('.quantity').attr('data-product-name',eachItemData.product_name);
					$clone.find('.product_name_cart').text(eachItemData.product_name);
					$('#cartItemDesc').append($clone.html());
				}
			}else{
				$('.cartItemCount').html("0");
				$('#cartItemDesc').html("<div>No items yet</div>");
			}
		}else{
			$('.cartItemCount').html("0");
			$('#cartItemDesc').html("<div>No items yet</div>");
		}			
	};
});
