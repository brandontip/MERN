import Input from "../../shared/components/FormElements/Input";
import './NewPlace.css';
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import "./PlaceForm.css";
import useForm from "../../shared/hooks/form-hook";
import {useHttpClient} from "../../shared/hooks/http-hook";
import {useContext} from "react";
import AuthContext from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import {useHistory} from "react-router-dom";


const NewPlace = () => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const auth = useContext(AuthContext);
    const history = useHistory();
    const placeSubmitHandler = async  event => {
        event.preventDefault();
        try{
           console.log(auth.userId);
            await sendRequest('http://localhost:5000/api/places', 'POST', JSON.stringify({
                title: formState.inputs.title.value,
                description: formState.inputs.description.value,
                address: formState.inputs.address.value,
                creator: auth.userId,
                //todo get coordinates from address
                coordinates: {
                    lat: 15,
                    lng: 16
                }
            }), {'Content-Type': 'application/json'});
           history.push('/'); //redirect to home page
        }
        catch (err){
            console.log(err);
        }
    }

   const [formState, inputChangeHandler] =  useForm({title: {value: '', isValid: false}, description: {value: '', isValid: false}, address: {value: '', isValid: false}}, false);

  return (
      <>
            <ErrorModal error={error} onClear={clearError}/>
    <form className="place-form" onSubmit={placeSubmitHandler} >
        {isLoading && <LoadingSpinner asOverlay/>}
      <Input
        id={"title"}
          element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputChangeHandler}
      />
        <Input
            id={"description"}
            element="input"
            type="text"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (> 4 characters)."
            onInput={inputChangeHandler}
        />
        <Input
            id={"address"}
            element="input"
            type="text"
            label="Address"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid address."
            onInput={inputChangeHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
            ADD PLACE
        </Button>
    </form>
      </>
    );
};

export default NewPlace;
