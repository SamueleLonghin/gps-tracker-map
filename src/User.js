import { LayerGroup} from "react-leaflet";
import React from "react";
import {Tracciato} from './components/Tracciato';
import {DetailUtente} from "./components/DetailUtente";


const colours = ['tomato', 'salmon', 'plum', 'olive', 'lime', 'chocolate']
export default class User extends React.Component {
    timer;


    constructor(props) {
        super(props);
        this.state = {
            ...props.data, color: colours[Math.floor(Math.random() * colours.length)],
            active: true
        }
        this.fetchMappe = this.fetchMappe.bind(this);
    }

    componentDidMount() {
        this.fetchMappe();
        this.timer = setInterval(this.fetchMappe, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    fetchMappe() {
        if (this.state.active) {
            console.log("download rilevazione per", this.state.name)
            if (this.state.hasOwnProperty('sessions')) {
                let sessions = this.state.sessions;
                if (this.state.sessions.hasOwnProperty('active')) {
                    let active = sessions.active;
                    if (active.hasOwnProperty('id_rilevazione')) {
                        fetch("https://omg-gps-tracker.herokuapp.com" + "/geo-json?id=:p".replace(/:p/i, active.id_rilevazione)).then(data => {
                        // fetch(process.env.SERVER_URL + process.env.DATA_URL.replace(/:p/i, active.id_rilevazione)).then(data => {
                            data.json().then(result => {

                                this.setState({
                                    geojson: result,
                                })
                                console.log("scaricate rilevazione per", this.state.name,)

                            })
                        })
                    }
                }

            } else {
                console.log('Utente', this.state.name, 'Non ha sessioni attive')
            }
        }
    }

    render() {

        return <LayerGroup>
            <DetailUtente name={this.state.name} tel={this.state.tel} last_position={this.props.last_position}/>
            <DetailUtente name={this.state.name} tel={this.state.tel}
                          last_position={this.props.last_position?.reverse()}/>
            <Tracciato geojson={this.state.geojson} color={this.state.color}/>
        </LayerGroup>;

    }
}


