import {EarthQuakesData} from "../../../service/EarthQuakeDataService";


interface TopQuakesFeedProps {
    data?: EarthQuakesData
}

const TopQuakesFeed = (props: TopQuakesFeedProps) => {

    return <div style={{overflowY: "auto", height: "100%", width: "100%"}} >
        <table>
            <caption><b>Recent Top 5</b></caption>
            <thead>
                <tr>
                    <th>Location</th>
                    <th>Magnitude</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>
            {props.data?.topFive.map((x, index) => {
                return <tr key={index}>
                    <td>{x.properties.place}</td>
                    <td>{x.properties.mag}</td>
                    <td>{(new Date(x.properties.time)).toLocaleTimeString()}</td>
                </tr>
            })}
            </tbody>
        </table>

    </div>
}

export default TopQuakesFeed;