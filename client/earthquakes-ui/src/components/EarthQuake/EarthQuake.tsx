import React from "react";
import {EarthViewBox} from "./EarthViewBox/EarthViewBox";
import {earthQuakeDataService, EarthQuakesData} from "../../service/EarthQuakeDataService";
import RecentQuakesFeed from "./RecentQuakesFeed/RecentQuakesFeed";
import {SoundOptions} from "./SoundOptions/SoundOptions";
import TopQuakesFeed from "./TopQuakesFeed/TopQuakesFeed";

interface EarthQuakeState {
    data?: EarthQuakesData
}

export class EarthQuake extends React.Component<any, EarthQuakeState> {

    constructor(props: any) {
        super(props);
        this.state = {
            data: undefined
        };
    }

    render() {
        return  <div style={{width: "100vw", height: "100vh", display: "flex", flexDirection: "column"}}>
            <div style={{width: "100vw", maxHeight: "75%", flexBasis: "75%", flexShrink: 2, display: "flex", flexDirection: "row"}}>
                <div style={{flexBasis: "25%", height: "100%", flexShrink: 1}}>
                    <TopQuakesFeed data={this.state.data}/>
                </div>
                <div style={{flexBasis: "75%", height: "100%", flexShrink: 2}}>
                    <EarthViewBox  data={this.state.data}/>
                </div>
            </div>
            <div style={{width: "100vw", flexBasis: "25%", flexShrink: 1, display: "flex", flexDirection: "row"}}>
                <div style={{width: "25%", height: "100%", content: "center"}}>
                    <SoundOptions data={this.state.data}/>
                </div>
                <div style={{width: "75%", height: "100%"}}>
                    <RecentQuakesFeed data={this.state.data} />
                </div>


            </div>

        </div>
    }

    componentDidMount = () => {
        this.schedule();
    }

    schedule = () => {
        earthQuakeDataService.fetchQuakeData().then( (data) => {
            this.setState({
                data: data
            });

            setTimeout(this.schedule, 60*1000);
        });
    }

}