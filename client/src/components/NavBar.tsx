import { useNavigate, Link } from 'react-router-dom'
import { NavBtn } from "./Components.tsx"
import { useAuth } from "../context/AuthContext.tsx"
import { User } from './Icons.tsx'

function NavBar() {
  const { isLoggedIn, profile } = useAuth();
  const navigate = useNavigate();

  return (
    <>
    {/* Navbar */}
    <div className="flex items-center justify-between bg-[url('./assets/noisenav.svg')] border border-(--btn-border) px-8 py-3">
      <div className="flex gap-10">
        <div className="font-bold text-lg sm:text-2xl">
          Virtual Cateality</div>
        <Link to="/home" className="font-bold text-m sm:text-lg hover:scale-110 py-1 cursor-pointer">Home</Link>
      </div>

      {isLoggedIn ? (
        <div className="flex items-center gap-4">
          <NavBtn msg="Pet My Cat" onClick={() => navigate(`/simulation`)} />
          <div className="flex items-center gap-1">
            <User size="18" />
            <Link to="/myaccount" className="font-bold text-sm sm:text-base">{profile?.name}</Link>
          </div>
        </div>
      ) : (
        <NavBtn msg="Get Started" onClick={() => navigate(`/login`)} />
      )}
    </div>
    </>
  );
}

export default NavBar
