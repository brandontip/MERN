import React from "react";
import { useParams } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from "../../shared/util/validators";
import "./PlaceForm.css";

const DUMMY_PLACES = [
    {
        id: "p1",
        title: "Empire State Building",
        description: "One of the most famous sky scrapers in the world!",
        imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/c/c7/Empire_State_Building_from_the_Top_of_the_Rock.jpg",
        address: "20 W 34th St, New York, NY 10001",
        location: {
        lat: 40.7484405,
        lng: -73.9878531,
        },
        creator: "u1",
    },
    {
        id: "p2",
        title: "Empire State Building",
        description: "One of the most famous sky scrapers in the world!",
        imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/c/c7/Empire_State_Building_from_the_Top_of_the_Rock.jpg",
        address: "20 W 34th St, New York, NY 10001",
        location: {
        lat: 40.7484405,
        lng: -73.9878531,
        },
        creator: "u2",
    },
    ];

function UpdatePlace() {
  const placeId = useParams().placeId;
  //comes from :placeId in App.js (in path)
  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);
  if(!identifiedPlace){
      return <h2>Could not find place!</h2>
  }
  return <form className={'place-form'}>
  <Input
      id="title"
      element="input"
      type="text"
      label="Title"
      validators={[VALIDATOR_REQUIRE()]}
      errorText="Please enter a valid title."
      onInput={()=>{}}
      initialValue={identifiedPlace.title}
      initialValid={true}
  />
    <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description."
        onInput={()=>{}}
        initialValue={identifiedPlace.description}
        initialValid={true}
    />
    <Button type="submit" disabled={true}>
        UPDATE PLACE
    </Button>
  </form>;
}

export default UpdatePlace;