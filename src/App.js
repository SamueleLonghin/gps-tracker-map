import "./App.css";
import React, {useState} from "react";
import {MapContainer, Marker, Popup, TileLayer, useMapEvents} from "react-leaflet";
import User from "./User";


class App extends React.Component {
    provider;
    state;
    timerFetchUsers;

    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };

        this.fetchUsers = this.fetchUsers.bind(this);
    }

    fetchUsers() {
        console.log("starting download users list")
        fetch("https://omg-gps-tracker.herokuapp.com" + "/utenti-connessi?idGruppo=:p".replace(/:p/i, 'g1')).then((data) => {
        // fetch(process.env.SERVER_URL + process.env.USERS_URL.replace(/:p/i, 'g1')).then((data) => {
            data.json().then((result) => {
                this.setState({
                    'users': result
                })
                console.log("users downloaded", result)
            })
        })
    }

    componentDidMount() {
        this.fetchUsers();
        this.timerFetchUsers = setInterval(this.fetchUsers, 1000);
        // this.timerFetchUsers = setInterval(this.fetchUsers, process.env.USER_FETCH_INTERVAL);
    }

    componentWillUnmount() {
        clearInterval(this.timerFetchUsers);
    }

    render() {
        return (
            <MapContainer
                className="simpleMap"
                center={[45.65690142348821, 11.836277581751348]}
                zoom={10}
                scrollWheelZoom={true}
                whenCreated={map => map.locate()}
            >
                <TileLayer
                    noWrap={true}
                    url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
                    // url={process.env.TILE_URL}
                />

                {
                    this.state.users.map((user, id) => <User data={user} key={'user-' + id}
                                                             last_position={user.last_position}/>)
                }
                <LocationMarker/>
            </MapContainer>
        );
    }
}

export default App;


function LocationMarker() {
    const [position] = useState(null)
    const map = useMapEvents({
        click(e) {
            console.log(e)
            // map.locate()
        },
        locationfound(e) {
            // setPosition(e.latlng)
            map.setView(e.latlng, 10)
            // map.flyTo(e.latlng, 15)
        },
    })
    return position === null ? null : (
        <Marker position={position}>
            <Popup>You are here</Popup>
        </Marker>
    )
}