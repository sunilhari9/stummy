	$(window).load(function() {
	    // Animate loader off screen
	    $(".se-pre-con").fadeOut("slow");
	});
	userDetails = "";
var orderRefNo = "",orderAmountToBePaid="";
	function setuserProfile() {
	    if (localStorage.getItem("userInfo") != "" && localStorage.getItem("userInfo") != null) {
	        userDetails = JSON.parse(localStorage.getItem("userInfo"));
	        $("#sign-up-button").hide(500);
	        $("#welcomeMsg").show(500);
	        $("#userProfilePic").attr("src", "data:image/png;base64," + userDetails[0].pic);
	    } else {
	        $("#welcomeMsg").hide(500);
	        $("#sign-up-button").show(500);
	    }
	}
	$(document).ready(function() {
		$('body').on('click','.placeOrder',function(){
			var thisOrderItemArray = '{"itemsArray":'+$(this).prev('.placeOrderDetails').text()+'}';
			//{"itemsArray":[{"product_code":"1002","product_name":"Fish Tikka","product_qty":"1","product_lineitems":[["2"]]},{"product_code":"1003","product_name":"Chicken Tikka","product_qty":"1","product_lineitems":[["1","2"]]}]}
			//{"itemsArray":"[{"product_qty":4,"product_name":"Chicken Biryani","product_lineitems":[{"SNo":"0813"},{"SNo":"0811"}],"product_code":"0631"},{"product_qty":10,"product_name":"Aloo Gobi","product_lineitems":[],"product_code":"0588"}]}
			var flag = false;
			try{
				var cartTotalItems = JSON.parse(localStorage.getItem('cartJson'));
				if (cartTotalItems != undefined) {
					cartTotalItemsLength = cartTotalItems.itemsArray.length
					if (cartTotalItemsLength > 0) {	
							flag = true;
					}
				}
			}catch(e){}
			if(flag){
				console.log("cart items");
				BootstrapDialog.confirm('Cart not empty - Do you want overwrite with this order?', function(result) {
	                if (result) {
	                    localStorage.setItem('cartJson',thisOrderItemArray);
						window.location.href = 'check-out.html';
	                }
	            });
			}else{
				console.log("no cart items");
				BootstrapDialog.confirm('Do you want place this order again?', function(result) {
	                if (result) {
	                    localStorage.setItem('cartJson',thisOrderItemArray);
						window.location.href = 'check-out.html';
	                }
	            });
			}
			
		});
	function toggleChevron(e) {
		$(e.target)
			.prev('.panel-heading')
			.find("i.indicator")
			.toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
	}
	$('#accordion').on('hidden.bs.collapse', toggleChevron);
	$('#accordion').on('shown.bs.collapse', toggleChevron);
	setuserProfile();

	    var profilePicPopOverContent = '<ul id="profileList" class="list-group"><li class="list-group-item">Profile</li><li class="list-group-item" id="logout">Logout</li></ul>';
	    $("#userProfilePic").popover({
	        html: true,
	        placement: 'bottom',
	        content: profilePicPopOverContent
	    }).parent().on('click', '#logout', function() {
	        localStorage.setItem("userInfo", "");
	        setuserProfile();
	    });
		
	    var cartJson = {};
	    var itemsArray = [];
	    var items;
	    var LineItems;
	    $.getJSON("custom/js/products.json", function(data) {
	        items = data;
	        $.getJSON("custom/js/LineItems.json", function(items) {
	            sessionStorage.setItem('LineItems', JSON.stringify(items));
	            init();
	        });
	    });
	    function init() {
		
	        cartJson.itemsArray = itemsArray;
	        LineItems = JSON.parse(sessionStorage.getItem('LineItems'));
			
			
			//localStorage.setItem('myOrders','[{"itemsArray":[{"product_code":"1002","product_name":"Fish Tikka","product_qty":"1","product_lineitems":[["2"]]}],"TotalOrderAmount": 446,"Status": "Delivered","OrderID": "OID-20","OrderDate": "2014-07-07"},{"itemsArray":[{"product_code":"1002","product_name":"Fish Tikka","product_qty":"1","product_lineitems":[["2"]]},{"product_code":"1003","product_name":"Chicken Tikka","product_qty":"1","product_lineitems":[["1","2"]]}],"TotalOrderAmount": 446,"Status": "Delivered","OrderID": "OID-21","OrderDate": "2014-07-07"}]');
			renderCartInMyOrders();

	    }
		var calcSubTotal = function(productCode, lineItems){
		var subTotals = [];
			for (var j = 0; j < items.length; j++) {
	            var items1 = items[j].ProductsList;
	            if (items1.length > 0) {
	                for (var i = 0; i < items1.length; i++) {
						if(parseInt(items1[i].ProductCode) == productCode){
						var unitPriceCurrent = parseInt(items1[i].unitPrice);
						var subTotalAmount = 0;
							for (var k = 0; k < lineItems.length; k++) {
	                            subTotalAmount += parseInt(unitPriceCurrent);
	                            for (var l = 0; l < lineItems[k].length; l++) {
	                                $.each(LineItems, function(index, value) {
	                                    var ul_item = "";
	                                    if (value.ProductCode == items1[i].ProductCode) {
	                                        $.each(value.ProductsLineList, function(index1, value1) {
	                                            if (value1.ProductLineItemCode == lineItems[k][l]) {
	                                                console.log(value1.ProductLineItemCost);
	                                                subTotalAmount += parseInt(value1.ProductLineItemCost);
	                                            }
	                                        });
	                                    }
	                                });
	                            }
	                        }
							console.log("subTotalAmount:"+subTotalAmount);
							subTotals.push(subTotalAmount);
							subTotals.push(unitPriceCurrent);
							return subTotals;
						}
					}
				}
			}
		};
		var renderCartInMyOrders = function() {
		console.log("in renderCartInCheckout"+localStorage.getItem('myOrders'));
		$(".ajax-loader").show();
			$.ajax({
				url: 'getMyOrders.php',
				data: {"Phone":"9090909090"},
				method: "POST",
				success: function(response){
				$(".ajax-loader").fadeOut("slow");
					console.log(response);
					var data = JSON.parse(response);
					console.log(data.Status);
					var cartTotalOrders = data.Order_List;
					console.log(JSON.stringify(cartTotalOrders));
					if (cartTotalOrders != undefined) {
					console.log("data there:"+cartTotalOrders.length);
					for (var index1 = 0; index1 < cartTotalOrders.length; index1++) {
						console.log(JSON.stringify(cartTotalOrders[index1]));
						console.log(JSON.stringify(cartTotalOrders[index1].itemsArray));
						cartTotalItemsLength = cartTotalOrders[index1].itemsArray.length;
						console.log(cartTotalItemsLength);
						var checkoutTotalAmount = 0;
						if (cartTotalItemsLength > 0) {
							var cartTotalItems = cartTotalOrders[index1];
							console.log("----------------------------------------------------------->"+JSON.stringify(cartTotalItems));
							$clone = $('.itemRowCheckout').clone();
							$eachOrderDetails = $('.eachOrderDetails').clone();
							$cloneTotal = $('.itemRowCheckoutTotals').clone();
							//console.log($clone.html());
							var cartItemDescHtml = '';
							var cartTotalItemsLength1 = 0;
							$eachOrderDetailsHeaderClone = $('.eachOrderDetailsHeader').clone();
							$eachOrderDetailsHeaderClone.find('.panel-heading').attr('id','heading'+index1);
							//console.log($eachOrderDetailsHeaderClone.find('.panel-heading'));
							console.log($eachOrderDetails.find('.placeOrderDetails').text());
							//$eachOrderDetails.find('.placeOrderDetails').text(JSON.stringify(cartTotalOrders[index1].itemsArray));
							$eachOrderDetails.find('.placeOrderDetails').text('[{"product_code":"1002","product_name":"Fish Tikka","product_qty":"1","product_lineitems":[["2"]]},{"product_code":"1003","product_name":"Chicken Tikka","product_qty":"1","product_lineitems":[["1","2"]]}]');
							$eachOrderDetailsHeaderClone.find('.panel-heading').attr('href','#collapse'+index1);
							$eachOrderDetailsHeaderClone.find('.orderNo').html("Order Details: "+cartTotalItems.OrderID + " @ " + cartTotalItems.OrderDate + "<span class='pull-right'>Status: "+cartTotalItems.Status+"&nbsp;&nbsp;<i class='indicator glyphicon glyphicon-chevron-down  pull-right'></i></span>");
							$eachOrderDetails.find('.orderInfo').html("<b>Order No:</b> "+cartTotalItems.OrderID + "<br/><b>Order Date: </b>" + cartTotalItems.OrderDate +"<br/><b> Order Amount: </b>"+cartTotalItems.TotalOrderAmount+"");
							$eachOrderDetailsHeaderClone.find('.orderNoMobile').html(cartTotalItems.OrderID + " @ " + cartTotalItems.OrderDate + "<span class='pull-right'>Status: "+cartTotalItems.Status+"</span>");
							$eachOrderDetailsHeaderClone.find('.panel-collapse.collapse').attr('id','collapse'+index1);
							
							
							
							for (var index = 0; index < cartTotalItemsLength; index++) {
								var eachItemData = cartTotalItems.itemsArray[index];
								if (eachItemData.product_qty) {
									cartTotalItemsLength1++;
									product_qty = eachItemData.product_qty;
									if (parseInt(eachItemData.product_qty) <= 9)
										product_qty = "0" + eachItemData.product_qty;
									//$clone.find('.quantity').text(product_qty);
									console.log(eachItemData.product_name);
									
									$clone.find('.itemRowPname').text(eachItemData.product_name);
									$clone.find('.itemRowQuantity').text(eachItemData.product_qty);
									$clone.find('.itemRowQuantity').text(eachItemData.product_qty);
									//var calcSubTotals = calcSubTotal(eachItemData.product_code,eachItemData.product_lineitems);
									var calcSubTotals = [0,0];
									console.log("calcSubTotals[0]:"+calcSubTotals[0]);
									console.log("calcSubTotals[1]:"+calcSubTotals[1]);
									$clone.find('.itemRowTotal').html('<span class="WebRupee">Rs.</span> '+calcSubTotals[0]);
									$clone.find('.itemRowPrice').html('<span class="WebRupee">Rs.</span> '+calcSubTotals[1]);
									checkoutTotalAmount += calcSubTotals[0];
									cartItemDescHtml += $clone.html();
									
								} else {
									//cartTotalItems.itemsArray[index] = [];
									cartTotalItems.itemsArray.splice(index, 1);
								}
							}
							
							
							cartItemDescHtml += '<tr><td colspan="4" class="hrow" style="border-bottom: 2px solid;"></td></tr>';
							$cloneTotal.find('.itemRowCheckoutTotalsText').html('Sub Total');
							$cloneTotal.find('.itemRowCheckoutAmount').attr('data-th','Sub Total');
							$cloneTotal.find('.itemRowCheckoutAmount').html('<span class="WebRupee">Rs.</span> '+checkoutTotalAmount.toFixed(2));
							cartItemDescHtml += $cloneTotal.html();
							var deliverCharges = 0,containerCharges = 0;
							var grandTotal = (parseFloat(checkoutTotalAmount) +
								parseFloat(deliverCharges) +
								parseFloat(containerCharges));
							grandTotal += grandTotal * 0.145;
							grandTotal = parseFloat(grandTotal.toFixed(2));
							var grandTotalRound = Math.round(grandTotal);		
							//$('.checkOutItemsList').html('');
							if (cartItemDescHtml.length > 0) {
							  //  $('.checkOutItemsList').html(cartItemDescHtml);
							  $eachOrderDetails.find('.checkOutItemsList').html(cartItemDescHtml);
							$eachOrderDetailsHeaderClone.find('.panel-body').html($eachOrderDetails.html());
							$('.myorders-panel').append($eachOrderDetailsHeaderClone.html());
							console.log($eachOrderDetailsHeaderClone.html());
						//	alert("ssssssssssss");
								$('.checkoutTotalAmount').html('<span class="WebRupee">Rs.</span> '+grandTotalRound.toFixed(2));
								$('#activate-payment').html('Proceed Payment <br/>('+grandTotalRound.toFixed(2)+')');
								//calcCartAmount();
							} else {
								$('.checkOutItemsList').html("<div>No items yet</div>");
							}

						} else {
							$('.checkOutItemsList').html("<div>No items yet</div>");
						}
						}
					} else {
						$('.checkOutItemsList').html("<div>No items yet</div>");
					}
				},
				failure: function(error){
					$(".ajax-loader").fadeOut("slow");
					console.log("failure");
				}
			});
	        //$('#checkOutItemsList').html("<center><img src='custom/images/loading.gif' /></center>");
	        
	    };
	});
