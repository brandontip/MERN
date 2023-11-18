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

const Authenticate = () => {


    const auth = useContext(AuthContext);

    const loginHandler = event => {
        event.preventDefault();
        console.log(formState.inputs); // send this to the backend!
        auth.login();
    }

    const [formState, inputChangeHandler, setFormData] =  useForm({email: {value: '', isValid: false}, password: {value: '', isValid: false}, }, false);
    const [isLoginMode, setIsLoginMode] = useState(true);

    const switchModeHandler = () => {
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
        <Card className="authentication">
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
    );
};

export default Authenticate;