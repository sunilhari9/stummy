  $(document).ready(function() {

      var navListItems = $('ul.setup-panel li a'),
          allWells = $('.setup-content');
      allWells.hide();
      if (localStorage.getItem("homeAddress") == null) {
          var homeAddress = {};
          homeAddress.Name = "Suneel";
          homeAddress.Email = "sunilhari9@gmail.com";
          homeAddress.Phone = "9705984789";
          homeAddress.Address = "Hyd";
          localStorage.setItem("homeAddress", JSON.stringify(homeAddress));
      }
      if (localStorage.getItem("deliveryAddress") == null) {
          var deliveryAddress = {};
          deliveryAddress.Name = "Suneel";
          deliveryAddress.Email = "sunilhari9@gmail.com";
          deliveryAddress.Phone = "9705984789";
          deliveryAddress.Address = "Hyd";
          localStorage.setItem("deliveryAddress", JSON.stringify(deliveryAddress));
      }
      var homeAddressLocalStorage = JSON.parse(localStorage.getItem("homeAddress"));
      $("#displayHomeName").text(homeAddressLocalStorage.Name)
      $("#displayHomeAddress").text(homeAddressLocalStorage.Address + ", Ph:" + homeAddressLocalStorage.Phone);
      $("#homeName").val(homeAddressLocalStorage.Name);
      $("#homeEmail").val(homeAddressLocalStorage.Email);
      $("#homePhone").val(homeAddressLocalStorage.Phone);
      $("#homeAddr").val(homeAddressLocalStorage.Address);


      var deliveryAddressLocalStorage = JSON.parse(localStorage.getItem("deliveryAddress"));
      $("#displayDelivaryName").text(deliveryAddressLocalStorage.Name)
      $("#displayDelivaryAddress").text(deliveryAddressLocalStorage.Address + ", Ph:" + deliveryAddressLocalStorage.Phone)
      $("#deliveryName").val(deliveryAddressLocalStorage.Name);
      $("#deliveryEmail").val(deliveryAddressLocalStorage.Email);
      $("#deliveryPhone").val(deliveryAddressLocalStorage.Phone);
      $("#deliveryAddr").val(deliveryAddressLocalStorage.Address);
      $("#homeAddressSubmit").click(function() {
          var homeAddress = {};
          homeAddress.Name = $("#homeName").val();
          homeAddress.Email = $("#homeEmail").val();
          homeAddress.Phone = $("#homePhone").val();
          homeAddress.Address = $("#homeAddr").val();
          localStorage.setItem("homeAddress", JSON.stringify(homeAddress));
      })
      $("#deliveryAddressSubmit").click(function() {
          var deliveryAddress = {};
          deliveryAddress.Name = $("#deliveryName").val();
          deliveryAddress.Email = $("#deliveryEmail").val();
          deliveryAddress.Phone = $("#deliveryPhone").val();
          deliveryAddress.Address = $("#deliveryAddr").val();
          localStorage.setItem("deliveryAddress", JSON.stringify(deliveryAddress));
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

      // DEMO ONLY //
      $('#activate-step-2').on('click', function(e) {
          $('ul.setup-panel li:eq(1)').removeClass('disabled');
          $('ul.setup-panel li a[href="#step-2"]').trigger('click');
      })

      $(".editHomeAddress").hide();
      $(".editDelivaryAddress").hide();
      $(".editHomeAddressIcon").click(function() {
          $(".defaultHomeAddress").toggle(500);
          $(".editHomeAddress").toggle(500);
          if ($(".defaultDelivaryAddress").is(':hidden')) {
              $(".defaultDelivaryAddress").toggle(500);
              $(".editDelivaryAddress").toggle(500);
          }


      })
      $(".editDelivaryAddressIcon").click(function() {
          $(".defaultDelivaryAddress").toggle(500);
          $(".editDelivaryAddress").toggle(500);
          if ($(".defaultHomeAddress").is(':hidden')) {
              $(".defaultHomeAddress").toggle(500);
              $(".editHomeAddress").toggle(500);
          }

      })

      $.getJSON("custom/js/products.json", function(items) {
          console.log(items);
      });

      var cartTotalItems = JSON.parse(localStorage.getItem('cartJson'));
      if (cartTotalItems != undefined) {
          cartTotalItemsLength = cartTotalItems.itemsArray.length
          if (cartTotalItemsLength > 0) {
              var cartItemDescHtml = '';
              for (var index = 0; index < cartTotalItemsLength; index++) {
                  var eachItemData = cartTotalItems.itemsArray[index];
                  var productSubTotal = eachItemData.product_qty * 25;
                  var CheckOutItems = '<tr><td data-th=""><div class="row"><div class="col-sm-2 hidden-xs"><img src="http://placehold.it/100x100" alt="..." class="img-responsive"/></div><div class="col-sm-6"><h4 class="nomargin productName">' + eachItemData.product_name + '</h4></div>          </div></td><td data-th="Price" class="price">&#8377; 25 </td><td data-th="Quantity">' + eachItemData.product_qty + '</td><td data-th="Subtotal" class="text-center" class="subtotal">&#8377;' + productSubTotal + ' </td>  <td class="actions" data-th=""></td>     </tr>'

                  cartItemDescHtml += CheckOutItems;
              }
              $('#checkOutItemsList').html('');
              $('#checkOutItemsList').append(cartItemDescHtml);

          } else {

              $('#checkOutItemsList').html("<div>No items yet</div>");
          }
      }
  });