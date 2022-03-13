import React, {useEffect, useRef} from "react";
import {GeoJSON} from "react-leaflet";

const Tracciato = ({geojson, color}) => {

    // get a ref to the underlying L.geoJSON
    const geoJsonRef = useRef()

    // set the data to new data whenever it changes
    useEffect(() => {
        if (geoJsonRef.current) {
            geoJsonRef.current.clearLayers()   // remove old data
            geoJsonRef.current.addData(geojson) // might need to be geojson.features
        }
    }, [geoJsonRef, geojson])

    return geojson ? (
        <div>
            <GeoJSON
                ref={geoJsonRef}
                data={geojson}
                style={() => ({
                    color: color, weight: 5, fillColor: color, fillOpacity: 1,
                })}
            />
        </div>
    ) : ''
}

export {Tracciato}