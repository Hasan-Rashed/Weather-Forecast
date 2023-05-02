import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataProvider } from "./context/Context";
import { TiWeatherPartlySunny } from 'react-icons/ti';
import { Vortex } from "react-loader-spinner";


function App() {

  const [data, setData] = useState(null);
  const [location, setLocation] = useState('bangladesh');

  const handleChange = (event) => {
    setLocation(event.target.value);
  }


  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=5e5e3a7189a7e92d62dc92b0f81ae493`;

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

const handleSubmit = (event) => {
  event.preventDefault();
}

  useEffect(() => {
    fetchData();
  }, [location]);



  if(data === null){
    return (<div className="grid items-center justify-center pt-64">
          <Vortex
        visible={true}
        height="80"
        width="80"
        ariaLabel="vortex-loading"
        wrapperStyle={{}}
        wrapperClass="vortex-wrapper"
        colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
      />
    </div>)
  }else if(data.length === 0){
    return <div>no data found</div>
  }else{
    return (
      <DataProvider value={data}>
      <div className="bg-gradient-to-r from-white to-blue-500 py-5 h-screen">

        <div className="container mx-auto my-5 text-center grid sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-1 gap-5 items-center justify-center">
          <div>
            <h1 className="text-2xl text-blue-900h-14 bg-gradient-to-r from-cyan-500 to-blue-500 py-3 text-white font-bold">Weather Forecast</h1>
            <form action="" onSubmit={handleSubmit}>
              <input value={location} type="text" placeholder="Enter city name" className="border-none rounded-md my-5 mx-3 py-1 px-2 shadow-md" onChange={handleChange} />
            </form>
          </div>
          
          <div className="text-black bg-white rounded-md shadow-xl py-3">
            <p className="text-2xl font-bold">{`${data.name}, ${data.sys.country}`}</p>
            <p className="my-3 font-extrabold text-3xl">{`${data.main.temp}`} &#8457;</p> 
            <strong className="text-2xl">{`${data.weather[0].main}`} <TiWeatherPartlySunny className="inline-block"/> </strong>
          </div>

          <div className="text-black text-center bg-white py-3 rounded-md shadow-xl">
            <p className="text-lg justify-start"><span className="px-5 py-5">Humidity</span><strong>{`${data.main.humidity}%`}</strong></p>
            <p className="text-lg justify-start"><span className="px-5 py-5">Wind</span><strong>{`${data.wind.speed} km/h`}</strong></p>
            <p className="text-lg justify-start"><span className="px-5 py-5">Visibility</span><strong>{`${data.visibility / 1000}.00 km`}</strong></p>
            <p className="text-lg justify-start"><span className="px-5 py-5">Max temp</span><strong>{`${data.main.temp_max}`}</strong></p>
            <p className="text-lg justify-start"><span className="px-5 py-5">Min temp</span><strong>{`${data.main.temp_min}`}</strong></p>
          </div>
        </div>
      </div>
      </DataProvider >
    )
  }

}

export default App
