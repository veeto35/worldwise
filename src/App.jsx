import * as React from "react";
import { BrowserRouter,Navigate,Route,Routes} from 'react-router-dom';
import Product from './pages/Product';
import Pricing from './pages/Pricing';
import HomePage from './pages/HomePage';
import PageNotFound from './pages/PageNotFound';
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountriesList from "./components/CountriesList";
import City from "./components/City";
import Form from "./components/Form";


const BASE_URL ="http://localhost:8000"

function App() {

  const [cities,setCities] = React.useState([])
  const [isLoading,setIsLoading] = React.useState(false)

  React.useEffect(function() {
    async function fetchCities(){
      try{
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      }catch{
        alert("There was an error loading data...")
      } finally {
        setIsLoading(false)
      }
      
    }
    fetchCities()
  },[]);


  return (
    
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="app" element={<AppLayout />}> 
          <Route index element={<Navigate replace to="cities" />} />
          <Route path="cities" element={<CityList cities={cities} isLoading={isLoading} />} />
          <Route path="cities/:id" element={<City />} />
          <Route path="countries" element={<CountriesList cities={cities} isLoading={isLoading}/>} />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
