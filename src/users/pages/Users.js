import UserList from "../components/UserList";
import {useEffect, useState} from "react";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import {useHttpClient} from "../../shared/hooks/http-hook";

function Users(){

    const [loadedUsers, setLoadedUsers] = useState();
    const {isLoading, error, sendRequest, clearError} = useHttpClient();

    // useEffect does not want a function that returns a promise
    // hence we use an async function inside useEffect
    useEffect(() => {
        const fetchUsers = async () => {
            try{
                const responseData = await sendRequest('http://localhost:5000/api/users');
                setLoadedUsers(responseData.users);
            }
            catch (err){
                console.log(err);
            }
        };
        fetchUsers();
    },[sendRequest]);

    return (
        <>
            <ErrorModal error={error} onClear={clearError}/>
            {isLoading && <div className="center"><LoadingSpinner/></div>}
            {!isLoading && loadedUsers && <UserList items={loadedUsers} />}
        </>
    )
}

export default Users;