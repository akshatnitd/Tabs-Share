function save_files(clicked_btn)
{
    var clicked_id=parseInt(clicked_btn.toElement.id);
    
    var temp=[];
    var this_win=b[clicked_id-1];
    
    var len=this_win.length;
    
    for(k=0;k<len;k++)
    {
        temp.push(this_win[k]);
    }
    var abc=JSON.stringify(temp);
    var flag=1;
    for(var i=0;i<localStorage.length;i++)
    {
        if(localStorage.getItem("saved_window"+(i+1))==abc)
        {
            alert('Already saved! Checkout saved tabs!');
            flag=0;
            break;
        }

    }
    if(flag==1)
    {
        localStorage.setItem("saved_window"+(localStorage.length+1), JSON.stringify(temp));
        z();
    }
}

function remove_files(clicked_btn)
{
    var clicked_id=(clicked_btn.toElement.id);
    
    localStorage.removeItem("saved_window"+clicked_id);
    z();
}


function load_files(clicked_btn)
{
    var clicked_id=(clicked_btn.toElement.id);
    var saved_windows=[];
    saved_windows.push( JSON.parse( localStorage.getItem("saved_window"+clicked_id)));
    
    var temp2=saved_windows[0].length;
    var ans=saved_windows[0];
    var urls=[];
    for(var j=0;j<temp2;j++)
        {
            tab=ans[j];
            var u = tab.url;
            urls.push(u);
        }
        chrome.windows.create({url: urls});   
}
