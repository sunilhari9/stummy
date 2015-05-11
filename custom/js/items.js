$.getJSON( "custom/js/products.json", function( items ) {
	var displayItemDOM = function(ProductName){
		var item = '<div class="media"><div class="media-left"><a href="#"><img class="img media-object" src="./custom/images/food/1.jpg" alt="Test"></a></div><div class="media-body media-top"><h4 class="media-heading">'+ProductName+'<div class="pull-right more">...</div></h4><div class="summary">Sample TestSample TestSample TestSample TestSample TestSample TestSample TestSample TestSample TestSample TestSample TestSample TestSample Test</div></div><div class="media-right"><input type="text" value=1 class="quantity"></div></div>';
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
			if(value.Name===categoryName){
				var items = value.ProductsList;
				if(items.length > 0){
					for (var i=0;i<items.length;i++)
					{
						displayItemDOM(items[i].ProductName);
					}
				}
			}
		});
		$(".summary").hide();
		$(".more").on("click", function(){
		   $(this).parent().next().toggle(500);
		});
	}
	var displayDefaultItems = function(){
		displayItems(uniqueCategories[0]);
	}
	displayDefaultItems();
	$('.list-group-item.item-type').click(function(){
		$('.list-group-item.item-type').removeClass('activeCat');
		$(this).addClass('.list-group-item .item-type activeCat');
		displayItems($(this).text());
	});
});
