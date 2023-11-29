import PlaceList from "../components/PlaceList";
import {useHistory, useParams} from 'react-router-dom';
import {useHttpClient} from "../../shared/hooks/http-hook";
import {useEffect, useState} from "react";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

function UserPlaces(props) {
  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState();
  const userId = useParams().userId; // read from url
  const history = useHistory();

  useEffect(() => {
    const fetchPlaces = async () => {
      try{
        const responseData = await sendRequest(`http://localhost:5000/api/places/user/${userId}`);
        setLoadedPlaces(responseData.places);
      }
      catch (err){
        console.log(err);
        //history.push('/');
      }
    };
    fetchPlaces();
  }, [sendRequest, userId]);

  const placeDeletedHandler = (deletedPlaceId) => {
    setLoadedPlaces(prevPlaces => prevPlaces.filter(place => place.id !== deletedPlaceId));
  }

  return <>
    <ErrorModal error={error} onClear={clearError}/>
    {isLoading && <div className="center"><LoadingSpinner/></div>}
    {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler} />}
  </>;
}

export default UserPlaces;