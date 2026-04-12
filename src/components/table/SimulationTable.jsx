import React from "react";


function SimulationTable({ agent }) {


  
  return (
   
       
          <tr className="py-2 h-10 w-full grid grid-cols-8 border-b border-[#514c4c] px-4 hover:bg-[#2f2f2f]
          text-left text-sm text-base-content/60">
            <td className="border px-3 py-2">{agent.agentName}</td>
            <td className="border px-3 py-2">{agent.scenario}</td>
            <td className="border px-3 py-2">{agent.riskScore}</td>
            <td className="border px-3 py-2">{agent.vulnerabilities}</td>
            <td className="border px-3 py-2 capitalize">{agent.status}</td>
          </tr>
      
     
  );
}

export default SimulationTable;
