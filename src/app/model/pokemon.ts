import { STATS } from './stats';
import { PokemonSpecies } from './pokemon-species';
import { Nature, NATURES } from './nature';

const MAXIMUM_EFFORT_VALUE_BY_STAT = 255;
const MAXIMUM_EFFORT_VALUES = 510;

const MAXIMUM_INDIVUAL_VALUE_BY_STAT = 31;

/**
 * Represents a pokemon.
 */
export class Pokemon {
    

    /**
     * The pokemon nickname.
     */
    private _nickname: string;
    
    /**
     * The pokmeon level.
     */
    private _level: number = 100;
    
    /**
     * The pokemon effort values point.
     */
    private _effortValues: object = {};

    /**
     * The pokemon individual effort values.
     */
    private _individualValues: object = {};

    /**
     * The pokemon species.
     */
    private _species: PokemonSpecies;

    /**
     * The pokemon nature
     */
    private _nature: Nature = NATURES[3];

    /**
     * Construct a pokemon.
     * 
     * @param _name The pokemon name.
     */
    constructor(private _name: string) {
        
        //Initialisation effort values
        this._effortValues[STATS.HP.id] = 0;
        this._effortValues[STATS.ATTACK.id] = 0;
        this._effortValues[STATS.DEFENSE.id] = 0;
        this._effortValues[STATS.SPECIAL_DEFENSE.id] = 0;
        this._effortValues[STATS.SPECIAL_ATTACK.id] = 0;
        this._effortValues[STATS.SPEED.id] = 0;
        
        //Initialisation individual values
        this._individualValues[STATS.HP.id] = 31;
        this._individualValues[STATS.ATTACK.id] = 31;
        this._individualValues[STATS.DEFENSE.id] = 31;
        this._individualValues[STATS.SPECIAL_DEFENSE.id] = 31;
        this._individualValues[STATS.SPECIAL_ATTACK.id] = 31;
        this._individualValues[STATS.SPEED.id] = 31;

        let baseStat: object = {};

        baseStat[STATS.HP.id] = 78;
        baseStat[STATS.ATTACK.id] = 84;
        baseStat[STATS.DEFENSE.id] = 78;
        baseStat[STATS.SPECIAL_DEFENSE.id] = 85;
        baseStat[STATS.SPECIAL_ATTACK.id] = 109;
        baseStat[STATS.SPEED.id] = 100;

        this._species = new PokemonSpecies("Charizard", baseStat);

    }
    
    /**
     * Get the pokemon name.
     */
    public get name() : string {
        return this._name;
    }

    /**
     * Set the pokemon name.
     */
    public set name(name : string){
        this._name = name;
    }

    /**
     * Get the pokemon scpecies.
     */
    public get species() : PokemonSpecies{
        return this._species;
    }
    
    /**
     * Get a clone of the pokemon effort values.
     */
    public get effortValues() {
        return Object.assign({}, this._effortValues);
    }
    
    /**
     * Get a clone of the pokemon indivudual values.
     */
    public get individualValues() {
        return Object.assign({}, this._individualValues);    
    }

    /**
     * Get the pokemon nature.
     */
    public get nature(): Nature {
        return this._nature;
    }


    /**
     * Set the pokemon nature.
     * 
     * @param nature The new pokemon nature.
     */
    public set nature(nature: Nature) {
        this._nature = nature;
    }
    
    /**
     * The effort value of a specific stat.
     * 
     * @param statId The stat id for which effort values must be returned.
     */
    public getEffortValue(statId : number) : number {
        return this._effortValues[statId];    
    }

    /**
     * The indivual value of a specific stat.
     * 
     * @param statId The stat id for which indivual values must be returned.
     */
    public getIndivualValue(statId : number) : number {
        return this._individualValues[statId];    
    }
    
    /**
     * Set effort values of a specific stat.
     * A pokemon can have 255 EVs per stat and a maximum of 510 EVs in total.
     * This method will recalculate the value if needed.
     * 
     * @param statId The stat id which effort values must be setted.
     * @param value The new value of effort values for the specified stat.
     */
    public setEffortValue(statId : number, value: number) : void {
        this._effortValues[statId] = value;
        this._effortValues[statId] = Math.min(this._effortValues[statId], MAXIMUM_EFFORT_VALUE_BY_STAT);
        this._effortValues[statId] = Math.max(this._effortValues[statId], 0);

        if(this.getTotalEffortValues() > MAXIMUM_EFFORT_VALUES)
        {
           this._effortValues[statId] = this._effortValues[statId] - (this.getTotalEffortValues() - MAXIMUM_EFFORT_VALUES);
        }
    }
    
    /**
     * Set the indivual value of the poekmon in a specific stat.
     * Indivual value must be between 0 and 31 for each stat.
     * 
     * @param statId The stat id of the indivual value.
     * @param value The new value of the indivual value.
     */
    public setIndivualValue(statId: number, value: number) : void {
        this._individualValues[statId] = value;
        this._individualValues[statId] = Math.min(this._individualValues[statId], MAXIMUM_INDIVUAL_VALUE_BY_STAT);
        this._individualValues[statId] = Math.max(this._individualValues[statId], 0);
    }

    /**
     * Return the total of effort values of the pokemon.
     */
    public getTotalEffortValues() : number{
        
       let total = 0;
        
        for(var statId in this._effortValues) {
            total += this._effortValues[statId];
        }
        
        return total;
    }

    /**
     * Return the stat value of the pokemon.
     * 
     * @param statId The stat id which the value must be returned.
     */
    public getStatValue(statId: number) : number {
        
        let total: number = 0;
        let EVBonus: number = Math.floor(this.effortValues[statId]/4);
        let IV: number = this.individualValues[statId];
        let base: number = this._species.baseStats[statId];
        let natureModifier = this._nature.getStatModifier(statId);

        switch(statId){
            case(STATS.HP.id):
            total = Math.floor((IV+2*base+EVBonus)*(this._level/100)+10+this._level);
            break;
            default:
                total = Math.floor(Math.floor((IV+2*base+EVBonus)*(this._level/100)+5) * natureModifier);
        }

        return total;
    }
    
}