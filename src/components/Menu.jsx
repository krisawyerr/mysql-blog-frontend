import React, { useEffect, useState } from 'react'
import axios from "axios";

const Menu = ({cat}) => {
  const [posts, setPosts] = useState([]);
  const [countryInfo, setCountryInfo] = useState("");
  
  const [countryLat, setCountryLat] = useState("");
  const [countryLong, setCountryLong] = useState("");
  const [countryName, setCountryName] = useState("");
  const [countryCurrency, setCountryCurrency] = useState("");
  const [countryCapital, setCountryCapital] = useState("");
  const [countryLanguage, setCountryLanguage] = useState("");
  const [countryRegion, setCountryRegion] = useState("");
  const [countryPopulation, setCountryPopulation] = useState("");


  const donaim = "https://mysql-blog-backend.vercel.app";
  const map = `https://api.mapbox.com/styles/v1/krisawyerr/clmodveur01vt01ragti210rz.html?title=false&access_token=pk.eyJ1Ijoia3Jpc2F3eWVyciIsImEiOiJjbG1vZHFiY2wxMDJ5MmxwbjVwNm5qZnVzIn0.-toq3H6oxw1OCdkI2ZERsA&zoomwheel=false#2/${countryLat}/${countryLong}`

  console.log(countryInfo)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${donaim}/api/post/?cat=${cat}`)
        setPosts(res.data)
      } catch(err) {
        console.log(err)
      }
    }
    fetchData();
  }, [cat]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://restcountries.com/v3.1/alpha/${cat}?fields=name,currencies,capital,languages,subregion,population,latlng`)
        setCountryInfo(res.data)
        
        setCountryLat(res.data.latlng[0])
        setCountryLong(res.data.latlng[1])
        setCountryName(res.data.name.common)
        setCountryCurrency(res.data.currencies[Object.keys(res.data.currencies)[0]].name)
        setCountryCapital(res.data.capital[0])
        setCountryLanguage(res.data.languages[Object.keys(res.data.languages)[0]])
        setCountryRegion(res.data.subregion)
        setCountryPopulation(res.data.population)
      } catch(err) {
        console.log(err)
      }
    }
    fetchData();
  }, [cat]);

  return (
      <div className="menu">
        <iframe width='300px' height='300px' src={map} title="Satellite Streets" style={{border:"none"}}></iframe>
        <div className='country'>{countryName}</div>
        <div className='infoLine'> 
          <div>Currency:</div>
          <div>{countryCurrency}</div>
        </div>
        <div className='infoLine'> 
          <div>Capital:</div>
          <div>{countryCapital}</div>
        </div>
        <div className='infoLine'> 
          <div>Language:</div>
          <div>{countryLanguage}</div>
        </div>
        <div className='infoLine'> 
          <div>Region:</div>
          <div>{countryRegion}</div>
        </div>
        <div className='infoLine'> 
          <div>Population:</div>
          <div>{countryPopulation.toLocaleString()}</div>
        </div>
        
        
        
        {/* <h1>Other posts you may like</h1>
        {posts.map(post => (
            <div className="post" key={post.id}>
                <img src={`../upload/${post.img}`} alt="" />
                <h2>{post.title}</h2>          
                <button>Read more</button>
            </div>
        ))} */}
      </div>
  )
}

export default Menu