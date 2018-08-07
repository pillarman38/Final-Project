var userinfo = localStorage.getItem("userinfo");
var appendUserName = $('#appendUserName');
var logoutUser = $('#logoutUser');

$('#logoutUser').on('click', function(){
  localStorage.removeItem("userinfo")
})
var list = $('#list');

if(userinfo){
  console.log("not working");
  console.log(list);

  $(logoutUser).append(`<a href="login.html">Logout</a>`)
  $(appendUserName).text(userinfo);

} else {
  console.log("hi there");
      $(logoutUser).append(`<a href="login.html">Login</a>`)
}
