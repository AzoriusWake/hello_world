function top_stories(o){
  var items = o.query.results.item;
  var output = '';
  var no_items=items.length;
  for(var i=0;i<15;i++){
    var title = items[i].title;
    var link = items[i].link;
    var desc = items[i].description;

    output += "<h3><a href='" + link + "'>"+title+"</a></h3>" + desc + "<hr/>";
  }
  // Place news stories in div tag
  document.getElementById('results').innerHTML = output;
}
