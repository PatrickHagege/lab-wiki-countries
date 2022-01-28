import React from "react";
import { useParams/*, useLocation*/ } from "react-router-dom";
//import { Link } from "react-router-dom";
//import location from "react-router-dom";

const Country = (props) => {
	//const location = useLocation();
	const params = useParams();
//console.log("PROPS", props.countries)
	const foundCountry = props.countries.find(
		(country) => country.alpha3Code === params.alpha3Code
	);
	console.log("Found Country", foundCountry);
	return (
        <div className="col-7" key={foundCountry.alpha3Code}>
        <img src={`https://restcountries.eu/data/${foundCountry.alpha3Code.toLowerCase()}.png`} alt="country flag" style={{width: '300px'}}/>
        <h1>{foundCountry.name.common}</h1>
        <table className="table">
          <thead></thead>
          <tbody>
            <tr>
              <td style={{width: '30%'}}>Capital</td>
              <td>{foundCountry.capital[0]}</td>
            </tr>
            <tr>
              <td>Area</td>
              <td>
              {foundCountry.area} km <sup>2</sup>
              </td>
            </tr>
            <tr>
              <td>Borders</td>
              <td>
                <ul>
                 {/* {foundCountry.borders.map((border)=> {
                    const foundBorder = props.countries.find((country) => country.alpha3Code === border)
                    //foundBorders.map((border) => console.log(border.name.official))
                    console.log("Found Border :",foundBorder.name);
                    return <li>{foundBorder}</li>;
                    })} */}
                  {/* <li><a href="/AND">Andorra</a></li>
                  <li><a href="/BEL">Belgium</a></li>
                  <li><a href="/DEU">Germany</a></li>
                  <li><a href="/ITA">Italy</a></li>
                  <li><a href="/MCO">Monaco</a></li>
                  <li><a href="/ESP">Spain</a></li>
                  <li><a href="/CHE">Switzerland</a></li> */}
                </ul>  
              </td>
            </tr>
          </tbody>
        </table>
      </div>
	);
};

export default Country;