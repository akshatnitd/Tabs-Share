var themeType = "light";
var container = document.getElementsByClassName("container");
var listGroupItem = document.getElementsByClassName("list-group-item");
var panelHeading = document.getElementsByClassName("panel-heading");
var panelTitle = document.getElementsByClassName("panel-title");
var panel = document.getElementsByClassName("panel");
var tab_content = document.getElementsByClassName("tab-content");
var navTab = document.getElementsByClassName("nav-tabs");
document.addEventListener("DOMContentLoaded", function() {
  var theme = document.getElementById("theme");
  theme.addEventListener("click", function() {
    changeTheme();
  });
});

function changeTheme() {
  if (themeType === "light") {
    // Dark mode
    for (let i = 0; i < listGroupItem.length; i++) {
      listGroupItem[i].style.backgroundColor = "#424242";
      listGroupItem[i].style.color = "#fff";
    }
    for (let i = 0; i < panelHeading.length; i++) {
      panelHeading[i].style.backgroundColor = "#424242";
    }
    for (let i = 0; i < panelTitle.length; i++) {
      panelTitle[i].style.backgroundColor = "#424242";
      panelTitle[i].style.color = "white";
    }
    for (let i = 0; i < panel.length; i++) {
      panel[i].style.backgroundColor = "#424242";
    }
    for (let i = 0; i < container.length; i++) {
      container[i].style.backgroundColor = "#212121";
    }
    themeType = "dark";
  } else {
    // Light mode
    for (let i = 0; i < listGroupItem.length; i++) {
      listGroupItem[i].style.backgroundColor = "#fff";
      listGroupItem[i].style.color = "#000";
    }
    for (let i = 0; i < panelHeading.length; i++) {
      panelHeading[i].style.backgroundColor = "#f5f5f5";
    }
    for (let i = 0; i < panelTitle.length; i++) {
      panelTitle[i].style.backgroundColor = "#f5f5f5";
      panelTitle[i].style.color = "black";
    }
    for (let i = 0; i < panel.length; i++) {
      panel[i].style.backgroundColor = "#fff";
    }
    for (let i = 0; i < container.length; i++) {
      container[i].style.backgroundColor = "#fff";
    }
    themeType = "light";
  }
}
