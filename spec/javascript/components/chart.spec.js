import React from 'react'
import {shallow} from 'enzyme';
import Chart from 'components/Chart'

describe('Chart component', () => {
  describe('data', () => {
    it('returns the parsed data', () => {
      const chart = shallow(<Chart />);
      const instance = chart.instance();

      expect(instance.data()).toEqual(
        [
          {
            "data": [
              ["time_stamp_1", 10],
              ["time_stamp_2", 12],
              ["time_stamp_3", 15]
            ],
            "name": "TV"
          },
          {
            "data": [
              ["time_stamp_1", 2],
              ["time_stamp_2", 4],
              ["time_stamp_3", 12]
            ],
            "name": "Radio"
          },
          {
            "data": [
              ["time_stamp_1", 20],
              ["time_stamp_2", 23],
              ["time_stamp_3", 29]
            ],
            "name": "Online"
          }
        ]
      );
    })
  })
})
