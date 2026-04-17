function AlertCard({id,title,description,dataTime,severity}) {
  console.log("AlertCard Props:", {id,title,description,dataTime, severity});
  return (
    <div className={`card ${severity==="high"?"bg-red-700":severity==="medium"?"bg-uellow-700":"bg-green-700"} border border-[#da6161] rounded-lg p-4`}>
    <div className="card-body">
      <h2 className="card-title">{title}</h2>
      <p>{description}</p>
      <p className="text-sm text-gray-400 mt-2">{dataTime}</p>
    </div>
  </div>
  )
}

export default AlertCard