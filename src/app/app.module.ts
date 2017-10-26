import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import { InputRangeComponent } from './input-range/input-range.component';
import { ValuesPipe } from './values.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PokemonDetailComponent,
    InputRangeComponent,
    ValuesPipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
