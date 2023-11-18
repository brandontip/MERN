import './PlaceList.css';
import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";
import Button from "../../shared/components/FormElements/Button";

function PlaceList(props){
    if(props.items.length === 0){
        return (
            <Card className="place-list center">
                <h2>No places found. Maybe create one?</h2>
                <Button to='place/new'>Create Place</Button>
            </Card>
        )
    }
    return (
        <ul className="place-list">
            {props.items.map(place => <PlaceItem key={place.id} id={place.id} image={place.url}
            description={place.description} coordinates={place.coordinates} creatorId={place.creatorId}></PlaceItem>)}
        </ul>
    )
}

export default PlaceList;