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
import ImageUpload from "../../shared/components/FormElements/ImageUpload";


const NewPlace = () => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const auth = useContext(AuthContext);
    const history = useHistory();
    const placeSubmitHandler = async  event => {
        event.preventDefault();
        try{
           console.log(auth.userId);
           const formData = new FormData();
            formData.append('title', formState.inputs.title.value);
            formData.append('description', formState.inputs.description.value);
            formData.append('address', formState.inputs.address.value);
            formData.append('creator', auth.userId);
            formData.append('image', formState.inputs.image.value);
            // formData.append('coordinates', JSON.stringify({lat: 40.7484474, lng: -73.9871516}));
            await sendRequest('http://localhost:5000/api/places', 'POST', formData);
        }
        catch (err){
            console.log(err);
        }
        history.push('/'); //redirect to home page
    }

   const [formState, inputChangeHandler] =  useForm({
       title: {value: '', isValid: false},
       description: {value: '', isValid: false},
       address: {value: '', isValid: false},
       image: {value: null, isValid: false}},
       false);

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
        <ImageUpload id="image" onInput={inputChangeHandler} errorText="Please provide an image."/>
        <Button type="submit" disabled={!formState.isValid}>
            ADD PLACE
        </Button>
    </form>
      </>
    );
};

export default NewPlace;
