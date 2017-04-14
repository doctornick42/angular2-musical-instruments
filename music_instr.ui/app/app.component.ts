import { Component } from '@angular/core';
import { routing } from './routes';
import { Router } from '@angular/router';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    styleUrls: [ 'app/app.component.css' ]
})
export class AppComponent {
    name = 'Angular';

    activeTab: string;

    constructor(private router: Router) {
        this.activeTab = 'simple-synth';
        this.router.navigate(['/simple-synth']);
    }

    setActiveTab(tabName: string): void {
        this.activeTab = tabName;
    }
}
