import React, { useState, forwardRef } from "react"
import ReactDOM from "react-dom"
import MaterialTable from "material-table"
import data from "./vote_data.json"
import "./index.css"

import AddBox from "@material-ui/icons/AddBox"
import ArrowDownward from "@material-ui/icons/ArrowDownward"
import Check from "@material-ui/icons/Check"
import ChevronLeft from "@material-ui/icons/ChevronLeft"
import ChevronRight from "@material-ui/icons/ChevronRight"
import Clear from "@material-ui/icons/Clear"
import DeleteOutline from "@material-ui/icons/DeleteOutline"
import Edit from "@material-ui/icons/Edit"
import FilterList from "@material-ui/icons/FilterList"
import FirstPage from "@material-ui/icons/FirstPage"
import LastPage from "@material-ui/icons/LastPage"
import Remove from "@material-ui/icons/Remove"
import SaveAlt from "@material-ui/icons/SaveAlt"
import Search from "@material-ui/icons/Search"
import ViewColumn from "@material-ui/icons/ViewColumn"

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
}

const defaultColumnProperties = {
  sortable: false,
  width: 140,
  filtering: true,
}

const columnMap = {
  preferred_name: {
    title: "Member Name",
    sortable: true,
    width: 230,
  },
  state: {
    title: "State",
    sortable: true,
    filtering: true,
    width: 80,
    lookup: {
      NSW: "NSW",
      VIC: "Victoria",
      QLD: "Queensland",
      TAS: "Tasmania",
      SA: "South Aus",
      WA: "West Aus",
      ACT: "ACT",
      NT: "NT",
    },
  },
  electorate: {
    title: "Electorate",
  },
  votes: {
    title: "Climate Votes",
    sortable: true,
    type: "numeric",
    filtering: false,
  },
  // twitter: {
  //   title: "Twitter",
  //   // sortable: true,
  // },
  // fbook: {
  //   title: "Facebook",
  //   sortable: true,
  // },
  Party: {
    title: "Party",
    sortable: true,
    filtering: true,
    lookup: {
      ALP: "Labor",
      LP: "Liberal",
      NP: "National",
      IND: "Independent",
      LNP: "LNP",
    },
  },
  Swing: {
    title: "2019 Swing (%)",
    sortable: true,
    type: "numeric",
    filtering: false,
  },
  Margin: {
    title: "2019 Margin (%)",
    sortable: true,
    type: "numeric",
    filtering: false,
  },
  Vote_diff: {
    title: "2019 Margin Votes",
    sortable: true,
    type: "numeric",
    filtering: false,
  },
  Participation: {
    title: "Climate Participation (%)",
    type: "numeric",
    filtering: false,
  },
}

const getColumns = d =>
  d.schema.fields.map(i => ({
    field: i["name"],
    ...defaultColumnProperties,
    ...columnMap[i["name"]],
  }))

const Grid = () => {
  const [rows, setRows] = useState(data.data)
  const columns = getColumns(data)

  return (
    <MaterialTable
      columns={columns}
      data={rows}
      icons={tableIcons}
      options={{
        filtering: true,
        pageSize: 20,
        pageSizeOptions: [20, 50, 100, 150],
      }}
      title="Climate Action Votes by Electorate"
    />
  )
}

const App = () => (
  <div className="App">
    <h2>Climate Action Australia Vote Data</h2>
    <h3>
      Vote at{" "}
      <a href="https://www.climateactnow.com.au/">climateactnow.com.au</a>
    </h3>
    <p>
      Click column headings to sort. Double click to filter. [
      <a href="https://github.com/4dwins/climatevotedata">code</a>] [
      <a href="https://twitter.com/4dwins">@4dwins</a>]
    </p>
    <Grid />
  </div>
)

const rootElement = document.getElementById("root")
ReactDOM.render(<App />, rootElement)
