import React, { useEffect, useReducer } from 'react';
import Papa from 'papaparse';
import Grid from '@material-ui/core/Grid';

import ChartFilters from './chart-filters/ChartFilters';
import LineChart from './charts/line/LineChart';

import { reducer, initialState } from './state/reducer';
import useStyles from './App.styles';

function App() {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);
  
  useEffect(() => {
    let parsed = {
      byCampaign: [],
      byDataSource: [],
      raw: []
    };
    let dataSourceNames = [];
    let campaignsNames = [];

    let start = 0;

    Papa.parse('data.csv', {
      header: true,
      download: true,
      step: function(row) {
        if(row.data.Campaign && row.data.Datasource && start < 1000) {
          parsed.byCampaign[row.data.Campaign] = parsed.byCampaign[row.data.Campaign]
          ? parsed.byCampaign[row.data.Campaign] = [ ...parsed.byCampaign[row.data.Campaign], row.data]
          : parsed.byCampaign[row.data.Campaign] = [ row.data ];
  
          parsed.byDataSource[row.data.Datasource] = parsed.byDataSource[row.data.Datasource]
            ? parsed.byDataSource[row.data.Datasource] = [ ...parsed.byDataSource[row.data.Datasource], row.data]
            : parsed.byDataSource[row.data.Datasource] = [ row.data ];

          parsed.raw.push(row.data);
          start++;
        }
      },
      complete: function() {
        Object.keys(parsed.byDataSource).forEach((key) => {
          dataSourceNames.push(key);
        });
        Object.keys(parsed.byCampaign).forEach((key) => {
          campaignsNames.push(key);
        });

        dispatch({type: 'setParsedCSV', payload: parsed});
        dispatch({type: 'setCampaigns', payload: campaignsNames});
        dispatch({type: 'setDataSources', payload: dataSourceNames});
      }
    });
  }, []);


  useEffect(() => {
    let filteredChartData = [];
    if(state.selectedDataSources.length && !state.selectedCampaign) {
      state.selectedDataSources.forEach((source) => {
        filteredChartData = [
          ...filteredChartData,
          ...state.parsedCSVData.byDataSource[source]
        ];
      });
    }

    if(state.selectedCampaign && !state.selectedDataSources.length) {
        filteredChartData = [
          ...filteredChartData,
          ...state.parsedCSVData.byCampaign[state.selectedCampaign]
        ];
    }

    if(state.selectedCampaign && state.selectedDataSources.length) {
      filteredChartData = [];
      state.selectedDataSources.forEach((source) => {
        filteredChartData = [
          ...filteredChartData,
          ...state.parsedCSVData.byDataSource[source]
        ];
      });
      filteredChartData = filteredChartData.filter( (el) => el.Campaign === state.selectedCampaign);
    }

    if(filteredChartData.length) {
      filteredChartData.sort((a, b) => new Date(b.date) - new Date(a.date));
      dispatch({type: 'setChartData', payload: filteredChartData})
    }
    if(!state.selectedCampaign && !state.selectedDataSources.length) {
      dispatch({type: 'setChartData', payload: state.parsedCSVData.raw});
    }
  }, [state.selectedCampaign, state.selectedDataSources, state.parsedCSVData]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
          <Grid item xs={3}>
            <ChartFilters
              dataSources={state.dataSources}
              campaigns={state.campaigns}
              selectCampaign={(value) => dispatch({type: 'selectCampaign', payload: value})}
              selectDataSources={(value) => dispatch({type: 'selectDataSources', payload: value})}
            ></ChartFilters>
          </Grid>
          <Grid item xs={9}>
            <LineChart data={state.chartData}></LineChart>
          </Grid>
      </Grid>
    </div>
  );
}

export default App;
