// create sidebar
$("aside").append(function(){
  let sidebar ="" ;
  if ($("article").has("section").length ){
    sidebar = sidebar + "<h3>Sections</h3>\n<ul class='nav flex-column'>";
    $("section").each(function() {
      sidebar = sidebar + "<li class='nav-item'>\n";
      sidebar = sidebar + "<a clas='nav-link' href='#" + $( this ).attr("id") + "'>" + $( this ).find("h2").html() + "</a>\n";
      if ( $( this ).has("h3").length ){
        sidebar = sidebar + "<ul>\n";
        $( this ).find("h3").each(function(){
          sidebar = sidebar + "<li class='nav-item'>\n";
          sidebar = sidebar + "<a clas='nav-link' href='#" + $( this ).attr("id") + "'>" + $( this ).html() + "</a>\n";
          sidebar = sidebar + "</li>\n";
        });
        sidebar = sidebar + "</ul>\n";
      }
      sidebar = sidebar + "</li>\n";
    });
    sidebar = sidebar + "</ul>\n<hr>\n";
  }
  $(".fa-spinner").remove();
  return sidebar;
});

// add lead to first paragraph.
$("article p").first().addClass("lead");


