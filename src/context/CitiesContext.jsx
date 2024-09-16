import { createContext, useContext, useEffect,useState } from "react";


const BASE_URL ="http://localhost:8000"

const CitiesContext = createContext();

function CitiesProvider({children}) {


    const [cities,setCities] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const [currentCity,setCurrentCity] = useState({});

    useEffect(function() {
        async function fetchCities(){
        try{
            setIsLoading(true);
            const res = await fetch(`${BASE_URL}/cities`);
            const data = await res.json();
            setCities(data);
        }catch{
            throw new Error("There was an error loading data...");
        } finally {
            setIsLoading(false)
        }
        
        }
        fetchCities()
    },[]);

    async function getCity(id){
            try{
                setIsLoading(true);
                const res = await fetch(`${BASE_URL}/cities/${id}`);
                const data = await res.json();
                setCurrentCity(data);
            }catch{
                throw new Error("There was an error loading data...");
            } finally {
                setIsLoading(false)
            }
    }


    async function createCity(newCity){
        try{
            setIsLoading(true);
            const res = await fetch(`${BASE_URL}/cities`, {
                method: 'POST',
                body: JSON.stringify(newCity),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();
            setCities(cities => [...cities, data]);
            
        }catch{
            throw new Error("There was an error craeting the city...");
        } finally {
            setIsLoading(false)
        }
}


async function deleteCity(id){
    try{
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities/${id}`, {
            method: 'DELETE',
           
        });
       
        setCities(cities => cities.filter(c => c.id !== id));
        
    }catch{
        throw new Error("There was an error deleting city...");
    } finally {
        setIsLoading(false)
    }
}





    return <CitiesContext.Provider value={{cities,isLoading,currentCity,getCity,createCity,deleteCity}}>{children}</CitiesContext.Provider>
}


function useCities(){

    const context = useContext(CitiesContext);
    if(context === undefined) { throw new Error("Calling context outside the citiesProvider");}
    return context;

}

export { CitiesProvider, useCities };

