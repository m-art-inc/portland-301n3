// Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
var articleView = {};

articleView.populateFilters = function() {
  $('article').each(function() {
    if (!$(this).hasClass('template')) {
      // DONE: We need to take every author name from the page, and make it an option in the Author filter.
      //       To do so, Build an `option` DOM element that we can append to the author select box.
      //       Start by grabbing the author's name from `this` article element, and then use that bit of
      //       text to create the option tag (in a variable named `optionTag`),
      //       that we can append to the #author-filter select element.
      //       YAY, DOM manipulation!

      var val =  $(this).find('address a').text();
			var optionTag = "<option value='" + val + "'>" + val + "</option>";
			$('#author-filter').append(optionTag);
			var val = $(this).attr('data-category');

      // DONE: Similar to the above, but...
      //       Avoid duplicates! We don't want to append the category name if the select
      //       already has this category as an option!

			optionTag = "<option value='" + val + "'>" + val + "</option>";
			if($("#category-filter option[value='" + val + "']").length === 0 ) {
				$('#category-filter').append(optionTag);
			}
		}
 	});
};





articleView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      // DONE: If the select box was changed to an option that has a value, we need to hide all the articles,
      //       and then show just the ones that match for the author that was selected.
      //       Use an "attribute selector" to find those articles, and fade them in for the reader.

      var $selectedAuthor = $('article[data-attribute="' + $(this).val() + '"]');
      $('article').hide();
      $selectedAuthor.fadeIn();
    } else {
      // DONE: If the select box was changed to an option that is blank, we should
      //       show all the articles, except the one article we are using as a template.
      $('article').fadeIn();
        $('article.template').hide();
    }
    $('#author-filter').val('');
  });
};

articleView.handleCategoryFilter = function() {


  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      var $selectedCategory = $('article[data-category="' + $(this).val() + '"]');
      $('article').hide();
      $selectedCategory.fadeIn();
    } else {
      $('article').fadeIn();
        $('article.template').hide();
    }
    $('#category-filter').val('');
  });
};

articleView.handleMainNav = function() {
  // DONE: Add an event handler to .main-nav element that will power the Tabs feature.
  //       Clicking any .tab element should hide all the .tab-content sections, and then reveal the
  //       single .tab-content section that is associated with the clicked .tab element.
  //       So: You need to dynamically build a selector string with the correct ID, based on the
  //       data available to you on the .tab element that was clicked.
  $('.main-nav .tab').on('click', function(){
      var tab_id = $(this).attr('data-content');
      var selectedTab = $('#' + tab_id);
      $('section.tab-content').hide();
      selectedTab.show();
  });

  $('.main-nav .tab:first').click(); // Let's now trigger a click on the first .tab element, to set up the page.
};

articleView.setTeasers = function() {
  $('.article-body *:nth-of-type(n+2)').hide(); // Hide elements beyond the first 2 in any artcile body.

  // DONE: Add an event handler to reveal all the hidden elements,
  //       when the .read-on link is clicked. You can go ahead and hide the
  //       "Read On" link once it has been clicked. Be sure to prevent the default link-click action!
  //       Ideally, we'd attach this as just 1 event handler on the #articles section, and let it
  //       process any .read-on clicks that happen within child nodes.

  $('section#articles .read-on').on('click', function (e) {
       e.preventDefault();
       var readOnLink = $(e.target);
       readOnLink.hide();
       readOnLink.parent().find('p').show();
       readOnLink.parent().find('p').fadeIn(500);

});
};






// DONE: Call all of the above functions, once we are sure the DOM is ready.


$(document).ready(function() {
	articleView.populateFilters();
  articleView.handleAuthorFilter();
  articleView.handleCategoryFilter();
  articleView.handleMainNav();
  articleView.setTeasers();
//
});
