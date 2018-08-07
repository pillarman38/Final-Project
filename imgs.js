var imgDisplay = $(".imgDisplay");
var selectionDisplay = $('.selectionDisplay');
var explorer = $('#explorer');

function noresults(){
  console.log("yo get some data");
  $(imgDisplay).append(`<div class="border marginThis">
  <p>Could not find any gifs</p>
  </div>`)
}

function search(){
    if(explorer.val()== "search"){
    $(selectionDisplay).append($('<input/>', {
      id: "searchRes",
      type: "search",
      class: "form-control mr-sm-2",
      placeholder:"Search",
    }))

    $(selectionDisplay).append($(`<select id="rating" class="custom-select">
      <option value="g">g</option>
      <option value="pg">pg</option>
      <option value="pg-13">pg-13</option>
    </select>`))

    $(selectionDisplay).append($(`<select id="language" class="custom-select">
      <option value="en">en</option>
      <option value="es">ES</option>
    </select>`))

    $(selectionDisplay).append($('<button id="goSearch" class="btn btn-outline-success my-2 my-sm-0" type="button">Search</button>'))

  $('#goSearch').on('click', function(){
    $.getJSON(`https://api.giphy.com/v1/gifs/search?api_key=0lYS5EdxSyumtDf8GLhpZfcsK414wCZ3&q=${$('#searchRes').val()}&limit=25&offset=0&rating=${$('#rating').val()}&lang=${$('#language').val()}`, function(resSearch){
      console.log(resSearch);
      $(imgDisplay).empty()
      for(var i = 0; i < resSearch.data.length; i++){
      $(imgDisplay).append($(`
        <img src="${resSearch.data[i].images.original.url}" class="gifImgs">
        <p>${resSearch.data[i].title}</p>
        <p>${resSearch.data[i].rating}</p>
        <img/>

      `))
    }
    if(resSearch.data.length == "0"){
      $(imgDisplay).empty();
      noresults()
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


  $(selectionDisplay).append($('<button id="goSearchTwo" class="btn btn-outline-success my-2 my-sm-0" type="button">Search</button>'))

  $('#goSearchTwo').on('click', function(){
    $(imgDisplay).empty()
    $.getJSON(`https://api.giphy.com/v1/gifs/translate?api_key=0lYS5EdxSyumtDf8GLhpZfcsK414wCZ3&s=${$('#translateThis').val()}`, function(resTranslate){
      console.log(resTranslate);
      if(resTranslate.data.length == "0"){
        $(imgDisplay).empty();
        noresults()
      } else{

      $(imgDisplay).append($(`<img src="${resTranslate.data.images.original.url}" class="gifImgs">
      <p>${resTranslate.data.title}</p>
      <p>${resTranslate.data.rating}</p>`))
      }
    })
  })
}

if(explorer.val() == "trending"){

  $(selectionDisplay).append($(`<select id="ratingTwo" class="custom-select">
    <option value="g">g</option>
    <option value="pg">pg</option>
    <option value="pg-13">pg-13</option>
  </select>`))

  $(selectionDisplay).append($('<button id="goSearchThree" class="btn btn-outline-success my-2 my-sm-0" type="button">Search</button>'))

$('#goSearchThree').on('click', function(){
    $(imgDisplay).empty()
  $.getJSON(`https://api.giphy.com/v1/gifs/trending?api_key=0lYS5EdxSyumtDf8GLhpZfcsK414wCZ3&limit=25&rating=${$('#ratingTwo').val()}`, function(resSearch){
    console.log(resSearch);
    doubleClick = true;
    for(var i = 0; i < resSearch.data.length; i++){
    $(imgDisplay).append($('<img/>', {
      class: "gifImgs",
      src: resSearch.data[i].images.original.url,
    }))
    }
    if(resSearch.data.length == "0"){
      $(imgDisplay).empty();
      noresults()
    }
  })
})
}
if(explorer.val() == "random"){
    $(imgDisplay).empty()

  $(selectionDisplay).append($(`<select id="ratingTwo" class="custom-select">
    <option value="g">g</option>
    <option value="pg" selected="selected">pg</option>
    <option value="pg-13">pg-13</option>
    <option value="R">R</option>
  </select>`))

  $(selectionDisplay).append($('<button id="getRand" class="btn btn-outline-success my-2 my-sm-0" type="button">Search</button>'))
  $('#getRand').on('click', function(){
    $(imgDisplay).empty()
  $.getJSON(`https://api.giphy.com/v1/gifs/random?api_key=0lYS5EdxSyumtDf8GLhpZfcsK414wCZ3&tag=&rating=G`, function(randData){
    console.log(randData);
    $(imgDisplay).append($('<img/>', {
      class: "gifImgs",
      src: randData.data.images.original.url,
    }))
    if(randData.data.length == "0"){
      $(imgDisplay).empty();
      noresults()
    }
      })
    })
  }
})

//start date for nex cohort is...sept 4.

//Connor.Woodford@midlandu.edu