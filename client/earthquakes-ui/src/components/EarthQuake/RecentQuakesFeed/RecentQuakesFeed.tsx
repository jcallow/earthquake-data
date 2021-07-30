import React from 'react';
import './RecentQuakesFeed.module.scss';
import {EarthQuakesData} from "../../../service/EarthQuakeDataService";

const RecentQuakesFeed = (props: RecentQuakesFeedProps) => {

  if (props.data === undefined) {
    return <div>Loading</div>
  }
  return <div>
    <table>
      <caption><b>Newest</b></caption>
      <thead>
      <tr>
        <th>Location</th>
        <th>Magnitude</th>
        <th>Time</th>
      </tr>
      </thead>
      <tbody>
      {props.data.newestFive.map((x, index) => {
        return <tr key={index}>
          <td>{x.properties.place}</td>
          <td>{x.properties.mag}</td>
          <td>{(new Date(x.properties.time)).toLocaleTimeString()}</td>
        </tr>
      })}
      </tbody>
    </table>

  </div>
};

interface RecentQuakesFeedProps {
  data?: EarthQuakesData;
}

export default RecentQuakesFeed;
