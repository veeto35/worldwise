

import { useEffect, useState } from "react";
import Button from "./Button"
import styles from "./Form.module.css";
import BackButton from "./BackButton";
import { Navigate, useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { useUrl } from "../hooks/useUrl";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import { useCities } from "../context/CitiesContext";


export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const $BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client"

function Form() {

  const [lat,lng] = useUrl();
  const { createCity, isLoading} = useCities();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji,setEmoji] = useState("");
  const [geoCodeError, setGeoCodeError] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false)
  const navigate = useNavigate()



  useEffect( function(){
    
    if(!lat && !lng) return;

    async function fetchCityData(){
      try {
        setIsLoadingGeoCoding(true);
        setGeoCodeError("")
        const res = await fetch(`${$BASE_URL}?latitude=${lat}&longitude=${lng}`)
        const data = await res.json();
        

        if(!data.countryCode) {
          throw new Error ("That doesnt seems to be a city! Click somewhere else")
        }


        setCityName(data.city || data.locality || "");
        setCountry(data.countryName)
        setEmoji(convertToEmoji(data.countryCode))
      } catch(err){
        setGeoCodeError(err.message)
      } finally{
        setIsLoadingGeoCoding(false)
      }
    }
    fetchCityData()
  },[lat,lng])


  async function handleSubmit(e){
    e.preventDefault();
    if(!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {lat,lng}
    };

    await createCity(newCity);
    navigate('/app/cities')
  }


  if(isLoadingGeoCoding) return <Spinner />

  if(!lat && !lng) return <Message message="Start by clicking somewhere on the map"/>
  
  if(geoCodeError) return <Message message={geoCodeError} />

  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ""}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
         <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        
        <DatePicker onChange={date => setDate(date) } selected={date} dateFormat='dd/MM/yyyy' id='date'/>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='primary'>Add</Button>
        <BackButton></BackButton>
      </div>
    </form>
  );
}

export default Form;
