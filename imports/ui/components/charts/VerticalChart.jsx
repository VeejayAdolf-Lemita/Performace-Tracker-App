import React, { PureComponent } from 'react';
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'Page A',
    uv: 590,
    pv: 800,
  },
  {
    name: 'Page B',
    uv: 868,
    pv: 967,
  },
  {
    name: 'Page C',
    uv: 1397,
    pv: 1098,
  },
];

export default class VerticalChart extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width='100%' height={400}>
        <ComposedChart
          layout='vertical'
          width={500}
          height={400}
          data={this.props.data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke='#f5f5f5' />
          <XAxis type='number' />
          <YAxis dataKey='name' type='category' scale='band' />
          <Tooltip />
          <Bar dataKey='result' barSize={20} fill='#C5EBC3' />
          <Bar dataKey='comparison' barSize={20} fill='#95B194' />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}
