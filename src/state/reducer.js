export const initialState = {
  parsedCSVData: {
    byCampaign: {},
    byDataSource: {},
    raw: []
  },
  chartData: [],
  dataSources: [],
  selectedDataSources: [],
  campaigns: [],
  selectedCampaign: ''
}
export const reducer = (state, action) => {
  switch(action.type) {
    case 'setParsedCSV': 
      return {
        ...state, 
        parsedCSVData: { ...action.payload }
      }
    case 'setChartData': 
      return {
        ...state, 
        chartData: [ ...action.payload ]
      }
    case 'setCampaigns': 
      return {
        ...state, 
        campaigns: [ ...action.payload ]
      }
    case 'setDataSources': 
      return {
        ...state, 
        dataSources: [ ...action.payload ]
      }
    case 'selectCampaign': 
      return {
        ...state,
        selectedCampaign: action.payload
      }
    case 'selectDataSources': 
      return {
        ...state,
        selectedDataSources: action.payload
      }
    
    default:
      return state;
  }
}