import { Component, OnInit } from '@angular/core';
import { Pokemon } from './../model/pokemon';
import { STATS, Stat } from './../model/stats';
import { Nature, NATURES } from './../model/nature';

@Component({
    selector: '<app-pokemon-detail>',
    templateUrl: './pokemon-detail.component.html',
    styleUrls: ['./pokemon-detail.component.css'],
})
export class PokemonDetailComponent implements OnInit{ 
    private _pokemon : Pokemon = new Pokemon("Dracaufeu");
    
    public stats = STATS;
    public natures = NATURES;

    private _malusStatNature: Stat;
    private _bonusStatNature: Stat;


    public ngOnInit(): void {
        this._bonusStatNature = this.pokemon.nature.bonusStat;
        this._malusStatNature = this.pokemon.nature.malusStat;
    }

    public get pokemon(): Pokemon{
        return this._pokemon
    }

    public get malusStatNature(): Stat{
        return this._malusStatNature;
    }

    public get bonusStatNature(): Stat{
        return this._bonusStatNature;
    }

    public set malusStatNature(stat: Stat){
        this._malusStatNature = stat;
    }

    public set bonusStatNature(stat: Stat){
        this._bonusStatNature = stat;
    }

    public changeNatureBonus(event: any, stat: Stat): void{
        this._bonusStatNature = event ? stat : null;
        this.updatePokemonNature();
    }

    public changeNatureMalus(event: any, stat: Stat): void{
        this._malusStatNature = event ? stat : null;
        this.updatePokemonNature();
    }

    private updatePokemonNature(): void{

        if( 
            (this._bonusStatNature !== null && this._malusStatNature !== null) || 
            (this._bonusStatNature === null && this._bonusStatNature === null)
        ){
            for(let nature of Object.values(NATURES)){
                if(
                    nature.bonusStat === this._bonusStatNature &&
                    nature.malusStat === this._malusStatNature
                ){
                    this._pokemon.nature = nature;
                    break;
                }
            }
        }
    }

    private updateSelectedNature(nature: Nature): void{
        this._bonusStatNature = nature.bonusStat;
        this._malusStatNature = nature.malusStat;
    }
}
