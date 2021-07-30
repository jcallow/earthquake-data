

class EarthQuakeDataService {

    private static _instance: EarthQuakeDataService;

    private data: Array<EarthQuakeData> = [];
    private listeners: Array<EarthQuakeDataListener> = [];

    private constructor() {
    }

    public static get Instance() {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new EarthQuakeDataService();
        return this._instance;
    }

    public fetchQuakeData(): Promise<EarthQuakesData> {
        return fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson").then(res => res.json())
            .then((raw) => {

                let data: Array<EarthQuakeData> = raw.features;
                let topFive = data.sort((a,b) => b.properties.mag - a.properties.mag).slice(0,Math.min(data.length, 5));
                let top = topFive[0];
                let newest = data.reduce((a,b) => a.properties.time > b.properties.time ? a : b);
                let newestFive = data.sort((a,b) => b.properties.time - a.properties.time).slice(0,Math.min(data.length, 5));

                return {
                    data,
                    topFive,
                    top,
                    newest,
                    newestFive
                }
            });
    }

    private onDataUpdate() {
        this.listeners.forEach(listener => {
            listener.updateEarthQuakeData(this.data);
        })
    }

    public register(listener: EarthQuakeDataListener) {
        this.listeners.push(listener);
        listener.updateEarthQuakeData(this.data);
    }
}

export const earthQuakeDataService = EarthQuakeDataService.Instance;

export interface EarthQuakeDataListener {
    updateEarthQuakeData(data: Array<EarthQuakeData>): boolean;
}


// See https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
export interface EarthQuakesData {
    data: Array<EarthQuakeData>,
    topFive: Array<EarthQuakeData>,
    top: EarthQuakeData,
    newest: EarthQuakeData,
    newestFive: Array<EarthQuakeData>
}


export interface EarthQuakeData {
    properties: Properties,
    geometry: Geometry,
    id: string
}

interface Properties {
    mag: number,
    place: string,
    time: number,
    updated: number,
    tz: number,
    url: string,
    detail: string,
    felt: number,
    cdi: number,
    mmi: number,
    alert: string,
    status: string,
    tsunami: number,
    sig: number,
    net: string,
    code: string,
    ids: string,
    sources: string,
    types: string,
    nst: number,
    dmin: number,
    rms: number,
    gap: number,
    magType: string,
    type: string,
    title: string
}

interface Geometry {
    type: string,
    coordinates: [number, number, number]
}