import React, {useCallback} from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';

import useStyles from './ChartFilter.styles';

function ChartFilters(props) {
  const [dataSources, setDataSources] = React.useState([]);
  const [campaign, setCampaign] = React.useState('');
  const classes = useStyles();

  const changeDataSources = useCallback((event) => {
    setDataSources(event.target.value);
    props.selectDataSources(event.target.value);
  }, [props]);

  const changeCampaign = useCallback((event) => {
    setCampaign(event.target.value);
    props.selectCampaign(event.target.value);
  }, [props]);

  return (
    <Paper className={classes.paper}>
      <Typography variant="h6">
        Filter dimensions values
      </Typography>
      <Box>
        <FormControl className={classes.formControl}>
          <InputLabel shrink id="datasource">Datasource</InputLabel>
          <Select
            labelId="datasource"
            multiple
            value={dataSources}
            onChange={changeDataSources}
            input={<Input />}
            renderValue={(selected) => {
              return (
                <div className={classes.chips}>
                  {selected.map((value) => (
                      <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )
            }}
            >
            {props.dataSources.map((source, index) => {
              return (
                <MenuItem key={index} value={source} >
                  {source}
                </MenuItem>
              )
            }
            )}
          </Select>
        </FormControl>
      </Box>

      <Box>
        <Typography variant="h6">
            Campaign
        </Typography>
        <FormControl className={classes.formControl}>
          <InputLabel shrink id="campaign">Campaign</InputLabel>
          <Select
            native
            labelId="campaign"
            value={campaign}
            onChange={changeCampaign}
          >
            <option value="" >All</option>
            {props.campaigns.map((campaign, index) => {
              return (<option  key={index} value={campaign} >{campaign}</option>)
            })}
          </Select>
        </FormControl>
      </Box>
    </Paper>
  );
}

export default ChartFilters;
