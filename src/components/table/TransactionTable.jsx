import React from "react";
import { TestTube, Box } from "lucide-react";

function TransactionTable({
  transactionId,
  agentName,
  type,
  amount,
  riskRating,     // e.g. "High", "Medium", "Low" or a number
  status,         // e.g. "Pending", "Approved", "Rejected"
  date,           // e.g. "2023-09-15"
}) {
  // simple color helpers
  const statusColor =
    status === "Approved"
      ? "text-green-500"
      : status === "Rejected"
      ? "text-red-500"
      : "text-yellow-500";

  const riskColor =
    riskRating === "High"
      ? "text-red-500"
      : riskRating === "Medium"
      ? "text-yellow-400"
      : "text-green-500";

  return (
    <tr className="py-2 h-10 w-full grid grid-cols-8 border-b border-[#514c4c] px-4 hover:bg-[#2f2f2f]">
      <td className="text-left text-sm text-base-content/60">
        {transactionId}
      </td>

      <td className="text-left text-sm text-base-content/60">
        {agentName}
      </td>

      <td className="text-left text-sm text-base-content/60">
        {type}
      </td>

      <td className="text-left text-sm text-base-content/60">
        {amount}
      </td>

      <td
        className={`text-left text-sm flex items-center gap-1 ${riskColor}`}
      >
        <Box className="w-4 h-4" />
        <span>{riskRating}</span>
      </td>

      <td
        className={`text-left text-sm flex items-center gap-1 ${statusColor}`}
      >
        <span className="w-2 h-2 rounded-full bg-current" />
        <span>{status}</span>
      </td>

      <td className="text-left text-sm text-base-content/60">
        {date}
      </td>

      <td className="text-left text-sm text-base-content/60 flex items-center">
        <button
          type="button"
          className="btn btn-sm btn-outline"
         
        >
         view
        </button>

       
       
      </td>
    </tr>
  );
}

export default TransactionTable;