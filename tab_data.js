var save_files = (clicked_btn) => {
    var clicked_id=parseInt(clicked_btn.toElement.id);
    var this_win_tabs=[];
    var this_win=single_window[clicked_id-1];
    var len=this_win.length;
    
    for(k=0;k<len;k++){
        this_win_tabs.push(this_win[k]);
    }
    var flag=1;
    for(var i=0;i<localStorage.length;i++) {
        if(localStorage.getItem("saved_window"+(i+1))==JSON.stringify(this_win_tabs)) {
            alert('Already saved! Checkout saved tabs!');
            flag=0;
            break;
        }
    }
    if(flag==1) {
        localStorage.setItem("saved_window"+(localStorage.length+1), JSON.stringify(this_win_tabs));
        saved_tab_data();
    }
}

var remove_files = (clicked_btn) => {
    var clicked_id=(clicked_btn.toElement.id);
    localStorage.removeItem("saved_window"+clicked_id);
    saved_tab_data();
}


var load_files = (clicked_btn) => {
    var clicked_id=(clicked_btn.toElement.id);
    var saved_windows=[];
    saved_windows.push( JSON.parse( localStorage.getItem("saved_window"+clicked_id)));
    var all_tabs=saved_windows[0].length;
    var all_tabs_in_windows=saved_windows[0];
    var urls=[];
    for(var j=0;j<all_tabs;j++) {
        tab=all_tabs_in_windows[j];
        var u = tab.url;
        urls.push(u);
    }
    chrome.windows.create({url: urls});
}
