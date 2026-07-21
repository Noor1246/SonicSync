import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";
import { HiOutlineMenu } from "react-icons/hi";

import { logo } from "../assets";
import { links } from "../assets/constants";


const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};



const NavLinks = ({ handleClick }) => (
  <div className="mt-6">

    {links?.map((link) => (

      <NavLink
        key={link.name}
        to={link.to}
        onClick={() => handleClick && handleClick()}

        className={({isActive}) =>
          `
          flex
          items-center
          gap-3

          px-4
          py-3

          my-2

          rounded-xl

          transition-all
          duration-300

          ${
            isActive
            ?
            "bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-lg"
            :
            "text-gray-400 hover:text-white hover:bg-white/10"
          }
          `
        }
      >

        <link.icon className="text-xl"/>

        <span className="font-medium">
          {link.name}
        </span>

      </NavLink>

    ))}

  </div>
);



const Sidebar = () => {

const [mobileMenuOpen,setMobileMenuOpen] = useState(false);
const navigate = useNavigate();

const user = JSON.parse(
  localStorage.getItem("user")
);



return (

<>


{/* Desktop */}

<div
className="
hidden
md:flex

h-screen

w-[260px]

flex-col

px-6

pb-0

bg-gradient-to-b
from-[#0B1120]
via-[#111827]
to-[#1E293B]

border-r
border-white/10

z-50
"
>


{/* Logo */}

<div className="flex flex-col items-center">

<img
src={logo}
alt="SonicSync"
className="w-30 h-30 object-contain"
/>


<h1
className="
-mt-3
text-3xl
font-extrabold
text-white
"
>
Sonic
<span className="text-cyan-400">
Sync
</span>

</h1>


<p className="text-gray-400 text-sm mt-1">
Your Music. Perfectly Synced.
</p>


</div>




{/* User */}

{
user &&

<div
onClick={() => navigate("/profile")}
className="
mt-6
bg-white/5
rounded-2xl
p-4
text-center
cursor-pointer
hover:bg-white/10
transition-all
duration-300
"
>

<div
className="
w-14
h-14

rounded-full

bg-gradient-to-r
from-violet-600
to-cyan-500

mx-auto

flex
items-center
justify-center

text-xl
font-bold
text-white
"
>
{user.name.charAt(0).toUpperCase()}

</div>


<h2
className="
mt-2
text-white
font-semibold
"
>
{user.name}
</h2>


</div>

}




{/* Scroll area */}

<div
className="
flex-1

overflow-y-auto

hide-scrollbar

mt-4
"
>

<NavLinks/>

</div>





{/* Logout fixed bottom */}

<button

onClick={handleLogout}

className="
w-full

py-3

mt-4

rounded-xl

bg-gradient-to-r
from-pink-500
to-red-500

text-white

font-semibold

shadow-lg

hover:scale-105

transition-all
duration-300

flex-shrink-0
"

>

Logout

</button>



</div>





{/* Mobile Button */}

<div
className="
fixed
top-5
right-5

md:hidden

z-[70]
"
>

{
mobileMenuOpen
?
<RiCloseLine
className="
w-7
h-7
text-white
cursor-pointer
"
onClick={()=>setMobileMenuOpen(false)}
/>

:

<HiOutlineMenu

className="
w-7
h-7
text-white
cursor-pointer
"

onClick={()=>setMobileMenuOpen(true)}

/>

}

</div>






{/* Mobile Sidebar */}

<div

className={

`
fixed
top-0

md:hidden

h-screen

w-[270px]

flex
flex-col

p-6

bg-gradient-to-b
from-[#0B1120]
via-[#111827]
to-[#1E293B]

border-r
border-white/10

z-[60]

transition-all
duration-300

${mobileMenuOpen ? "left-0":"-left-full"}

`

}

>



<div className="flex flex-col items-center">


<img
src={logo}
className="w-24 h-24 object-contain"
/>


<h1
className="
text-2xl
font-bold
text-white
mt-3
"
>

Sonic
<span className="text-cyan-400">
Sync
</span>

</h1>


</div>





{
user &&

<div
onClick={() => {
  navigate("/profile");
  setMobileMenuOpen(false);
}}
className="
mt-6
bg-white/5
rounded-xl
p-4
text-center
cursor-pointer
hover:bg-white/10
transition-all
duration-300
"
>

<div
className="
w-14
h-14
rounded-full

bg-gradient-to-r
from-violet-600
to-cyan-500

mx-auto

flex
items-center
justify-center

text-white
font-bold
"
>

{user.name.charAt(0).toUpperCase()}

</div>


<h2
className="
text-white
mt-2
font-semibold
"
>
{user.name}
</h2>


</div>

}




<div
className="
flex-1

overflow-y-auto

hide-scrollbar

mt-4
"
>

<NavLinks
handleClick={()=>setMobileMenuOpen(false)}
/>

</div>





<button

onClick={handleLogout}

className="
w-full

py-3

mt-4

rounded-xl

bg-gradient-to-r
from-pink-500
to-red-500

text-white

font-semibold

shadow-lg

hover:scale-105

transition-all
"

>

Logout

</button>



</div>



</>

)

};


export default Sidebar;