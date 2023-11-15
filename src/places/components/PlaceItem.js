import './PlaceItem.css';
import Card from "../../shared/components/UIElements/Card";
function PlaceItem(props){
    return (
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
                    <button>View on Map</button>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </Card>
        </li>
    )
}

export default PlaceItem;