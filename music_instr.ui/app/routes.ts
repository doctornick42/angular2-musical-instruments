import { SimpleSynthComponent, SimpleSynthComponentRoutes  } from './simple-synth/simple-synth.component';
import { PolyphonicSynthComponent, PolyphonicSynthComponentRoutes } from './polyphonic-synth/polyphonic-synth.component';
import { PlotSynthComponent, PlotSynthComponentRoutes } from './plot-synth/plot-synth.component';
import { Routes, RouterModule } from '@angular/router';


export const routes: Routes = [
    ...SimpleSynthComponentRoutes,
    ...PolyphonicSynthComponentRoutes,
    ...PlotSynthComponentRoutes,
    { path: '', component: SimpleSynthComponent },
    { path: '**', redirectTo: '/' }
];

export const routing = RouterModule.forRoot(routes);