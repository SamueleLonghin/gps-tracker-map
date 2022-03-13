import React from "react";
import {Marker, Popup} from "react-leaflet";

function DetailUtente({name, tel, last_position}) {
    return last_position ? (<Marker position={last_position}>
            <Popup>
                {name} <br/>
                <a href={'tel:+39' + tel}>{tel}</a> <br/>
                <a href={'https://wa.me/39' + tel} target={'_blank'} rel="noreferrer">Messaggia a {name}</a> <br/>
            </Popup>
        </Marker>
    ) : '';
}

export {DetailUtente}