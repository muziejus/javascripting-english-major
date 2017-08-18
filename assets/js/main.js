$("aside").html(function(){
  let h1, sidebar;
  h1 = $("h1").html();
  $("h1").remove();
  sidebar = "<h1>" + h1 + "</h1>\n<hr>\n<h3>Sections</h3>\n<nav class='nav flex-column'>";
  $("section").each(function() {
    sidebar = sidebar + "<a clas='nav-link' href='#" + $( this ).attr("id") + "'>" + $( this ).contents()[1].innerHTML + "</a>\n";
  });
  return sidebar + "</nav>";
});
