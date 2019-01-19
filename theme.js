$('#theme').on("click", (event) => {
  changeTheme();
});

function changeTheme() {
  $('.container').toggleClass('dark3');
  $('#accordion').toggleClass('dark1');
  $('.tab-item').toggleClass('dark1 dark-border');
  $('.circle').toggleClass('dark2');
  $('.card').toggleClass('dark2');
  $('#myTab').toggleClass('dark-border');
  $('#myTabContent').toggleClass('dark-border');
  $('.nav-link').toggleClass('nav-link-dark');
}
