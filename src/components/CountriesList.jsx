import React from "react";
import { Link } from "react-router-dom";

const Countries = ({ countries }) => {
    return (
        <div className="col-5" style={{maxHeight: '90vh', overflow: 'scroll'}}>
            <div className="list-group">
                {countries.map((country, i) => {
                    return (
                        <Link className="list-group-item list-group-item-action" to={`/${country.alpha3Code}`} key={country.alpha3Code}>
                            <img src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`} alt=''/>
                            <p>{`${country.name.common}`}</p>
                        </Link>
                        
                    );
                })}
            </div>
        </div>
    );
};

export default Countries;