import { LineChart, ColumnChart } from 'react-chartkick'
import 'chart.js'

import React from "react"
import PropTypes from "prop-types"

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: '', before: '', after: '', interval: '', status: '', data: []};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.resultsPath = this.resultsPath.bind(this);
  }

  groupByMedium (response) {
    var groupedByMedium = {};

    response.aggregations.first_agg.buckets.forEach(function (agg_bucket) {
      var timestamp = agg_bucket.key_as_string;

      agg_bucket.sub_agg.buckets.forEach(function (sub_agg_bucket) {
        var doc_count = sub_agg_bucket.doc_count
        var medium = sub_agg_bucket.key

        if(groupedByMedium.hasOwnProperty(medium)){
          groupedByMedium[medium].push([timestamp, doc_count]);
        } else {
          groupedByMedium[medium] = [[timestamp, doc_count]];
        }
      });
    });

    return groupedByMedium;
  }

  buildChartData (parsedData) {
    var chartData = [];

    Object.entries(parsedData).forEach(function (entry) {
      chartData.push({ "name": entry[0], "data": entry[1] });
    });

    return chartData;
  }

  handleChange (evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  resultsPath () {
    const params = {
      "query": this.state.query,
      "before": Date.parse(this.state.before),
      "after": Date.parse(this.state.after),
      "interval": this.state.interval
    }

    const query_string =  Object.keys(params).map(key =>
      key + '=' + params[key]
    ).join('&');

    return '/results?' + query_string
  }

  handleSubmit (e) {
    e.preventDefault();

    this.setState({ status: 'FETCHING' });

    const self = this;

    fetch(self.resultsPath())
      .then(response => response.json())
      .then(json => self.groupByMedium(json))
      .then(groupedByMedium => self.buildChartData(groupedByMedium))
      .then(chartData => {
        self.setState({
          data: chartData,
          status: 'FETCHED'
        });
      }).catch(function () {
        self.setState({ status: 'FAILED' });
      });
  }

  renderForm () {
    return(
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          Query: <input type="text" name="query" placeholder="Scomo" onChange={this.handleChange} />
          After: <input type="date" min="2019-08-01" max="2019-08-31" name="after" onChange={this.handleChange} />
          Before: <input type="date" min="2019-08-01" max="2019-08-31" name="before" onChange={this.handleChange} />
          Interval: <input type="text" name="interval" placeholder="1d" onChange={this.handleChange} />
          <button>Search!!!</button>
        </form>
      </React.Fragment>
    )
  }

  render () {
    if (this.state.status === 'FAILED') {
      return(
        <React.Fragment>
          {this.renderForm()}
          <span className="error">Please review the arguments and try it again.</span>
        </React.Fragment>
      )
    } else if (this.state.status === 'FETCHING') {
      return(
        <React.Fragment>
          {this.renderForm()}
          Loading
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          {this.renderForm()}
          <ColumnChart stacked={true} data={this.state.data} />
        </React.Fragment>
      );
    }
  }
}

Chart.propTypes = {
  data: PropTypes.string
};
export default Chart
