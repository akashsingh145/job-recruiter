function DashboardCard({tittle,value,icon}){
    return(
        <div className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center hover:shadow-lg transition">
            <div>
                <h3 className="text-gray-500 text-sm"> {tittle}</h3>
                <h2 className="text-3xl font-bold mt-2">{value}</h2>
            </div>
            <div className="text-4xl text-cyan-500">
                {icon}
            </div>
        </div>
    )

}
export default DashboardCard;