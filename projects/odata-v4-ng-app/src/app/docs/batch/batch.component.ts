import {Component} from '@angular/core';
import {ODataQuery, ODataQueryBatch, ODataResponse, ODataService} from 'odata-v4-ng';
import {Observable} from 'rxjs';
import {NgFor, NgIf} from '@angular/common';
import {InputTextModule} from 'primeng/inputtext';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';

export class BatchItem {
  constructor(
    public requestDescription: string,
    public observable: Observable<ODataResponse>,
    public responseBatch: ODataResponse,
    public responses: ODataResponse[]) {
  }
}

@Component({
    selector: 'ov4-batch',
    templateUrl: './batch.component.html',
    imports: [FormsModule, InputTextModule, NgFor, NgIf, ReactiveFormsModule]
})
export class BatchComponent {
  serviceRootControl: FormControl<string> = new FormControl<string>('', {nonNullable: true});
  entitySetControl: FormControl<string> = new FormControl<string>('', {nonNullable: true});
  entityIdControl: FormControl<string> = new FormControl<string>('', {nonNullable: true});
  entityPropertyPatchControl: FormControl<string> = new FormControl<string>('', {nonNullable: true});
  entityPropertyPutControl: FormControl<string> = new FormControl<string>('', {nonNullable: true});
  batchData: BatchItem[] = [];

  constructor(private odataService: ODataService) {
  }

  executeAllQueries(): void {
    const batchData: BatchItem[] = [];

    // POST
    let odataQueryBatch: ODataQueryBatch = new ODataQuery(this.odataService, this.serviceRootControl.value).batch();
    const odataQuery: ODataQuery = new ODataQuery(this.odataService, this.serviceRootControl.value).entitySet(this.entitySetControl.value);
    let body1: any = {};
    body1[this.entityIdControl.value] = 'id1';
    let body2: any = {};
    body2[this.entityIdControl.value] = 'id2';
    odataQueryBatch.post(odataQuery, body1).post(odataQuery, body2);
    batchData.push(new BatchItem('Add ' + this.entitySetControl.value, odataQueryBatch.execute(), null, null));

    // GET
    odataQueryBatch = new ODataQuery(this.odataService, this.serviceRootControl.value).batch();
    odataQueryBatch.get(odataQuery);
    batchData.push(new BatchItem('Get ' + this.entitySetControl.value, odataQueryBatch.execute(), null, null));

    // PATCH
    odataQueryBatch = new ODataQuery(this.odataService, this.serviceRootControl.value).batch();
    const odataQuery1: ODataQuery = new ODataQuery(this.odataService, this.serviceRootControl.value).entitySet(this.entitySetControl.value).entityKey('\'id1\'');
    const odataQuery2: ODataQuery = new ODataQuery(this.odataService, this.serviceRootControl.value).entitySet(this.entitySetControl.value).entityKey('\'id2\'');
    body1 = {};
    body1[this.entityPropertyPatchControl.value] = 'patch1';
    body2 = {};
    body2[this.entityPropertyPatchControl.value] = 'patch2';
    odataQueryBatch.patch(odataQuery1, body1).patch(odataQuery2, body2);
    batchData.push(new BatchItem('Update ' + this.entitySetControl.value + ' using PATCH', odataQueryBatch.execute(), null, null));

    // GET
    odataQueryBatch = new ODataQuery(this.odataService, this.serviceRootControl.value).batch();
    odataQueryBatch.get(odataQuery);
    batchData.push(new BatchItem('Get ' + this.entitySetControl.value, odataQueryBatch.execute(), null, null));

    // PUT
    odataQueryBatch = new ODataQuery(this.odataService, this.serviceRootControl.value).batch();
    body1 = {};
    body1[this.entityPropertyPutControl.value] = 'put1';
    body2 = {};
    body2[this.entityPropertyPutControl.value] = 'put2';
    odataQueryBatch.put(odataQuery1, body1).put(odataQuery2, body2);
    batchData.push(new BatchItem('Update ' + this.entitySetControl.value + ' using PUT', odataQueryBatch.execute(), null, null));

    // GET
    odataQueryBatch = new ODataQuery(this.odataService, this.serviceRootControl.value).batch();
    odataQueryBatch.get(odataQuery);
    batchData.push(new BatchItem('Get ' + this.entitySetControl.value, odataQueryBatch.execute(), null, null));

    // DELETE
    odataQueryBatch = new ODataQuery(this.odataService, this.serviceRootControl.value).batch();
    odataQueryBatch.delete(odataQuery1).delete(odataQuery2);
    batchData.push(new BatchItem('Delete ' + this.entitySetControl.value, odataQueryBatch.execute(), null, null));

    // GET
    odataQueryBatch = new ODataQuery(this.odataService, this.serviceRootControl.value).batch();
    odataQueryBatch.get(odataQuery);
    batchData.push(new BatchItem('Get ' + this.entitySetControl.value, odataQueryBatch.execute(), null, null));

    this.execute(0, batchData);
  }

  private execute(index: number, batchData: BatchItem[]): void {
    const batchItem: BatchItem = batchData[index];

    batchItem.observable.subscribe(
      (odataResponse: ODataResponse) => {
        batchItem.responseBatch = odataResponse;
        batchItem.responses = odataResponse.toODataResponseBatch().getODataResponses();

        if (index === batchData.length - 1) {
          this.batchData = batchData;
        } else {
          this.execute(++index, batchData);
        }
      }
    );
  }
}
