import Input from "../../shared/components/FormElements/Input";
import './NewPlace.css';
import {VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import "./PlaceForm.css";
import useForm from "../../shared/hooks/form-hook";


const NewPlace = () => {
    const placeSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs); // send this to the backend!
    }

   const [formState, inputChangeHandler] =  useForm({title: {value: '', isValid: false}, description: {value: '', isValid: false}, address: {value: '', isValid: false}}, false);

  return (
    <form className="place-form" onSubmit={placeSubmitHandler} >
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
    );
};

export default NewPlace;
