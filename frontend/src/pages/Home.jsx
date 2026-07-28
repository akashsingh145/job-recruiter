import Navbar from "../components/Navbar";
import homeImage from "../assets/home.jpg";
function Home() {
    return(
        <>
        <Navbar/>
        
        <section className="bg-slate-50 flex items-center">
            <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col-reverse md:flex-row items-center justify-between gap-12">

                <div className="w-full md:w-1/2 text-center md:text-left">
                    <h1 className="text-6xl  md:text-6xl font-bold text-slate-800 leading-tight"> 
                        Find Your <span className="text-blue-600">
                         Dream Job</span> With Us
                        </h1>
                    <p className="text-slate-600 text-lg mt-6 leading-8">
                         Discover thousands of job opportunities from top companies.
              Build your career with confidence and apply in just one click.</p>
              <div className="mt-8 flex flex-coloum sm:flex-row gap-4 justify-center md:justify start">
             <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                Get started</button>
              <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition">
              BrowserJob</button>
              </div>
                </div>

                <div className="flex flex-col md:flex-row items-center">
                <img src={homeImage}
                
                alt="jobrecurator"
                className="w-full max-w-lg rounded-2xl"
            />

                </div>
                


            </div>
        </section>
        </>
    );
}
export default Home;