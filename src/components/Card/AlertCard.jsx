function AlertCard({id,title,description,dataTime}) {
  console.log("AlertCard Props:", {id,title,description,dataTime});
  return (
    <div className="card bg-[#564343] border border-[#514c4c] rounded-lg p-4">
    <div className="card-body">
      <h2 className="card-title">{title}</h2>
      <p>{description}</p>
      <p className="text-sm text-gray-400 mt-2">{dataTime}</p>
    </div>
  </div>
  )
}

export default AlertCard