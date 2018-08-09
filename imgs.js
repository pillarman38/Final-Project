var userinfo = localStorage.getItem("userinfo");
var imgDisplay = $(".imgDisplay");
var selectionDisplay = $('.selectionDisplay');
var explorer = $('#explorer');
var logoutUser = $('#logoutUser');

if(!userinfo){
  console.log("hi there");
  window.location.href = 'login.html';

} else {
  $(logoutUser).append(`<a href="login.html">Logout</a>`)
}
$(logoutUser).on('click', function(){
  localStorage.removeItem("userinfo")
})

function jsonError(errorCheck){
  if(errorCheck.meta.status != 200){
    console.log("could not connect to server");
  }
}
function imgAddClass(){
  $(imgDisplay).addClass("border");
}

function imgResults(imgData){
  $(imgDisplay).addClass("border")
  $(imgDisplay).append($(`<div class="col-4">
    <img src="${imgData.images.original.url}" class="bd-highlight w-100 h-auto">
    <p class="col-12">${imgData.title}</p>
    <p class="col-12">${imgData.rating}</p>
    <a href="${imgData.url}">${imgData.url}</a>
  </div>`))
}

function noresults(){
$(imgDisplay).empty();
  $(imgDisplay).append(`<div class="border marginThis">
  <p>Could not find any gifs</p>
  </div>`)
}

function search(){
    if(explorer.val()== "search"){
      $(imgDisplay).removeClass("border")
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
    $.getJSON(`https://api.giphy.com/v1/gifs/search?api_key=0lYS5EdxSyumtDf8GLhpZfcsK414wCZ3&q=${$('#searchRes').val()}&limit=25&${$('#offset').val()}=0&rating=${$('#rating').val()}&lang=${$('#language').val()}`, function(resSearch){
      imgAddClass()
      jsonError(resSearch)
      console.log(resSearch);
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
    $.getJSON(`https://api.giphy.com/v1/gifs/translate?api_key=0lYS5EdxSyumtDf8GLhpZfcsK414wCZ3&s=${$('#translateThis').val()}`, function(resTranslate){
      imgAddClass()
      jsonError(resTranslate)
      console.log(resTranslate);
      if(resTranslate.data.length == "0"){
        noresults()
      } else{
      imgResults(resTranslate.data)
      }
    })
  })
}

if(explorer.val() == "trending"){
  $(imgDisplay).removeClass("border")
  $(selectionDisplay).append($(`<select id="ratingTwo" class="custom-select">
    <option value="g">g</option>
    <option value="pg">pg</option>
    <option value="pg-13">pg-13</option>
  </select>`))

  $(selectionDisplay).append($('<button id="goSearchThree" class="btn btn-outline-success my-2 my-sm-0" type="button">Search</button>'))

$('#goSearchThree').on('click', function(){
    $(imgDisplay).empty()
  $.getJSON(`https://api.giphy.com/v1/gifs/trending?api_key=0lYS5EdxSyumtDf8GLhpZfcsK414wCZ3&limit=25&rating=${$('#ratingTwo').val()}`, function(resSearch){
    imgAddClass()
    jsonError(resSearch)
    console.log(resSearch);
    doubleClick = true;
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

    $(selectionDisplay).append($('<input/>', {
      id: "tag",
      type: "search",
      class: "form-control mr-sm-2",
      placeholder:"Search tags",
    }))

  $(selectionDisplay).append($(`<select id="ratingTwo" class="custom-select">
    <option value="g">g</option>
    <option value="pg" selected="selected">pg</option>
    <option value="pg-13">pg-13</option>
    <option value="R">R</option>
  </select>`))

  $(selectionDisplay).append($('<button id="getRand" class="btn btn-outline-success my-2 my-sm-0" type="button">Search</button>'))
  $('#getRand').on('click', function(){
    $(imgDisplay).empty()
  $.getJSON(`https://api.giphy.com/v1/gifs/random?api_key=0lYS5EdxSyumtDf8GLhpZfcsK414wCZ3&tag=${$('#tags').val()}&rating=${$('#ratingTwo').val()}`, function(randData){
    console.log(randData);
    $(imgDisplay).append($(`<div class="col-4">
      <img src="${randData.data.images.original.url}" class="bd-highlight w-100 h-auto">
      <p class="col-12">${randData.data.title}</p>
    </div>`))

    if(randData.data.length == "0"){
      $(imgDisplay).empty();
      noresults()
    }
      })
    })
  }
})
