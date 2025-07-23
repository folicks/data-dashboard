import React from 'react';
import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { scaleLinear, scaleBand } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';

function StateDistributionChart({ breweries, parentWidth = 600 }) {
  // Count breweries per state
  const stateCounts = breweries.reduce((acc, b) => {
    acc[b.state] = (acc[b.state] || 0) + 1;
    return acc;
  }, {});
  const data = Object.entries(stateCounts)
    .map(([state, count]) => ({ state, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10); // Top 10 states

  // Chart dimensions
  const width = parentWidth;
  const height = 300;
  const margin = { top: 20, right: 20, bottom: 50, left: 60 };

  // Scales
  const xScale = scaleBand({
    range: [margin.left, width - margin.right],
    domain: data.map(d => d.state),
    padding: 0.2,
  });
  const yScale = scaleLinear({
    range: [height - margin.bottom, margin.top],
    domain: [0, Math.max(...data.map(d => d.count))],
    nice: true,
  });

  return (
    <div className="state-chart" style={{ background: '#f5f5f5', borderRadius: 8, padding: 16 }}>
      <h3 style={{ textAlign: 'center' }}>Top 10 States by Brewery Count</h3>
      <svg width={width} height={height}>
        <Group>
          {data.map(d => {
            const barWidth = xScale.bandwidth();
            const barHeight = height - margin.bottom - yScale(d.count);
            const x = xScale(d.state);
            const y = yScale(d.count);
            return (
              <Bar
                key={d.state}
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill="rgba(0, 150, 136, 0.7)"
              />
            );
          })}
          <AxisLeft
            scale={yScale}
            left={margin.left}
            label="Number of Breweries"
            labelProps={{ fill: 'black', textAnchor: 'middle' }}
            stroke="black"
            tickStroke="black"
            tickLabelProps={() => ({ fill: 'black', textAnchor: 'end', dx: '-0.5em', dy: '0.3em' })}
          />
          <AxisBottom
            top={height - margin.bottom}
            scale={xScale}
            label="State"
            labelProps={{ fill: 'black', textAnchor: 'middle' }}
            stroke="black"
            tickStroke="black"
            tickLabelProps={() => ({ fill: 'black', textAnchor: 'middle', dy: '0.5em' })}
          />
        </Group>
      </svg>
    </div>
  );
}

export default StateDistributionChart;
