import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Country = ({ countries }) => {
  const [borders, setBorders] = useState([]);

  const { alpha3Code } = useParams();

  const foundCountry = countries.find(
    (country) => country.alpha3Code === alpha3Code
  );

  console.log("Found Country", foundCountry);

  const foundBorders = foundCountry.borders.map(borderCode => {
    const foundBorder = countries.find(
      country => country.alpha3Code === borderCode)
      return foundBorder.name.official
  })

  console.log('FoundBorders', foundBorders);

  useEffect(()=> {
    setBorders(foundBorders);
    // eslint-disable-next-line 
  },[alpha3Code])

  return (
    <div className="col-7 Country" key={foundCountry.alpha3Code}>
      <img src={`https://flagcdn.com/${foundCountry.alpha2Code.toLowerCase()}.svg`} alt="country flag" style={{ width: '300px' }} />
      <h1>{foundCountry.name.official}</h1>
      <table className="table">
        <thead></thead>
        <tbody>
          <tr>
            <td style={{ width: '30%' }}>Capital</td>
            <td>{foundCountry.capital[0]}</td>
          </tr>
          <tr>
            <td>Area</td>
            <td>
              {`${foundCountry.area} km`} <sup>2</sup>
            </td>
          </tr>
          {borders.length > 0 && (
            <tr>
            <td>Borders</td>
            <td>
              <ul>
                {borders.map((border, index) => {
                  return (
                    <li key={border}>
                      <Link to={`/${foundCountry.borders[index]}`}>
                        {border}
                      </Link>
                    </li>)
                })}
              </ul>
            </td>
          </tr>
          )}
        </tbody>
        <tfoot>{borders.length === 0 && (<tr><td colSpan={2}>{`${foundCountry.name.common} has no border...`}</td></tr>)}</tfoot>
      </table>
    </div>
  );
};

export default Country;