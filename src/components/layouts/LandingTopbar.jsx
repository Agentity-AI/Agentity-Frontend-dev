import SignUp from '../signUp/SignUp';
import logo from "../../assets/Agentity-logo.png"
import { User } from 'lucide-react';
import { Loading } from '../loading/Loading';
import { authentication } from '../../store/zustant/useZustandHook';
import { useNavigate } from 'react-router-dom';

function LandingTopbar({dashboardData,loading}) {
  console.log("Dashboard Data in LandingTopbar:", dashboardData);
const {dashBoard}=authentication();
  const navigate = useNavigate();
  function toDaboard(){
    if (dashBoard)   navigate("/dashboard")
  }
    return (
    <div className="flex items-center justify-between w-full border-b border-[#514c4c] fixed
    bg-[#0f0f0f] 
     top-0">
        {/* Left side (optional breadcrumb / page title placeholder) */}
        <div className="h-16 bg-[#0f0f0f0] flex items-center px-4 gap-2 border-none ">
        <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
          <span className="text-xl text-primary-content">
             <img src={logo} alt="ahentity logo"/>
          </span>
        </div>
        <span className="font-semibold text-lg">Agentity</span>
      </div>
        {/* Right side controls */}
        {loading &&<Loading/>|| (dashboardData ?<button className="flex  items-center gap-4 mr-6 cursor-pointer "
        onClick={toDaboard}><User size={50} color='white'/> </button> : <div className="flex items-center gap-4 mr-6 ">
            <SignUp/>
        </div>)}
    </div>
  );
}

export default LandingTopbar