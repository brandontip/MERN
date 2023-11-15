import './UserList.css';
import UserItem from './UserItem';
import Card from '../../shared/components/UIElements/Card';

function UserList(props) {
    if (props.items.length === 0) {
        return <div className='center'>
            <h2>No users found.</h2>
        </div>
    }

    return (
        <ul className='users-list'>
            <Card>
            {props.items.map((user) => (
                <UserItem key={user.id} id = {user.id} image={user.image} name={user.name} placeCount={user.places} />
            ))}
            </Card>
        </ul>
    )
}

export default UserList;