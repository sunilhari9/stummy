	$(window).load(function() {
	    // Animate loader off screen
	    $(".se-pre-con").fadeOut("slow");;

	});
	userDetails = "";

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
	    if (sessionStorage.getItem("promotionsFlag") == null) {
	        $('#advertiseModel').modal('show');
	    }
	    $(".closeAdd").click(function() {
	        sessionStorage.setItem("promotionsFlag", true);
	    })

	    function ajaxRequest(url, jsonData, method, asyn, callBackFunction) {
	        $.ajax({
	            url: url,
	            data: jsonData,
	            type: method,
	            dataType: "json",
	            asyn: asyn,
	            success: function(result) {
	                callBackFunction(result);
	            }
	        })
	    }

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
	    $('#checkout').click(function() {
	        console.log("on checkout");
	        $('.index_body').fadeOut(1000, function() {
	            window.location.href = 'check-out.html';
	        });
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
	        renderCart();
	        renderCartInCheckout();
	    }
	    $('body').on('click', '.cartMinus1,.glyphicon-chevron-left', function() {
	        var currentVal = $(this).next().text() || $(this).next().val();
	        if (currentVal > 1) {
	            $(this).next().text(parseInt(currentVal) - 1);
	            $(this).next().val(parseInt(currentVal) - 1);
	            $(".cartCustomizeHiden").html('');
	            $(".cartCustomizeHiden").hide();
	        }
	    });
	    $('body').on('click', '.cartPlus1,.glyphicon-chevron-right', function() {
	        var currentVal = $(this).prev().text() || $(this).prev().val();
	        if (currentVal >= 1) {
	            console.log("added");
	            $(this).prev().text(parseInt(currentVal) + 1);
	            $(this).prev().val(parseInt(currentVal) + 1);
	            $(".cartCustomizeHiden").html('');
	            $(".cartCustomizeHiden").hide();
	        }
	    });

	    $('body').on('click', '.glyphicon-edit.itemPanel', function() {
	        console.log("111111++++++++++++++++++++++1111111");
	        if ($(this).parent().siblings(".cartCustomizeHiden").is(":visible")) {
	            //console.log("22222222222");
	            $(this).parent().siblings(".cartCustomizeHiden").hide("slow");
	            $(".cartCustomizeHiden").html('');
	            return false;
	        }
	        $('.customizeFoodBody').html('');
	        //console.log("333333333333333");
	        $(".cartCustomizeHiden").html('');
	        $(".cartCustomizeHiden").hide();
	        $(this).parent().siblings(".cartCustomizeHiden").show();
	        $(this).parent().siblings(".cartCustomizeHiden").html("<center><img src='custom/images/loading.gif' /></center>");
	        //var currentVal = $(this).prev().prev().text() || $(this).prev().prev().val();
	        //var product_code = $(this).prev().prev().data('product-code');
	        //var product_name = $(this).prev().prev().data('product-name');
	        var currentVal = $(this).siblings(".quantity").text();
	        console.log("sibling:" + $('.glyphicon-edit.cartPanel').siblings(".quantity").data('product-code'));
	        var product_code = $(this).siblings(".quantity").data('product-code');
	        var product_name = $(this).siblings(".quantity").data('product-name');
	        var ul_items = '<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true"><div class="panel panel-default">';
	        console.log(currentVal);
	        var lineItemExists = false;
	        for (var i = 0; i < parseInt(currentVal); i++) {
	            $.each(LineItems, function(index, value) {
	                var ul_item = "";
	                if (value.ProductCode == product_code) {
	                    lineItemExists = true;
	                    ul_item = "<div class='product-name'>" + product_name + " #" + (i + 1) + ":</div>" + "<ul class='product-line-items clearfix'>";
	                    if (i == 0)
	                        ul_item = '<div class="panel-heading" role="tab" id="headingOne' + i + '"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion" href="#collapseOne' + i + '" aria-expanded="false" aria-controls="collapseOne">' + product_name + ' #' + (i + 1) + '</a></h4></div><div id="collapseOne' + i + '" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne' + i + '"><div class="panel-body"><div class="rowCheckBox">';
	                    else
	                        ul_item = '<div class="panel-heading" role="tab" id="headingOne' + i + '"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion" href="#collapseOne' + i + '" aria-expanded="false" aria-controls="collapseOne">' + product_name + ' #' + (i + 1) + '</a></h4></div><div id="collapseOne' + i + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne' + i + '"><div class="panel-body"><div class="rowCheckBox">';
	                    $.each(value.ProductsLineList, function(index1, value1) {
	                        var li_item = '<li><input type=checkbox name="product-line-items-selection' + i + '" value="' + value1.ProductLineItemCode + '">' + value1.ProductLineItemName + '</li>';
	                        li_item = '<div class="colCheckBox"><input type="checkbox" name="product-line-items-selection' + i + '" value="' + value1.ProductLineItemCode + '"><label>' + value1.ProductLineItemName + '</label></div>';
	                        ul_item += li_item;
	                    });
	                }
	                //console.log(ul_item);
	                if (ul_item.length > 0)
	                    ul_items += ul_item + "</div></div></div>";
	            });
	        }
	        /*$('.customizeFoodBody').html(ul_items+'<button id="customizeFoodBut">Update &amp; Add to Cart</button><input type=hidden id=current_product_code value="'+product_code+'"/><input type=hidden id=current_product_name value="'+product_name+'"/><input type=hidden id=current_product_qty value="'+currentVal+'"/><div id=errorMsgs></div>');
		$('#customizeFood').modal('show');*/
	        console.log(ul_items);
	        if (lineItemExists == true)
	            $(this).parent().siblings(".cartCustomizeHiden").html(ul_items + '</div></div><button id="customizeFoodBut">Update &amp; Add to Cart</button><input type=hidden id=current_product_code value="' + product_code + '"/><input type=hidden id=current_product_name value="' + product_name + '"/><input type=hidden id=current_product_qty value="' + currentVal + '"/><div id=errorMsgs></div>');
	        else {
	            $(this).parent().siblings(".cartCustomizeHiden").html("");
	            BootstrapDialog.show({
	                title: 'Customize Item',
	                message: 'Customization currently not available for this Item'
	            });
	        }

	    });
	    $('body').on('click', '.searchInMobile', function(event) {
	        $(".search").toggleClass("hiddeninMobile").delay(3000).show('slow');
	    });
	    $('body').on('click', '.glyphicon-edit.cartPanel', function(event) {
	        console.log("in click++++++++++++++");
	        var currentVal = $(this).siblings(".quantity").text();
	        console.log("sibling:" + $(this).siblings(".quantity").data('product-code'));
	        var product_code = $(this).siblings(".quantity").data('product-code');
	        var product_name = $(this).siblings(".quantity").data('product-name');
	        var currentCartJSON = {};
	        if (localStorage.getItem('cartJson') != undefined && localStorage.getItem('cartJson').length > 0)
	            currentCartJSON = JSON.parse(localStorage.getItem('cartJson'));
	        if (Object.keys(currentCartJSON).length == 0) {
	            currentCartJSON = {};
	            currentCartJSON.itemsArray = [];
	        }
	        var currentItemsArray = currentCartJSON.itemsArray;
	        var curretnProductArray;
	        for (var i = 0; i < currentItemsArray.length; i++) {
	            if (currentItemsArray[i].product_code == product_code) {
	                curretnProductArray = currentItemsArray[i].product_lineitems;
	                break;
	            }
	        }
	        if (curretnProductArray.length > 0) {
	            var ul_items = "";
	            ul_items = '<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true"><div class="panel panel-default">';

	            for (var i = 0; i < parseInt(currentVal); i++) {

	                $.each(LineItems, function(index, value) {
	                    var ul_item = "";
	                    console.log(value.ProductCode);
	                    console.log(product_code);
	                    if (value.ProductCode == product_code) {
	                        //ul_item = "<div class='product-name'>"+product_name+" "+(i+1)+":</div>"+"<ul class='product-line-items clearfix'>";
	                        ul_item = "<div class='product-name'>" + product_name + " #" + (i + 1) + ":</div>" + "<ul class='product-line-items clearfix'>";
	                        if (i == 0)
	                            ul_item = '<div class="panel-heading" role="tab" id="headingOne' + i + '"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion" href="#collapseOne' + i + '" aria-expanded="false" aria-controls="collapseOne">' + product_name + ' #' + (i + 1) + '</a>&nbsp;&nbsp;&nbsp;<img src="custom/images/trash.png" title="Delete this Item" alt="Delete this Item" class="trash" data-sno="' + i + '" data-product-code="' + product_code + '" data-qty="' + currentVal + '"/></h4></div><div id="collapseOne' + i + '" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne' + i + '"><div class="panel-body"><div class="rowCheckBox">';
	                        else
	                            ul_item = '<div class="panel-heading" role="tab" id="headingOne' + i + '"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion" href="#collapseOne' + i + '" aria-expanded="false" aria-controls="collapseOne">' + product_name + ' #' + (i + 1) + '</a>&nbsp;&nbsp;&nbsp;<img src="custom/images/trash.png" title="Delete this Item" alt="Delete this Item" class="trash" data-sno="' + i + '" data-product-code="' + product_code + '" data-qty="' + currentVal + '"/></h4></div><div id="collapseOne' + i + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne' + i + '"><div class="panel-body"><div class="rowCheckBox">';
	                        $.each(value.ProductsLineList, function(index1, value1) {
	                            var li_item = '';
	                            console.log(value1.ProductLineItemCode);
	                            console.log(curretnProductArray[i]);
	                            //console.log(curretnProductArray[i].indexOf(value1.ProductLineItemCode));
	                            if (curretnProductArray[i] != undefined) {

	                                if (curretnProductArray[i].indexOf(value1.ProductLineItemCode) != -1)
	                                    li_item = '<div class="colCheckBox"><input type="checkbox" name="product-line-items-selection-cart' + i + '" value="' + value1.ProductLineItemCode + '" checked="checked"><label>' + value1.ProductLineItemName + '</label></div>';
	                                else
	                                    li_item = '<div class="colCheckBox"><input type="checkbox" name="product-line-items-selection-cart' + i + '" value="' + value1.ProductLineItemCode + '"><label>' + value1.ProductLineItemName + '</label></div>';
	                            } else
	                                li_item = '<div class="colCheckBox"><input type="checkbox" name="product-line-items-selection-cart' + i + '" value="' + value1.ProductLineItemCode + '"><label>' + value1.ProductLineItemName + '</label></div>';
	                            console.log(li_item);
	                            ul_item += li_item;
	                        });
	                        ul_items += ul_item + "</div></div></div>";
	                    }
	                    //ul_items += ul_item+"</div>";
	                });
	            }
	            $('.customizeFoodBody').html(ul_items + '</div></div><button id="customizeFoodButCart">Customize the Item</button><button id="DeleteButCart">Delete this Item</button><input type=hidden id=current_product_code value="' + product_code + '"/><input type=hidden id=current_product_name value="' + product_name + '"/><input type=hidden id=current_product_qty value="' + currentVal + '"/><div id=errorMsgs></div>');
	            $('#customizeFood').modal('show');
	        } else {
	            $('.customizeFoodBody').html("");
	            BootstrapDialog.show({
	                title: 'Customize Item',
	                message: 'Customization currently not available for this Item'
	            });
	        }

	    });
	    var editCartPanel = function() {




	    };
	    $('body').on('click', '#customizeFoodBut', function() {
	        var currentCartJSON = {};
	        if (localStorage.getItem('cartJson') != undefined && localStorage.getItem('cartJson').length > 0)
	            currentCartJSON = JSON.parse(localStorage.getItem('cartJson'));
	        if (Object.keys(currentCartJSON).length == 0) {
	            currentCartJSON = {};
	            currentCartJSON.itemsArray = [];
	        }
	        var currentItemsArray = currentCartJSON.itemsArray;
	        if (currentItemsArray.length > 0) {
	            if (!existsProduct(currentItemsArray, $('#current_product_code').val()))
	                saveItemToCart();
	            else {
	                updateItemToCart();
	            }
	        } else
	            saveItemToCart();
	    });
	    $('body').on('click', '#customizeFoodButCart', function() {
	        var currentCartJSON = {};
	        var selectedLineItemsAll = [];
	        var selectedItem = {};
	        if (localStorage.getItem('cartJson') != undefined && localStorage.getItem('cartJson').length > 0)
	            currentCartJSON = JSON.parse(localStorage.getItem('cartJson'));
	        if (Object.keys(currentCartJSON).length == 0) {
	            currentCartJSON = {};
	            currentCartJSON.itemsArray = [];
	        }
	        var currentItemsArray = currentCartJSON.itemsArray;
	        selectedItem.product_code = $('#current_product_code').val();
	        selectedItem.product_name = $('#current_product_name').val();
	        selectedItem.product_qty = $('#current_product_qty').val();
	        $('#errorMsgs').html('');
	        for (var i = 0; i < parseInt($('#current_product_qty').val()); i++) {
	            var selectedLineItems = [];
	            console.log($('input[name=product-line-items-selection-cart' + i + ']:checked').length);
	            if ($('input[name="product-line-items-selection-cart' + i + '"]:checked').length > 0) {
	                $('input[name="product-line-items-selection-cart' + i + '"]:checked').each(function() {
	                    selectedLineItems.push(this.value);
	                });
	            } else {
	                if (parseInt($('#current_product_qty').val()) > 1)
	                    $('#errorMsgs').html("Choose any one option to proceed under each section");
	                else
	                    $('#errorMsgs').html("Choose any one option to proceed");
	            }
	            selectedLineItemsAll.push(selectedLineItems);
	        }
	        selectedItem.product_lineitems = selectedLineItemsAll;
	        if ($('#errorMsgs').text().length == 0) {
	            for (var i = 0; i < currentItemsArray.length; i++) {
	                if (currentItemsArray[i].product_code == $('#current_product_code').val()) {
	                    currentItemsArray[i].product_qty = parseInt($('#current_product_qty').val());
	                    currentItemsArray[i].product_lineitems = selectedLineItemsAll;
	                    break;
	                }
	            }
	            currentCartJSON.itemsArray = currentItemsArray;
	            localStorage.setItem('cartJson', JSON.stringify(currentCartJSON));
	            renderCart();
	            $('.customizeFoodBody').html('');
	            $('#customizeFood').modal('hide');
	            //$('.messagesBar').html("Cart updated successfully");
	            //$('.messagesBar').show('slow').delay(3000).fadeOut('slow');
	        }
	    });
	    $('body').on('click', '#DeleteButCart', function() {
	        BootstrapDialog.confirm('Are you sure to delete this Item?', function(result) {
	            if (result) {
	                var currentCartJSON = {};
	                var selectedLineItemsAll = [];
	                var selectedItem = {};
	                if (localStorage.getItem('cartJson') != undefined && localStorage.getItem('cartJson').length > 0)
	                    currentCartJSON = JSON.parse(localStorage.getItem('cartJson'));
	                if (Object.keys(currentCartJSON).length == 0) {
	                    currentCartJSON = {};
	                    currentCartJSON.itemsArray = [];
	                }
	                var currentItemsArray = currentCartJSON.itemsArray;
	                selectedItem.product_code = $('#current_product_code').val();
	                selectedItem.product_name = $('#current_product_name').val();
	                selectedItem.product_qty = $('#current_product_qty').val();
	                $('#errorMsgs').html('');

	                selectedItem.product_lineitems = selectedLineItemsAll;
	                if ($('#errorMsgs').text().length == 0) {
	                    for (var i = 0; i < currentItemsArray.length; i++) {
	                        if (currentItemsArray[i].product_code == $('#current_product_code').val()) {
	                            currentItemsArray.splice(i, 1);
	                            //currentItemsArray[i] = [];
	                            break;
	                        }
	                    }
	                    currentCartJSON.itemsArray = currentItemsArray;
	                    localStorage.setItem('cartJson', JSON.stringify(currentCartJSON));
	                    renderCart();
	                    $('.customizeFoodBody').html('');
	                    $('#customizeFood').modal('hide');
	                    //$('.messagesBar').html("Item deleted successfully");
	                    //$('.messagesBar').show('slow').delay(3000).fadeOut('slow');
	                }
	            }
	        });
	    });

	    var saveItemToCart = function() {
	        var selectedLineItemsAll = [];
	        var selectedItem = {};
	        var currentCartJSON = {};
	        if (localStorage.getItem('cartJson') != undefined && localStorage.getItem('cartJson').length > 0)
	            currentCartJSON = JSON.parse(localStorage.getItem('cartJson'));
	        if (Object.keys(currentCartJSON).length == 0) {
	            currentCartJSON = {};
	            currentCartJSON.itemsArray = [];
	        }
	        var currentItemsArray = currentCartJSON.itemsArray;
	        selectedItem.product_code = $('#current_product_code').val();
	        selectedItem.product_name = $('#current_product_name').val();
	        selectedItem.product_qty = $('#current_product_qty').val();
	        $('#errorMsgs').html('');
	        for (var i = 0; i < parseInt($('#current_product_qty').val()); i++) {
	            var selectedLineItems = [];
	            console.log("xyz:" + $('input[name=product-line-items-selection' + i + ']:checked').length);
	            if ($('input[name="product-line-items-selection' + i + '"]:checked').length > 0) {
	                $('input[name="product-line-items-selection' + i + '"]:checked').each(function() {
	                    selectedLineItems.push(this.value);
	                });
	            } else {
	                if (parseInt($('#current_product_qty').val()) > 1)
	                    $('#errorMsgs').html("Choose any one option to proceed under each section");
	                else
	                    $('#errorMsgs').html("Choose any one option to proceed");
	            }
	            selectedLineItemsAll.push(selectedLineItems);
	        }
	        selectedItem.product_lineitems = selectedLineItemsAll;
	        if ($('#errorMsgs').text().length == 0) {
	            currentItemsArray.push(selectedItem);
	            currentCartJSON.itemsArray = currentItemsArray;
	            localStorage.setItem('cartJson', JSON.stringify(currentCartJSON));
	            renderCart();
	            //$('#customizeFood').modal('hide');
	            console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
	            $(".cartCustomizeHiden").html('');
	            $(".cartCustomizeHiden").hide();
	            //$('.messagesBar').html("Cart updated successfully");
	            //$('.messagesBar').show('slow').delay(3000).fadeOut('slow');
	        }
	    };

	    function existsProduct(array, product_code) {
	        var flag = false;
	        for (var i = 0; i < array.length; i++) {
	            if (array[i].product_code == product_code) {
	                flag = true;
	            }
	        }
	        return flag;
	    };

	    var updateItemToCart = function() {
	        var selectedLineItemsAll = [];
	        var selectedItem = {};
	        var currentCartJSON = {};
	        if (localStorage.getItem('cartJson') != undefined && localStorage.getItem('cartJson').length > 0)
	            currentCartJSON = JSON.parse(localStorage.getItem('cartJson'));
	        if (Object.keys(currentCartJSON).length == 0) {
	            currentCartJSON = {};
	            currentCartJSON.itemsArray = [];
	        }
	        var currentItemsArray = currentCartJSON.itemsArray;
	        $('#errorMsgs').html('');
	        console.log("sssssssssssssssss:" + $('#current_product_qty').val());
	        for (var i = 0; i < parseInt($('#current_product_qty').val()); i++) {
	            var selectedLineItems = [];
	            console.log($('input[name=product-line-items-selection' + i + ']:checked').length);
	            if ($('input[name="product-line-items-selection' + i + '"]:checked').length > 0) {
	                $('input[name="product-line-items-selection' + i + '"]:checked').each(function() {
	                    selectedLineItems.push(this.value);
	                });
	            } else {
	                console.log("inside else");
	                console.log(parseInt($('#current_product_qty').val()) > 1);
	                if (parseInt($('#current_product_qty').val()) > 1) {
	                    console.log("in if");
	                    $('#errorMsgs').html("Choose any one option to proceed under each section");
	                } else {
	                    console.log("in else");
	                    $('#errorMsgs').html("Choose any one option to proceed");
	                }
	            }
	            selectedLineItemsAll.push(selectedLineItems);
	        }
	        if ($('#errorMsgs').text().length == 0) {
	            for (var i = 0; i < currentItemsArray.length; i++) {
	                if (currentItemsArray[i].product_code == $('#current_product_code').val()) {
	                    currentItemsArray[i].product_qty = parseInt(currentItemsArray[i].product_qty) + parseInt($('#current_product_qty').val());
	                    $.merge(currentItemsArray[i].product_lineitems, selectedLineItemsAll);
	                    break;
	                }
	            }
	            currentCartJSON.itemsArray = currentItemsArray;
	            localStorage.setItem('cartJson', JSON.stringify(currentCartJSON));
	            renderCart();
	            //$('#customizeFood').modal('hide');
	            $(".cartCustomizeHiden").html('');
	            $(".cartCustomizeHiden").hide();
	            //$('.messagesBar').html("Cart updated successfully");
	            //$('.messagesBar').show('slow').delay(3000).fadeOut('slow');
	        }
	    };
	    $('body').on('click', '.glyphicon-shopping-cart', function() {
	        var currentVal = $(this).siblings(".quantity").text();
	        console.log("sibling:" + $(this).siblings(".quantity").data('product-code'));
	        var product_code = $(this).siblings(".quantity").data('product-code');
	        var product_name = $(this).siblings(".quantity").data('product-name');
	        var ul_items = "";
	        var currentCartJSON = {};
	        if (localStorage.getItem('cartJson') != undefined && localStorage.getItem('cartJson').length > 0)
	            currentCartJSON = JSON.parse(localStorage.getItem('cartJson'));
	        if (Object.keys(currentCartJSON).length == 0) {
	            currentCartJSON = {};
	            currentCartJSON.itemsArray = [];
	        }
	        var currentItemsArray = currentCartJSON.itemsArray;
	        var selectedLineItemsAll = [];

	        var selectedItem = {};
	        selectedItem.product_code = product_code;
	        selectedItem.product_name = product_name;
	        selectedItem.product_qty = currentVal;
	        for (var i = 0; i < parseInt(currentVal); i++) {
	            $.each(LineItems, function(index, value) {
	                var selectedLineItems = [];
	                if (value.ProductCode == product_code) {
	                    $.each(value.ProductsLineList, function(index1, value1) {
	                        if (value1.default) {
	                            selectedLineItems.push(value1.ProductLineItemCode);
	                            selectedLineItemsAll.push(selectedLineItems);
	                        }
	                    });
	                }
	            });
	        }

	        console.log(selectedLineItemsAll);
	        if (currentItemsArray.length > 0) {
	            if (!existsProduct(currentItemsArray, product_code)) {
	                console.log("in if");
	                selectedItem.product_lineitems = selectedLineItemsAll;
	                currentCartJSON.itemsArray.push(selectedItem);
	            } else {
	                for (var i = 0; i < currentItemsArray.length; i++) {
	                    if (currentItemsArray[i].product_code == product_code) {
	                        currentItemsArray[i].product_qty = parseInt(currentItemsArray[i].product_qty) + parseInt(currentVal);
	                        $.merge(currentItemsArray[i].product_lineitems, selectedLineItemsAll);
	                        break;
	                    }
	                }
	            }
	        } else {
	            selectedItem.product_lineitems = selectedLineItemsAll;
	            currentCartJSON.itemsArray.push(selectedItem);
	        }
	        localStorage.setItem('cartJson', JSON.stringify(currentCartJSON));
	        renderCart();
	        //$('.messagesBar').html("Cart updated successfully");
	        //$('.messagesBar').show('slow').delay(3000).fadeOut('slow');
	    });
	    $('body').on('click', '.cartMinus', function() {
	        var currentVal = $(this).next().text() || $(this).next().val();
	        console.log("currentVal:" + currentVal);
	        /*	if(currentVal > 1){
			$(this).next().text(parseInt(currentVal)-1);
			$(this).next().val(parseInt(currentVal)-1);
			console.log("setting");
		}*/
	        console.log("currentVal:" + $(this).next().text());

	        //$('.glyphicon-edit.cartPanel').trigger('click');
	        var currentVal = $(this).siblings(".quantity").text();
	        var currentVal = $(this).siblings(".quantity").text();
	        console.log("sibling:" + $('.glyphicon-edit.cartPanel').siblings(".quantity").data('product-code'));
	        var product_code = $(this).siblings(".quantity").data('product-code');
	        var product_name = $(this).siblings(".quantity").data('product-name');
	        var currentCartJSON = {};
	        if (localStorage.getItem('cartJson') != undefined && localStorage.getItem('cartJson').length > 0)
	            currentCartJSON = JSON.parse(localStorage.getItem('cartJson'));
	        if (Object.keys(currentCartJSON).length == 0) {
	            currentCartJSON = {};
	            currentCartJSON.itemsArray = [];
	        }
	        var currentItemsArray = currentCartJSON.itemsArray;
	        var curretnProductArray;
	        for (var i = 0; i < currentItemsArray.length; i++) {
	            if (currentItemsArray[i].product_code == product_code) {
	                curretnProductArray = currentItemsArray[i].product_lineitems;
	                break;
	            }
	        }
	        console.log(curretnProductArray);
	        var ul_items = "";
	        ul_items = '<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true"><div class="panel panel-default">';
	        console.log(ul_items);
	        for (var i = 0; i < parseInt(currentVal); i++) {

	            $.each(LineItems, function(index, value) {
	                var ul_item = "";
	                console.log(value.ProductCode);
	                console.log(product_code);
	                if (value.ProductCode == product_code) {
	                    //ul_item = "<div class='product-name'>"+product_name+" "+(i+1)+":</div>"+"<ul class='product-line-items clearfix'>";
	                    ul_item = "<div class='product-name'>" + product_name + " #" + (i + 1) + ":</div>" + "<ul class='product-line-items clearfix'>";
	                    ul_item = '<div class="panel-heading" role="tab" id="headingOne' + i + '"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion" href="#collapseOne' + i + '" aria-expanded="false" aria-controls="collapseOne">' + product_name + ' #' + (i + 1) + '</a>&nbsp;&nbsp;&nbsp;<img src="custom/images/trash.png" title="Delete this Item" alt="Delete this Item" class="trash" data-sno="' + i + '" data-product-code="' + product_code + '" data-qty="' + currentVal + '"/></h4></div><div id="collapseOne' + i + '" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne' + i + '"><div class="panel-body"><div class="rowCheckBox">';
	                    console.log(ul_item);
	                    $.each(value.ProductsLineList, function(index1, value1) {
	                        var li_item = '';
	                        console.log(value1.ProductLineItemCode);
	                        console.log(curretnProductArray[i]);
	                        //console.log(curretnProductArray[i].indexOf(value1.ProductLineItemCode));
	                        if (curretnProductArray[i] != undefined) {

	                            if (curretnProductArray[i].indexOf(value1.ProductLineItemCode) != -1)
	                                li_item = '<div class="colCheckBox"><input type="checkbox" name="product-line-items-selection-cart' + i + '" value="' + value1.ProductLineItemCode + '" checked="checked" disabled="disabled"><label>' + value1.ProductLineItemName + '</label></div>';
	                            else
	                                li_item = '<div class="colCheckBox"><input type="checkbox" name="product-line-items-selection-cart' + i + '" value="' + value1.ProductLineItemCode + '"  disabled="disabled"><label>' + value1.ProductLineItemName + '</label></div>';
	                        } else
	                            li_item = '<div class="colCheckBox"><input type="checkbox" name="product-line-items-selection-cart' + i + '" value="' + value1.ProductLineItemCode + '"  disabled="disabled"><label>' + value1.ProductLineItemName + '</label></div>';
	                        console.log(li_item);
	                        ul_item += li_item;
	                    });
	                    ul_items += ul_item + "</div></div></div>";
	                }
	                console.log(ul_items);
	                //if(ul_item.length>0)

	            });
	        }
	        $('.customizeFoodBody').html(ul_items + '</div></div><div id=errorMsgs></div>');
	        console.log($('.customizeFoodBody').html());
	        $('#customizeFood').modal('show');
	    });
	    $('body').on('click', '.trash', function() {
	        var sno_trash = $(this).data('sno');
	        var product_code_trash = $(this).data('product-code');
	        var currentQty_trash = $(this).data('qty');
	        var del_id = $(this).parents('.panel-heading').attr('id');
	        BootstrapDialog.confirm('Are you sure to delete this Item?', function(result) {
	            if (result) {

	                var currentCartJSON = {};
	                var selectedLineItemsAll = [];
	                var selectedItem = {};
	                if (localStorage.getItem('cartJson') != undefined && localStorage.getItem('cartJson').length > 0)
	                    currentCartJSON = JSON.parse(localStorage.getItem('cartJson'));
	                if (Object.keys(currentCartJSON).length == 0) {
	                    currentCartJSON = {};
	                    currentCartJSON.itemsArray = [];
	                }

	                //currentQty = parseInt(currentQty)-1;
	                var currentItemsArray = currentCartJSON.itemsArray;
	                selectedItem.product_code = product_code_trash;
	                selectedItem.product_name = $(this).data('product-code');
	                selectedItem.product_qty = parseInt(currentQty_trash) - 1;
	                $('#errorMsgs').html('');
	                for (var i = 0; i < parseInt(currentQty_trash); i++) {
	                    if (i != sno_trash) {
	                        var selectedLineItems = [];
	                        console.log($('input[name=product-line-items-selection-cart' + i + ']:checked').length);
	                        if ($('input[name="product-line-items-selection-cart' + i + '"]:checked').length > 0) {
	                            $('input[name="product-line-items-selection-cart' + i + '"]:checked').each(function() {
	                                selectedLineItems.push(this.value);
	                            });
	                        }
	                        selectedLineItemsAll.push(selectedLineItems);
	                    }
	                }
	                console.log(selectedLineItemsAll);
	                selectedItem.product_lineitems = selectedLineItemsAll;
	                if ($('#errorMsgs').text().length == 0) {
	                    for (var i = 0; i < currentItemsArray.length; i++) {
	                        console.log("=========================");
	                        console.log(currentItemsArray[i].product_code);
	                        console.log(product_code_trash);
	                        if (currentItemsArray[i].product_code == product_code_trash) {
	                            currentItemsArray[i].product_qty = parseInt(currentQty_trash) - 1;
	                            currentItemsArray[i].product_lineitems = selectedLineItemsAll;
	                            break;
	                        }
	                    }
	                    currentCartJSON.itemsArray = currentItemsArray;
	                    localStorage.setItem('cartJson', JSON.stringify(currentCartJSON));
	                    renderCart();
	                    //$('#headingOne'+sno_trash).remove('slow');
	                    //$('#collapseOne'+sno_trash).remove('slow');
	                    $('#headingOne' + sno_trash).animate({
	                        backgroundColor: "#fbc7c7"
	                    }, "fast").animate({
	                        opacity: "hide"
	                    }, "slow").remove('slow');
	                    $('#collapseOne' + sno_trash).animate({
	                        backgroundColor: "#fbc7c7"
	                    }, "fast").animate({
	                        opacity: "hide"
	                    }, "slow").remove('slow');
	                    console.log("======:" + $('.panel.panel-default').html());
	                    $('.customizeFoodBody').html('');
	                    $('#customizeFood').modal('hide');
	                    //$('.messagesBar').html('Deleted successfully');
	                    //$('.messagesBar').show('slow').delay(3000).fadeOut('slow');
	                }
	            }
	        });
	    });
	    $('body').on('click', '.cartPlus', function() {
	        console.log("click of cartplus");
	        var currentVal = $(this).prev().text() || $(this).prev().val();
	        console.log("currentVal:" + currentVal);
	        if (currentVal >= 1) {
	            $(this).prev().text(parseInt(currentVal) + 1);
	            $(this).prev().val(parseInt(currentVal) + 1);
	            console.log("setting");
	        }
	        console.log("currentVal:" + $(this).prev().text());

	        //$('.glyphicon-edit.cartPanel').trigger('click');
	        var currentVal = $(this).siblings(".quantity").text();
	        console.log("sibling:" + $('.glyphicon-edit.cartPanel').siblings(".quantity").data('product-code'));
	        var product_code = $(this).siblings(".quantity").data('product-code');
	        var product_name = $(this).siblings(".quantity").data('product-name');
	        var currentCartJSON = {};
	        if (localStorage.getItem('cartJson') != undefined && localStorage.getItem('cartJson').length > 0)
	            currentCartJSON = JSON.parse(localStorage.getItem('cartJson'));
	        if (Object.keys(currentCartJSON).length == 0) {
	            currentCartJSON = {};
	            currentCartJSON.itemsArray = [];
	        }
	        var currentItemsArray = currentCartJSON.itemsArray;
	        var curretnProductArray;
	        for (var i = 0; i < currentItemsArray.length; i++) {
	            if (currentItemsArray[i].product_code == product_code) {
	                curretnProductArray = currentItemsArray[i].product_lineitems;
	                break;
	            }
	        }
	        console.log(curretnProductArray);
	        var ul_items = "";
	        ul_items = '<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true"><div class="panel panel-default">';

	        for (var i = 0; i < parseInt(currentVal); i++) {

	            $.each(LineItems, function(index, value) {
	                var ul_item = "";
	                console.log(value.ProductCode);
	                console.log(product_code);
	                if (value.ProductCode == product_code) {
	                    //ul_item = "<div class='product-name'>"+product_name+" "+(i+1)+":</div>"+"<ul class='product-line-items clearfix'>";
	                    ul_item = "<div class='product-name'>" + product_name + " #" + (i + 1) + ":</div>" + "<ul class='product-line-items clearfix'>";
	                    if (i == currentVal - 1)
	                        ul_item = '<div class="panel-heading" role="tab" id="headingOne' + i + '"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion" href="#collapseOne' + i + '" aria-expanded="false" aria-controls="collapseOne">' + product_name + ' #' + (i + 1) + '</a></h4></div><div id="collapseOne' + i + '" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne' + i + '"><div class="panel-body"><div class="rowCheckBox">';
	                    else
	                        ul_item = '<div class="panel-heading" role="tab" id="headingOne' + i + '"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion" href="#collapseOne' + i + '" aria-expanded="false" aria-controls="collapseOne">' + product_name + ' #' + (i + 1) + '</a></h4></div><div id="collapseOne' + i + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne' + i + '"><div class="panel-body"><div class="rowCheckBox">';
	                    $.each(value.ProductsLineList, function(index1, value1) {
	                        var li_item = '';
	                        console.log(value1.ProductLineItemCode);
	                        console.log(curretnProductArray[i]);
	                        //console.log(curretnProductArray[i].indexOf(value1.ProductLineItemCode));
	                        if (curretnProductArray[i] != undefined) {

	                            if (curretnProductArray[i].indexOf(value1.ProductLineItemCode) != -1)
	                                li_item = '<div class="colCheckBox"><input type="checkbox" name="product-line-items-selection-cart' + i + '" value="' + value1.ProductLineItemCode + '" checked="checked"><label>' + value1.ProductLineItemName + '</label></div>';
	                            else
	                                li_item = '<div class="colCheckBox"><input type="checkbox" name="product-line-items-selection-cart' + i + '" value="' + value1.ProductLineItemCode + '"><label>' + value1.ProductLineItemName + '</label></div>';
	                        } else
	                            li_item = '<div class="colCheckBox"><input type="checkbox" name="product-line-items-selection-cart' + i + '" value="' + value1.ProductLineItemCode + '"><label>' + value1.ProductLineItemName + '</label></div>';
	                        console.log(li_item);
	                        ul_item += li_item;
	                    });
	                    ul_items += ul_item + "</div></div></div>";
	                }

	            });
	        }
	        $('.customizeFoodBody').html(ul_items + '</div></div></div><button id="customizeFoodButCart">Customize the Cart</button><input type=hidden id=current_product_code value="' + product_code + '"/><input type=hidden id=current_product_name value="' + product_name + '"/><input type=hidden id=current_product_qty value="' + currentVal + '"/><div id=errorMsgs></div>');
	        $('#customizeFood').modal('show');

	    });
	    /*$('body').on('click','.cartPlus',function(){
		var currentVal = $(this).prev().text() || $(this).prev().val();
		if(currentVal >= 1){
			$(this).prev().text(parseInt(currentVal)+1);
			$(this).prev().val(parseInt(currentVal)+1);
		}
	});*/
	    getProductPrice = function(productCodes, cartProductLineItems, cartProductQty) {
	        console.log(items);
	        var subTotalAmount = 0;
	        //	var cartSubTotalArray = 0;
	        //$.getJSON( "custom/js/products.json", function( data ) {
	        //	items = data;
	        //$.each(items, function(index, value) {
	        for (var j = 0; j < items.length; j++) {
	            var items1 = items[j].ProductsList;
	            if (items1.length > 0) {
	                for (var i = 0; i < items1.length; i++) {
	                    if ($.inArray(parseInt(items1[i].ProductCode), productCodes) >= 0) {
	                        //	console.log($.inArray(parseInt(items1[i].ProductCode), productCodes));
	                        //if(parseInt(items1[i].ProductCode) == productCode){
	                        //	console.log(items1[i]);
	                        //	console.log("inside:"+items1[i].unitPrice);
	                        var unitPriceCurrent = parseInt(items1[i].unitPrice);
	                        console.log(unitPriceCurrent);
	                        var lineItems = cartProductLineItems[$.inArray(parseInt(items1[i].ProductCode), productCodes)];
	                        console.log(lineItems);
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
	                    }
	                }
	            }
	        };
	        //});
	        console.log("subTotalAmount:" + subTotalAmount);
	        $('.subtotal').text(subTotalAmount.toFixed(2));
	        var grandTotal = (parseFloat(subTotalAmount) +
	            parseFloat($('.delivery').html()) +
	            parseFloat($('.container_charges').html()));
	        $('.service_tax').text((grandTotal * 0.15).toFixed(2));
	        grandTotal += grandTotal * 0.15;
	        $('.rounded_off').text((grandTotal % 1).toFixed(2));
	        grandTotal -= (grandTotal % 1).toFixed(2);
	        $('.grand_total').html('Rs. ' + grandTotal.toFixed(2));
	    };
	    var calcCartAmount = function() {

	        var cartTotalItems = JSON.parse(localStorage.getItem('cartJson'));
	        if (cartTotalItems != undefined) {
	            cartTotalItemsLength = cartTotalItems.itemsArray.length
	            if (cartTotalItemsLength > 0) {
	                var cartProductCodes = [],
	                    cartProductLineItems = [],
	                    cartProductQty = [];
	                for (var index = 0; index < cartTotalItemsLength; index++) {
	                    var eachItemData = cartTotalItems.itemsArray[index];
	                    console.log(eachItemData);
	                    //var price = getProductPrice(eachItemData.product_code);
	                    cartProductCodes.push(eachItemData.product_code);
	                    cartProductLineItems.push(eachItemData.product_lineitems);
	                    cartProductQty.push(eachItemData.product_qty);
	                    //console.log("Price:"+price);
	                    //var productPrice = getProductPrice(eachItemData.product_code);
	                    //console.log("productCode:"+eachItemData.product_code+"-----productPrice:"+productPrice)
	                }
	                getProductPrice(cartProductCodes, cartProductLineItems, cartProductQty);
	            }
	        }
	    };

	    var renderCart = function() {
	        $('#cartItemDesc').html("<center><img src='custom/images/loading.gif' /></center>");
	        var cartTotalItems = JSON.parse(localStorage.getItem('cartJson'));
	        if (cartTotalItems != undefined) {
	            cartTotalItemsLength = cartTotalItems.itemsArray.length
	            if (cartTotalItemsLength > 0) {

	                $('.cartItemCount').addClass('active');
	                $clone = $('.cartListTemplate').clone();
	                var cartItemDescHtml = '';
	                var cartTotalItemsLength1 = 0;
	                for (var index = 0; index < cartTotalItemsLength; index++) {
	                    var eachItemData = cartTotalItems.itemsArray[index];
	                    if (eachItemData.product_qty) {
	                        cartTotalItemsLength1++;
	                        product_qty = eachItemData.product_qty;
	                        if (parseInt(eachItemData.product_qty) <= 9)
	                            product_qty = "0" + eachItemData.product_qty;
	                        $clone.find('.quantity').text(product_qty);
	                        console.log(eachItemData.product_code);
	                        $clone.find('.quantity').attr('data-product-code', eachItemData.product_code);
	                        $clone.find('.quantity').attr('data-product-name', eachItemData.product_name);
	                        $clone.find('.product_name_cart').text(eachItemData.product_name);
	                        cartItemDescHtml += $clone.html();
	                    } else {
	                        //cartTotalItems.itemsArray[index] = [];
	                        cartTotalItems.itemsArray.splice(index, 1);
	                    }
	                }
	                localStorage.setItem('cartJson', JSON.stringify(cartTotalItems));
	                $('.cartItemCount').html(cartTotalItemsLength);
	                $('#cartItemDesc').html('');
	                if (cartItemDescHtml.length > 0) {
	                    $('#cartItemDesc').append(cartItemDescHtml);
	                    calcCartAmount();
	                } else {
	                    $('.cartItemCount').html("0");
	                    $('.cartItemCount').removeClass('active');
	                    $('#cartItemDesc').html("<div>No items yet</div>");
	                }

	            } else {
	                $('.cartItemCount').html("0");
	                $('.cartItemCount').removeClass('active');
	                $('#cartItemDesc').html("<div>No items yet</div>");
	            }
	        } else {
	            $('.cartItemCount').html("0");
	            $('.cartItemCount').removeClass('active');
	            $('#cartItemDesc').html("<div>No items yet</div>");
	        }
	    };
	    var calcSubTotal = function(productCode, lineItems) {
	        var subTotals = [];
	        for (var j = 0; j < items.length; j++) {
	            var items1 = items[j].ProductsList;
	            if (items1.length > 0) {
	                for (var i = 0; i < items1.length; i++) {
	                    if (parseInt(items1[i].ProductCode) == productCode) {
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
	                        console.log("subTotalAmount:" + subTotalAmount);
	                        subTotals.push(subTotalAmount);
	                        subTotals.push(unitPriceCurrent);
	                        return subTotals;
	                    }
	                }
	            }
	        }
	    };
	    var renderCartInCheckout = function() {
	        //$('#checkOutItemsList').html("<center><img src='custom/images/loading.gif' /></center>");
	        var cartTotalItems = JSON.parse(localStorage.getItem('cartJson'));
	        if (cartTotalItems != undefined) {
	            cartTotalItemsLength = cartTotalItems.itemsArray.length;
	            var checkoutTotalAmount = 0;
	            if (cartTotalItemsLength > 0) {
	                $clone = $('.itemRowCheckout').clone();
	                console.log($clone.html());
	                var cartItemDescHtml = '';
	                var cartTotalItemsLength1 = 0;

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
	                        var calcSubTotals = calcSubTotal(eachItemData.product_code, eachItemData.product_lineitems);
	                        console.log("calcSubTotals[0]:" + calcSubTotals[0]);
	                        console.log("calcSubTotals[1]:" + calcSubTotals[1]);
	                        $clone.find('.itemRowTotal').html('<span class="WebRupee">Rs.</span> ' + calcSubTotals[0]);
	                        $clone.find('.itemRowPrice').html('<span class="WebRupee">Rs.</span> ' + calcSubTotals[1]);
	                        checkoutTotalAmount += calcSubTotals[0];
	                        cartItemDescHtml += $clone.html();
	                        console.log(cartItemDescHtml);
	                    } else {
	                        //cartTotalItems.itemsArray[index] = [];
	                        cartTotalItems.itemsArray.splice(index, 1);
	                    }
	                }
	                localStorage.setItem('cartJson', JSON.stringify(cartTotalItems));

	                $('#checkOutItemsList').html('');
	                if (cartItemDescHtml.length > 0) {
	                    $('#checkOutItemsList').html(cartItemDescHtml);
	                    $('.checkoutTotalAmount').html('Total: <span class="WebRupee">Rs.</span> ' + checkoutTotalAmount);
	                    //calcCartAmount();
	                } else {
	                    $('#checkOutItemsList').html("<div>No items yet</div>");
	                }

	            } else {
	                $('#checkOutItemsList').html("<div>No items yet</div>");
	            }
	        } else {
	            $('#checkOutItemsList').html("<div>No items yet</div>");
	        }
	    };
	    //renderCartInCheckout();
	    //$('#myModal').on('hidden.bs.modal', function () {

	    $('body').on('hidden.bs.modal', function() {
	        renderCart();
	    });
	    var productsSearch = items;


	    //console.log(items);
	    $('.typeahead').on('keyup', function() {
	        //$('.typeahead').keyup(function(){
	        var searchKeyword = $(this).val();
	        console.log("searchKeyword:" + searchKeyword);
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
	        if ($(this).val().length >= 3) {
	            $('.items').html('');
	            searchProduct(items, $(this).val().toLowerCase());
	        }
	        $(document).ready(function() {
	            $(".cartCustomizeHiden").html('');
	            $(".cartCustomizeHiden").hide();
	            var maxLength = 50;

	            function showLess() {
	                $(".show-read-more").each(function() {
	                    var myStr = $(this).text();
	                    if ($.trim(myStr).length > maxLength) {
	                        var newStr = myStr.substring(0, maxLength);
	                        var removedStr = myStr.substring(maxLength, $.trim(myStr).length);
	                        $(this).empty().html(newStr);
	                        $(this).append(' <a href="javascript:void(0);" class="read-more"> More Details...</a>');
	                        $(this).append('<span class="more-text">' + removedStr + '</span>');
	                    }
	                });
	                $(".read-more").click(function() {
	                    $(this).siblings(".more-text").append(' <a href="javascript:void(0);" class="read-less"> Less Details...</a>');
	                    $(this).siblings(".more-text").contents().unwrap();
	                    $(this).remove();
	                    $(".read-less").on("click", function() {
	                        $(this).remove();
	                        showLess();
	                    });
	                });

	            }
	            showLess();

	            mobileChk();
	        });
	    });
	    $('body').on('click', '.hlink', function() {
	        $(this).siblings('.summary').children('.mobileHide').toggle();
	    });
	    $('body').on('click', '#unitPrice,#popularity', function() {
	        var activeCatName = $('#activeCat').val(); //$('.list-group-item.item-type.activeCat').text();
	        //console.log(activeCatName);
	        if (activeCatName.length > 0) {
	            var filterArray = [];
	            $.each(items, function(index, value) {
	                if (value.Name === activeCatName) {
	                    var items = value.ProductsList;
	                    if (items.length > 0) {
	                        for (var i = 0; i < items.length; i++) {
	                            filterArray.push(items[i]);
	                        }
	                    }
	                }
	            });
	            if ($(this).attr('id') == 'unitPrice') {
	                $('.popularityImg').attr('src', './custom/images/no_sort.png');
	                if ($(this).hasClass('asc')) {
	                    $('.unitPriceImg').attr('src', './custom/images/sort_down.png');
	                } else {
	                    $('.unitPriceImg').attr('src', './custom/images/sort_up.png');
	                }
	            } else if ($(this).attr('id') == 'popularity') {
	                $('.unitPriceImg').attr('src', './custom/images/no_sort.png');
	                if ($(this).hasClass('asc')) {
	                    $('.popularityImg').attr('src', './custom/images/sort_down.png');
	                } else {
	                    $('.popularityImg').attr('src', './custom/images/sort_up.png');
	                }
	            }
	            filterArray1 = sortJSON(filterArray, $(this).attr('id'));
	            if ($(this).hasClass('asc')) {
	                $(this).removeClass('asc');
	                $(this).addClass('desc');
	            } else if ($(this).hasClass('desc')) {
	                filterArray1 = filterArray1.reverse();
	                $(this).removeClass('desc');
	                $(this).addClass('asc');
	            }
	            $('.items').html('');
	            for (var i = 0; i < filterArray1.length; i++) {
	                displayItemDOM(filterArray1[i].ProductName, filterArray1[i].ProductCode, filterArray1[i].unitPrice, filterArray1[i].isVeg, filterArray1[i].imageURL, filterArray1[i].itemDes);
	            }
	            mobileChk();
	        } else {
	            BootstrapDialog.show({
	                title: 'Sort Option',
	                message: 'Please selecte any Category to Sort'
	            });
	        }
	        var maxLength = 50;

	        function showLess() {
	            $(".show-read-more").each(function() {
	                var myStr = $(this).text();
	                if ($.trim(myStr).length > maxLength) {
	                    var newStr = myStr.substring(0, maxLength);
	                    var removedStr = myStr.substring(maxLength, $.trim(myStr).length);
	                    $(this).empty().html(newStr);
	                    $(this).append(' <a href="javascript:void(0);" class="read-more"> More Details...</a>');
	                    $(this).append('<span class="more-text">' + removedStr + '</span>');
	                }
	            });
	            $(".read-more").click(function() {
	                $(this).siblings(".more-text").append(' <a href="javascript:void(0);" class="read-less"> Less Details...</a>');
	                $(this).siblings(".more-text").contents().unwrap();
	                $(this).remove();
	                $(".read-less").on("click", function() {
	                    showLess();
	                });
	            });
	        }
	        showLess();
	    });
	    $('body').on('click', '#veg,#nonveg', function() {
	        var activeCatName = $('#activeCat').val(); //$('.list-group-item.item-type.activeCat').text();
	        if (activeCatName.length > 0) {
	            var filterArray = [];
	            $.each(items, function(index, value) {
	                if (value.Name === activeCatName) {
	                    var items = value.ProductsList;
	                    if (items.length > 0) {
	                        for (var i = 0; i < items.length; i++) {
	                            filterArray.push(items[i]);
	                        }
	                    }
	                }
	            });
	            filterArray1 = sortJSON(filterArray, 'isVeg');
	            if ($(this).attr('id') == 'veg')
	                filterArray1 = filterArray1.reverse();
	            $('.items').html('');
	            for (var i = 0; i < filterArray1.length; i++) {
	                displayItemDOM(filterArray1[i].ProductName, filterArray1[i].ProductCode, filterArray1[i].unitPrice, filterArray1[i].isVeg, filterArray1[i].imageURL, filterArray1[i].itemDes);
	            }
	            mobileChk();
	        } else {
	            BootstrapDialog.show({
	                title: 'Sort Option',
	                message: 'Please selecte any Category to Sort'
	            });
	        }
	        var maxLength = 50;

	        function showLess() {
	            $(".show-read-more").each(function() {
	                var myStr = $(this).text();
	                if ($.trim(myStr).length > maxLength) {
	                    var newStr = myStr.substring(0, maxLength);
	                    var removedStr = myStr.substring(maxLength, $.trim(myStr).length);
	                    $(this).empty().html(newStr);
	                    $(this).append(' <a href="javascript:void(0);" class="read-more"> More Details...</a>');
	                    $(this).append('<span class="more-text">' + removedStr + '</span>');
	                }
	            });
	            $(".read-more").click(function() {
	                $(this).siblings(".more-text").append(' <a href="javascript:void(0);" class="read-less"> Less Details...</a>');
	                $(this).siblings(".more-text").contents().unwrap();
	                $(this).remove();
	                $(".read-less").on("click", function() {
	                    showLess();
	                });
	            });
	        }
	        showLess();
	    });
	    var displayItemDOM = function(ProductName, ProductCode, unitPrice, isVeg, imageURL, itemDes) {
	        var item = '<li class="food_item media"><div class="media-left"><a href="#"><img class="img media-object hidden-xs" src="' + imageURL + '" alt="Test"></a></div><div class="media-body media-top"><h4 class="media-heading">' + ProductName;
	        if (isVeg)
	            item += '&nbsp;&nbsp;<img src="./custom/images/Veg.png" alt="Veg" title="Veg">';
	        else
	            item += '&nbsp;&nbsp;<img src="./custom/images/NonVeg.png" alt="Non Veg" title="Non Veg">';
	        item += '<span class="pull-right rate"><span class="WebRupee">Rs.</span> ' + unitPrice + '</span></h4><div class="customizeIcon"><span class="glyphicon glyphicon-minus cartMinus1" title="Click to decrease"></span><span class="quantity quantityItem" data-product-code="' + ProductCode + '" data-product-name="' + ProductName + '">1</span><span class="glyphicon glyphicon-plus cartPlus1" title="Click to increase"></span><br/><span class="glyphicon glyphicon-edit itemPanel" title="Customize your food"></span><span class="glyphicon glyphicon-shopping-cart" title="Add to Cart"></span></div><div class="summary"><a href="#"><img class="img media-object visible-xs" src="' + imageURL + '" alt="Test"></a><p class="show-read-more">' + itemDes + '</p></div><div class="cartCustomizeHiden"></div></div></li>';
	        $('.items').append(item);
	    };
	    $('body').on('click', '.clearCart', function() {
	        var cartTotalItems = JSON.parse(localStorage.getItem('cartJson'));
	        if (cartTotalItems != undefined) {
	            BootstrapDialog.confirm('Are you sure to clear the Cart?', function(result) {
	                if (result) {
	                    localStorage.removeItem('cartJson');
	                    renderCart();
	                }
	            });
	        } else {
	            BootstrapDialog.show({
	                title: 'Cart',
	                message: 'No Items to clear the cart'
	            });

	        }
	    });

	});

	function searchProduct(array, product_name) {
	    //console.log("product_name:"+product_name);
	    var data = [];
	    for (var i = 0; i < array.length; i++) {
	        //console.log(array[i].ProductsList);
	        array1 = array[i].ProductsList;
	        //console.log(array1);
	        for (var ii = 0; ii < array1.length; ii++) {
	            //console.log(array1[ii]);
	            //console.log(array1[ii].ProductName);
	            if (array1[ii].ProductName != undefined) {

	                if ((array1[ii].ProductName.toLowerCase()).indexOf(product_name) !== -1) {
	                    /*var obj = {};
				obj.product_code = array1[ii].product_code;
				obj.product_name = array1[ii].product_name;
				data.push(obj);*/
	                    //console.log("found");
	                    console.log(array1[ii]);
	                    displayItemDOMSearch(array1[ii].ProductName, array1[ii].ProductCode, array1[ii].unitPrice, array1[ii].isVeg, array1[ii].imageURL, array1[ii].itemDes)
	                    $('.list-group-item.item-type').removeClass('activeCat');
	                }
	            }

	        }
	    }

	};
	var displayItemDOMSearch = function(ProductName, ProductCode, unitPrice, isVeg, imageURL, itemDes) {
	    var item = '<li class="food_item media"><div class="media-left"><a href="#"><img class="img media-object hidden-xs" src="' + imageURL + '" alt="Test"></a></div><div class="media-body media-top"><h4 class="media-heading">' + ProductName;
	    if (isVeg)
	        item += '&nbsp;&nbsp;<img src="./custom/images/Veg.png" alt="Veg" title="Veg">';
	    else
	        item += '&nbsp;&nbsp;<img src="./custom/images/NonVeg.png" alt="Non Veg" title="Non Veg">';
	    item += '<span class="pull-right rate"><span class="WebRupee">Rs.</span> ' + unitPrice + '</span></h4><div class="customizeIcon"><span class="glyphicon glyphicon-minus cartMinus1" title="Click to decrease"></span><span class="quantity quantityItem" data-product-code="' + ProductCode + '" data-product-name="' + ProductName + '">1</span><span class="glyphicon glyphicon-plus cartPlus1" title="Click to increase"></span><br/><span class="glyphicon glyphicon-edit itemPanel" title="Customize your food"></span><span class="glyphicon glyphicon-shopping-cart" title="Add to Cart"></span></div><div class="summary"><a href="#"><img class="img media-object visible-xs" src="' + imageURL + '" alt="Test"></a><p class="show-read-more">' + itemDes + '</p></div><div class="cartCustomizeHiden"></div></div></li>';
	    $('.items').append(item);
	};
	var calcRWD = function() {
	    var rwdInfo = "1";

	    console.log("1:" + $(document).width());
	    if (!$("#sidr").is(':hidden')) {
	        return "4";
	    }
	    /*	if (window.getComputedStyle) {
			rwdInfo = window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('z-index');
			console.log("value:"+window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('z-index'));
		}*/
	    if ($(document).width() <= 419) rwdInfo = 4;
	    if ($(document).width() > 419 && $(document).width() <= 767) rwdInfo = 3;
	    if ($(document).width() > 768 && $(document).width() <= 1023) rwdInfo = 2;
	    return rwdInfo;
	}
	mobileChk = function() {
	    var rwdInfo = calcRWD();
	    console.log("rwdInfo:" + rwdInfo);
	    if (rwdInfo == 4) {
	        if ($('.summary > p').hasClass('show-read-more'))
	            console.log("there");
	        $('.summary > p > a.read-more').addClass('hidden');
	        $('.summary > p').addClass('mobileHide').removeClass('show-read-more');
	        $('.media-heading').addClass('hlink');
	        $('.mobileHide').hide();
	    } else {
	        if ($('.summary > p').hasClass('mobileHide')) {
	            $('.mobileHide').show();
	            $('.summary > p').addClass('show-read-more').removeClass('mobileHide');
	            $('.summary > p > a.read-more').removeClass('hidden');
	            $('.media-heading').removeClass('hlink');

	        }

	    }
	}

	$(window).resize(function() {

	    mobileChk();
	});

	function sortJSON(data, key) {
	    return data.sort(function(a, b) {
	        var x = a[key];
	        var y = b[key];
	        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	    });
	}

	/*Start cart logic*/

	var navListItems = $('ul.setup-panel li a'),
	    allWells = $('.setup-content');
	allWells.hide();

	setuserProfile();

	function updateAddress() {
	    if (userDetails.length > 0) {
	        $("#displayDeliveryName").text(userDetails[0].DeliveryFirstName + " " + userDetails[0].DeliveryLastName)
	        $("#displayDeliveryAddress").text(userDetails[0].DeliveryDNo+" ,"+userDetails[0].DeliveryStreet+" ,"+userDetails[0].DeliveryCity+" ,"+userDetails[0].DeliveryState +" -"+ userDetails[0].DeliveryPostalCode+ ", Ph:" + userDetails[0].DeliveryPhone)
	        $("#deliveryFirstName").val(userDetails[0].DeliveryFirstName);
	        $("#deliveryLastName").val(userDetails[0].DeliveryLastName);
	        $("#deliveryPhone").val(userDetails[0].DeliveryPhone);
	        $("#displayHomeName").text(userDetails[0].FirstName + " " + userDetails[0].LastName)
	        $("#displayHomeAddress").text(userDetails[0].HomeDNo+" ,"+userDetails[0].HomeStreet+" ,"+userDetails[0].HomeCity+" ,"+userDetails[0].HomeState +" -"+ userDetails[0].HomePostalCode+ ", Ph:" + userDetails[0].Phone );
	        $("#homeFirstName").val(userDetails[0].FirstName);
	        $("#homeLastName").val(userDetails[0].LastName);
	        $("#homePhone").val(userDetails[0].Phone);
            
	    }
	}
	updateAddress();
	$.getJSON("custom/js/locations.json", function(items) {

	    $.each(items, function(key, value) {
	        $("#homePinCode").append('<option data-street=' + value.street + ' value=' + value.PIN + '>' + value.PIN + '</option>');
	        $("#homeStreet").append('<option data-pin=' + value.PIN + ' value=' + value.street + '>' + value.street + '</option>');
	        $("#deliveryPinCode").append('<option data-street=' + value.street + ' value=' + value.PIN + '>' + value.PIN + '</option>');
	        $("#deliveryStreet").append('<option data-pin=' + value.PIN + ' value=' + value.street + '>' + value.street + '</option>');
	    });

	});

	$("#homePinCode").change(function() {
	    $("#homeStreet").val($("#homePinCode option:selected").data('street'));
	    updateAddress();
	});
	$("#homeStreet").change(function() {
	    $("#homePinCode").val($("#homeStreet option:selected").data('pin'));
	    updateAddress();
	});
	$("#deliveryPinCode").change(function() {
	    $("#deliveryStreet").val($("#deliveryPinCode option:selected").data('street'));
	    updateAddress();
	});
	$("#deliveryStreet").change(function() {
	    $("#deliveryPinCode").val($("#deliveryStreet option:selected").data('pin'));
	     
	});
	if (userDetails.length > 0) {
	    if (userDetails[0].HomeStreet == "" && userDetails[0].HomePostalCode == "") {
	        $(".createHomeAddress").show();
	        $(".defaultHomeAddress").hide();

	    } else {
	        $(".defaultHomeAddress").show();
	        $(".createHomeAddress").hide();

	    }
	    if (userDetails[0].DeliveryStreet == "" && userDetails[0].DeliveryPostalCode == "") {
	        $(".createDeliveryAddress").show();
	        $(".defaultDeliveryAddress").hide();
	    } else {
	        $(".createDeliveryAddress").hide();
	        $(".defaultDeliveryAddress").show();

	    }
	}
else{
    $(".defaultHomeAddress").hide();
    $(".defaultDeliveryAddress").hide();
}

	$("#homeAddressSubmit").click(function() {

	    userDetails[0].FirstName = $("#homeFirstName").val();
	    userDetails[0].LastName = $("#homeLastName").val();
	    userDetails[0].Phone = $("#homePhone").val();
	    userDetails[0].HomeDNo = $("#homeDNo").val();
	    userDetails[0].HomeStreet = $("#homeStreet").val();
	    userDetails[0].HomePostalCode = $("#homePinCode").val();
	    localStorage.setItem("userInfo", JSON.stringify(userDetails));
	    $(".defaultHomeAddress").toggle(500);
	    $(".editHomeAddress").toggle(500);
	    updateAddress();
	})
	$("#deliveryAddressSubmit").click(function() {
	    userDetails[0].DeliveryFirstName = $("#deliveryFirstName").val();
	    userDetails[0].DeliveryLastName = $("#deliveryLastName").val();
	    userDetails[0].DeliveryPhone = $("#deliveryPhone").val();
	    userDetails[0].DeliveryDNo = $("#deliveryDNo").val();
	    userDetails[0].DeliveryStreet = $("#deliveryStreet").val();
	    userDetails[0].DeliveryPostalCode = $("#deliveryPinCode").val();
	    localStorage.setItem("userInfo", JSON.stringify(userDetails));
	    $(".editDeliveryAddress").toggle(500);
	    $(".defaultDeliveryAddress").toggle(500);
	    updateAddress();
	})

	navListItems.click(function(e) {
	    e.preventDefault();
	    var $target = $($(this).attr('href')),
	        $item = $(this).closest('li');

	    if (!$item.hasClass('disabled')) {
	        navListItems.closest('li').removeClass('active');
	        $item.addClass('active');
	        allWells.hide();
	        $target.show();
	    }
	});

	$('ul.setup-panel li.active a').trigger('click');


	$('#activate-cartItems').on('click', function(e) {

	    if ($('input[name=addressSelection]:checked').length > 0) {

	        $('ul.setup-panel li:eq(1)').removeClass('disabled');
	        $('ul.setup-panel li a[href="#step-2"]').trigger('click');
	    } else {
	        //alert("Please select address to deliver food items");
	        BootstrapDialog.show({
	            title: 'Adderess Selection',
	            message: 'Please select address to deliver food items'
	        });
	    }
	})
	$('#activate-payment').on('click', function(e) {

	    $('ul.setup-panel li:eq(2)').removeClass('disabled');
	    $('ul.setup-panel li a[href="#step-3"]').trigger('click');

	})

	$(".editHomeAddress").hide();
	$(".editDeliveryAddress").hide();


	$(".editHomeAddressIcon").click(function() {
	  if(userDetails.length>0){
	        $(".defaultHomeAddress").toggle(500);
	        $(".editHomeAddress").toggle(500);
	        if ($(".defaultDeliveryAddress").is(':hidden') && userDetails[0].DeliveryPostalCode != null) {
	            $(".defaultDeliveryAddress").toggle(500);
	            $(".editDeliveryAddress").toggle(500);
	        }}
        else{
            $('#loginScreen').modal('show');
           
        }
	  


	})
	$(".editDeliveryAddressIcon").click(function() {
        if(userDetails.length>0){
	        $(".defaultDeliveryAddress").toggle(500);
	        $(".editDeliveryAddress").toggle(500);
	        if ($(".defaultHomeAddress").is(':hidden') && userDetails[0].HomePostalCode != null) {
	            $(".defaultHomeAddress").toggle(500);
	            $(".editHomeAddress").toggle(500);
	    }}
        else{
            $('#loginScreen').modal('show');
        }
    
	})

	$.getJSON("custom/js/products.json", function(items) {
	    console.log(items);
	});

	/*	var cartTotalItems = JSON.parse(localStorage.getItem('cartJson'));
		if (cartTotalItems != undefined) {
		    cartTotalItemsLength = cartTotalItems.itemsArray.length
		    if (cartTotalItemsLength > 0) {
		        var cartItemDescHtml = '';
		        for (var index = 0; index < cartTotalItemsLength; index++) {
		            var eachItemData = cartTotalItems.itemsArray[index];
		            //var productSubTotal = eachItemData.product_qty * 25;
		            // getProductPrice(cartProductCodes, cartProductLineItems, cartProductQty);
		            var productSubTotal = getProductPrice(eachItemData.product_code, eachItemData.product_lineitems, eachItemData.product_qty);
		            var CheckOutItems = '<tr><td data-th=""><div class="row"><div class="col-sm-2 hidden-xs"><img src="http://placehold.it/100x100" alt="..." class="img-responsive"/></div><div class="col-sm-6"><h4 class="nomargin productName">' + eachItemData.product_name + '</h4></div>          </div></td><td data-th="Price" class="price">&#8377; 25 </td><td data-th="Quantity">' + eachItemData.product_qty + '</td><td data-th="Subtotal" class="text-center" class="subtotal">&#8377;' + productSubTotal + ' </td>  <td class="actions" data-th=""></td>     </tr>'

		            cartItemDescHtml += CheckOutItems;
		        }
		        $('#checkOutItemsList').html('');
		        $('#checkOutItemsList').append(cartItemDescHtml);

		    } else {

		        $('#checkOutItemsList').html("<div>No items yet</div>");
		    }
		}*/

	/*End cart logic*/

	/*Start OTP Logic*/
	function validatePhone(phone) {
	    if (phone.match(/^[7-9][0-9]{9}$/) != null) {
	        return true;
	    } else {
	        return false;
	    }
	}
	$(".conformPasswordBlock").hide();
	$('body').on('click', '#otpLink', function() {

	    var phoneNo = $(".phoneNo").val();
	    var validPhoneNo = validatePhone(phoneNo);

	    if (validPhoneNo) {
	        $(".OTP-error-block").text("");
	        $(".sendOTPForm").hide();
	        $('#loginScreen').modal('hide');
	        $('#otpScreen').modal();

	        $(".otp_ConformPassword").text("Please enter OTP sent to :" + phoneNo);
	    } else {
	        $('.phone-help-block').text("Please enter valid phone number to generate OTP");

	    }


	});
	$('body').on('click', '.sendOTPButton', function() {
	    var phoneNo = $(".phNumberForOTP").val();
	    var validPhoneNo = validatePhone(phoneNo);
	    if (validPhoneNo) {
	        $('.OTP-error-block').text("");
	        $(".sendOTPForm").toggle();
	        $(".otpValidateForm").toggle();
	        $(".otp_ConformPassword").text("Please enter OTP sent to :" + phoneno);
	    } else {
	        $('.OTP-error-block').text("Please enter valid phone number to generate OTP");
	    }
	});

	$('body').on('click', '#signUp', function() {

	    $(".otpValidateForm").hide();
	    $('#loginScreen').modal('hide');
	    $('#otpScreen').modal();
	});
	$('body').on('click', '#login', function() {

	    var phoneNo = $(".phoneNo").val();
	    var password = $(".loginPassword").val();
	    var validPhoneNo = validatePhone(phoneNo);
	    var validPassword = password.indexOf("'");

	    if (validPhoneNo && validPassword == -1) {
	        $('.phone-help-block').text("");
	        alert("Sample service method created ajaxRequest(url, jsonData, method, asyn, callBackFunction)");
	        //ajaxRequest(url, jsonData, method, asyn, callBackFunction)
	        $('#loginScreen').modal('hide');
	        $('body').removeClass('modal-open');
	        var userDetailsResponce = [{
	            "Phone": "9999099990",
	            "LastName": "B",
	            "HomeStreet": null,
	            "HomeState": "Telangana",
	            "HomePostalCode": null,
	            "HomePhone": null,
	            "HomeLongitude": null,
	            "HomeDNo": "",
	            "DeliveryDNo": "",
	            "HomeLatitude": null,
	            "HomeCountry": "India",
	            "HomeCity": "Hyderabad",
	            "FirstName": "Ramesh",
	            "ErrorMessage": "",
	            "Email": "nikhilmutyam@yahoo.com",
	            "DeliveryStreet": null,
	            "DeliveryState": "Telangana",
	            "DeliveryPostalCode": null,
	            "DeliveryLongitude": null,
	            "DeliveryLatitude": null,
                "DeliveryLastName": "M",
	            "DeliveryCountry": "India",
	            "DeliveryCity": "Hyderabad",
	            "DeliveryFirstName": "Suneel",
	            "Birthdate": "1989-01-01",
	            "pic": "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAH0AfQMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABgcBBAUDAv/EADkQAAEDAgQDBQUECwAAAAAAAAABAgMEEQUGITESQVETQmFxgSKRocHRFDJykgcjNVJidLGywuHw/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFhEBAQEAAAAAAAAAAAAAAAAAAAER/9oADAMBAAIRAxEAPwC5AAZUAAABdjVxDEKbDoeOrlRqck5u8gNsEFxDOVTIrmUMTYmX0c/Vy/Q5MmPYo93EtbK3wS1hgs8FaszJizUZarVeDk5qa+ZJsDzXDWqkNejYZ1WzXd130GCSAXvbx2AAAAAAAAAAb6AAamK18eG0L6qXZqaNvq5V2QrPEa6oxGqdUVDlVy7N5NTwJDnysc+qhomr7LGpI/zXb4EVLEYQyAUAu2gAEqytmJ8UrKGufeN2kUi91eiqTdU528CnvG9rcyzsu1q1+EwTuW77cL/xItiWDpAAigAAAAAAAK3ze5VzHVtXu8DU/I0453c6RK3H5ZLaSRsdfrpb5HCLEAAUAAAUneQnKuETN5NqFRPytUgik/yLHw4JxptJM9fdZPkBIQAZUAAAAAAABEM/02lJVtTmsbv6p8yHFj5upH1eCSNi1dEqSInW2/wuVwWIAAoAAAq2LMyvAtPgNGxUVFVnEqeKrcr3C6V1diEFMxvFxvTi8G8y1kRGpwt0amyISgACKAAAAABkwACojtF2UrHMVJ9ixmpjRLRudxsTwX/ZZ6bkXzvhyzUra6NLuh9l/wCFeYggwFwaQAPSnhfUzxwxJd8jkagExyFR8FJNWOanE93Cxba2Qlfl02NegpW0VHDTM2Y1E9eZsGVAAAAAAAyBgBdEVVVEROanIxDMuGUKqxZu2lTuRe1712+IHXvbXl1ORmueOHAqhJHoiyJwtT95VI7XZzrJHKlFFHA3k53tO+hH6ysqa6TtKud8rr6cS7FHhpcBEBUF2N3A52U2L0ssqojGv1VeRpC3UC4EVrkRWqioqaWW5ncrCgx7E6BqNhqFWNNo3pxNJBRZ2Y6yYhTKxeb4dU9y6/EipcDVocSocQajqOpZIttW3s5PRdTa/wC2IAAAHOxnGKbCYkdO7ikd9yNu6m3WVMdJSS1Mq2ZG25VldVy11U+pnW8jl25NTohRuYrj1diaqksixxcoo9E9epzPRBYDEAAUAAAAABQl09QAMxudE5r43Kx7V0c1bL7yTYLm2eFzYsS/Wxbdr3m+fUjCmNgLegliqImywPR7HJdHJzPvyIHkzFXU9b9ikcvYzfc/hcT1TKoxnyp7LDYadi27aTXyRLkFJd+kL7+H+Uv+BESxAAFAAAAAAAAAAAAoAH1FI+CRssa2cxUcnmhbVNKk9PHM3Z7EVF63S/zKjUtLAv2Hh/8ALR/2oSj/2Q=="
	        }];
	        localStorage.setItem('userInfo', JSON.stringify(userDetailsResponce));
	        setuserProfile();

	    } else {
	        $('.phone-help-block').text("Please check your credencials");
	        $(".loginPassword").val("");
	    }
	});

	$('body').on('click', '.savePasswordButton', function() {
	    var removeSingleQuote = $(".confirmPassword").val().indexOf("'");


	    if (removeSingleQuote == -1 && $(".confirmPassword").val() == $(".password").val() && $(".password").val() != "") {
	        $(".error-block").text("");
	        $('#otpScreen').modal('hide');
	        var userDetailsResponce = [{
	            "Phone": "9999099990",
	            "LastName": "B",
	            "HomeStreet": null,
	            "HomeState": "Telangana",
	            "HomePostalCode": null,
	            "HomePhone": null,
	            "HomeLongitude": null,
	            "HomeDNo": "",
	            "DeliveryDNo": "",
	            "HomeLatitude": null,
	            "HomeCountry": "India",
	            "HomeCity": "Hyderabad",
	            "FirstName": "Ramesh",
	            "ErrorMessage": "",
	            "Email": "nikhilmutyam@yahoo.com",
	            "DeliveryStreet": null,
	            "DeliveryState": "Telangana",
	            "DeliveryPostalCode": null,
	            "DeliveryLongitude": null,
	            "DeliveryLatitude": null,
	            "DeliveryCountry": "India",
	            "DeliveryCity": "Hyderabad",
	            "DeliveryFirstName": "Suneel","DeliveryLastName": "M",
	            "Birthdate": "1989-01-01",
	            "pic": "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAH0AfQMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABgcBBAUDAv/EADkQAAEDAgQDBQUECwAAAAAAAAABAgMEEQUGITESQVETQmFxgSKRocHRFDJykgcjNVJidLGywuHw/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFhEBAQEAAAAAAAAAAAAAAAAAAAER/9oADAMBAAIRAxEAPwC5AAZUAAABdjVxDEKbDoeOrlRqck5u8gNsEFxDOVTIrmUMTYmX0c/Vy/Q5MmPYo93EtbK3wS1hgs8FaszJizUZarVeDk5qa+ZJsDzXDWqkNejYZ1WzXd130GCSAXvbx2AAAAAAAAAAb6AAamK18eG0L6qXZqaNvq5V2QrPEa6oxGqdUVDlVy7N5NTwJDnysc+qhomr7LGpI/zXb4EVLEYQyAUAu2gAEqytmJ8UrKGufeN2kUi91eiqTdU528CnvG9rcyzsu1q1+EwTuW77cL/xItiWDpAAigAAAAAAAK3ze5VzHVtXu8DU/I0453c6RK3H5ZLaSRsdfrpb5HCLEAAUAAAUneQnKuETN5NqFRPytUgik/yLHw4JxptJM9fdZPkBIQAZUAAAAAAABEM/02lJVtTmsbv6p8yHFj5upH1eCSNi1dEqSInW2/wuVwWIAAoAAAq2LMyvAtPgNGxUVFVnEqeKrcr3C6V1diEFMxvFxvTi8G8y1kRGpwt0amyISgACKAAAAABkwACojtF2UrHMVJ9ixmpjRLRudxsTwX/ZZ6bkXzvhyzUra6NLuh9l/wCFeYggwFwaQAPSnhfUzxwxJd8jkagExyFR8FJNWOanE93Cxba2Qlfl02NegpW0VHDTM2Y1E9eZsGVAAAAAAAyBgBdEVVVEROanIxDMuGUKqxZu2lTuRe1712+IHXvbXl1ORmueOHAqhJHoiyJwtT95VI7XZzrJHKlFFHA3k53tO+hH6ysqa6TtKud8rr6cS7FHhpcBEBUF2N3A52U2L0ssqojGv1VeRpC3UC4EVrkRWqioqaWW5ncrCgx7E6BqNhqFWNNo3pxNJBRZ2Y6yYhTKxeb4dU9y6/EipcDVocSocQajqOpZIttW3s5PRdTa/wC2IAAAHOxnGKbCYkdO7ikd9yNu6m3WVMdJSS1Mq2ZG25VldVy11U+pnW8jl25NTohRuYrj1diaqksixxcoo9E9epzPRBYDEAAUAAAAABQl09QAMxudE5r43Kx7V0c1bL7yTYLm2eFzYsS/Wxbdr3m+fUjCmNgLegliqImywPR7HJdHJzPvyIHkzFXU9b9ikcvYzfc/hcT1TKoxnyp7LDYadi27aTXyRLkFJd+kL7+H+Uv+BESxAAFAAAAAAAAAAAAoAH1FI+CRssa2cxUcnmhbVNKk9PHM3Z7EVF63S/zKjUtLAv2Hh/8ALR/2oSj/2Q=="
	        }];
	        localStorage.setItem('userInfo', JSON.stringify(userDetailsResponce));
	        setuserProfile();
	        $('body').removeClass('modal-open');
	    } else {
	        $(".error-block").text("Password not match/valid..! please try again");
	        $(".confirmPassword").val("");
	        $(".password").val("");
	    }
	});
	otpAttemps = 0;

	$('body').on('click', '.otpValidateButton', function() {
	    otp = $(".otpValue").val();
	    var validOTP = otp.match(/^[0-9]{4}$/);
	    if (validOTP != null && otp == 1234) {
	        $(".OTP-error-block").text("");
	        $(".otp_ConformPassword").text("Confirm Password");
	        $(".otpForm").toggle();
	        $(".conformPasswordBlock").toggle();
	    } else {
	        $(".otpValue").val("");
	        otpAttemps++
	        $(".OTP-error-block").text("OTP Max attempts 3 times. current attempt : " + otpAttemps);
	    }
	    if (otpAttemps >= 3) {
	        $('#otpScreen').modal('hide');
	        $('body').removeClass('modal-open');
	        alert("Reached Maximum attempts");
	        otpAttemps = 0;
	    }

	});
	/*End OTP Logic*/