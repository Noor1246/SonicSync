import { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";

const Profile = () => {

  const storedUser = localStorage.getItem("user");

const user = storedUser 
? JSON.parse(storedUser)
: null;
  const { theme, setTheme, themes } = useTheme();


  const [favorites, setFavorites] = useState(0);
  const [playlists, setPlaylists] = useState(0);
  const [recent, setRecent] = useState(0);

  const [favoriteArtists, setFavoriteArtists] = useState([]);
  const [recentSongs, setRecentSongs] = useState([]);


  // PROFILE STATES

  


  




  useEffect(() => {

  const loadData = async () => {

  if(!user) return;

  try {

      const fav = await axios.get(
        `http://localhost:8000/api/favorites/${user._id}`
      );


      const rec = await axios.get(
        `http://localhost:8000/api/recently-played/${user._id}`
      );


      const play = await axios.get(
        `http://localhost:8000/api/playlists/${user._id}`
      );


      console.log("FAVORITES:", fav.data);
      console.log("RECENT:", rec.data);
      console.log("PLAYLISTS:", play.data);



      // FAVORITES COUNT

      setFavorites(
        fav.data.length
      );



      // RECENT COUNT

      setRecent(
        rec.data.length
      );



      // PLAYLIST COUNT

      setPlaylists(
        play.data.length
      );




      // ARTISTS

      const artistCount = {};

      fav.data.forEach(item=>{

        const song = item.song || item;

        if(song.artist){

          artistCount[song.artist] =
          (artistCount[song.artist] || 0) + 1;

        }

      });



      const artists = Object.entries(artistCount)
      .sort((a,b)=>b[1]-a[1])
      .slice(0,6)
      .map(item=>item[0]);



      setFavoriteArtists(artists);




      // RECENT SONGS

      const songs = rec.data
      .map(item=>item.song || item)
      .slice(0,5);



      setRecentSongs(songs);



    }
    catch(err){

      console.log(
        "PROFILE ERROR:",
        err
      );

    }

  };



  if(user?._id){
    loadData();
}


},[]);




return (

<div className="max-w-6xl mx-auto text-white pb-10">


{/* Banner */}

<div
className="
h-56
rounded-3xl
bg-gradient-to-r
from-violet-600
via-cyan-500
to-blue-600
relative
overflow-hidden
"
>

<div className="absolute inset-0 bg-black/20"/>


<div
className="
absolute
-top-16
-right-16
w-72
h-72
rounded-full
bg-white/10
blur-3xl
"
/>


<div
className="
absolute
bottom-6
left-8
text-5xl
font-black
text-white/10
tracking-widest
"
>
SonicSync
</div>


</div>





{/* Profile Card */}

<div
className="
relative
-mt-20
bg-white/10
backdrop-blur-2xl
rounded-3xl
border
border-white/10
p-8
"
>



{/* Header */}

<div
className="
flex
flex-col
md:flex-row
items-center
gap-8
"
>



{/* Avatar */}
<div
className="
w-40
h-40
rounded-full
bg-gradient-to-r
from-cyan-500
to-violet-500
flex
items-center
justify-center
text-6xl
font-black
border-4
border-white
shadow-[0_0_45px_rgba(34,211,238,.35)]
"
>
{
user?.name?.charAt(0).toUpperCase()
}
</div>






{/* Details */}

<div className="flex-1 text-center md:text-left">


<h1 className="text-5xl font-black">
{user?.name}
</h1>


<p className="text-gray-300 mt-2 text-lg">
{user?.email}
</p>


<p className="text-cyan-300 mt-3">
✨ Music Lover since {new Date().getFullYear()}
</p>






</div>


</div>
{/* Stats */}

<div
className="
grid
grid-cols-2
md:grid-cols-4
gap-6
mt-12
"
>


{/* Recently Played */}

<div className="
bg-gradient-to-br
from-white/10
to-white/5
rounded-2xl
border
border-white/10
p-6
text-center
hover:scale-105
hover:border-cyan-400
transition-all
duration-500
">

<p className="text-4xl">🕒</p>

<p className="text-3xl font-black mt-3">
{recent}
</p>

<p className="text-gray-400 mt-2">
Recently Played
</p>

</div>



{/* Favorites */}

<div className="
bg-gradient-to-br
from-white/10
to-white/5
rounded-2xl
border
border-white/10
p-6
text-center
hover:scale-105
hover:border-pink-400
transition-all
duration-500
">

<p className="text-4xl">❤️</p>

<p className="text-3xl font-black mt-3">
{favorites}
</p>

<p className="text-gray-400 mt-2">
Favorites
</p>

</div>



{/* Playlists */}

<div className="
bg-gradient-to-br
from-white/10
to-white/5
rounded-2xl
border
border-white/10
p-6
text-center
hover:scale-105
hover:border-violet-400
transition-all
duration-500
">

<p className="text-4xl">🎼</p>

<p className="text-3xl font-black mt-3">
{playlists}
</p>

<p className="text-gray-400 mt-2">
Playlists
</p>

</div>



{/* Member */}

<div className="
bg-gradient-to-br
from-white/10
to-white/5
rounded-2xl
border
border-white/10
p-6
text-center
hover:scale-105
hover:border-cyan-400
transition-all
duration-500
">

<p className="text-4xl">📅</p>

<p className="text-3xl font-black mt-3">
{new Date().getFullYear()}
</p>

<p className="text-gray-400 mt-2">
Member Since
</p>

</div>


</div>





{/* Bottom Sections */}

<div
className="
grid
lg:grid-cols-2
gap-8
mt-14
"
>



{/* Favorite Artists */}

<div
className="
bg-white/5
rounded-3xl
border
border-white/10
p-8
"
>

<h2 className="text-2xl font-bold mb-6">
🎤 Favorite Artists
</h2>


{
favoriteArtists.length === 0 ?

<p className="text-gray-400">
No favorite artists yet.
</p>


:

<div className="flex flex-wrap gap-3">

{
favoriteArtists.map((artist)=>(

<div
key={artist}
className="
px-4
py-2
rounded-full
bg-cyan-500/15
border
border-cyan-400/30
text-cyan-300
font-medium
"
>

{artist}

</div>

))
}

</div>

}

</div>





{/* Recent Activity */}

<div
className="
bg-white/5
rounded-3xl
border
border-white/10
p-8
"
>


<h2 className="text-2xl font-bold mb-6">
🎵 Recent Activity
</h2>



{
recentSongs.length===0 ?

<p className="text-gray-400">
Nothing played yet.
</p>


:

<div className="space-y-4">

{
recentSongs.map(song=>(

<div
key={song._id}
className="
flex
items-center
gap-4
p-3
rounded-xl
hover:bg-white/5
transition
"
>


<img
src={
song.image?.startsWith("http")
?
song.image
:
`http://localhost:8000${song.image}`
}
alt={song.title}
className="
w-14
h-14
rounded-xl
object-cover
"
/>


<div>

<p className="font-semibold">
{song.title}
</p>

<p className="text-gray-400 text-sm">
{song.artist}
</p>

</div>


</div>

))
}

</div>

}


</div>


</div>






{/* Theme Customization */}

<div
className="
mt-10
bg-white/5
border
border-white/10
rounded-3xl
p-8
"
>


<h2 className="text-2xl font-bold mb-6">
🎨 Theme Customization
</h2>


<p className="text-gray-400 mb-8">
Personalize SonicSync with your favorite color theme.
</p>



<div className="grid grid-cols-2 md:grid-cols-5 gap-5">


{
Object.entries(themes).map(([key,value])=>(


<button
key={key}
onClick={()=>setTheme(key)}
className={`
rounded-2xl
overflow-hidden
border-2
transition-all
duration-300
hover:scale-105

${
theme===key
?
"border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,.4)]"
:
"border-white/10"
}

`}
>


<div
className={`
h-24
${value.background}
`}
/>


<div className="py-3 bg-white/5">

<p className="font-semibold">
{value.name}
</p>

</div>


</button>


))
}


</div>


</div>














</div>


</div>


);

};


export default Profile;