$("#glosses").html("<p>The glosses will go here.</p>");
$.getJSON("https://the-javascripting-english-major.org/prologue.json", function(data){
  let prologueText;
  prologueText = "<blockquote><p>";
  data.lines.forEach(function(line){
    let lineText;
    lineText = "";
    line.forEach(function(word){
      let wordString, dataAttributes;
      wordString = word.text;
      dataAttributes = "";
      if (word.modern){
        dataAttributes = dataAttributes + " data-modern='" + word.modern + "'";
        if (word.url){
          dataAttributes = dataAttributes + " data-url='" + word.url + "'";
        }
        wordString = "<a href='#'" + dataAttributes + ">" + wordString + "</a>";
      }
      lineText = lineText + wordString + " ";
    });
    prologueText = prologueText + lineText + "<br/>";
  });
  prologueText = prologueText + "</p></blockquote>";
  $("#prologue").html(prologueText);
  $("#prologue a").click(function(){
    let glossText, clickedWord, modernWord;
    clickedWord = $( this ).text();
    modernWord = $( this ).data("modern");
    glossText = "<h2>You clicked on " + clickedWord + ", which means " + modernWord +"</h2>";
    if ($( this ).data("url")){
      glossText = glossText + "<h3>Read more on <a href='" + $( this ).data("url") + "'>Wikipedia</a>.</h3>";
    }
    $("#glosses").html(glossText);
  });
});
