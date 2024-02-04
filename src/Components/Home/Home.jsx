import Some from './Some';
import '../../Styles/Home.css';
import '../../Styles/Loader.css';
import CountUp from 'react-countup';
import no__data from '../../Images/no.webp';
import { IoEarthSharp } from 'react-icons/io5';
import React, { useState, useEffect } from 'react';

// ... (previous imports)

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/all`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCountries(data);
        setFilteredCountries(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching country data:', error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filtered = countries.filter(
      (country) =>
        country.name.common.toLowerCase().includes(term.toLowerCase()) ||
        country.name.official.toLowerCase().includes(term.toLowerCase())
    );

    setFilteredCountries(filtered);
  };

  return (
    <div className="home">
      <div className="navbar">
        <h3 className="logo">
          World <span>pin</span>
        </h3>
        <form className="search-bar">
          <input
            type="text"
            className="search-inp"
            placeholder="Search-Countries..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </form>
      </div>

      <div className="have">
        <IoEarthSharp className="have-icon" />
        {filteredCountries.length === 0 && searchTerm !== '' ? (
          <p>No matching countries found</p>
        ) : (
          <p>
            All Countries: <CountUp start={0} end={filteredCountries.length} duration={10} />
          </p>
        )}
      </div>

      <div className="some-c">
        {filteredCountries.length === 0 && searchTerm !== '' ? (
          <div className='no-data'>
            <img src={no__data} alt="no-data" />
          </div>
        ) : (
          <Some countries={filteredCountries} loading={loading} />
        )}
      </div>

      <footer>From NWT</footer>
    </div>
  );
};

export default Home;
