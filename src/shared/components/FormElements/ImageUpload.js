import {useRef, useState, useEffect} from "react";
import "./ImageUpload.css";
import Button from "./Button";


const ImageUpload = props => {
    const filePickerRef = useRef();
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if(!file){
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        } //executed when fileReader is done reading file
        fileReader.readAsDataURL(file); //converts file to url
    },[file]);

    const pickedHandler = event => {
        let pickedFile;
        let fileIsValid = false;
        if(event.target.files && event.target.files.length === 1){
            pickedFile = event.target.files[0];
            fileIsValid = true;
            setFile(pickedFile);
            setIsValid(true);
        }
        else {
            fileIsValid = false;
            setIsValid(false);
        }
        props.onInput(props.id, pickedFile, fileIsValid);
    }
    const pickImageHandler = event => {
        filePickerRef.current.click();
    }

    return (
        <div className="form-control">
            <input id={props.id}
                   style={{display: 'none'}}  //hide file picker
                   type="file"
                   accept=".jpg,.png,.jpeg"
                   ref={filePickerRef}
                   onChange={pickedHandler}/>
            <div className={`image-upload ${props.center && 'center'}`}>
                <div className="image-upload__preview">
                    {previewUrl && <img src={previewUrl} alt="Preview"/>}
                    {!previewUrl && <p>Please pick an image.</p>}
                </div>
                <Button type="button" onClick={pickImageHandler} >PICK IMAGE</Button>
            </div>
            {!isValid && <p>{props.errorText}</p>}
        </div>
    )
}

export default ImageUpload;