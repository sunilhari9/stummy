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
		$.getJSON( "custom/js/products.json", function( data ) {
			items = data;
		});
		LineItems = JSON.parse(sessionStorage.getItem('LineItems'));
		renderCart();
	}
	$('body').on('click','.cartMinus1,.glyphicon-chevron-left',function(){		
		var currentVal = $(this).next().text() || $(this).next().val();
		if(currentVal > 1){
			$(this).next().text(parseInt(currentVal)-1);
			$(this).next().val(parseInt(currentVal)-1);
			$(".cartCustomizeHiden").html('');
			$(".cartCustomizeHiden").hide();
		}
	});
	$('body').on('click','.cartPlus1,.glyphicon-chevron-right',function(){
		var currentVal = $(this).prev().text() || $(this).prev().val();
		if(currentVal >= 1){
			console.log("added");
			$(this).prev().text(parseInt(currentVal)+1);
			$(this).prev().val(parseInt(currentVal)+1);
			$(".cartCustomizeHiden").html('');
			$(".cartCustomizeHiden").hide();
		}
	});
  
	$('body').on('click','.glyphicon-edit.itemPanel',function(){

       // console.log("1111111111111");
        if($(this).parent().siblings(".cartCustomizeHiden").is(":visible")){
		//console.log("22222222222");
			$(this).parent().siblings(".cartCustomizeHiden").hide("slow");		
			return false;
		}
		//console.log("333333333333333");
		  $(".cartCustomizeHiden").html('');
		$(".cartCustomizeHiden").hide();
		  $(this).parent().siblings(".cartCustomizeHiden").show();	
		 $(this).parent().siblings(".cartCustomizeHiden").html("<center><img src='custom/images/loading.gif' /></center>");
		//var currentVal = $(this).prev().prev().text() || $(this).prev().prev().val();
		//var product_code = $(this).prev().prev().data('product-code');
		//var product_name = $(this).prev().prev().data('product-name');
		var currentVal = $(this).siblings( ".quantity" ).text();
		console.log("sibling:"+$('.glyphicon-edit.cartPanel').siblings( ".quantity" ).data('product-code'));
		var product_code = $(this).siblings( ".quantity" ).data('product-code');
		var product_name = $(this).siblings( ".quantity" ).data('product-name');
		var ul_items='<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true"><div class="panel panel-default">';
		console.log(currentVal);
		for(var i=0;i<parseInt(currentVal);i++){
			$.each(LineItems, function(index, value) {
				var ul_item = "";
				if (value.ProductCode == product_code) {
				ul_item = "<div class='product-name'>"+product_name+" #"+(i+1)+":</div>"+"<ul class='product-line-items clearfix'>";
				if(i == 0)
					ul_item = '<div class="panel-heading" role="tab" id="headingOne'+i+'"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion" href="#collapseOne'+i+'" aria-expanded="false" aria-controls="collapseOne">Item #'+(i+1)+'</a></h4></div><div id="collapseOne'+i+'" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne'+i+'"><div class="panel-body"><div class="rowCheckBox">';
				else
					ul_item = '<div class="panel-heading" role="tab" id="headingOne'+i+'"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion" href="#collapseOne'+i+'" aria-expanded="false" aria-controls="collapseOne">Item #'+(i+1)+'</a></h4></div><div id="collapseOne'+i+'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne'+i+'"><div class="panel-body"><div class="rowCheckBox">';
					$.each(value.ProductsLineList, function(index1, value1) {
						var li_item = '<li><input type=checkbox name="product-line-items-selection'+i+'" value="'+value1.ProductLineItemCode+'">'+value1.ProductLineItemName+'</li>';
						li_item = '<div class="colCheckBox"><input type="checkbox" name="product-line-items-selection'+i+'" value="'+value1.ProductLineItemCode+'"><label>'+value1.ProductLineItemName+'</label></div>';
						ul_item += li_item;
					});
				}
				//console.log(ul_item);
				ul_items += ul_item+"</div>";
			});
		}
		/*$('.customizeFoodBody').html(ul_items+'<button id="customizeFoodBut">Update &amp; Add to Cart</button><input type=hidden id=current_product_code value="'+product_code+'"/><input type=hidden id=current_product_name value="'+product_name+'"/><input type=hidden id=current_product_qty value="'+currentVal+'"/><div id=errorMsgs></div>');
		$('#customizeFood').modal('show');*/
		
		$(this).parent().siblings(".cartCustomizeHiden").html(ul_items+'</div></div><button id="customizeFoodBut">Update &amp; Add to Cart</button><input type=hidden id=current_product_code value="'+product_code+'"/><input type=hidden id=current_product_name value="'+product_name+'"/><input type=hidden id=current_product_qty value="'+currentVal+'"/><div id=errorMsgs></div>');

	});
	$('body').on('click','.glyphicon-edit.cartPanel',function(event){
	console.log("in click");
		var currentVal = $(this).siblings( ".quantity" ).text();
		console.log("sibling:"+$('.glyphicon-edit.cartPanel').siblings( ".quantity" ).data('product-code'));
		var product_code = $(this).siblings( ".quantity" ).data('product-code');
		var product_name = $(this).siblings( ".quantity" ).data('product-name');
		var currentCartJSON = {};
		if(localStorage.getItem('cartJson') != undefined && localStorage.getItem('cartJson').length>0)
			currentCartJSON = JSON.parse(localStorage.getItem('cartJson'));
		if(Object.keys(currentCartJSON).length == 0){
			currentCartJSON = {};
			currentCartJSON.itemsArray = [];
		}
		var currentItemsArray = currentCartJSON.itemsArray;
		var curretnProductArray;
		for (var i=0; i<currentItemsArray.length; i++) {
		  if (currentItemsArray[i].product_code == product_code) {
			curretnProductArray = currentItemsArray[i].product_lineitems;
			break;
		  }
		}	
		console.log(curretnProductArray);
		var ul_items="";
		ul_items='<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true"><div class="panel panel-default">';
				
		for(var i=0;i<parseInt(currentVal);i++){
		
			$.each(LineItems, function(index, value) {
				var ul_item = "";
				console.log(value.ProductCode);
				console.log(product_code);
				if (value.ProductCode == product_code) {
				//ul_item = "<div class='product-name'>"+product_name+" "+(i+1)+":</div>"+"<ul class='product-line-items clearfix'>";
				ul_item = "<div class='product-name'>"+product_name+" #"+(i+1)+":</div>"+"<ul class='product-line-items clearfix'>";
				if(i == 0)
							ul_item = '<div class="panel-heading" role="tab" id="headingOne'+i+'"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion" href="#collapseOne'+i+'" aria-expanded="false" aria-controls="collapseOne">Item #'+(i+1)+'</a>&nbsp;&nbsp;&nbsp;<img src="custom/images/trash.png" title="Delete this Item" alt="Delete this Item" class="trash" data-sno="'+i+'" data-product-code="'+product_code+'" data-qty="'+currentVal+'"/></h4></div><div id="collapseOne'+i+'" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne'+i+'"><div class="panel-body"><div class="rowCheckBox">';
						else
							ul_item = '<div class="panel-heading" role="tab" id="headingOne'+i+'"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion" href="#collapseOne'+i+'" aria-expanded="false" aria-controls="collapseOne">Item #'+(i+1)+'</a>&nbsp;&nbsp;&nbsp;<img src="custom/images/trash.png" title="Delete this Item" alt="Delete this Item" class="trash" data-sno="'+i+'" data-product-code="'+product_code+'" data-qty="'+currentVal+'"/></h4></div><div id="collapseOne'+i+'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne'+i+'"><div class="panel-body"><div class="rowCheckBox">';
					$.each(value.ProductsLineList, function(index1, value1) {
						var li_item = '';
						console.log(value1.ProductLineItemCode);
						console.log(curretnProductArray[i]);
						//console.log(curretnProductArray[i].indexOf(value1.ProductLineItemCode));
						if(curretnProductArray[i] != undefined){
						
						if(curretnProductArray[i].indexOf(value1.ProductLineItemCode) != -1)
								li_item = '<div class="colCheckBox"><input type="checkbox" name="product-line-items-selection-cart'+i+'" value="'+value1.ProductLineItemCode+'" checked="checked"><label>'+value1.ProductLineItemName+'</label></div>';
							else
								li_item = '<div class="colCheckBox"><input type="checkbox" name="product-line-items-selection-cart'+i+'" value="'+value1.ProductLineItemCode+'"><label>'+value1.ProductLineItemName+'</label></div>';
						}
						else
								li_item = '<div class="colCheckBox"><input type="checkbox" name="product-line-items-selection-cart'+i+'" value="'+value1.ProductLineItemCode+'"><label>'+value1.ProductLineItemName+'</label></div>';
						console.log(li_item);
						ul_item += li_item;
					});
				}
				ul_items += ul_item+"</div>";
			});
		}
		$('.customizeFoodBody').html(ul_items+'</div></div><button id="customizeFoodButCart">Customize the Cart</button><input type=hidden id=current_product_code value="'+product_code+'"/><input type=hidden id=current_product_name value="'+product_name+'"/><input type=hidden id=current_product_qty value="'+currentVal+'"/><div id=errorMsgs></div>');
		$('#customizeFood').modal('show');
	});
	var editCartPanel = function(){
	
		
		
		
	};
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
			}
		}else
			saveItemToCart();		
	});
	$('body').on('click','#customizeFoodButCart',function(){
		var currentCartJSON = {};
		var selectedLineItemsAll = [];		
		var selectedItem = {};
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
			var selectedLineItems = [];
			console.log($('input[name=product-line-items-selection-cart'+i+']:checked').length);
			if($('input[name="product-line-items-selection-cart'+i+'"]:checked').length > 0){
				$('input[name="product-line-items-selection-cart'+i+'"]:checked').each(function() {
				   selectedLineItems.push(this.value);
				});
			}
			else{
				if(parseInt($('#current_product_qty').val())>1)
						$('#errorMsgs').html("Choose any one option to proceed under each section");
					else
						$('#errorMsgs').html("Choose any one option to proceed");
				}
			selectedLineItemsAll.push(selectedLineItems);
		}
		selectedItem.product_lineitems = selectedLineItemsAll;		
		if($('#errorMsgs').text().length == 0){
			for (var i=0; i<currentItemsArray.length; i++) {
			  if (currentItemsArray[i].product_code == $('#current_product_code').val()) {
				currentItemsArray[i].product_qty =  parseInt($('#current_product_qty').val());
				currentItemsArray[i].product_lineitems = selectedLineItemsAll;
				break;
			  }
			}	
			currentCartJSON.itemsArray = currentItemsArray;
			localStorage.setItem('cartJson',JSON.stringify(currentCartJSON));
			renderCart();
			$('.customizeFoodBody').html('');
			$('#customizeFood').modal('hide');
			$('.messagesBar').html("Cart updated successfully");
			$('.messagesBar').show('slow').delay(3000).fadeOut('slow');
		}
	});
	
	var saveItemToCart = function(){
		var selectedLineItemsAll = [];		
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
			var selectedLineItems = [];
			console.log("xyz:"+$('input[name=product-line-items-selection'+i+']:checked').length);
			if($('input[name="product-line-items-selection'+i+'"]:checked').length > 0){
				$('input[name="product-line-items-selection'+i+'"]:checked').each(function() {
				   selectedLineItems.push(this.value);
				});
			}
			else{
				if(parseInt($('#current_product_qty').val())>1)
						$('#errorMsgs').html("Choose any one option to proceed under each section");
					else
						$('#errorMsgs').html("Choose any one option to proceed");
				}
			selectedLineItemsAll.push(selectedLineItems);
		}
		selectedItem.product_lineitems = selectedLineItemsAll;		
		if($('#errorMsgs').text().length == 0){
			currentItemsArray.push(selectedItem);
			currentCartJSON.itemsArray = currentItemsArray;
			localStorage.setItem('cartJson',JSON.stringify(currentCartJSON));
			renderCart();
			//$('#customizeFood').modal('hide');
			console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
			$(".cartCustomizeHiden").html('');
			$(".cartCustomizeHiden").hide();
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
		var selectedLineItemsAll = [];
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
		console.log("sssssssssssssssss:"+$('#current_product_qty').val());
		for(var i=0;i<parseInt($('#current_product_qty').val());i++){
			var selectedLineItems = [];
			console.log($('input[name=product-line-items-selection'+i+']:checked').length);
			if($('input[name="product-line-items-selection'+i+'"]:checked').length > 0){
				$('input[name="product-line-items-selection'+i+'"]:checked').each(function() {
				   selectedLineItems.push(this.value);
				});
			}
			else{
			console.log("inside else");
			console.log(parseInt($('#current_product_qty').val())>1);
				if(parseInt($('#current_product_qty').val())>1){
				console.log("in if");
					$('#errorMsgs').html("Choose any one option to proceed under each section");
				}else{
				console.log("in else");
					$('#errorMsgs').html("Choose any one option to proceed");
				}
				}
			selectedLineItemsAll.push(selectedLineItems);
		}
		if($('#errorMsgs').text().length == 0){
			for (var i=0; i<currentItemsArray.length; i++) {
			  if (currentItemsArray[i].product_code == $('#current_product_code').val()) {
				currentItemsArray[i].product_qty = parseInt(currentItemsArray[i].product_qty) + parseInt($('#current_product_qty').val());
				$.merge(currentItemsArray[i].product_lineitems,selectedLineItemsAll);
				break;
			  }
			}	
			currentCartJSON.itemsArray = currentItemsArray;
			localStorage.setItem('cartJson',JSON.stringify(currentCartJSON));
			renderCart();
			//$('#customizeFood').modal('hide');
			$(".cartCustomizeHiden").html('');
			$(".cartCustomizeHiden").hide();
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
		var selectedLineItemsAll = [];
		
		var selectedItem = {};
		selectedItem.product_code = product_code;
		selectedItem.product_name = product_name;
		selectedItem.product_qty = currentVal;
		for(var i=0;i<parseInt(currentVal);i++){
			$.each(LineItems, function(index, value) {
			var selectedLineItems = [];
				if (value.ProductCode == product_code) {
					$.each(value.ProductsLineList, function(index1, value1) {
						if(value1.default){
							selectedLineItems.push(value1.ProductLineItemCode);
							selectedLineItemsAll.push(selectedLineItems);
							}
					});
				}
			});
		}
		
		console.log(selectedLineItemsAll);
		if(currentItemsArray.length > 0){
			if(!existsProduct(currentItemsArray,product_code))
			{ 
			console.log("in if");
				selectedItem.product_lineitems = selectedLineItemsAll;
				currentCartJSON.itemsArray.push(selectedItem);
			}
			else{
				for (var i=0; i<currentItemsArray.length; i++) {
				  if (currentItemsArray[i].product_code == product_code) {
					currentItemsArray[i].product_qty = parseInt(currentItemsArray[i].product_qty) + parseInt(currentVal);
					$.merge(currentItemsArray[i].product_lineitems,selectedLineItemsAll);
					break;
				  }
				}
			}
		}else{
			selectedItem.product_lineitems = selectedLineItemsAll;
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
	/*	if(currentVal > 1){
			$(this).next().text(parseInt(currentVal)-1);
			$(this).next().val(parseInt(currentVal)-1);
			console.log("setting");
		}*/
		console.log("currentVal:"+$(this).next().text());
		
		//$('.glyphicon-edit.cartPanel').trigger('click');
		var currentVal = $(this).siblings( ".quantity" ).text();
		var currentVal = $(this).siblings( ".quantity" ).text();
		console.log("sibling:"+$('.glyphicon-edit.cartPanel').siblings( ".quantity" ).data('product-code'));
		var product_code = $(this).siblings( ".quantity" ).data('product-code');
		var product_name = $(this).siblings( ".quantity" ).data('product-name');
		var currentCartJSON = {};
		if(localStorage.getItem('cartJson') != undefined && localStorage.getItem('cartJson').length>0)
			currentCartJSON = JSON.parse(localStorage.getItem('cartJson'));
		if(Object.keys(currentCartJSON).length == 0){
			currentCartJSON = {};
			currentCartJSON.itemsArray = [];
		}
		var currentItemsArray = currentCartJSON.itemsArray;
		var curretnProductArray;
		for (var i=0; i<currentItemsArray.length; i++) {
		  if (currentItemsArray[i].product_code == product_code) {
			curretnProductArray = currentItemsArray[i].product_lineitems;
			break;
		  }
		}	
		console.log(curretnProductArray);
		var ul_items="";
		ul_items='<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true"><div class="panel panel-default">';
				
		for(var i=0;i<parseInt(currentVal);i++){
		
			$.each(LineItems, function(index, value) {
				var ul_item = "";
				console.log(value.ProductCode);
				console.log(product_code);
				if (value.ProductCode == product_code) {
				//ul_item = "<div class='product-name'>"+product_name+" "+(i+1)+":</div>"+"<ul class='product-line-items clearfix'>";
				ul_item = "<div class='product-name'>"+product_name+" #"+(i+1)+":</div>"+"<ul class='product-line-items clearfix'>";
				ul_item = '<div class="panel-heading" role="tab" id="headingOne'+i+'"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion" href="#collapseOne'+i+'" aria-expanded="false" aria-controls="collapseOne">Item #'+(i+1)+'</a>&nbsp;&nbsp;&nbsp;<img src="custom/images/trash.png" title="Delete this Item" alt="Delete this Item" class="trash" data-sno="'+i+'" data-product-code="'+product_code+'" data-qty="'+currentVal+'"/></h4></div><div id="collapseOne'+i+'" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne'+i+'"><div class="panel-body"><div class="rowCheckBox">';
					$.each(value.ProductsLineList, function(index1, value1) {
						var li_item = '';
						console.log(value1.ProductLineItemCode);
						console.log(curretnProductArray[i]);
						//console.log(curretnProductArray[i].indexOf(value1.ProductLineItemCode));
						if(curretnProductArray[i] != undefined){
						
						if(curretnProductArray[i].indexOf(value1.ProductLineItemCode) != -1)
								li_item = '<div class="colCheckBox"><input type="checkbox" name="product-line-items-selection-cart'+i+'" value="'+value1.ProductLineItemCode+'" checked="checked" disabled="disabled"><label>'+value1.ProductLineItemName+'</label></div>';
							else
								li_item = '<div class="colCheckBox"><input type="checkbox" name="product-line-items-selection-cart'+i+'" value="'+value1.ProductLineItemCode+'"  disabled="disabled"><label>'+value1.ProductLineItemName+'</label></div>';
						}
						else
								li_item = '<div class="colCheckBox"><input type="checkbox" name="product-line-items-selection-cart'+i+'" value="'+value1.ProductLineItemCode+'"  disabled="disabled"><label>'+value1.ProductLineItemName+'</label></div>';
						console.log(li_item);
						ul_item += li_item;
					});
				}
				ul_items += ul_item+"</div>";
			});
		}
		$('.customizeFoodBody').html(ul_items+'</div></div><div id=errorMsgs></div>');
		$('#customizeFood').modal('show');
	});
	$('body').on('click','.trash',function(){
		var sno_trash = $(this).data('sno');
		var product_code_trash = $(this).data('product-code');
		var currentQty_trash = $(this).data('qty');
		var del_id = $(this).parents('.panel-heading').attr('id');
		BootstrapDialog.confirm('Are you sure to delete this Item?'
			, function(result){
				if(result) {
				
					var currentCartJSON = {};
					var selectedLineItemsAll = [];		
					var selectedItem = {};
					if(localStorage.getItem('cartJson') != undefined && localStorage.getItem('cartJson').length>0)
						currentCartJSON = JSON.parse(localStorage.getItem('cartJson'));
					if(Object.keys(currentCartJSON).length == 0){
						currentCartJSON = {};
						currentCartJSON.itemsArray = [];
					}
					
					//currentQty = parseInt(currentQty)-1;
					var currentItemsArray = currentCartJSON.itemsArray;		
					selectedItem.product_code = product_code_trash;
					selectedItem.product_name = $(this).data('product-code');
					selectedItem.product_qty = parseInt(currentQty_trash)-1;
					$('#errorMsgs').html('');
					for(var i=0;i<parseInt(currentQty_trash);i++){
						if(i != sno_trash){
							var selectedLineItems = [];
							console.log($('input[name=product-line-items-selection-cart'+i+']:checked').length);
							if($('input[name="product-line-items-selection-cart'+i+'"]:checked').length > 0){
								$('input[name="product-line-items-selection-cart'+i+'"]:checked').each(function() {
								   selectedLineItems.push(this.value);
								});
							}
							selectedLineItemsAll.push(selectedLineItems);
						}
					}
					console.log(selectedLineItemsAll);
					selectedItem.product_lineitems = selectedLineItemsAll;		
					if($('#errorMsgs').text().length == 0){
						for (var i=0; i<currentItemsArray.length; i++) {
						console.log("=========================");
						console.log(currentItemsArray[i].product_code);
						console.log(product_code_trash);
						  if (currentItemsArray[i].product_code == product_code_trash) {
							currentItemsArray[i].product_qty =  parseInt(currentQty_trash)-1;
							currentItemsArray[i].product_lineitems = selectedLineItemsAll;
							break;
						  }
						}	
						currentCartJSON.itemsArray = currentItemsArray;
						localStorage.setItem('cartJson',JSON.stringify(currentCartJSON));
						renderCart();						
						//$('#headingOne'+sno_trash).remove('slow');
						//$('#collapseOne'+sno_trash).remove('slow');
						$('#headingOne'+sno_trash).animate({ backgroundColor: "#fbc7c7" }, "fast").animate({ opacity: "hide" }, "slow").remove('slow');
						$('#collapseOne'+sno_trash).animate({ backgroundColor: "#fbc7c7" }, "fast").animate({ opacity: "hide" }, "slow").remove('slow');
						console.log("======:"+$('.panel.panel-default').html());
						$('.customizeFoodBody').html('');
						$('#customizeFood').modal('hide');
						$('.messagesBar').html('Deleted successfully');
						$('.messagesBar').show('slow').delay(3000).fadeOut('slow');
					}
				}
		});
	});
	$('body').on('click','.cartPlus',function(){		
	console.log("click of cartplus");
		var currentVal = $(this).prev().text() || $(this).prev().val();
		console.log("currentVal:"+currentVal);
		if(currentVal >= 1){
			$(this).prev().text(parseInt(currentVal)+1);
			$(this).prev().val(parseInt(currentVal)+1);
			console.log("setting");
		}
		console.log("currentVal:"+$(this).prev().text());
		
		//$('.glyphicon-edit.cartPanel').trigger('click');
		var currentVal = $(this).siblings( ".quantity" ).text();
		console.log("sibling:"+$('.glyphicon-edit.cartPanel').siblings( ".quantity" ).data('product-code'));
		var product_code = $(this).siblings( ".quantity" ).data('product-code');
		var product_name = $(this).siblings( ".quantity" ).data('product-name');
		var currentCartJSON = {};
		if(localStorage.getItem('cartJson') != undefined && localStorage.getItem('cartJson').length>0)
			currentCartJSON = JSON.parse(localStorage.getItem('cartJson'));
		if(Object.keys(currentCartJSON).length == 0){
			currentCartJSON = {};
			currentCartJSON.itemsArray = [];
		}
		var currentItemsArray = currentCartJSON.itemsArray;
		var curretnProductArray;
		for (var i=0; i<currentItemsArray.length; i++) {
		  if (currentItemsArray[i].product_code == product_code) {
			curretnProductArray = currentItemsArray[i].product_lineitems;
			break;
		  }
		}	
		console.log(curretnProductArray);
		var ul_items="";
		ul_items='<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true"><div class="panel panel-default">';
				
		for(var i=0;i<parseInt(currentVal);i++){
		
			$.each(LineItems, function(index, value) {
				var ul_item = "";
				console.log(value.ProductCode);
				console.log(product_code);
				if (value.ProductCode == product_code) {
				//ul_item = "<div class='product-name'>"+product_name+" "+(i+1)+":</div>"+"<ul class='product-line-items clearfix'>";
				ul_item = "<div class='product-name'>"+product_name+" #"+(i+1)+":</div>"+"<ul class='product-line-items clearfix'>";
				if(i == currentVal-1)
							ul_item = '<div class="panel-heading" role="tab" id="headingOne'+i+'"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion" href="#collapseOne'+i+'" aria-expanded="false" aria-controls="collapseOne">Item #'+(i+1)+'</a></h4></div><div id="collapseOne'+i+'" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne'+i+'"><div class="panel-body"><div class="rowCheckBox">';
						else
							ul_item = '<div class="panel-heading" role="tab" id="headingOne'+i+'"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion" href="#collapseOne'+i+'" aria-expanded="false" aria-controls="collapseOne">Item #'+(i+1)+'</a></h4></div><div id="collapseOne'+i+'" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne'+i+'"><div class="panel-body"><div class="rowCheckBox">';
					$.each(value.ProductsLineList, function(index1, value1) {
						var li_item = '';
						console.log(value1.ProductLineItemCode);
						console.log(curretnProductArray[i]);
						//console.log(curretnProductArray[i].indexOf(value1.ProductLineItemCode));
						if(curretnProductArray[i] != undefined){
						
						if(curretnProductArray[i].indexOf(value1.ProductLineItemCode) != -1)
								li_item = '<div class="colCheckBox"><input type="checkbox" name="product-line-items-selection-cart'+i+'" value="'+value1.ProductLineItemCode+'" checked="checked"><label>'+value1.ProductLineItemName+'</label></div>';
							else
								li_item = '<div class="colCheckBox"><input type="checkbox" name="product-line-items-selection-cart'+i+'" value="'+value1.ProductLineItemCode+'"><label>'+value1.ProductLineItemName+'</label></div>';
						}
						else
								li_item = '<div class="colCheckBox"><input type="checkbox" name="product-line-items-selection-cart'+i+'" value="'+value1.ProductLineItemCode+'"><label>'+value1.ProductLineItemName+'</label></div>';
						console.log(li_item);
						ul_item += li_item;
					});
				}
				ul_items += ul_item+"</div>";
			});
		}
		$('.customizeFoodBody').html(ul_items+'</div></div><button id="customizeFoodButCart">Customize the Cart</button><input type=hidden id=current_product_code value="'+product_code+'"/><input type=hidden id=current_product_name value="'+product_name+'"/><input type=hidden id=current_product_qty value="'+currentVal+'"/><div id=errorMsgs></div>');
		$('#customizeFood').modal('show');
		
	});
	/*$('body').on('click','.cartPlus',function(){
		var currentVal = $(this).prev().text() || $(this).prev().val();
		if(currentVal >= 1){
			$(this).prev().text(parseInt(currentVal)+1);
			$(this).prev().val(parseInt(currentVal)+1);
		}
	});*/
	var renderCart = function(){
	$('#cartItemDesc').html("<center><img src='custom/images/loading.gif' /></center>");
		var cartTotalItems = JSON.parse(localStorage.getItem('cartJson'));
		if(cartTotalItems != undefined){
			cartTotalItemsLength = cartTotalItems.itemsArray.length
			if(cartTotalItemsLength > 0){
				$('.cartItemCount').html(cartTotalItemsLength);
				$('.cartItemCount').addClass('active');
				$clone = $('.cartListTemplate').clone();
				var cartItemDescHtml = '';
				for(var index = 0;index<cartTotalItemsLength;index++){
					var eachItemData = cartTotalItems.itemsArray[index];
					if(eachItemData.product_qty){
						$clone.find('.quantity').text(eachItemData.product_qty);
						console.log(eachItemData.product_code);
						$clone.find('.quantity').attr('data-product-code',eachItemData.product_code);
						$clone.find('.quantity').attr('data-product-name',eachItemData.product_name);
						$clone.find('.product_name_cart').text(eachItemData.product_name);
						cartItemDescHtml += $clone.html();
					}
				}
				$('#cartItemDesc').html('');
				if(cartItemDescHtml.length > 0)
					$('#cartItemDesc').append(cartItemDescHtml);
				else{
					$('.cartItemCount').html("0");
					$('.cartItemCount').removeClass('active');
					$('#cartItemDesc').html("<div>No items yet</div>");
				}
				
			}else{
				$('.cartItemCount').html("0");
				$('.cartItemCount').removeClass('active');
				$('#cartItemDesc').html("<div>No items yet</div>");
			}
		}else{
			$('.cartItemCount').html("0");
			$('.cartItemCount').removeClass('active');
			$('#cartItemDesc').html("<div>No items yet</div>");
		}	
	};
	//$('#myModal').on('hidden.bs.modal', function () {
  
	$('body').on('hidden.bs.modal',function(){
			renderCart();
		});
	var productsSearch = items;
	
	
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
          $(".cartCustomizeHiden").hide();
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
                $(this).siblings(".more-text").append(' <a href="javascript:void(0);" class="read-less"> Less Details...</a>');
                $(this).siblings(".more-text").contents().unwrap();
                $(this).remove();
                $(".read-less").on("click",function(){
                        showLess();
	               });
            });
                     
        }
        showLess();
	
   mobileChk();
          });
	});
	$('body').on('click','.hlink',function(){
		$(this).siblings('.summary').children('.mobileHide').toggle();
	});
	$('body').on('click','.clearCart',function(){
	var cartTotalItems = JSON.parse(localStorage.getItem('cartJson'));
		if(cartTotalItems != undefined){
			BootstrapDialog.confirm('Are you sure to clear the Cart?'
			, function(result){
				if(result) {
					localStorage.removeItem('cartJson');
					renderCart();
				}
			});
		}else{
			 BootstrapDialog.show({
            title: 'Cart',
            message: 'No Items to clear the cart'
        });
        
		}
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
        var item = '<li class="food_item media"><div class="media-left"><a href="#"><img class="img media-object hidden-xs" src="./custom/images/food/C.jpg" alt="Test"></a></div><div class="media-body media-top"><h4 class="media-heading">'+ProductName+'</h4><div class="customizeIcon"><span class="round-button"><span class="WebRupee">Rs.</span> '+unitPrice+'</span><span class="glyphicon glyphicon-minus cartMinus1" title="Click to decrease"></span><span class="quantity" data-product-code="'+ProductCode+'" data-product-name="'+ProductName+'">1</span><span class="glyphicon glyphicon-plus cartPlus1" title="Click to increase"></span><span class="glyphicon glyphicon-edit" title="Customize your food"></span><span class="glyphicon glyphicon-shopping-cart" title="Add to Cart"></span></div><div class="summary"><a href="#"><img class="img media-object visible-xs" src="./custom/images/food/C.jpg" alt="Test"></a><p class="show-read-more"> eu lacus dignissim efficitur. Proin ex metus, ornare placerat nisi at, porta lobortis turpis. Praesent euismod nec nulla ultrices maximus. Vivamus imperdiet quam ac lobortis cursus. Nam dapibus ullamcorper magna vehicula aliquam. Vivamus hendrerit molestie neque. Ut interdum diam a purus ultrices facilisis. Suspendisse molestie</p></div></li>';
		$('.items').append(item);
	};
	var calcRWD = function(){
		var rwdInfo = "1";
		
		console.log("1:"+$( document ).width());
 
	/*	if (window.getComputedStyle) {
			rwdInfo = window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('z-index');
			console.log("value:"+window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('z-index'));
		}*/
		if($( document ).width() <= 419) rwdInfo = 4;
		if($( document ).width() > 419 && $( document ).width() <= 767) rwdInfo = 3;
		if($( document ).width() > 768 && $( document ).width() <= 1023) rwdInfo = 2;
		return rwdInfo;
		}
		var mobileChk = function(){
		var rwdInfo = calcRWD();
		console.log("rwdInfo:"+rwdInfo);
			if(rwdInfo == 4){
				if($('.summary > p').hasClass('show-read-more'))
					console.log("there");
					$('.summary > p > a.read-more').addClass('hidden');
					$('.summary > p').addClass('mobileHide').removeClass('show-read-more');
					$('.media-heading').addClass('hlink');
					$('.mobileHide').hide();
			}else{
				if($('.summary > p').hasClass('mobileHide')){
					$('.mobileHide').show();
					$('.summary > p').addClass('show-read-more').removeClass('mobileHide');
					$('.summary > p > a.read-more').removeClass('hidden');
					$('.media-heading').removeClass('hlink');
					
				}
				
			}
		}
		
	$( window ).resize(function() {
			
				mobileChk();		
			});