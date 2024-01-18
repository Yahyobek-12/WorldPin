import '../../Styles/Some.css';
import React, { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import { FcExpand } from "react-icons/fc";
import { MdLocationCity } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaBorderAll } from "react-icons/fa6";
import { IoEarth } from "react-icons/io5";

const Some = ({ countries, loading }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  const handleCountryClick = (country) => {
    if (selectedCountry === country) {
      setIsInfoVisible(!isInfoVisible);
    } else {
      setSelectedCountry(country);
      setIsInfoVisible(true);
    }
  };

  const handleBottomClick = () => {
    setIsInfoVisible(false);
  };

  return (
    <div className="some">
      {loading ? (
        <div className="data-loader">
          <div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <>
          {selectedCountry && isInfoVisible && (
            <div className='selected-country-info'>
              <FcExpand className='bottom' onClick={handleBottomClick} />
              <h3>{selectedCountry.name.common}</h3>
              <div className="faq">
                <div className="capital"><MdLocationCity /> <p>{selectedCountry.capital.slice(0, 15)}</p></div>
                <div className="capital"><FaPeopleGroup /> <p>{selectedCountry.population}</p></div>
                <div className="borders"><IoEarth /> <p>{selectedCountry.region}</p></div>
                <div className="coat"><img src={selectedCountry.coatOfArms.png} alt={selectedCountry.name.common} /> Coat Of Arms</div>
                <div className="coat"><img src={selectedCountry.flags.png} alt={selectedCountry.name.common} /> Flags</div>
              </div>
            </div>
          )}

          {countries.map((country) => (
            <div
              className={`country-card ${selectedCountry === country && isInfoVisible ? 'selected' : ''}`}
              key={country.name.common}>
              <h3>{country.name.common.slice(0, 20)}</h3>
              <FaInfoCircle className="info" onClick={() => handleCountryClick(country)} />
              <img
                src={country.flags.png}
                alt={country.name.common}
                className="country-img"
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Some;
