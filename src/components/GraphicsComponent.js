import React from 'react';
import { Group } from '@vx/group';
import { BarGroup } from '@vx/shape';
import { AxisBottom } from '@vx/axis';
import { scaleBand, scaleLinear, scaleOrdinal } from '@vx/scale';
import { Paper, Box, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { withTooltip, TooltipWithBounds } from '@vx/tooltip';
import localPoint from '@vx/event/lib/localPoint';
import moment from 'moment';

const red = 'red';
const orange = 'orange';

const defaultMargin = { top: 40, right: 0, bottom: 40, left: 0 };

const formatDate = date => moment(date).format('dddd');

const getDate = d => d.dt_txt;

function GraphicsComponent({
  width,
  height,
  showTooltip,
  tooltipData,
  tooltipLeft,
  tooltipTop,
  tooltipOpen,
  hideTooltip
}) {
  const weatherDays = useSelector(state => state.WeatherReducers.weatherDays);
  const selectedDay = useSelector(state => state.WeatherReducers.selected);

  const aux = selectedDay ? [selectedDay] : weatherDays;

  const data = aux
    .reduce((a, b) => [...a, ...b.weather], [])
    .map(el => ({ ...el, tempMin: el.main.tempMin, tempMax: el.main.tempMax }));

  const keys = data.length
    ? Object.keys(data[0]).filter(d => {
        return d === 'tempMax' || d === 'tempMin';
      })
    : [];

  const dateScale = scaleBand({
    domain: data.map(getDate),
    padding: 0.2
  });

  const cityScale = scaleBand({
    domain: keys,
    padding: 0.1
  });

  const max = Math.max(...data.map(d => Math.max(...keys.map(key => Number(d.main[key])))));

  const tempScale = scaleLinear({
    domain: [0, max]
  });

  const colorScale = scaleOrdinal({
    domain: keys,
    range: [orange, red]
  });

  // bounds
  const xMax = width - defaultMargin.left - defaultMargin.right;
  const yMax = height - defaultMargin.top - defaultMargin.bottom;

  // update scale output dimensions
  dateScale.rangeRound([0, xMax]);
  cityScale.rangeRound([0, dateScale.bandwidth()]);
  tempScale.range([yMax, 0]);

  const handleMouseOverBar = (event, datum) => {
    const coords = localPoint(event.target.ownerSVGElement, event);
    showTooltip({
      tooltipLeft: coords.x,
      tooltipTop: coords.y,
      tooltipData: datum
    });
  };

  return width < 10 ? null : (
    <Box marginTop={2} component={Paper} elevation={3} square>
      <svg width="100%" height={height}>
        <Group>
          <BarGroup
            data={data}
            keys={keys}
            id="id"
            height={yMax}
            x0={getDate}
            x0Scale={dateScale}
            x1Scale={cityScale}
            yScale={tempScale}
            color={colorScale}
          >
            {barGroups => {
              return barGroups.map(barGroup => (
                <Group
                  key={`bar-group-${barGroup.index}-${barGroup.x0}`}
                  left={barGroup.x0}
                  onMouseEnter={e => handleMouseOverBar(e, barGroup)}
                  onMouseLeave={() => hideTooltip}
                >
                  {barGroup.bars.map(bar => (
                    <rect
                      key={`bar-group-bar-${barGroup.index}-${bar.index}-${bar.value}-${bar.key}`}
                      x={bar.x}
                      y={bar.y}
                      width={bar.width}
                      height={bar.height}
                      fill={bar.color}
                      rx={4}
                    />
                  ))}
                </Group>
              ));
            }}
          </BarGroup>
        </Group>
        <AxisBottom
          top={yMax + defaultMargin.top}
          tickFormat={formatDate}
          scale={dateScale}
          hideAxisLine={false}
          tickLabelProps={() => ({
            fill: '#000000',
            fontSize: 11,
            textAnchor: 'middle'
          })}
        />
      </svg>
      {tooltipOpen && (
        <TooltipWithBounds key={Math.random()} top={tooltipTop} left={tooltipLeft}>
          <div
            style={{
              padding: 10,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Typography component="label">
              Temp. Max:
              <strong
                style={{
                  color: tooltipData.bars.find(e => e.key === 'tempMax').color
                }}
              >
                {` ${tooltipData.bars.find(e => e.key === 'tempMax').value}`}
              </strong>
            </Typography>

            <Typography component="label">
              Temp. Min:
              <strong
                style={{
                  color: tooltipData.bars.find(e => e.key === 'tempMin').color
                }}
              >
                {` ${tooltipData.bars.find(e => e.key === 'tempMin').value}`}
              </strong>
            </Typography>
          </div>
        </TooltipWithBounds>
      )}
    </Box>
  );
}

export default withTooltip(GraphicsComponent);
