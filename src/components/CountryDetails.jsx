import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from 'axios';

const Country = ({ countries }) => {
  const [APIBorders, setAPIBorders] = useState([]);
  const [APICountry, setAPICountry] = useState([]);

  const { alpha3Code } = useParams();

  const foundAPICountry = countries.find(
    (country) => country.alpha3Code === alpha3Code
  );

  const foundAPIBorders = foundAPICountry.borders.map(borderCode => {
    const foundAPIBorder = countries.find(
      APICountry => APICountry.alpha3Code === borderCode)
      return foundAPIBorder.name.official
  })

  useEffect(() => {
    axios
    .get(`https://ih-countries-api.herokuapp.com/countries/${alpha3Code}`)
    .then(response => {
      setAPICountry(response.data);
    })
    .catch(error => console.log(error))
  },[alpha3Code])

  useEffect(()=> {
    setAPIBorders(foundAPIBorders);
    // eslint-disable-next-line 
  },[alpha3Code])

  return (
    <div className="col-7 Country" key={foundAPICountry.alpha3Code}>
      <img src={`https://flagcdn.com/${foundAPICountry.alpha2Code.toLowerCase()}.svg`} alt="country flag" style={{ width: '300px' }} />
      <h1>{foundAPICountry.name.official}</h1>
      <table className="table">
        <thead></thead>
        <tbody>
          <tr>
            <td style={{ width: '30%' }}>Capital</td>
            <td>{foundAPICountry.capital[0]}</td>
          </tr>
          <tr>
            <td>Area</td>
            <td>
              {`${foundAPICountry.area} km`} <sup>2</sup>
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
                      <Link to={`/${foundAPICountry.borders[index]}`}>
                        {APIBorder}
                      </Link>
                    </li>)
                })}
              </ul>
            </td>
          </tr>
          )}
        </tbody>
        <tfoot>{APIBorders.length === 0 && (<tr><td colSpan={2}>{`${foundAPICountry.name.common} has no border...`}</td></tr>)}</tfoot>
      </table>
    </div>
  );
};

export default Country;