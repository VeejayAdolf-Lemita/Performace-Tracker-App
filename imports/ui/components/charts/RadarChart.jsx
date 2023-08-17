import React, { PureComponent } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

class RadarCharts extends PureComponent {
  render() {
    if (!this.props.data) {
      return null;
    }
    return (
      <ResponsiveContainer width='100%' height={400}>
        <RadarChart cx='50%' cy='50%' outerRadius='80%' data={this.props.data}>
          <PolarGrid />
          <PolarAngleAxis dataKey='subject' />
          <PolarRadiusAxis angle={30} domain={[0, 5]} />
          <Radar name='Result' dataKey='result' stroke='#8884d8' fill='#8884d8' fillOpacity={0.6} />
          <Radar
            name='Comparison'
            dataKey='comparison'
            stroke='#82ca9d'
            fill='#82ca9d'
            fillOpacity={0.6}
          />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    );
  }
}

export default RadarCharts;
