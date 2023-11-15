import UserList from "../components/UserList";


function Users(){
    const USERS = [{id: 'u1', name: 'Max Schwarz', image: 'https://picsum.photos/200', places: 3},{id: 'u2', name: 'Max warz', image: 'https://picsum.photos/200', places: 5}];

    return (
        <div>
            <UserList items={USERS} />
        </div>
    )
}

export default Users;