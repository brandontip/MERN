
import "./Map.css"
// import {useRef, useEffect} from "react";
import { GoogleMap,  useLoadScript } from "@react-google-maps/api";

function Map(props){
    // let map;
    // const mapRef = useRef();
    const {center, zoom} = props;
    const { isLoaded } = useLoadScript({
        id: "google-map-script",
        googleMapsApiKey: "YOUR KEY HERE",
    });



    return <div className="App">
        {!isLoaded ? (
            <h1>Loading...</h1>
        ) : (
            <GoogleMap
                mapContainerClassName="map-container"
                center={center}
                zoom={zoom}
            />
        )}
    </div>
    // return <div ref={mapRef} className={`map ${props.className}`} style={props.style}>{props.children}</div>
}

export default Map;