var count = 0;
var container = document.getElementsByClassName('container');
var listGroupItem = document.getElementsByClassName('list-group-item');
var panelHeading = document.getElementsByClassName('panel-heading');
var panelTitle = document.getElementsByClassName('panel-title');
var panel = document.getElementsByClassName('panel');
var tab_content = document.getElementsByClassName('tab-content');
var navTab = document.getElementsByClassName('nav-tabs');
var i;
document.addEventListener('DOMContentLoaded', function() {
    var theme = document.getElementById('theme');
    theme.addEventListener('click', function() {
        changeTheme();
    });
});

function changeTheme(){
    if(count){
        for (i = 0; i < listGroupItem.length; i++) {
            listGroupItem[i].style.backgroundColor = "#424242";
            listGroupItem[i].style.color = '#fff';
        }
        for (i = 0; i < panelHeading.length; i++) {
            panelHeading[i].style.backgroundColor = "#424242";
        }
        for (i = 0; i < panelTitle.length; i++) {
            panelTitle[i].style.backgroundColor = "#424242";
            panelTitle[i].style.color = "white";
        }
        for (i = 0; i < panel.length; i++) {
            panel[i].style.backgroundColor = "#424242";
        }
        for (i = 0; i < container.length; i++) {
            container[i].style.backgroundColor = "#212121";
        }
        count = 0;
    }else{
        for (i = 0; i < listGroupItem.length; i++) {
            listGroupItem[i].style.backgroundColor = "#fff";
            listGroupItem[i].style.color = '#000';
        }
        for (i = 0; i < panelHeading.length; i++) {
            panelHeading[i].style.backgroundColor = "#f5f5f5";
        }
        for (i = 0; i < panelTitle.length; i++) {
            panelTitle[i].style.backgroundColor = "#f5f5f5";
            panelTitle[i].style.color = "black";
        }
        for (i = 0; i < panel.length; i++) {
            panel[i].style.backgroundColor = "#fff";
        }
        for (i = 0; i < container.length; i++) {
            container[i].style.backgroundColor = "#fff";
        }
        count = 1;
    }
}