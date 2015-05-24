$.getJSON( "custom/js/products.json", function( items ) {
//localStorage.setItem('products',JSON.stringify(items));
   var lastDeviceState = '';


	var displayItemDOM = function(ProductName,ProductCode,unitPrice){
<<<<<<< HEAD
        var item = '<li class="food_item media"><div class="media-left"><a href="#"><img class="img media-object hidden-xs" src="./custom/images/food/1.jpg" alt="Test"></a></div><div class="media-body media-top"><h4 class="media-heading">'+ProductName+'</h4><div class="customizeIcon"><span class="round-button"><span class="WebRupee">Rs.</span> '+unitPrice+'</span><span class="glyphicon glyphicon-minus cartMinus1" title="Click to decrease"></span><span class="quantity quantityItem" data-product-code="'+ProductCode+'" data-product-name="'+ProductName+'">1</span><span class="glyphicon glyphicon-plus cartPlus1" title="Click to increase"></span><span class="glyphicon glyphicon-edit itemPanel" title="Customize your food"></span><span class="glyphicon glyphicon-shopping-cart" title="Add to Cart"></span></div><div class="summary"><a href="#"><img class="img media-object visible-xs" src="./custom/images/food/1.jpg" alt="Test"></a><p class="show-read-more"> eu lacus dignissim efficitur. Proin ex metus, ornare placerat nisi at, porta lobortis turpis. Praesent euismod nec nulla ultrices maximus. Vivamus imperdiet quam ac lobortis cursus. Nam dapibus ullamcorper magna vehicula aliquam. Vivamus hendrerit molestie neque. Ut interdum diam a purus ultrices facilisis. Suspendisse molestie</p></div><div class="cartCustomizeHiden"></div></div></li>';
=======
        var item = '<li class="food_item media"><div class="media-left"><a href="#"><img class="img media-object hidden-xs" src="./custom/images/food/1.jpg" alt="Test"></a></div><div class="media-body media-top"><h4 class="media-heading">'+ProductName+'</h4><div class="customizeIcon"><span class="round-button"><span class="WebRupee">Rs.</span> '+unitPrice+'</span><span class="glyphicon glyphicon-minus cartMinus1" title="Click to decrease"></span><span class="quantity quantityItem" data-product-code="'+ProductCode+'" data-product-name="'+ProductName+'">1</span><span class="glyphicon glyphicon-plus cartPlus1" title="Click to increase"></span><span class="glyphicon glyphicon-edit itemPanel" title="Customize your food"></span><span class="glyphicon glyphicon-shopping-cart" title="Add to Cart"></span></div><div class="summary"><a href="#"><img class="img media-object visible-xs" src="./custom/images/food/1.jpg" alt="Test"></a><p class="show-read-more"> eu lacus dignissim efficitur. Proin ex metus, ornare placerat nisi at, porta lobortis turpis. Praesent euismod nec nulla ultrices maximus. Vivamus imperdiet quam ac lobortis cursus. Nam dapibus ullamcorper magna vehicula aliquam. Vivamus hendrerit molestie neque. Ut interdum diam a purus ultrices facilisis. Suspendisse molestie</p></div><div class="cartCustomizeHiden"><div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">  <div class="panel panel-default">    <div class="panel-heading" role="tab" id="headingOne">  <h4 class="panel-title">    <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne">Item #1 </a> </h4></div><div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne"><div class="panel-body"><div class="rowCheckBox"><div class="colCheckBox"><input type="checkbox" /><label>Spicy</label></div><div class="colCheckBox"><input type="checkbox" /><label>Medium Spicy</label></div> <div class="colCheckBox"><input type="checkbox" /><label>double spicy</label></div></div> </div></div></div><div class="panel panel-default"><div class="panel-heading" role="tab" id="headingTwo">      <h4 class="panel-title"><a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">Item #2 </a> </h4></div><div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo"><div class="panel-body"><div class="rowCheckBox"><div class="colCheckBox"><input type="checkbox" /><label>Spicy</label></div><div class="colCheckBox"><input type="checkbox" /><label>Medium Spicy</label></div> <div class="colCheckBox"><input type="checkbox" /><label>double spicy</label></div></div> </div></div></div><div class="panel panel-default"><div class="panel-heading" role="tab" id="headingThree"><h4 class="panel-title"><a class="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree"> Item #3</a></h4></div> <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree"><div class="panel-body"> <div class="rowCheckBox"><div class="colCheckBox"><input type="checkbox" /><label>Spicy</label></div><div class="colCheckBox"><input type="checkbox" /><label>Medium Spicy</label></div> <div class="colCheckBox"><input type="checkbox" /><label>double spicy</label></div></div> </div></div></div></div></div></li>';
>>>>>>> origin/master
		$('.items').append(item);
	};
	var getUniqueCategories = function(){ 
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
		if(index == 0)
			$('.list-group').append('<a href="#" class="list-group-item item-type activeCat">'+value+'</a>');
		else
			$('.list-group').append('<a href="#" class="list-group-item item-type">'+value+'</a>');
	});
	var displayItems = function(categoryName){
	$('.items').html('');
		$.each(items, function(index, value) {
			if(value.Name === categoryName){
				var items = value.ProductsList;
				if(items.length > 0){
					for (var i=0;i<items.length;i++)
					{
						displayItemDOM(items[i].ProductName,items[i].ProductCode,items[i].unitPrice);
					}
				}
			}
		});
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
        	}
	
	var displayDefaultItems = function(){
		displayItems(uniqueCategories[0]);
	}
	displayDefaultItems();
	$('.list-group-item.item-type').click(function(){
		$('.list-group-item.item-type').removeClass('activeCat');
		$(this).addClass('.list-group-item .item-type activeCat');
         $.sidr('close', 'list-group');
		displayItems($(this).text());
    });
});