const USERS = [
      {
       email: "steveg@example.com",
       password: "PaSsWoRd",
       birthday: "2000-09-30 00:00:00",
       role: "basic"
     },
      {
       email: "hanneM@example.com",
       password: "hanneRules!",
       birthday: "1980-04-15 00:00:00",
       role: "basic"
     },
      {
       email: "lindaG@example.com",
       password: "lg014589",
       birthday: "2012-01-03 00:00:00",
       role: "admin"
     },
      {
       email: "nEsposito@example.it",
       password: "pswd1234",
       birthday: "1975-03-23 00:00:00",
       role: "advanced"
     },
      {
       email: "draganP@example.hr",
       password: "volimbaku",
       birthday: "1995-06-06 00:00:00",
       role: "advanced"
     },
     {
       email: "connorwoodford@yahoo.com",
       password: "goodkid38",
       birthday: "1995-06-06 00:00:00",
       role: "advanced"
     }]

var header = $(`  <div class="headerSelection">
    <a href="login.html" class="headerSelection">Logout</a>
    <a href="signup.html" class="headerSelection">signup</a>
    <a href="home page.html" class="headerSelection">Home Page</a>
  </div>`)

      var username = $("#username");
      var password = $("#password");
      console.log(USERS);

      $("#submitBtn").on("click", function() {

      for(var i = 0; i < USERS.length; i++){
        if(username.val() == USERS[i].email && password.val() == USERS[i].password){
          window.location.href = "library.html";
          localStorage.setItem("userinfo",`${username.val()}`)
        }
          if(username.val() !== USERS[i].email && password.val() !== USERS[i].password){
          var errorMsg = $(`<div id="errMsg" class="border w-50 p-5 mx-auto bg-danger rounded">
            <p>
              Wrong username or password
            </p>
          </div>`)
          errorMsg.appendTo("#errorContainer");

        }
      };
    })
