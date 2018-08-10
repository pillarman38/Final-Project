const REVIEWS = [
  {
    "name": "Dragan Perković",
    "rating": 2,
    "reviewDate": "03/12/2018",
    "comments": "They didn't have enough bear gifs. What's the point if they don't have enough bears?!?!"
  },
  {
    "name": "Frank Metzger",
    "rating": 3,
    "reviewDate": "03/02/2018",
    "comments": "Does exactly what it says it will do so good job!"
  },
  {
    "name": "Corinne Quessy",
    "rating": 5,
    "reviewDate": "05/21/2018",
    "comments": "All the cats I could ever want best site EVER!!!!!!"
  },
  {
    "name": "Hannah Harvey",
    "rating": 3,
    "reviewDate": "05/30/2018",
    "comments": "Highly reccomended if you need a ton of gifs."
  },
  {
    "name": "Kayla Bannan",
    "rating": 5,
    "reviewDate": "06/21/18",
    "comments": "What are you waiting for!?!? Sign up now!!!"
  },
  {
    "name": "Tyrone H. Singleton",
    "rating": 3,
    "reviewDate": "04/01/18",
    "comments": "It's ok I guess if this is your thing."
  },
  {
    "name": "Nazario Esposito",
    "rating": 1,
    "reviewDate": "06/30/2018",
    "comments": "I signed up without reading the terms and conditions and didn't realize I would have to pay for this. What the heck!?!"
  },
  {
    "name": "Edvin Nordström",
    "rating": 4,
    "reviewDate": "07/15/2018",
    "comments": "Easy to use, highly reccomended."
  },
  {
    "name": "Anisa Lind",
    "rating": 2,
    "reviewDate": "04/15/18",
    "comments": "Dumb...."
  },
  {
    "name": "Linda Genovesi",
    "rating": 5,
    "reviewDate": "01/12/18",
    "comments": "Great site. Perfect 5/7"
  },
  {
    "name": "Gail S. Brown",
    "rating": 4,
    "reviewDate": "02/25/18",
    "comments": "4/5 stars"
  },
  {
    "name": "Lauren Hayes",
    "rating": 4,
    "reviewDate": "06/06/17",
    "comments": "Just renewed my membership, tots worth it!"
  },
  {
    "name": "Hanne Madsen",
    "rating": 4,
    "reviewDate": "08/01/18",
    "comments": "Love this site!"
  },
  {
    "name": "Steve Grabowski",
    "rating": 5,
    "reviewDate": "02/02/18",
    "comments": "It's a library for gifs just like the advertisement. I mean what else did you want from it?"
  },
  {
    "name": "Reginald J. Farnsworth",
    "rating": 1,
    "reviewDate": "06/18/18",
    "comments": "This isn't the XBOX remote I ordered! What the frick?"
  }
];

var reviewData = $('.reviewData');
var aboutSelector = $('#aboutSelector');
var feedback = $('#feedback');
var feedbackBtn = $('#feedbackBtn');
var sortReviews = $('#sortReviews');

var filteredReviews = REVIEWS.filter(function(ratings){
  return ratings.rating > 3;
})

function appendReview(review){
  $(reviewData).append(`<div class="reviewStyle border">
    <p class="ml-5">${review.name}</p>
    <p class="ml-3">${review.rating}</p>
    <p class="ml-3">${review.comments}</p>
    <p class="ml-3">${review.reviewDate}</p>
    </div>`)
}

function appendReviews(){
for(var i = 0; i < filteredReviews.length; i++){
  filteredReviews[i].name = filteredReviews[i].name.split(" ")[0];
  appendReview(filteredReviews[i])
}
}
  function sortByRating() {
    filteredReviews.sort(function(a, b){
      return a.rating - b.rating
    });
    appendReviews()
}

function sortByDate() {
  filteredReviews.sort(function(a, b){
    return new Date(a.reviewDate) > new Date(b.reviewDate) ? -1 : 1
  });
  appendReviews()
}

$(sortReviews).change(function(){
    $(reviewData).empty()
    if(sortReviews.val() == "rating"){
      sortByRating();
    }
    if(sortReviews.val() == "date"){
      sortByDate()
    }

})
sortByDate();
