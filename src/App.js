import React, {useState, useEffect} from 'react'
import './App.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InfoBox from './InfoBox'
import Table from './Table'
import { Card } from '@material-ui/core';
import { sortData } from './util';
import Map from './Map'
// import "leaflet/dist/leaflet.css"

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");
  const [countryInfo, setCountryInfo] = useState();
  const [tableData, setTableData] = useState([])


  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
    .then(res => res.json())
    .then((data) => {
      setCountryInfo(data)
    })
  }, [])

  useEffect(() => {
   const getCountries = async () =>{
      await fetch('https://disease.sh/v3/covid-19/countries')
      .then(res => res.json())
      .then((data) => {
        const countries = data.map((country) => (
          {
            name: country.country,
            value: country.countryInfo.iso2,
          }
        ))
        const sortedData = sortData(data)
        setTableData(sortedData);
        setCountries(countries);
        
      })
   }
   getCountries()
  }, [])


  const onCountryChange = async (e) =>{
    const countryCode = e.target.value
    
    const url = countryCode === "Worldwide" ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    
    await fetch(url)
    .then(res => res.json())
    .then((data) => {
      setCountry(countryCode);


      setCountryInfo(data); 
    })
  }

  console.log(countryInfo)

  return (
    <div className="App">
      <div className="app-left">
        <div className="app-header">
          <h2>Covid 19 Tracker</h2>
          <Select id="demo-simple-select-filled" value={country} onChange={onCountryChange}>
            <MenuItem value="Worldwide">Worldwide</MenuItem>
            {
              countries.map((country) => {
                return <MenuItem value={country.value}>{country.name}</MenuItem>
              })
            }            
        </Select>
        </div>
        <div className="stats">
            <InfoBox title="Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
            <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
            <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
        </div>

        {/* <Map /> */}
      </div>
      <Card className="app-right">
          <Table countries={tableData}/>
      </Card>
    </div>
  );
}

export default App;
