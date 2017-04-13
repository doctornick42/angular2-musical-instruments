import { Component } from '@angular/core';
import { routing } from './routes';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    styleUrls: [ 'app/app.component.css' ]
})
export class AppComponent {
    name = 'Angular';

    activeTab: string;

    constructor() {
        this.activeTab = 'simple-synth';
    }

    setActiveTab(tabName: string): void {
        this.activeTab = tabName;
    }
}
