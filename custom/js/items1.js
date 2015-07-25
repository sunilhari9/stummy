$.getJSON("custom/js/products.json", function(items) {
    //localStorage.setItem('products',JSON.stringify(items));
    var lastDeviceState = '';


    var displayItemDOM = function(ProductName, ProductCode, unitPrice, isVeg, imageURL,itemDes) {
        var item = '<li class="food_item media"><div class="media-left"><a href="#"><img class="img media-object hidden-xs" src="' + imageURL + '" alt="Test"></a></div><div class="media-body media-top"><h4 class="media-heading">' + ProductName;
        if (isVeg)
            item += '&nbsp;&nbsp;<img src="./custom/images/Veg.png" alt="Veg" title="Veg">';
        else
            item += '&nbsp;&nbsp;<img src="./custom/images/NonVeg.png" alt="Non Veg" title="Non Veg">';
    //    item += '<span class="pull-right rate"><span class="WebRupee">Rs.</span> ' + unitPrice + '</span></h4><div class="customizeIcon"><span class="glyphicon glyphicon-minus cartMinus1" title="Click to decrease"></span><span class="quantity quantityItem" data-product-code="' + ProductCode + '" data-product-name="' + ProductName + '">1</span><span class="glyphicon glyphicon-plus cartPlus1" title="Click to increase"></span><br/><span class="glyphicon glyphicon-edit itemPanel" title="Customize your food"></span><span class="glyphicon glyphicon-shopping-cart" title="Add to Cart"></span></div><div class="summary"><a href="#"><img class="img media-object visible-xs" src="' + imageURL + '" alt="Test"></a><p class="show-read-more">'+itemDes+'</p></div><div class="cartCustomizeHiden"></div></div></li>';
		item += '<span class="pull-right rate"><span class="WebRupee">Rs.</span> ' + unitPrice + '</span></h4><div class="customizeIcon"><span class="glyphicon glyphicon-minus-sign cartMinus1" title="Click to decrease"></span><span class="quantity quantityItem" data-product-code="' + ProductCode + '" data-product-name="' + ProductName + '">1</span><span class="glyphicon glyphicon-plus-sign cartPlus1" title="Click to increase"></span><br/><button class="addCart itemPanel">Add</button></span></div><div class="summary"><a href="#"><img class="img media-object visible-xs" src="' + imageURL + '" alt="Test"></a><p class="show-read-more">'+itemDes+'</p></div><div class="cartCustomizeHiden"></div></div></li>';
        $('.items').append(item);		
    };
    var getUniqueCategories = function() {
        var categories = [];
        $.each(items, function(index, value) {
            if ($.inArray(value.Name, categories) === -1) {
                categories.push(value.Name);
            }
        });
        return categories;
    }
    var uniqueCategories = getUniqueCategories();
    $.each(uniqueCategories, function(index, value) {
        if (index == 0)
            $('.list-group').append('<a href="#" class="list-group-item item-type inActive activeCat">' + value + '</a>');
        else
            $('.list-group').append('<a href="#" class="list-group-item item-type inActive">' + value + '</a>');
    });
	
	var displayItems = function(categoryName) {
        $('.items').html('');
        $.each(items, function(index, value) {
            if (value.Name === categoryName) {
                var items = value.ProductsList;
                if (items.length > 0) {
                    for (var i = 0; i < items.length; i++) {
                        displayItemDOM(items[i].ProductName, items[i].ProductCode, items[i].unitPrice, items[i].isVeg, items[i].imageURL,items[i].itemDes);
                    }
					mobileChk();
                }
            }
        });
        $(document).ready(function() {
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

        });
    }

    var displayDefaultItems = function() {
        displayItems(uniqueCategories[0]);
		$('#activeCat').val(uniqueCategories[0]);
    }
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
	    if ($(document).width() >= 768 && $(document).width() <= 1023) rwdInfo = 2;
	    return rwdInfo;
	}
	var mobileChk = function() {
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
     $(window).touchwipe({
        wipeLeft: function() {
          console.log("Slider touch");
          $.sidr('close', 'sidr');
        },
        wipeRight: function() {
          // Open
          $.sidr('open', 'sidr');
        },
        preventDefaultEvents: false
      });
    displayDefaultItems();
    $('.list-group-item.item-type').click(function() {
        $('.list-group-item.item-type').removeClass('activeCat').addClass('inActive');
        $(this).addClass('list-group-item item-type activeCat');
        
        if(!$("#sidr").is(':hidden')){
            $.sidr('close', 'sidr');
            $( ".container-fluid " ).removeClass( "blur-backGround" );
            console.log("Slider is open");
        }
		$('#activeCat').val($(this).text());
        displayItems($(this).text());
    });
	var rwdInfo = calcRWD();
	console.log("rwdInforwdInforwdInforwdInforwdInforwdInforwdInforwdInfo:"+rwdInfo);
	if (rwdInfo == 1) {
		$('.itemList').height($('.list-group').height()-2);
		$('.items').css('min-height',$('.list-group').height()-90);
		$('.items').css('max-height',$('.list-group').height()-90);
	}
});