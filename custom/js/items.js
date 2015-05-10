var items = 
[
{"PUPrice": 70,"PName": "South Indian Thali","PCode": "1","PCategory": "Rice Item"},
{"PUPrice": 70,"PName": "North Indian Thali","PCode": "2","PCategory": "Rice Item"},
{"PUPrice": 70,"PName": "Hot soup1","PCode": "3","PCategory": "Soups"},
{"PUPrice": 70,"PName": "Hot soup2","PCode": "3","PCategory": "Soups"},
{"PUPrice": 70,"PName": "Hot soup3","PCode": "3","PCategory": "Soups"},
{"PUPrice": 70,"PName": "Hot soup4","PCode": "3","PCategory": "Soups"},
{"PUPrice": 70,"PName": "Hot soup5","PCode": "3","PCategory": "Soups"},
{"PUPrice": 70,"PName": "Hot soup6","PCode": "3","PCategory": "Soups"},
{"PUPrice": 70,"PName": "Hot soup7","PCode": "3","PCategory": "Soups"},
{"PUPrice": 70,"PName": "Hot soup8","PCode": "3","PCategory": "Soups"},
{"PUPrice": 70,"PName": "Hot soup8","PCode": "3","PCategory": "Soups"},
{"PUPrice": 70,"PName": "Hot soup1","PCode": "3","PCategory": "Soups"},
{"PUPrice": 70,"PName": "Hot soup2","PCode": "3","PCategory": "Soups"},
{"PUPrice": 70,"PName": "Hot soup3","PCode": "3","PCategory": "Soups"},
{"PUPrice": 70,"PName": "Hot soup4","PCode": "3","PCategory": "Soups"},
{"PUPrice": 70,"PName": "Hot soup5","PCode": "3","PCategory": "Soups"},
{"PUPrice": 70,"PName": "Tomato soup","PCode": "4","PCategory": "Soups"}
];

var filterItems = function(categoryName){
	var as=$(items).filter(function (i,n){return n.PCategory===categoryName});
	return as;
};
var displayItemDOM = function(ProductName){
	var item = '<div class="media"><div class="media-left"><a href="#"><img class="img media-object" src="./custom/images/food/1.jpg" alt="Test"></a></div><div class="media-body media-middle"><h4 class="media-heading">'+ProductName+'<div class="pull-right more">...</div></h4><div class="summary">Sample TestSample TestSample TestSample TestSample TestSample TestSample TestSample TestSample TestSample TestSample TestSample TestSample Test</div></div><div class="media-right"><input type="text" value=1 class="quantity"></div></div>';
	$('.items').append(item);
};
$(document).ready(function(){
$(".summary").hide();
$(".more").on("click", function(){
   $(this).parent().next().toggle(500);
});
    
});
var getUniqueCategories = function(){ 
	var categories = [];
	$.each(items, function(index, value) {
		if ($.inArray(value.PCategory, categories) === -1) {
			categories.push(value.PCategory);
		}
	});
	return categories.reverse();
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
	var items = filterItems(categoryName);
	for (var i=0;i<items.length;i++)
	{
		displayItemDOM(items[i].PName);
	}
     $(".summary").hide();
    $(".more").on("click", function(){
   $(this).parent().next().toggle(500);
});
}
var displayDefaultItems = function(){

	displayItems(uniqueCategories[0]);
}
displayDefaultItems();
$(document).ready(function(){
	$('.list-group-item.item-type').click(function(){
		$('.list-group-item.item-type').removeClass('activeCat');
		$(this).addClass('.list-group-item .item-type activeCat');
       	displayItems($(this).text());
	});
});
