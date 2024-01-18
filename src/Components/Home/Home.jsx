import Some from './Some';
import '../../Styles/Home.css';
import '../../Styles/Loader.css'
import CountUp from 'react-countup';
import { FcSearch } from "react-icons/fc";
import { useState, useEffect } from 'react';
import { IoEarthSharp } from "react-icons/io5";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/all`)
      .then((response) => response.json())
      .then(data => {
        console.log(data);
        setCountries(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching country data:', error);
        setLoading(false);
      });
  }, []);

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
  };

    return (
        <div className='home'>
            <div className="navbar">
                <h3 className="logo">World <span>pin</span></h3>
                <form className="search-bar">
                    <input
                        type="text"
                        className="search-inp"
                        placeholder='search-country...'
                    />
                    <button type="submit" className='search-btn'><FcSearch /></button>
                </form>
            </div>

                <div className="have">
                    <IoEarthSharp className='have-icon' />
                    <p>All Countries: <CountUp start={0} end={countries.length} duration={51} /></p>
                </div>

                <div className="some-c">
                    <Some countries={countries} loading={loading} />
                </div>

            <footer>All Right Reserved 2024</footer>
        </div>
    );
};

export default Home;
