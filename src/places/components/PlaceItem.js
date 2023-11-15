import './PlaceItem.css';
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import {useState} from "react";
import Modal from "../../shared/components/UIElements/Modal";

function PlaceItem(props){
    const [showMap, setShowMap] = useState(false);
    const openMapHandler = () => setShowMap(true);
    const closeMapHandler = () => setShowMap(false);

    return (
        <>
        <Modal
            show={showMap}
            onCancel={closeMapHandler}
            header={props.address}
            contentClass = "place-item__modal-content"
            footerClass = "place-item__modal-actions"
            footer={<Button onClick={closeMapHandler}>Close</Button>}
        >
            <div className="map-container">
                <h2>THE MAP</h2>
            </div>
        </Modal>
        <li className="place-item">
            <Card className="place-item__content">
                <div className="place-item__image">
                    <img src={props.image} alt={props.description}/>
                </div>
                <div className="place-item__info">
                    <h2>{props.description}</h2>
                    <h3>{props.coordinates.latitude}</h3>
                    <p>{props.creatorId}</p>
                </div>
                <div className="place-item__actions">
                    <Button inverse onClick={openMapHandler}>View on Map</Button>
                    <Button to={`/places/${props.id}`}>Edit</Button>
                    <Button danger>Delete</Button>
                </div>
            </Card>
        </li>
        </>
    )
}

export default PlaceItem;