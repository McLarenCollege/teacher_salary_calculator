import React, {useEffect, useState} from 'react';
import './App.css';
import * as data from './location_factors';
import logo from './logo-white.png';

function App() {
    let [selectedCountry, setSelectedCountry] = useState('Albania');
    let [selectedArea, setSelectedArea] = useState('All');
    let [areaOptions, setAreaOptions] = useState(['All']);
    let [salary, setSalary] = useState(0);

    let countries = (Array.from(new Set(data.list.map((item) => item.country)).values()));
    countries.sort();
    let MAX_SALARY = 108000;

    useEffect(() => {
        updateSalary(selectedCountry, selectedArea);
    }, []);

    let updateOptions = (event) => {
        setSelectedCountry(event.target.value);
        let areas = data.list.filter((country) => country.country === event.target.value);
        areas.sort();
        setAreaOptions(areas);
        setSelectedArea(areas[0]);
        updateSalary(event.target.value, areas[0].area);
    };
    let updateSalary = (countryName, areaName) => {
        setSelectedArea(areaName);
        let locFactor = data.list.filter((country) => country.country === countryName && country.area === areaName)[0].locationFactor;
        setSalary(MAX_SALARY * locFactor / 100);
    };
    return (
        <div className="main">
            <div className="content">
                <img src={logo} alt="McLaren College" className="logo"/>
                <div className="form-group">
                    <label htmlFor="country">Select Country</label>
                    <select name="country" id="country" onChange={(e) => updateOptions(e)}>
                        {countries.map((name) => <option value={name}>{name}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="area">Select Area</label>
                    <select name="area" id="area" onChange={(e) => updateSalary(selectedCountry, e.target.value)}>
                        {areaOptions.map((country) => <option value={country.area}>{country.area}</option>)}
                    </select>
                </div>
                <div id="salary-estimate">Estimated Teacher Salary ${salary}</div>
            </div>
        </div>
    );
}

export default App;
