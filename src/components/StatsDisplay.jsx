
import React, { useState } from 'react';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleLinear, scaleBand } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { withParentSize } from '@visx/responsive';
import { Tooltip } from '@visx/tooltip';

function StatsDisplay({ breweries, filtered, parentWidth = 600 }) {
  const [tooltipData, setTooltipData] = useState(null);
  
  // Dimensions and margins
  const width = parentWidth;
  const height = 300;
  const margin = { top: 20, right: 20, bottom: 50, left: 60 };

  // Calculate statistics
  const total = breweries.length;
  const typeCounts = breweries.reduce((acc, b) => {
    acc[b.brewery_type] = (acc[b.brewery_type] || 0) + 1;
    return acc;
  }, {});
  const mostCommonType = Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
  const states = new Set(breweries.map(b => b.state));
  const numStates = states.size;

  // Prepare data for visualization
  const data = filtered.length > 0
    ? Object.entries(
        filtered.reduce((acc, b) => {
          acc[b.brewery_type] = (acc[b.brewery_type] || 0) + 1;
          return acc;
        }, {})
      ).map(([type, count]) => ({
        type,
        count,
        breweries: filtered.filter(b => b.brewery_type === type).map(b => b.name)
      }))
    : Object.entries(typeCounts).map(([type, count]) => ({
        type,
        count,
        breweries: breweries.filter(b => b.brewery_type === type).map(b => b.name)
      }));

  // Create scales
  const xScale = scaleBand({
    range: [margin.left, width - margin.right],
    domain: data.map(d => d.type),
    padding: 0.2,
  });

  const yScale = scaleLinear({
    range: [height - margin.bottom, margin.top],
    domain: [0, Math.max(...data.map(d => d.count))],
    nice: true,
  });

  return (
    <div className="stats-display">
      <div className="stats">
        <div>
          <h3>Total Breweries</h3>
          <p>{total}</p>
        </div>
        <div>
          <h3>Most Common Type</h3>
          <p>{mostCommonType}</p>
        </div>
        <div>
          <h3>Number of States</h3>
          <p>{numStates}</p>
        </div>
        <div>
          <h3>Currently Showing</h3>
          <p>{filtered.length}</p>
        </div>
      </div>
      <div style={{ height: '300px', width: '100%', marginTop: '2rem' }}>
        <svg width={width} height={height}>
          <Group>
            {data.map(d => {
              const barWidth = xScale.bandwidth();
              const barHeight = height - margin.bottom - yScale(d.count);
              const x = xScale(d.type);
              const y = yScale(d.count);

              return (
                <Bar
                  key={d.type}
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill="rgba(100, 108, 255, 0.7)"
                  onMouseEnter={(event) => {
                    setTooltipData({
                      type: d.type,
                      count: d.count,
                      breweries: d.breweries,
                      x: event.clientX,
                      y: event.clientY
                    });
                  }}
                  onMouseLeave={() => setTooltipData(null)}
                  style={{ cursor: 'pointer' }}
                />
              );
            })}
            <AxisLeft
              scale={yScale}
              left={margin.left}
              label="Number of Breweries"
              labelProps={{
                fill: 'white',
                textAnchor: 'middle'
              }}
              stroke="white"
              tickStroke="white"
              tickLabelProps={() => ({
                fill: 'white',
                textAnchor: 'end',
                dx: '-0.5em',
                dy: '0.3em'
              })}
            />
            <AxisBottom
              top={height - margin.bottom}
              scale={xScale}
              label="Brewery Type"
              labelProps={{
                fill: 'white',
                textAnchor: 'middle'
              }}
              stroke="white"
              tickStroke="white"
              tickLabelProps={() => ({
                fill: 'white',
                textAnchor: 'middle',
                dy: '0.5em'
              })}
            />
          </Group>
        </svg>
      </div>
      {tooltipData && (
        <Tooltip
          left={tooltipData.x}
          top={tooltipData.y}
          style={{
            position: 'fixed',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            color: 'white',
            padding: '8px',
            borderRadius: '4px',
            fontSize: '14px',
            pointerEvents: 'none',
            maxWidth: '300px',
            maxHeight: '200px',
            overflow: 'auto'
          }}
        >
          <div>
            <strong>Type:</strong> {tooltipData.type}<br />
            <strong>Count:</strong> {tooltipData.count}<br />
            <strong>Breweries:</strong><br />
            <ul style={{ margin: '4px 0', paddingLeft: '20px' }}>
              {tooltipData.breweries.slice(0, 5).map((name, i) => (
                <li key={i}>{name}</li>
              ))}
              {tooltipData.breweries.length > 5 && (
                <li>...and {tooltipData.breweries.length - 5} more</li>
              )}
            </ul>
          </div>
        </Tooltip>
      )}
    </div>
  );
}

export default withParentSize(StatsDisplay);
