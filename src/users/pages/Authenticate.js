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
const Authenticate = () => {

    const auth = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [formState, inputChangeHandler, setFormData] =  useForm({email: {value: '', isValid: false}, password: {value: '', isValid: false}, }, false);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [error, setError] = useState();

    async function fetchLogin() {
        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value
                })

            });
            const responseData = await response.json();
            if (!response.ok) { //catches 400 and 500 errors
                throw new Error(responseData.message);
            }
            console.log(responseData);
            auth.login(responseData.userId);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
            setError(err.message || "Something went wrong, please try again.");
        }
    }

    async function fetchSignup() {
        try {
            const response = await fetch('http://localhost:5000/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formState.inputs.name.value,
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value
                })

            });
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message);
            }
            auth.login(responseData.userId);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
            setError(err.message || "Something went wrong, please try again.");
        }
    }

    const loginHandler = async event => {
        event.preventDefault();
        setIsLoading(true); // will update right away because of the async nature of the function
        if(isLoginMode){
            await fetchLogin();
        }
        else{
            await fetchSignup();
        }
        setIsLoading(false);
    };
    const switchModeHandler = event => {
        event.preventDefault();
        if(!isLoginMode){
            setFormData({
                ...formState.inputs,
                name: undefined
            }, formState.inputs.email.isValid && formState.inputs.password.isValid)
        }
        else{
            setFormData({
                ...formState.inputs,
                name: {value: '', isValid: false}
            }, false)
        }
        setIsLoginMode(prevMode => !prevMode);
    };

    return (
        <>
            <ErrorModal error={error} onClear={() => setError(null)}/>
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
                        type="text"
                        label="Password"
                        validators={[VALIDATOR_MINLENGTH(5)]}
                        errorText="Please enter a valid password (> 4 characters)."
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