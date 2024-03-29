import './PlaceItem.css';
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
//import Map from "../../shared/components/UIElements/Map";
import React, { useState, useContext } from 'react';
import AuthContext from "../../shared/context/auth-context";
import {useHttpClient} from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import {useHistory} from "react-router-dom";

const PlaceItem : React.FC<{ id: string, description: string, address: string, image: string, title: string, creatorId: string, onDelete: (text: string) => void}> = (props) =>{
    const [showMap, setShowMap] = useState(false);
    const openMapHandler = () => setShowMap(true);
    const closeMapHandler = () => setShowMap(false);

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();

    const auth = useContext(AuthContext);
    const history = useHistory();

    //for some reason, the handlers below were causing the entire app to rerender
    // needed to add event.preventDefault() to prevent this
    const showDeleteWarningHandler = (event :  React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setShowConfirmModal(true);
    }

    const cancelDeleteHandler = (event :  React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setShowConfirmModal(false);
    }

    const confirmDeleteHandler = async (event :  React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setShowConfirmModal(false);
        try {
            await sendRequest(`http://localhost:5000/api/places/${props.id}`, 'DELETE', null, {Authorization: 'Bearer ' + auth.token});
            console.log("got here");
            console.log(props.id);
            props.onDelete(props.id);
            history.push('/'); //redirect to home page
        }
        catch (err){
            console.log(err);
        }
    }

    return (
        <>
        <ErrorModal error={error} onClear={clearError}/>
            {isLoading && <LoadingSpinner asOverlay/>}
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
            <React.Fragment>
                <Button inverse onClick={cancelDeleteHandler}>
                    CANCEL
                </Button>
                <Button danger onClick={confirmDeleteHandler}>
                    DELETE
                </Button>
            </React.Fragment>
        }
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        >
            <h2>Deletion is permanent!</h2>
        </Modal>
        <li className="place-item">
            <Card className="place-item__content">
                <div className="place-item__image">
                    <img src={`http://localhost:5000/${props.image}`} alt={props.description}/>
                </div>
                <div className="place-item__info">
                    <h2>{props.title}</h2>
                    <h2>{props.description}</h2>
                </div>
                <div className="place-item__actions">
                    <Button inverse onClick={openMapHandler}>View on Map</Button>
                    {auth.userId===props.creatorId && <Button to={`/places/${props.id}`}>Edit</Button>}
                    {auth.userId===props.creatorId && <Button danger onClick={showDeleteWarningHandler}>Delete</Button>}
                </div>
            </Card>
        </li>
        </>
    )
}

export default PlaceItem;