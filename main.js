const mainContainer = document.getElementById("mainContainer");


function searchLyrics(){
    let inputValue = document.getElementById("inbox").value;
    mainContainer.innerHTML = "";
        fetch(`https://api.lyrics.ovh/suggest/${inputValue}`)
        .then(response => response.json())
        .then(data => {

            for(let i = 0; i < data.data.length; i++){
               let p =  document.createElement("div");
               p.innerHTML = `
                
                <div id="singleLyrics${i}" class="search-result col-md-8 mx-auto py-4">
                    <div class="single-result row align-items-center my-3 p-3">
                        <div class="col-md-9">
                            <h3 class="lyrics-name">${data.data[i].title}</h3>
                            <p class="author lead">Album by <span>${data.data[i].artist.name}</span></p>
                        </div>
                        <div class="col-md-3 text-md-right text-center">
                            <button onclick="songView('${data.data[i].artist.name}', '${data.data[i].title}', ${i})" class="btn btn-success">Get Lyrics</button>
                        </div>
                    </div>
                </div>
          
                `
                mainContainer.appendChild(p); 
                
                


            }
          
        });
    
}
function songView(artist, title, i){
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(response => response.json())
    .then(data => {
        
        let singleLyrics = document.getElementById(`singleLyrics${i}`);
        const p = document.createElement("div");
        p.innerHTML = "";
        p.innerText = data.lyrics;
        singleLyrics.appendChild(p);
        console.log(data.lyrics)

    });


}
