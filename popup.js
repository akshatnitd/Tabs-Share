var all_windows=[];
var single_window=[];
var all_tabs=[];
var i,j, str1="", str2="", str3, k,l,m,n, str4="", str5="", str6;
var save_btns=[];
var remove_btns=[];
var load_btns=[];

var store_tab = () => {
    chrome.windows.getAll( (win_all) => {
        win_all.map( (win) => {
            single_window=[];
            chrome.tabs.getAllInWindow(win.id, (tab_all) => {
                all_tabs=[];
                tab_all.map( (tab_each) => {
                    all_tabs.push(tab_each);
                });
                single_window.push(all_tabs);
            })
        })
        all_windows.push(single_window);
    }
)}



var current_tab_data = () => {
    var no_of_windows=single_window.length;

    for(i=0;i<no_of_windows;i++) {
        var second_tab = 0;
        str1+='<div class="panel panel-default" id="window_'+(i+1)+'" >'+
        '<div class="panel-heading">'+
        '<h4 class="panel-title">'+
        '<a data-toggle="collapse" data-parent="#current" href="#collapse'+(i+1)+'">'+"WINDOW "+(i+1)+'</a>'+
        '<button type="button" id='+(i+1)+' class="btn btn-primary btn-xs save_btn">'+ "Save" +'</button>'+
        '</h4>'+
        '</div>'+
        '<div id="collapse'+(i+1)+'" class="panel-collapse collapse in">'+
        '<div class="panel-body"><table>';
        str2='';
        var no_of_tabs=single_window[i].length;
        var tabs_in_window=single_window[i];
        for(j=0;j<no_of_tabs;j++) {
            tab=tabs_in_window[j];
            var f = tab.favIconUrl, t = tab.title, u = tab.url;
            if (!u) u = '';
            if (!t) t = u;
            if(t.length > 17){
                t = t.substring(0,18);
                t += '...';
            }

            // workaround
            if (f == 'chrome://theme/IDR_EXTENSIONS_FAVICON') f = 'data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAABF0lEQVQoz2P4z4AfMpCgQMfI6LbBZi0mnArCK73f+jyOZMWiQENOU0KHe3N01KuOg/+ZNHg0ZNSZUBSYn7T8aP3B6230y5DX9u8tP5p+suZDURD6IOJV1Mu4FynPE19Ev4x85fvmPweKgrj76c8ykWDkKwtOTVUNHriC5atfLNy2Nf05TEHMS9d9Fh9M98IVvLb5z7c5IOEFTEHy88yrIa+DH8AVmDwy7/BeEwdXkPrsf+3aHXsXwhX4P/V7E/I6+8HpNUCLgAqiX7qw/rf+rwZXkHEj8UXii5aj/1Xv26c+yXwW8SpIAsUX1fvz72c/ir38n8EtO/Fx1Y2ai63yqEEd97/zf///eiDL8X/f/9r/Wf95iI5NALw5DuHmTOHfAAAAAElFTkSuQmCC';
            if(second_tab==3){
                str3= '<td><div class="list-group-item" id="item">'+'<div class="circle"><img src='+f+' /></div> <div id="text"><center>'+t+'</center></div></div></td></tr>';
                second_tab= 0;
            }else if(second_tab == 0){
                str3 = '<tr><td><div class="list-group-item" id="item">'+'<div class="circle"><img src='+f+' /></div> <div id="text"><center>'+t+'</center></div></div></td>';
                second_tab++;
            }else{
                str3 = '<td><div class="list-group-item" id="item">'+'<div class="circle"><img src='+f+' /></div> <div id="text"><center>'+t+'</center></div></div></td>';
                second_tab++;
            }
            str2+=str3;
        }
        str1+=str2+'</table>'+'</div>'+'</div>'+'</div>';
    }
    document.getElementById('current').innerHTML=str1;
};

var saved_tab_data =  () => {
    var total_windows=localStorage.length;
    var saved_windows=[];
    for(l=0;l<total_windows;l++) {
        saved_windows.push( JSON.parse( localStorage.getItem("saved_window"+(l+1)) ));
    }
    str4='';
    for(l=0;l<total_windows;l++) {
        var second_tab = 0;
        str4+='<div class="panel panel-default">'+
        '<div class="panel-heading">'+
        '<h4 class="panel-title">'+
        '<a data-toggle="collapse" data-parent="#saved" href="#collapse'+(l+1)+'">'+"WINDOW "+(l+1)+'</a>'+
        '<button type="button" id='+(l+1)+' class="btn btn-primary btn-xs load_btn"> Load </button>'+
        '<button type="button" id='+(l+1)+' class="btn btn-danger btn-xs remove_btn"> Remove </button>'+
        '</h4>'+
        '</div>'+
        '<div id="collapse'+(l+1)+'" class="panel-collapse collapse in">'+
        '<div class="panel-body"><table>';
        str5='';
        var no_of_tabs=saved_windows[l].length;
        var tabs_in_window=saved_windows[l];
        for(m=0;m<no_of_tabs;m++) {
            tab=tabs_in_window[m];
            var f = tab.favIconUrl, t = tab.title, u = tab.url;
            if (!u) u = '';
            if (!t) t = u;
            if(t.length > 17){
                t = t.substring(0,18);
                t += '...';
            }

            // workaround
            if (f == 'chrome://theme/IDR_EXTENSIONS_FAVICON') f = 'data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAABF0lEQVQoz2P4z4AfMpCgQMfI6LbBZi0mnArCK73f+jyOZMWiQENOU0KHe3N01KuOg/+ZNHg0ZNSZUBSYn7T8aP3B6230y5DX9u8tP5p+suZDURD6IOJV1Mu4FynPE19Ev4x85fvmPweKgrj76c8ykWDkKwtOTVUNHriC5atfLNy2Nf05TEHMS9d9Fh9M98IVvLb5z7c5IOEFTEHy88yrIa+DH8AVmDwy7/BeEwdXkPrsf+3aHXsXwhX4P/V7E/I6+8HpNUCLgAqiX7qw/rf+rwZXkHEj8UXii5aj/1Xv26c+yXwW8SpIAsUX1fvz72c/ir38n8EtO/Fx1Y2ai63yqEEd97/zf///eiDL8X/f/9r/Wf95iI5NALw5DuHmTOHfAAAAAElFTkSuQmCC';
            if(second_tab==3){
                str6= '<td><div class="list-group-item" id="item">'+'<div class="circle"><img src='+f+' /></div> <div id="text"><center>'+t+'</center></div></div></td></tr>';
                second_tab= 0;
            }else if(second_tab == 0){
                str6 = '<tr><td><div class="list-group-item" id="item">'+'<div class="circle"><img src='+f+' /></div> <div id="text"><center>'+t+'</center></div></div></td>';
                second_tab++;
            }else{
                str6 = '<td><div class="list-group-item" id="item">'+'<div class="circle"><img src='+f+' /></div> <div id="text"><center>'+t+'</center></div></div></td>';
                second_tab++;
            }
            str5+=str6;
        }
        str4+=str5+'</table>'+'</div>'+'</div>'+'</div>';
    }
    document.getElementById('saved').innerHTML=str4;
};


//Function calls
store_tab();

setTimeout( () => {
    current_tab_data();
    saved_tab_data();

    save_btns = $('.save_btn');
    var mouse_event;
    for (i = 0; i < save_btns.length; i++) {
        save_btns[i].addEventListener("click", (mouse_event) => {
            save_files(mouse_event);
        });
    }

    remove_btns = $('.remove_btn');
    
    for (i = 0; i < remove_btns.length; i++) {
        remove_btns[i].addEventListener("click", (mouse_event) => {
            remove_files(mouse_event);
        });
    }

    load_btns = $('.load_btn');
    
    for (i = 0; i < load_btns.length; i++) {
        load_btns[i].addEventListener("click", (mouse_event) => {
            load_files(mouse_event);
        });
    }
}, 500);
