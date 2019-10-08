import React from 'react'
import {shallow} from 'enzyme';
import Chart from 'components/Chart'

describe('Chart component', () => {
  describe('groupByMedium', () => {
    it('group a JSON result by medium', () => {
      const chart = shallow(<Chart />);
      const instance = chart.instance();
      const result = {
        "aggregations": {
          "first_agg": {
            "buckets": [
              {
                "sub_agg": {
                  "buckets": [
                    {
                      "key": "Online",
                      "doc_count": 921
                    },
                    {
                      "key": "TV",
                      "doc_count": 721
                    }
                  ]
                },
                "doc_count": 1642,
                "key_as_string": "2019-08-04T00:00"
              },
              {
                "sub_agg": {
                  "buckets": [
                    {
                      "key": "Online",
                      "doc_count": 342
                    },
                    {
                      "key": "TV",
                      "doc_count": 721
                    }
                  ]
                },
                "doc_count": 1063,
                "key_as_string": "2019-08-05T00:00"
              }
            ]
          }
        }
      };

      const expectedResult = {
        "Online": [["2019-08-04T00:00", 921], ["2019-08-05T00:00", 342]],
        "TV": [["2019-08-04T00:00", 721], ["2019-08-05T00:00", 721]]
      };

      expect(instance.groupByMedium(result)).toEqual(expectedResult);
    })
  })

  describe('buildChartData', () => {
    it('parses the groupByMedium data into chart.js params', () => {
      const chart = shallow(<Chart />);
      const instance = chart.instance();

      const groupedByMedium = {
        "Online": [["2019-08-04T00:00", 921], ["2019-08-05T00:00", 342]],
        "TV": [["2019-08-04T00:00", 721], ["2019-08-05T00:00", 721]]
      }

      const expectedResult = [
        {
          "data": [["2019-08-04T00:00", 921], ["2019-08-05T00:00", 342]],
          "name": "Online"
        },
        {
          "data": [["2019-08-04T00:00", 721], ["2019-08-05T00:00", 721]],
          "name": "TV"
        }
      ]

      expect(instance.buildChartData(groupedByMedium)).toEqual(expectedResult);
    })
  })

  describe('resultsPath', () => {
    it('returns the HTTP path with querystring and unixdate args', () => {
      const chart = shallow(<Chart />);
      const instance = chart.instance();

      instance.setState(
        {
          query: "Scott",
          before: "2019-08-01",
          after: "2019-08-31",
          interval: "1d",
        }
      );

      const expected = "/results?query=Scott&before=1564617600000&after=1567209600000&interval=1d";
      expect(instance.resultsPath()).toEqual(expected);
    })
  })
})
