import { LineChart, ColumnChart } from 'react-chartkick'
import 'chart.js'

import React from "react"
import PropTypes from "prop-types"

class Chart extends React.Component {
  data () {
    return [
      {
        "name": "TV",
        "data": [["time_stamp_1", 10], ["time_stamp_2", 12], ["time_stamp_3", 15]]
      },
      {
        "name": "Radio",
        "data": [["time_stamp_1", 2], ["time_stamp_2", 4], ["time_stamp_3", 12]]
      },
      {
        "name": "Online",
        "data": [["time_stamp_1", 20], ["time_stamp_2", 23], ["time_stamp_3", 29]]
      }
    ]
  }

  render () {
    return (
      <React.Fragment>
        Chart: {this.props.data}
        <ColumnChart stacked={true} data={this.data()} />
      </React.Fragment>
    );
  }
}

Chart.propTypes = {
  data: PropTypes.string
};
export default Chart
