//https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyD86h_3MSJP9yDrETVrClHbdkPwCbEgfqw&type=video&q=js

async function go(){
    let embed = 'https://www.youtube.com/embed/'
    let channelUrl= 'https://www.youtube.com/channel/'

    let url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults='
    let apiKey = '&key=AIzaSyD86h_3MSJP9yDrETVrClHbdkPwCbEgfqw'
    let type = document.getElementById("type").value    
    let maxResults = 10
    let q = document.getElementById('searchText').value 
    
    let resp = await fetch(url+maxResults+apiKey+'&type='+type+'&q='+q)
    let otvet = await resp.json()

    console.log(otvet.items)
    
    var wrap = document.getElementById('wrap')

    wrap.innerHTML=''

    otvet.items.forEach(item => {
        if(type == "video"){
            let ifrm = document.createElement('iframe')
            var h = document.createElement('h3')
            
            ifrm.style.width = 600
            ifrm.style.height = 550
            ifrm.setAttribute('src', embed+item.id.videoId)
            ifrm.setAttribute('allowfullscreen', '')
            h.innerHTML = item.snippet.title
            
            wrap.appendChild(ifrm)
            wrap.appendChild(h)
        }else if(type == "channel"){
            let img = document.createElement('img')
            
            img.setAttribute('src', item.snippet.thumbnails.medium.url)
            let a = document.createElement('a')
            a.setAttribute('href', channelUrl+item.snippet.channelId)
            
            var h = document.createElement('h3')
            h.innerHTML = item.snippet.channelTitle
            
            a.appendChild(img)
            wrap.appendChild(a)
            wrap.appendChild(h)
        }
        
    });
}