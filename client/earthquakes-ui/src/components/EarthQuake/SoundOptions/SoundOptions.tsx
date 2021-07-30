import {EarthQuakesData} from "../../../service/EarthQuakeDataService";
import React from "react";

interface SoundOptionsProps {
    data?: EarthQuakesData;
}

interface SoundOptionsState {
    gong: boolean,
    initialized: boolean
}

export class SoundOptions extends React.Component<SoundOptionsProps, SoundOptionsState> {
    private gong: HTMLAudioElement = new Audio('static/gong.mp3');

    constructor(props: Readonly<SoundOptionsProps> | SoundOptionsProps) {
        super(props);
        this.state = {
            gong: false,
            initialized: false
        }
    }

    playGong = () => {
        this.gong.src = 'static/gong.mp3';
        const promise = this.gong.play();
        if (promise !== undefined) {
            promise.then(() => {}).catch(error => console.error);
        }
    }

    toggleGong = () => {
        let newState = {
            gong: !this.state.gong,
            initialized: true
        }
        if (newState.gong && !this.state.initialized) {
            this.gong.play();
            this.gong.pause();
            this.gong.currentTime = 0;
        }

        this.setState(newState);
    }

    shouldComponentUpdate(nextProps: Readonly<SoundOptionsProps>, nextState: Readonly<SoundOptionsState>, nextContext: any): boolean {
        if (this.props.data !== undefined && nextProps.data !== undefined
            && nextProps.data.newest.properties.time > this.props.data.newest.properties.time) {

            if (nextState.gong) {
                this.playGong();
            }
        }

        return this.state.gong !== nextState.gong;
    }

    render = () => {
        return <div style={{margin: "0", position: "relative", top: "50%", left: "50%", msTransform: "translate(-50%, -50%)", transform: "translate(-50%, -50%)"}}>
            <button style={{height: "15vh", width: "15vw" }} onClick={this.toggleGong}>{this.state.gong ? "Disable" : "Enable"} GONG</button>
        </div>
    }
}

