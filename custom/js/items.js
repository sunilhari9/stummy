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

console.log("Total items:"+items.length);
var filterItems = function(categoryName){
	var as=$(items).filter(function (i,n){return n.PCategory===categoryName});
	return as;
};
var displayItemDOM = function(ProductName){
	var item = '<div class="media"><div class="media-left"><a href="#"><img class="img media-object" src="./custom/images/food/1.jpg" alt="Test"></a></div><div class="media-body media-bottom"><h4 class="media-heading">'+ProductName+'</h4>Sample Test</div></div>';
	$('.items').append(item);
};


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
		console.log(items[i].PName +"         "+items[i].PCode);
		displayItemDOM(items[i].PName);
	}
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
