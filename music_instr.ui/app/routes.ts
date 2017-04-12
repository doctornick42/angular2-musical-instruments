import { SimpleSynthComponent, SimpleSynthComponentRoutes  } from './simple-synth.component';
import { PolyphonicSynthComponent, PolyphonicSynthComponentRoutes } from './polyphonic-synth.component';
import { Routes, RouterModule  } from '@angular/router';


export const routes: Routes = [
    ...SimpleSynthComponentRoutes,
    ...PolyphonicSynthComponentRoutes
];

export const routing = RouterModule.forRoot(routes);