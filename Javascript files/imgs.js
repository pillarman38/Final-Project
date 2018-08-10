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
 $(selectionDisplay).append($(`<select id="rating" class="custom-select">
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
   <button type="button" class="copyLinks">Copy Link</button>
 </div>`))
}

function copiesLinks(){
  for(var l = 0; l < 1; l++){
     $('.copyLinks').on('click', function(){
       var parentElm = $(this).parent().children().filter("a").html();
       $(imgDisplay).append(`<input type="text" id="myInput">`)
       console.log(imgDisplay);
     var copyText = $('#myInput').val(`${parentElm}`);
     copyText.select()
     document.execCommand('copy')
     $('input').remove('#myInput')
     })
   }
}

function noresults(){
   $(imgDisplay).empty();
   $(imgDisplay).append(`<div class="marginThis">
   <p>Could not find any gifs</p>
   </div>`)
}
function textField(){
 $(selectionDisplay).append($('<input/>', {
 id: "searchRes",
 type: "search",
 class: "form-control mr-sm-2",
 placeholder:"Search",
}))
}

function search(){
   if(explorer.val() == "search"){
     $(imgDisplay).removeClass("border")
     textField()
     ratingSelection()

   $(selectionDisplay).append($(`<select id="language" class="custom-select">
     <option value="en">en</option>
     <option value="es">ES</option>
   </select>`))
   $(selectionDisplay).append($('<button id="goSearch" class="btn btn-outline-success my-2 my-sm-0" type="button">Search</button>'))

 $('#goSearch').on('click', function(){
   $(imgDisplay).empty()
   $.getJSON(`https://api.giphy.com/v1/gifs/search?api_key=0lYS5EdxSyumtDf8GLhpZfcsK414wCZ3&q=${$('#searchRes').val().trim()}&limit=25&${$('#offset').val()}=0&rating=${$('#rating').val()}&lang=${$('#language').val()}`, function(resSearch){
     jsonError(resSearch)
     for(var i = 0; i < resSearch.data.length; i++){
       imgResults(resSearch.data[i])
       copiesLinks()
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
 textField()

 $(selectionDisplay).append($('<button id="goSearchTwo" class="btn btn-outline-success my-2 my-sm-0" type="button">Search</button>'))
 $('#goSearchTwo').on('click', function(){
   $(imgDisplay).empty()

   $.getJSON(`https://api.giphy.com/v1/gifs/translate?api_key=0lYS5EdxSyumtDf8GLhpZfcsK414wCZ3&s=${$('#searchRes').val().trim()}`, function(resTranslate){
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

 $.getJSON(`https://api.giphy.com/v1/gifs/trending?api_key=0lYS5EdxSyumtDf8GLhpZfcsK414wCZ3&limit=25&rating=${$('#rating').val().trim()}`, function(resSearch){
   jsonError(resSearch)
   for(var i = 0; i < resSearch.data.length; i++){
     imgResults(resSearch.data[i])
     copiesLinks()
   }
   if(resSearch.data.length == "0"){
       noresults()
 }
 })
})
}

if(explorer.val() == "random"){
 $(imgDisplay).removeClass("border")
 ratingSelection()
 $(selectionDisplay).append($('<button id="getRand" class="btn btn-outline-success my-2 my-sm-0" type="button">Search</button>'))
 $('#getRand').on('click', function(){
   $(imgDisplay).empty()

 $.getJSON(`https://api.giphy.com/v1/gifs/random?api_key=0lYS5EdxSyumtDf8GLhpZfcsK414wCZ3&tag=${$('#tags').val()}&rating=${$('#rating').val().trim()}`, function(randData){
   imgResults(randData.data)
   copiesLinks()
   if(randData.data.length == "0"){
       noresults()
 }
       })
     })
   }
 })
