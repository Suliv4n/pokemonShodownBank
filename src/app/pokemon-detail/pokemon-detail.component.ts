import { Component } from '@angular/core';
import { Pokemon } from './../model/pokemon';
import { STATS } from './../model/stats';

@Component({
    selector: '<app-pokemon-detail>',
    templateUrl: './pokemon-detail.component.html',
    styleUrls: ['./pokemon-detail.component.css'],
})
export class PokemonDetailComponent  { 
    private _pokemon : Pokemon = new Pokemon("Carapuce");
    stats = STATS;


    public get pokemon(): Pokemon{
      return this._pokemon
    }

    
}
