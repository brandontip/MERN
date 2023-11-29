import Avatar from "../../shared/components/UIElements/Avatar";
import './UserItem.css';
import { Link } from 'react-router-dom';
import Card from "../../shared/components/UIElements/Card";


function UserItem (props) {
    function clickHandler(event){
        if(props.placeCount === 0){
            event.preventDefault();
        }
    }

    return (
        <li className="user-item">
            <Card className="user-item__content">
                <Link to={`/${props.id}/places`} onClick={clickHandler}>
                    <div className="user-item__image">
                        <Avatar image={`http://localhost:5000/${props.image}`} alt={props.name} />
                    </div>
                    <div className="user-item__info">
                        <h2>{props.name}</h2>
                        <h3>{props.placeCount} {props.placeCount === 1 ? 'Place' : 'Places'}</h3>
                    </div>
                </Link>
            </Card>
        </li>
    );
}

export default UserItem;