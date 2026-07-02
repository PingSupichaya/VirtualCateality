import { useNavigate, Link } from 'react-router-dom'
import { NavBtn } from "./Components.tsx"
import { useAuth } from "../context/AuthContext.tsx"
import { User, LogOut } from './Icons.tsx'

function NavBar() {
  const { isLoggedIn, isAnonymous, profile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/home');
  };

  return (
    <>
    {/* Navbar */}
    <div className="flex items-center justify-between bg-[url('./assets/noisenav.svg')] border border-(--btn-border) px-8 py-3">
      <div className="flex gap-10">
        <div className="font-bold text-lg sm:text-2xl">
          Virtual Cateality</div>
        <button onClick={handleLogout} className="font-bold text-m sm:text-lg hover:scale-110 py-1 cursor-pointer">Home</button>
      </div>

      {isLoggedIn && !isAnonymous ? (
        <div className="flex items-center gap-4">
          <NavBtn msg="Pet My Cat" onClick={() => navigate(`/simulation`)} />
          <div className="flex items-center gap-1 cursor-pointer hover:scale-110 transition-transform">
            <User size="18" />
            <Link to="/myaccount" className="font-bold text-sm sm:text-base">{profile?.name}</Link>
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
