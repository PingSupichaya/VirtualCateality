import { useNavigate } from 'react-router-dom'
import { NavBtn } from "./Components.tsx"
import { useAuth } from "../context/AuthContext.tsx"
import { useCat } from "../context/CatContext.tsx"
import { User, LogOut } from './Icons.tsx'

function NavBar() {
  const { isLoggedIn, isAnonymous, profile, logout } = useAuth();
  const { selectedCatId } = useCat();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/home');
  };

  // Google-logged-in users stay logged in when they click Home.
  // Anonymous sessions aren't persisted anywhere, so going Home clears them.
  const handleHomeClick = () => {
    if (isAnonymous) {
      logout();
    }
    navigate('/home');
  };

  // Go straight to the simulation for whichever cat the user already has selected.
  // If they haven't picked one yet, send them to pick one first.
  const handlePetMyCat = () => {
    if (selectedCatId != null) {
      navigate(`/simulation/${selectedCatId}`);
    } else {
      navigate('/select');
    }
  };

  return (
    <>
    {/* Navbar */}
    <div className="flex items-center justify-between bg-[url('./assets/noisenav.svg')] border border-(--btn-border) px-8 py-3">
      <div className="flex gap-10">
        <div className="font-bold text-lg sm:text-2xl">
          Virtual Cateality</div>
        <button onClick={handleHomeClick} className="font-bold text-m sm:text-lg hover:scale-110 py-1 cursor-pointer">Home</button>
      </div>

      {isLoggedIn && !isAnonymous ? (
        <div className="flex items-center gap-4">
          <NavBtn msg="Pet My Cat" onClick={handlePetMyCat} />
          <NavBtn msg="Select a Cat" onClick={() => navigate(`/select`)} />
          <div className="flex items-center gap-1">
            <User size="18" />
            <span className="font-bold text-sm sm:text-base">{profile?.name}</span>
          </div>
          <button onClick={handleLogout} className="cursor-pointer hover:scale-110 transition-transform">
            <div className="flex items-center gap-1">
              <LogOut size="20" />
              <p className="font-bold text-sm sm:text-base">Log out</p>
            </div>
          </button>
        </div>
      ) : isAnonymous ? (
        <div className="flex items-center gap-1">
          <User size="18" />
          <p className="font-bold text-sm sm:text-base">Guest</p>
        </div>
      ) : (
        <NavBtn msg="Get Started" onClick={() => navigate(`/login`)} />
      )}
    </div>
    </>
  );
}

export default NavBar
