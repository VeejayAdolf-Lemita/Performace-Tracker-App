import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';

class Piechart extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const { data } = this.props;
    if (!data.length) {
      return null;
    }
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ResponsiveContainer minWidth={220} minHeight={220} width='100%'>
          <PieChart onMouseEnter={this.onPieEnter}>
            <Pie data={data} cx={105} cy={105} innerRadius={97} outerRadius={110} dataKey='value'>
              {data.map((entry, index) => {
                if (entry.name === 'Productivity') {
                  return <Cell key={`cell-${index}`} fill='#00b8b0' />;
                }
                if (entry.name === 'Neutral') {
                  return <Cell key={`cell-${index}`} fill='#ccc' />;
                }
                if (entry.name === 'Non-Productive') {
                  return <Cell key={`cell-${index}`} fill='#f4404e' />;
                }
                return null;
              })}
              <Label
                value={`${data[0].value}%`}
                position='center'
                fontSize={30}
                fontWeight={700}
                fill='#000000'
                dy={-10}
              />
              <Label value={data[0].name} position='center' fontSize={14} fill='#000000' dy={20} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default Piechart;
