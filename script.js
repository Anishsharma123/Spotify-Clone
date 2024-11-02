// console.log("Let's write JavaScript");

// async function getSongs() {
//     try {
//         let response = await fetch("http://127.0.0.1:3000/Projects/Spotify_Clone/Songs/");
//         let text = await response.text();
        
//         let div = document.createElement("div");
//         div.innerHTML = text;

//         const as = div.getElementsByTagName("a");
//         const songs = [];

//         for (let index = 0; index < as.length; index++) {
//             const element = as[index];

//             if (element.href.endsWith(".m4a")) {
//                 // songs.push(element.href);
//                 songs.push(element.href.split("/Songs/")[1]);
//             }
//         }

//         return songs;
//     } catch (error) {
//         console.error("Error fetching songs:", error);
//     }
// }

// const playMusic = (track)=>{
//     let audio = new Audio(`/Projects/Spotify_Clone/Songs/${track}`);
//     audio.play();
// }

// async function main(){
//     //Current Song
//     let currentSong;

//     //Get the list of all songs
//     let songs = await getSongs();

//     //Show all the songs in the playlist
//     let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0];
//     for (const song of songs) {
//         // songUL.innerHTML = songUL.innerHTML + song; //see result for practice //it gives the link
//         songUL.innerHTML = songUL.innerHTML + `<li> 
        
//                             <img src="music.svg" alt="">
//                             <div class="info">
//                                 <div>${song.replaceAll("%20", " ")}</div>
//                                 <div>EMPEROR</div>
//                             </div>
//                             <div class="playNow">
//                                 <span>Play Now</span>
//                                 <img class="invert" src="play.svg" alt="">
//                             </div>
                            
                        
//          </li>`; //replace is req 
//     }
//     //Attach an event listener to each song
//     Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
//         e.addEventListener("click", element => {
//             console.log(e.querySelector(".info").firstElementChild.innerHTML);
//             playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
//         })
//     });

//     // //Play the first song
//     // var audio = new Audio(songs[0]);
//     // // audio.play();


    

// }
// main();


//-------------------
console.log("Let's write JavaScript");
//current song
let currentSong = new Audio();

async function getSongs() {
    try {
        let response = await fetch("http://127.0.0.1:3000/Projects/Spotify_Clone/Songs/");
        let text = await response.text();
        
        let div = document.createElement("div");
        div.innerHTML = text;

        const as = div.getElementsByTagName("a");
        const songs = [];

        for (let index = 0; index < as.length; index++) {
            const element = as[index];

            if (element.href.endsWith(".m4a")) {
                songs.push(decodeURIComponent(element.href.split("/Songs/")[1])); // Decode the song name to handle %20
            }
        }

        return songs;
    } catch (error) {
        console.error("Error fetching songs:", error);
    }
}

const playMusic = (track) => {
    // Stop the currently playing song, if any
    currentSong.pause();
    currentSong.currentTime = 0;  // Reset the song to the beginning

    // Set the new track and play it
    currentSong.src = `/Projects/Spotify_Clone/Songs/${encodeURIComponent(track)}`;  // Ensure the track is encoded
    currentSong.play();
    play.src = "pause.svg";
}


async function main() {


    // Get the list of all songs
    let songs = await getSongs();

    // Show all the songs in the playlist
    let songUL = document.querySelector(".songlist ul");
    let songItems = ''; // Initialize an empty string to build list items

    for (const song of songs) {
        songItems += `
            <li>
                <img src="music.svg" alt="">
                <div class="info">
                    <div>${song.replaceAll("%20", " ")}</div>
                    <div>EMPEROR</div>
                </div>
                <div class="playNow">
                    <span>Play Now</span>
                    <img class="invert" src="play.svg" alt="">
                </div>
            </li>`;
    }

    // Append the HTML once after building all list items
    songUL.innerHTML = songItems;

    // Attach an event listener to each song
    Array.from(songUL.getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", () => {
            const songName = e.querySelector(".info").firstElementChild.textContent.trim();
            console.log("Playing song:", songName);
            playMusic(songName);
        });
    });

    //Attach an event Listener to play next and previous
    play.addEventListener("click", ()=>{
        if(currentSong.paused){
            currentSong.play();
            play.src = "pause.svg";
        }else{
            currentSong.pause();
            play.src = "play.svg";
        }
    })

}

main();
