  $(document).ready(function() {
    
    var navListItems = $('ul.setup-panel li a'),
        allWells = $('.setup-content');

    allWells.hide();

    navListItems.click(function(e)
    {
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
    
    // DEMO ONLY //
    $('#activate-step-2').on('click', function(e) {
        $('ul.setup-panel li:eq(1)').removeClass('disabled');
        $('ul.setup-panel li a[href="#step-2"]').trigger('click');
        }) 
    
    $(".editHomeAddress").hide();
          $(".editDelivaryAddress").hide();
        $(".editHomeAddressIcon").click(function(){
            $(".defaultHomeAddress").toggle(500);
            $(".editHomeAddress").toggle(500);
            
        })
        $(".editDelivaryAddressIcon").click(function(){
            $(".defaultDelivaryAddress").toggle(500);
            $(".editDelivaryAddress").toggle(500);
            
        })

  $.getJSON( "custom/js/products.json", function( items ) {
      console.log(items);
  });
      
    var cartTotalItems = JSON.parse(localStorage.getItem('cartJson'));
		if(cartTotalItems != undefined){
			cartTotalItemsLength = cartTotalItems.itemsArray.length
			if(cartTotalItemsLength > 0){
            var cartItemDescHtml = '';
				for(var index = 0;index<cartTotalItemsLength;index++){
					var eachItemData = cartTotalItems.itemsArray[index];
					 var productSubTotal= eachItemData.product_qty * 25;
                var CheckOutItems='<tr><td data-th=""><div class="row"><div class="col-sm-2 hidden-xs"><img src="http://placehold.it/100x100" alt="..." class="img-responsive"/></div><div class="col-sm-6"><h4 class="nomargin productName">'+eachItemData.product_name+'</h4></div>          </div></td><td data-th="Price" class="price">&#8377; 25 </td><td data-th="Quantity"><input type="number" class="form-control text-center " value="'+eachItemData.product_qty+'"></td><td data-th="Subtotal" class="text-center" class="subtotal">&#8377;'+productSubTotal+' </td>  <td class="actions" data-th=""><button class="btn btn-danger btn-sm"><i class="glyphicon glyphicon-trash deleteItem"></i></button></td>     </tr>'
                    
					cartItemDescHtml += CheckOutItems;
				}
				$('#checkOutItemsList').html('');
				$('#checkOutItemsList').append(cartItemDescHtml);
				
			}else{
				
				$('#checkOutItemsList').html("<div>No items yet</div>");
			}
		}
  });
