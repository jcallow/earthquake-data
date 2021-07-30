import React from 'react';
import './EarthViewBox.module.scss';

import ReactGlobe, {EasingFunction, Globe} from 'react-globe';
import {Marker} from "react-globe"
import {
    EarthQuakeData, EarthQuakesData
} from "../../../service/EarthQuakeDataService";

const options = {
    ambientLightColor: 'red',
    cameraRotateSpeed: 0.5,
    focusAnimationDuration: 2000,
    focusEasingFunction: ['Linear', 'None'] as EasingFunction,
    pointLightColor: 'gold',
    pointLightIntensity: 1.5,
    markerRadiusScaleRange: [0.1, 1] as [number, number],
    globeGlowColor: 'blue',
    markerTooltipRenderer: ((marker: EarthQuakeMarker) => `${marker.data.properties.title}`) as (marker: Marker) => string,
    markerType: 'bar' as const
};

interface EarthQuakeMarker extends Marker {
    data: EarthQuakeData
}

interface EarthViewProps {
    data?: EarthQuakesData;
}

const focusOptions = {
    focusAnimationDuration: 3000,
    focusDistanceRadiusScale: 2,
    focusEasingFunction: ['Elastic', 'In'],
    enableDefocus: false,
};

export class EarthViewBox extends React.Component<EarthViewProps> {

    private globe: Globe | undefined = undefined;

    shouldComponentUpdate = (nextProps:EarthViewProps) => {
        const markers = new Array<EarthQuakeMarker>();

        if (nextProps.data === undefined) {
            return false;
        }

        for (let i = 0; i < nextProps.data.data.length ; i++) {
            let earthData = nextProps.data.data[i];

            let marker: EarthQuakeMarker = {
                data: earthData,
                id: earthData.id,
                coordinates: [earthData.geometry.coordinates[0], earthData.geometry.coordinates[1]],
                value: earthData.properties.mag
            }

            markers.push(marker);
        }

        this.globe?.updateMarkers(markers);

        if (this.props.data === undefined) {
            // @ts-ignore
            this.globe?.updateFocus(nextProps.data.newest.geometry.coordinates.slice(0,2) as [number, number], focusOptions, true);
        } else if (nextProps.data.newest.properties.time > this.props.data.newest.properties.time) {
            // @ts-ignore
            this.globe?.updateFocus(nextProps.data.newest.geometry.coordinates.slice(0,2) as [number, number], focusOptions, true);
        }

        return false;
    }

    setGlobe = (value: Globe) => this.globe = value;

    render() {
        return (
            <ReactGlobe
                options={options}
                onGetGlobe={this.setGlobe}

            />
        )
    }
}