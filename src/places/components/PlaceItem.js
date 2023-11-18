import './PlaceItem.css';
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import {useState} from "react";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import {useContext} from "react";
import AuthContext from "../../shared/context/auth-context";

function PlaceItem(props){
    const [showMap, setShowMap] = useState(false);
    const openMapHandler = () => setShowMap(true);
    const closeMapHandler = () => setShowMap(false);

    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true);
    }

    const cancelDeleteHandler = () => {
        setShowConfirmModal(false);
    }

    const confirmDeleteHandler = () => {
        setShowConfirmModal(false);
        console.log("DELETING..."); //todo backend
    }

    const auth = useContext(AuthContext);


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
                <h2>Update API key!</h2>
                {/*<Map center={props.coordinates} zoom={16}/>*/}
            </div>
        </Modal>
        <Modal
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
            <>
                <Button danger onClick={confirmDeleteHandler}>Delete</Button>
                <Button inverse onClick={cancelDeleteHandler}>Cancel</Button>
            </>
        }
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}

        >
            <h2>Deletion is permanent!</h2>
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
                    {auth.isLoggedIn && <Button to={`/places/${props.id}`}>Edit</Button>}
                    {auth.isLoggedIn && <Button danger onClick={showDeleteWarningHandler}>Delete</Button>}
                </div>
            </Card>
        </li>
        </>
    )
}

export default PlaceItem;