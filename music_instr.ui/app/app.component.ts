import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
        <h1></h1>
        <simple-synth></simple-synth>
    `,
})
export class AppComponent { name = 'Angular'; }
