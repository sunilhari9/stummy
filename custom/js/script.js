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
		
		for (var i=0; i<currentItemsArray.length; i++) {
		  if (currentItemsArray[i].product_code == product_code) {
			currentItemsArray[i].product_qty = parseInt(currentVal);
			currentItemsArray[i].product_lineitems.pop();
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
		console.log("currentVal:"+currentVal);
		if(currentVal >= 1){
			$(this).prev().text(parseInt(currentVal)+1);
			$(this).prev().val(parseInt(currentVal)+1);
		
		currentVal = parseInt(currentVal)+1;
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
			$.merge(currentItemsArray[i].product_lineitems, selectedLineItems);
			//console.log(currentItemsArray[i].product_lineitems);
			//console.log(JSON.stringify(currentItemsArray[i].product_lineitems));
			//currentItemsArray[i].product_lineitems.pop();
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
	var productsSearch = JSON.parse(localStorage.getItem('products'));
	
	
	//console.log(items);
	$('.typeahead').on('keyup',function(){		
	//$('.typeahead').keyup(function(){
	var searchKeyword = $(this).val();
	console.log("searchKeyword:"+searchKeyword);
	/*var cartTotalItems = JSON.parse(localStorage.getItem('cartJson'));
		if(cartTotalItems != undefined){
			cartTotalItemsLength = cartTotalItems.itemsArray.length;
			if(cartTotalItemsLength > 0){
				for(var index = 0;index<cartTotalItemsLength;index++){
					var eachItemData = cartTotalItems.itemsArray[index];
					//if (searchKeyword.test(eachItemData.product_name)) {
					if ( eachItemData.product_name.indexOf(searchKeyword) !== -1 ) {
						console.log("searchKeyword:"+searchKeyword);
					}
				}
			}
		}		
	*/
	if($(this).val().length >= 3){
	$('.items').html('');
		searchProduct(items,$(this).val().toLowerCase());
	}
	$(document).ready(function(){
            var maxLength = 50;
        function showLess(){
            $(".show-read-more").each(function(){
                var myStr = $(this).text();
                if($.trim(myStr).length > maxLength){
                    var newStr = myStr.substring(0, maxLength);
                    var removedStr = myStr.substring(maxLength, $.trim(myStr).length);
                    $(this).empty().html(newStr);
                    $(this).append(' <a href="javascript:void(0);" class="read-more"> More Details...</a>');
                    $(this).append('<span class="more-text">' + removedStr + '</span>');
                }
            });
            $(".read-more").click(function(){
                $(this).siblings(".more-text").contents().unwrap();
                $(this).remove();
                $(".show-read-more").append(' <a href="javascript:void(0);" class="read-less"> Less Details...</a>');
                $(".read-less").on("click",function(){
                        showLess();
	               });
            });
                     
        }
        showLess();
	
   
          });
	});
	});	
	function searchProduct(array,product_name){
	//console.log("product_name:"+product_name);
		var data = [];
		for (var i = 0; i < array.length; i++) {
		//console.log(array[i].ProductsList);
		array1 = array[i].ProductsList;
		//console.log(array1);
			for (var ii = 0; ii < array1.length; ii++) {
			//console.log(array1[ii]);
			//console.log(array1[ii].ProductName);
			if(array1[ii].ProductName != undefined){
			
			if ((array1[ii].ProductName.toLowerCase()).indexOf(product_name)  !== -1 ) {
				/*var obj = {};
				obj.product_code = array1[ii].product_code;
				obj.product_name = array1[ii].product_name;
				data.push(obj);*/
				//console.log("found");
				//console.log(array1[ii]);
				displayItemDOMSearch(array1[ii].ProductName,array1[ii].ProductCode,array1[ii].unitPrice)
			}
			}
			
		}
		}
		
	};
	var displayItemDOMSearch = function(ProductName,ProductCode,unitPrice){
        var item = '<li class="food_item media"><div class="media-left"><a href="#"><img class="img media-object hidden-xs" src="./custom/images/food/1.jpg" alt="Test"></a></div><div class="media-body media-top"><h4 class="media-heading">'+ProductName+'</h4><div class="customizeIcon"><span class="round-button">&#8377; '+unitPrice+'</span><span class="glyphicon glyphicon-minus cartMinus1" title="Click to decrease"></span><span class="quantity" data-product-code="'+ProductCode+'" data-product-name="'+ProductName+'">1</span><span class="glyphicon glyphicon-plus cartPlus1" title="Click to increase"></span><span class="glyphicon glyphicon-edit" title="Customize your food"></span><span class="glyphicon glyphicon-shopping-cart" title="Add to Cart"></span></div><div class="summary"><a href="#"><img class="img media-object visible-xs" src="./custom/images/food/1.jpg" alt="Test"></a><p class="show-read-more"> eu lacus dignissim efficitur. Proin ex metus, ornare placerat nisi at, porta lobortis turpis. Praesent euismod nec nulla ultrices maximus. Vivamus imperdiet quam ac lobortis cursus. Nam dapibus ullamcorper magna vehicula aliquam. Vivamus hendrerit molestie neque. Ut interdum diam a purus ultrices facilisis. Suspendisse molestie</p></div></li>';
		$('.items').append(item);
	};
	