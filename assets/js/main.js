// create sidebar
$("aside").append(function(){
  let sidebar ="" ;
  if ($("article").has("section").length ){
    sidebar = sidebar + "<h3>Sections</h3>\n<ul class='nav flex-column'>";
    $("section").each(function() {
      sidebar = sidebar + "<li class='nav-item'>\n";
      sidebar = sidebar + "<a class='nav-link' href='#" + $( this ).attr("id") + "'>" + $( this ).find("h2").html() + "</a>\n";
      if ( $( this ).has("h3").length ){
        sidebar = sidebar + "<ul>\n";
        $( this ).find("h3").each(function(){
          sidebar = sidebar + "<li class='nav-item'>\n";
          sidebar = sidebar + "<a class='nav-link' href='#" + $( this ).attr("id") + "'>" + $( this ).html() + "</a>\n";
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

$("div.highlight").after("<div class='code-copier-div'><a href='#' class='code-copier'>Copy code to clipboard — <i class='fa fa-copy'></i></a></div>");

$(".code-copier").click(function(e){
  e.preventDefault();
  const tmp = $("<textarea>");
  $("body").append(tmp);
  tmp.val($( this ).parent().prev().find(".rouge-code").text()).select();
  document.execCommand("copy");
  tmp.remove();
});


