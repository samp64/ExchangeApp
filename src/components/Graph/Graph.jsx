import React from "react";
import {
  LineChart, Line, YAxis, CartesianGrid, Tooltip, Legend,
} from "recharts";
import PropTypes from "prop-types";

import getGraphDomain from "../../utils/getGraphDomain";
import "./Graph.css";

const Graph = ({ data, dataKey, title }) => (
  <div className="graph">
    {title && <span className="graphTitle">{title}</span>}
    <LineChart
      width={800}
      height={400}
      data={data}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <YAxis domain={getGraphDomain(data, dataKey)} />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey={dataKey} stroke="#66fcf1" activeDot={{ r: 1 }} />
    </LineChart>
  </div>
);

Graph.propTypes = {
  data: PropTypes.array,
  dataKey: PropTypes.string,
  title: PropTypes.string,
};

Graph.defaultProps = {
  date: [],
  dataKey: "",
  title: ""
};

export default Graph;