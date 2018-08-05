var imgDisplay = $(".imgDisplay");
var selectionDisplay = $('.selectionDisplay');
var explorer = $('#explorer');

function search(){
    if(explorer.val()== "search"){
    $(selectionDisplay).append($('<input/>', {
      id: "searchRes",
      type: "text",
    }))

    $(selectionDisplay).append($(`<select id="rating">
      <option value="g">g</option>
      <option value="pg">pg</option>
      <option value="pg-13">pg-13</option>
    </select>`))

    $(selectionDisplay).append($('<button/>', {
      id: "goSearch",
      type: "button",
    }))

  $('#goSearch').on('click', function(){
    $.getJSON(`https://api.giphy.com/v1/gifs/search?api_key=0lYS5EdxSyumtDf8GLhpZfcsK414wCZ3&q=${$('#searchRes').val()}&limit=25&offset=0&rating=${$('#goSearch').val()}&lang=en`, function(resSearch){
      console.log(resSearch);
      $(imgDisplay).empty()
      for(var i = 0; i < resSearch.data.length; i++){
      $(imgDisplay).append($(`
        <img src="${resSearch.data[i].images.original.url}" class="gifImgs">
        <p>${resSearch.data[i].title}</p>
        <p>${resSearch.data[i].rating}</p>
        <img/>`))
    }
    })
  })
}
}
search()

$('#explorer').on('change', function(){
  $(imgDisplay).empty()
  $(selectionDisplay).empty()
  search()


if(explorer.val() == "translate"){

  $(selectionDisplay).append($('<input/>', {
    id: "translateThis",
    type: "text",
  }))

  $(selectionDisplay).append($(`<select id="ratingTwo">
    <option value="g">g</option>
    <option value="pg">pg</option>
    <option value="pg-13">pg-13</option>
  </select>`))

  $(selectionDisplay).append($('<button/>', {
    id: "goSearchTwo",
    type: "button",
  }))

  $('#goSearchTwo').on('click', function(){
    $(imgDisplay).empty()
    $.getJSON(`https://api.giphy.com/v1/gifs/translate?api_key=0lYS5EdxSyumtDf8GLhpZfcsK414wCZ3&s=${$('#translateThis').val()}`, function(resTranslate){
      console.log(resTranslate);
      $(imgDisplay).append($('<img/>', {
        class: "gifImgs",
        src: resTranslate.data.images.original.url,
      }))
    })
  })
}

if(explorer.val() == "trending"){

  $(selectionDisplay).append($(`<select id="ratingTwo">
    <option value="g">g</option>
    <option value="pg">pg</option>
    <option value="pg-13">pg-13</option>
  </select>`))

  $(selectionDisplay).append($('<button/>', {
    id: "goSearchThree",
    type: "button",
  }))

$('#goSearchThree').on('click', function(){

  $.getJSON(`https://api.giphy.com/v1/gifs/trending?api_key=0lYS5EdxSyumtDf8GLhpZfcsK414wCZ3&limit=25&rating=${$('#ratingTwo').val()}`, function(resSearch){
    console.log(resSearch);
    doubleClick = true;
    for(var i = 0; i < resSearch.data.length; i++){
    $(imgDisplay).append($('<img/>', {
      class: "gifImgs",
      src: resSearch.data[i].images.original.url,
    }))
    }
  })
})
}
})

//start date for nex cohort is...sept 4.

//Connor.Woodford@midlandu.edu
