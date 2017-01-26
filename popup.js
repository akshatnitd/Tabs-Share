var ans=[];
  var b=[];
  var a=[];

var i,j, str1="", str2="", str3;


var x= function() {
    chrome.windows.getAll(function(win_all)
    {
    win_all.map(function(win)
      {
        b=[];
        chrome.tabs.getAllInWindow(win.id, function(tab_all) 
        {
          a=[];
          tab_all.map(function(tab_each) { 
          a.push(tab_each);
          });
          b.push(a);
        })
      })
      ans.push(b);
      
    })}



var y= function () {
      
      var temp1=b.length;
   
      for(i=0;i<temp1;i++)
      {
        str1+='<div class="panel panel-default">'+
            '<div class="panel-heading">'+
              '<h4 class="panel-title">'+
                '<a data-toggle="collapse" data-parent="#accordion" href="#collapse'+(i+1)+'">'+"WINDOW "+(i+1)+'</a>'+
              '</h4>'+
            '</div>'+
            '<div id="collapse'+(i+1)+'" class="panel-collapse collapse in">'+
            '<div class="panel-body">';
            str2='';
            var temp2=b[i].length;
            var ans=b[i];
            for(j=0;j<temp2;j++)
            {
              tab=ans[j];
              var f = tab.favIconUrl, t = tab.title, u = tab.url;
              if (!u) u = '';
              if (!t) t = u;

               // workaround
              if (f == 'chrome://theme/IDR_EXTENSIONS_FAVICON') f = 'data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAABF0lEQVQoz2P4z4AfMpCgQMfI6LbBZi0mnArCK73f+jyOZMWiQENOU0KHe3N01KuOg/+ZNHg0ZNSZUBSYn7T8aP3B6230y5DX9u8tP5p+suZDURD6IOJV1Mu4FynPE19Ev4x85fvmPweKgrj76c8ykWDkKwtOTVUNHriC5atfLNy2Nf05TEHMS9d9Fh9M98IVvLb5z7c5IOEFTEHy88yrIa+DH8AVmDwy7/BeEwdXkPrsf+3aHXsXwhX4P/V7E/I6+8HpNUCLgAqiX7qw/rf+rwZXkHEj8UXii5aj/1Xv26c+yXwW8SpIAsUX1fvz72c/ir38n8EtO/Fx1Y2ai63yqEEd97/zf///eiDL8X/f/9r/Wf95iI5NALw5DuHmTOHfAAAAAElFTkSuQmCC';
              str3= '<div class="list-group-item" id="item">'+'<img src='+f+' /> <div id="text">'+t+'</div></div>';
              str2+=str3;
            }
        str1+=str2+
       '</div>'+
       '</div>';
      }
      document.getElementById('accordion').innerHTML=str1;
    };

x();

setTimeout(function() {
  y();
}, 500);

