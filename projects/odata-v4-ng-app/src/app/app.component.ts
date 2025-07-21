import { Component } from '@angular/core';
import { SERVICE_ROOT } from './docs/example/example-data';
import { RouterOutlet } from '@angular/router';
import { BatchComponent } from './docs/batch/batch.component';
import { MetadataComponent } from './docs/metadata/metadata.component';
import { AdvWriteComponent } from './docs/adv-write/adv-write.component';
import { AdvReadComponent } from './docs/adv-read/adv-read.component';
import { BasicWriteComponent } from './docs/basic-write/basic-write.component';
import { BasicReadComponent } from './docs/basic-read/basic-read.component';
import { TabsModule } from 'primeng/tabs';

@Component({
    selector: 'ov4-root',
    templateUrl: './app.component.html',
    imports: [TabsModule, BasicReadComponent, BasicWriteComponent, AdvReadComponent, AdvWriteComponent, MetadataComponent, BatchComponent, RouterOutlet]
})
export class AppComponent {
  title = 'odata-v4-ng';
  serviceRoot: string = SERVICE_ROOT;
}
