import Active from "./Active";
import Finished from "./Finished";
import NoActive from "./NoActive";

function SimulationState({run}) {
 switch(run){
    case "running":
        return <Active />;
    case "final":
        return <Finished/>;
    default:
        return <NoActive />;
 }

}

export default SimulationState