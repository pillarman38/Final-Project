var userinfo = localStorage.getItem("userinfo");
var appendUserName = $('#appendUserName');
var logoutUser = $('#logoutUser');

$(appendUserName).append(userinfo);

var logoutUser = $('#logoutUser');

if(!userinfo){
  console.log("hi there");
  window.location.href = 'login.html';

} else {
  $(logoutUser).append(`<a href="login.html">Logout</a>`)
}
