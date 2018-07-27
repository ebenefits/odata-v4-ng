import { Component, OnInit } from '@angular/core';
import { ODataQuery, ODataResponse, ODataService } from 'odata-v4-ng';
import { BasicWriteComponent } from '../basic-write/basic-write.component';
import { ExampleData, SERVICE_ROOT } from '../example/example-data';

const EXECUTE_BATCH = `example.subscr = example.odataQuery.execute().subscribe(
  (odataResponse: ODataResponse) => {
    example.response = odataResponse.toString();
  },
  (error: string) => {
    example.response = error;
  }
);`;

@Component({
  selector: 'ov4-adv-write',
  templateUrl: '../example/example.component.html'
})
export class AdvWriteComponent extends BasicWriteComponent implements OnInit {
  constructor(protected odataService: ODataService) {
    super(odataService);
    this.executeEnabled = false;
  }

  ngOnInit() {
    this.examples = [];
    // BATCH
    const example: ExampleData = new ExampleData();
    this.examples.push(example);
    example.title = 'Batch';
    example.query = SERVICE_ROOT + '/$batch';
    example.odataQuery = new ODataQuery(this.odataService, SERVICE_ROOT)
      .batch()
      .get(new ODataQuery(this.odataService, SERVICE_ROOT).entitySet('Airlines'))
      .post(new ODataQuery(this.odataService, SERVICE_ROOT).entitySet('Airlines'), {
        '@odata.type': 'Microsoft.OData.SampleService.Models.TripPin.Airline',
        'AirlineCode': 'EK',
        'Name': 'Emirates Airline'
      })
      .get(new ODataQuery(this.odataService, SERVICE_ROOT).entitySet('Airlines'));
    example.code = `example.odataQuery = new ODataQuery(this.odataService, SERVICE_ROOT)
    .batch()
    .get(new ODataQuery(this.odataService, SERVICE_ROOT).entitySet('Airlines'))
    .post(new ODataQuery(this.odataService, SERVICE_ROOT).entitySet('Airlines'), {
      '@odata.type': 'Microsoft.OData.SampleService.Models.TripPin.Airline',
      'AirlineCode': 'EK',
      'Name': 'Emirates Airline'
    })
    .get(new ODataQuery(this.odataService, SERVICE_ROOT).entitySet('Airlines'));
${EXECUTE_BATCH}`;
    example.func = this.executeBatch;
  }

  executeBatch(example: ExampleData, odataService: ODataService): void {
    example.subscr = example.odataQuery.execute().subscribe(
      (odataResponse: ODataResponse) => {
        example.response = odataResponse.toString();
      },
      (error: string) => {
        example.response = error;
      }
    );
  }
}
