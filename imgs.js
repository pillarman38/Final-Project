var userinfo = localStorage.getItem("userinfo");
var imgDisplay = $(".imgDisplay");
var selectionDisplay = $('.selectionDisplay');
var explorer = $('#explorer');

$(logoutUser).on('click', function(){
  localStorage.removeItem("userinfo")
})

function jsonError(errorCheck){
  if(errorCheck.meta.status != 200){
    $(imgDisplay).append(`<div class="marginThis">
    <p>Could not connect to server</p>
    </div>`)
  }
}
function ratingSelection(){
  $(selectionDisplay).append($(`<select id="ratingTwo" class="custom-select">
    <option value="g">g</option>
    <option value="pg" selected="selected">pg</option>
    <option value="pg-13">pg-13</option>
    <option value="R">R</option>
  </select>`))
}

function imgResults(imgData){
  $(imgDisplay).append($(`<div class="col-4 border mt-3 pt-3">
    <img src="${imgData.images.original.url}" class="bd-highlight w-100 h-auto">
    <p class="col-12">${imgData.title}</p>
    <p class="col-12">${imgData.rating}</p>
    <a href="${imgData.url}">${imgData.url}</a>
  </div>`))
}
//NORESULTS IS THE ISSUE!!!!!!!!!!!!!!!
function noresults(){
    $(imgDisplay).empty();
    $(imgDisplay).append(`<div class="marginThis">
    <p>Could not find any gifs</p>
    </div>`)
}


function search(){
    if(explorer.val() == "search"){
      $(imgDisplay).removeClass("border")
      $(selectionDisplay).append($('<input/>', {
      id: "searchRes",
      type: "search",
      class: "form-control mr-sm-2",
      placeholder:"Search",
    }))
  ratingSelection()
    $(selectionDisplay).append($(`<select id="language" class="custom-select">
      <option value="en">en</option>
      <option value="es">ES</option>
    </select>`))
    $(selectionDisplay).append($(`<button>Search</button>`))
    $(selectionDisplay).append($('<button id="goSearch" class="btn btn-outline-success my-2 my-sm-0" type="button">Search</button>'))

  $('#goSearch').on('click', function(){
    $.getJSON(`https://api.giphy.com/v1/gifs/search?api_key=0lYS5EdxSyumtDf8GLhpZfcsK414wCZ3&q=${$('#searchRes').val().trim()}&limit=25&${$('#offset').val()}=0&rating=${$('#ratingTwo').val()}&lang=${$('#language').val()}`, function(resSearch){
      jsonError(resSearch)
      $(imgDisplay).empty()
      for(var i = 0; i < resSearch.data.length; i++){
        imgResults(resSearch.data[i])
    }
    if(resSearch.data.length == "0"){
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
  $(imgDisplay).removeClass("border")
  $(selectionDisplay).append($('<input/>', {
    id: "translateThis",
    type: "text",
  }))
  $(selectionDisplay).append($('<button id="goSearchTwo" class="btn btn-outline-success my-2 my-sm-0" type="button">Search</button>'))
  $('#goSearchTwo').on('click', function(){
    $(imgDisplay).empty()
    $.getJSON(`https://api.giphy.com/v1/gifs/translate?api_key=0lYS5EdxSyumtDf8GLhpZfcsK414wCZ3&s=${$('#translateThis').val().trim()}`, function(resTranslate){
      jsonError(resTranslate)
      imgResults(resTranslate.data)
      if(resTranslate.data.length == "0"){
          noresults()
    }
      })
    })
  }

if(explorer.val() == "trending"){
  $(imgDisplay).removeClass("border")
  ratingSelection()
  $(selectionDisplay).append($('<button id="goSearchThree" class="btn btn-outline-success my-2 my-sm-0" type="button">Search</button>'))
$('#goSearchThree').on('click', function(){
    $(imgDisplay).empty()
  $.getJSON(`https://api.giphy.com/v1/gifs/trending?api_key=0lYS5EdxSyumtDf8GLhpZfcsK414wCZ3&limit=25&rating=${$('#ratingTwo').val().trim()}`, function(resSearch){
    jsonError(resSearch)
    for(var i = 0; i < resSearch.data.length; i++){
      imgResults(resSearch.data[i])
    }
    if(resSearch.data.length == "0"){
        noresults()
  }
  })
})
}

if(explorer.val() == "random"){
  $(imgDisplay).removeClass("border")
  $(imgDisplay).empty()
  ratingSelection()
  $(selectionDisplay).append($('<button id="getRand" class="btn btn-outline-success my-2 my-sm-0" type="button">Search</button>'))
  $('#getRand').on('click', function(){
    $(imgDisplay).empty()
  $.getJSON(`https://api.giphy.com/v1/gifs/random?api_key=0lYS5EdxSyumtDf8GLhpZfcsK414wCZ3&tag=${$('#tags').val()}&rating=${$('#ratingTwo').val().trim()}`, function(randData){
    
    imgResults(randData.data)
    if(randData.data.length == "0"){
        noresults()
  }
        })
      })
    }
  })
