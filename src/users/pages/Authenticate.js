import React from "react";
import useForm from "../../shared/hooks/form-hook";
import Input from "../../shared/components/FormElements/Input";
import {VALIDATOR_MINLENGTH, VALIDATOR_EMAIL} from "../../shared/util/validators";
import Button from "../../shared/components/FormElements/Button";
import "./Auth.css";
import Card from "../../shared/components/UIElements/Card";
import {useState} from "react";
import AuthContext from "../../shared/context/auth-context";
import {useContext} from "react";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import {useHttpClient} from "../../shared/hooks/http-hook";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

const Authenticate = () => {

    const auth = useContext(AuthContext);
    const [formState, inputChangeHandler, setFormData] =  useForm({email: {value: '', isValid: false}, password: {value: '', isValid: false}, }, false);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();

    const loginHandler = async event => {
        event.preventDefault();

        console.log(formState.inputs);

        let responseData;
        try{
            if(isLoginMode){
                responseData = await sendRequest('http://localhost:5000/api/users/login', 'POST', JSON.stringify({
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value
                }), {'Content-Type': 'application/json'});
            }
            else{
                const formData = new FormData();
                formData.append('email', formState.inputs.email.value);
                formData.append('name', formState.inputs.name.value);
                formData.append('password', formState.inputs.password.value);
                formData.append('image', formState.inputs.image.value);
                responseData= await sendRequest('http://localhost:5000/api/users/signup',
                    'POST',
                    formData);
            }

            auth.login(responseData.user.id);
        }
        catch (err){
            console.log(err);
        }
    };
    const switchModeHandler = event => {
        event.preventDefault();
        if(!isLoginMode){
            setFormData({
                ...formState.inputs,
                name: undefined,
                image: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid)
        }
        else{
            setFormData({
                ...formState.inputs,
                name: {value: '', isValid: false},
                image: {value: null, isValid: false}
            }, false)
        }
        setIsLoginMode(prevMode => !prevMode);
    };

    return (
        <>
            <ErrorModal error={error} onClear={clearError}/>
            <Card className="authentication">
            {isLoading && <LoadingSpinner asOverlay/>}
            <h2>Login Required</h2>
            <hr/>
                <form className="place-form" onSubmit={loginHandler} >
                    {!isLoginMode &&
                        <Input
                            id={"name"}
                            element="input"
                            type="text"
                            label="Name"
                            validators={[VALIDATOR_MINLENGTH(3)]}
                            errorText="Please enter a valid name."
                            onInput={inputChangeHandler}
                        />}
                    {!isLoginMode && <ImageUpload center id="image" onInput={inputChangeHandler} errorText="Please provide an image" />}
                    <Input
                        id={"email"}
                        element="input"
                        type="email"
                        label="Email"
                        validators={[VALIDATOR_EMAIL()]}
                        errorText="Please enter a valid email."
                        onInput={inputChangeHandler}
                    />
                    <Input
                        id={"password"}
                        element="input"
                        type="password"
                        label="Password"
                        validators={[VALIDATOR_MINLENGTH(6)]}
                        errorText="Please enter a valid password (>= 6 characters)."
                        onInput={inputChangeHandler}
                    />
                    <Button type="submit" disabled={!formState.isValid}>
                        {isLoginMode ? 'LOGIN' : 'SIGNUP'}
                    </Button>
                    <Button inverse onClick={switchModeHandler}>
                       Switch to {!isLoginMode ? 'LOGIN' : 'SIGNUP'}
                    </Button>
                </form>
            </Card>
        </>
    );
};

export default Authenticate;