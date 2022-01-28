import React from "react";
import { Link, Outlet } from "react-router-dom";

const Countries = ({ countries }) => {
    return (
        <div className="col-5" style={{
            maxHeight: '90vh', overflow: 'scroll'
        }}>
            <div className="list-group">
                {countries.map((country, i) => {
                    return (<>
                        <img key={i} src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`} alt={country.name} />
                        <Link to={`${country.alpha3Code}`}
                        className="list-group-item list-group-item-action"
                        >
                            <p>{country.name.official}</p>
                        </Link>
                    </>
                    );
                })}
            </div>
            <Outlet />
        </div>
    );
};

export default Countries;