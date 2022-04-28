// src/App.js
import "./App.css";
import { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Navbar from './components/NavBar';
import CountriesList from "./components/CountriesList";
import CountryDetails from "./components/CountryDetails";
import axios from 'axios';

function App() {
  const [APICountries, setAPICountries] = useState([]);

  useEffect(()=> {
    axios
    .get('https://ih-countries-api.herokuapp.com/countries')
    .then(response => {
      setAPICountries(response.data)
      // console.table('APICountries', APICountries);
    })
    .catch(error => {
      console.log(error);
    })
    // eslint-disable-next-line
  }, [])

  return (
    <div className="App">
      <Navbar />
    
      <div className="container">
        <div className="row">
          <CountriesList countries={APICountries} />
          <Routes>
          <Route path="/:alpha3Code" element={<CountryDetails countries={APICountries} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;