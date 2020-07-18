import React from 'react';
import { connect } from 'react-redux';
import { Typography, CardHeader, Card } from '@material-ui/core';
import { getDayDateLikeATitle } from '../helper/utils';
import TableComponent from './table/TableComponent';
import RowTableWeatherComponent from './RowTableWeatherComponent';

function WeatherSelectedDayComponent({ selected }) {
  return (
    <Card>
      <CardHeader
        color="primary"
        title={<Typography variant="h5">{`The Weather, ${getDayDateLikeATitle(selected?.day)}`}</Typography>}
      />
      <TableComponent
        data={selected?.weather}
        render={(r, i) => <RowTableWeatherComponent key={i.toString()} row={r} index={i} />}
      />
    </Card>
  );
}

const mapStateToProps = state => ({
  selected: state.WeatherReducers.selected
});

export default connect(mapStateToProps)(WeatherSelectedDayComponent);
