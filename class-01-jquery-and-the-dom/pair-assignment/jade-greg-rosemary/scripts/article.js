var articles = [];

function Article (opts) {
// DONE!
  this.title = opts.title;
  this.category = opts.category;
  this.author = opts.author;
  this.authorUrl = opts.authorUrl;
  this.publishedOn = opts.publishedOn;
  this.body = opts.body;
}

Article.prototype.toHtml = function() {
  var $newArticle = $('article.template').clone();
  $newArticle.attr('data-category', this.category);
// DONE!
  $newArticle.find('a').html(this.author);
  $newArticle.find('a').attr('href', this.authorUrl);
  $newArticle.find('h1').html(this.title);
  $newArticle.find('time').html(this.publishedOn);
  $newArticle.find('.article-body').html(this.body);

  // Include the publication date as a 'title' attribute to show on hover:
  $newArticle.find('time[pubdate]').attr('title', this.publishedOn);

  // Display the date as a relative number of "days ago":
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');

  $newArticle.append('<hr>');

// DONE!
  $('article').removeClass('template');

  return $newArticle;
};

// Sort data set
rawData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

// for each element in rawData array
// execute function with that element as argument
// push to the array called articles
// a neew Article object
// with element as input
rawData.forEach(function(ele) {
  articles.push(new Article(ele));
});

// for each element in articles array
// execute function with that element as argument
// select #articles with jquery
// append the return of the element.toHtml() method
// which replaces all the key data
articles.forEach(function(a){
  $('#articles').append(a.toHtml());
});
