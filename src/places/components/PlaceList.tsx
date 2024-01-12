import './PlaceList.css';
import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";
import Button from "../../shared/components/FormElements/Button";
import React from 'react';

export type FIXMELATER = any;

const PlaceList : React.FC<{items: FIXMELATER[], onDeletePlace: (text: string) => void }>= (props) =>{
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
            {props.items.map(place => <PlaceItem title={place.title} key={place.id} id={place.id} image={place.image}
            description={place.description} address={place.location} creatorId={place.creator}
            onDelete={props.onDeletePlace}></PlaceItem>)}
        </ul>
    )
}

export default PlaceList;