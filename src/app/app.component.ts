import { Component } from '@angular/core';
import * as FusionCharts from 'fusioncharts';
const dataUrl =
  'https://raw.githubusercontent.com/fusioncharts/dev_centre_docs/master/assets/datasources/fusiontime/examples/online-sales-single-series/data.json';
const schemaUrl =
  'https://raw.githubusercontent.com/fusioncharts/dev_centre_docs/master/assets/datasources/fusiontime/examples/online-sales-single-series/schema.json';
let dataSource = {
  data: null,
  chart: {
    // exportEnabled: 1
  },
  caption: {
    text: 'Online Sales of a SuperStore in the US'
  },
  yAxis: {
    "plot": {
      "value": "Sales",
      "type": "line"
    },
  }
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ft-ng';
  dataSource: any;
  events: any;
  type: string;
  width: string;
  height: string;
  constructor() {
    this.type = 'timeseries';
    this.width = '100%';
    this.height = '400';
    this.dataSource = dataSource
    this.events = {
      customRangeSelect: function (eventObj:any) {
        console.log(eventObj.data.start); //start timestamp
        console.log(eventObj.data.end); //end timestamp
        setTimeout(() => {
          dataSource.caption.text ="Chart Title Updated";
          dataSource.yAxis.plot.type ="column";
          eventObj.sender.setJSONData(dataSource)
        }, 2000);
       
      }
    }
    this.fetchData();
  }
  fetchData() {
    let jsonify = (res: any) => res.json();
    let dataFetch = fetch(dataUrl).then(jsonify);
    let schemaFetch = fetch(schemaUrl).then(jsonify);
    Promise.all([dataFetch, schemaFetch]).then(res => {
      let data = res[0];
      let schema = res[1];
      let fusionTable = new FusionCharts.DataStore().createDataTable(
        data,
        schema
      ); // Instance of DataTable to be passed as data in dataSource
      this.dataSource.data = fusionTable;
    });
  }
}
