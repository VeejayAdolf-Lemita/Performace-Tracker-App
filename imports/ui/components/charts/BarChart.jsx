import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default class Barchart extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ResponsiveContainer width='100%' height={300}>
        <BarChart
          data={this.props.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='5 5' />
          <XAxis dataKey='name' fontSize={16} tickMargin={18} />
          <YAxis />
          <Tooltip />
          <Bar dataKey='rating' fill='#8884d8' barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
