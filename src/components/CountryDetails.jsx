import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from 'axios';

const Country = ({ countries }) => {
  const [APIBorders, setAPIBorders] = useState([]);
  const [currentCountry, setCurrentCountry] = useState([]);
  const { alpha3Code } = useParams();

  useEffect(() => {
    axios
      .get(`https://ih-countries-api.herokuapp.com/countries/${alpha3Code}`)
      .then(response => {
        console.log('response.data in useffect :', response.data)
        setCurrentCountry(response.data)
      })
      .catch(error => {
        console.log(error);
      })
  }, [alpha3Code])

  useEffect(() => {
    if (!currentCountry.borders) return;
    const foundAPIBorders = currentCountry.borders.map(borderCode => {
      const foundAPIBorder = countries.find(
        APICountry => APICountry.alpha3Code === borderCode)
        return foundAPIBorder.name.official
    })
    setAPIBorders(foundAPIBorders);
  }, [currentCountry])

  if (!currentCountry.name) return <div>Please wait for the page component to load...</div>;
  return (
    <div className="col-7 Country" key={currentCountry.alpha3Code}>
      <img src={`https://flagcdn.com/${currentCountry.alpha2Code.toLowerCase()}.svg`} alt="country flag" style={{ width: '300px' }} />
      <h1>{currentCountry.name.official}</h1>
      <table className="table">
        <thead></thead>
        <tbody>
          <tr>
            <td style={{ width: '30%' }}>Capital</td>
            <td>{currentCountry.capital[0]}</td>
          </tr>
          <tr>
            <td>Area</td>
            <td>
              {`${currentCountry.area} km`} <sup>2</sup>
            </td>
          </tr>
          {APIBorders.length > 0 && (
            <tr>
              <td>Borders</td>
              <td>
                <ul>
                  {APIBorders.map((APIBorder, index) => {
                    return (
                      <li key={APIBorder}>
                        <Link to={`/${currentCountry.borders[index]}`}>
                          {APIBorder}
                        </Link>
                      </li>)
                  })}
                </ul>
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>{APIBorders.length === 0 && (<tr><td colSpan={2}>{`${currentCountry.name.common} has no border...`}</td></tr>)}</tfoot>
      </table>
    </div>
  );
};

export default Country;