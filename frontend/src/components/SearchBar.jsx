import { Link } from "react-router-dom"
function SearchBar(){
    return(
        <div className="bg-white shadow-md rounded-xl p-6 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/*  search*/}
                <input
                type="text"
                placeholder="SearchJob.."
className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
                
                {/* location */}
                <input
                type="text"
                placeholder="Search Location.."
                className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
                {/* categories */}
                <select>
                    <option>Frontend Developer</option>
                    <option> Backend Developer</option>
                    <option> FullStack Developer</option>
                    <option>Mern Full Stack Developer</option>
                    <option>Java Developer</option>
                </select>
                <button className="bg-blue-600 text-white rounded-lg py-3 hover:bg-blue-700 transition" >
                    Search</button>
            </div>
        </div>
    )
}
export default SearchBar