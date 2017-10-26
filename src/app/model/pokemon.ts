import { STATS } from './stats';

const MAXIMUM_EFFORT_VALUE_BY_STAT = 255;
const MAXIMUM_EFFORT_VALUES = 510;


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
    private _effortValues = {};

    /**
     * The pokemon individual effort values.
     */
    private _individualValues = {};

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

    }
    
    /**
     * Get the pokemon name.
     */
    public get name() : string {
        return this._name;
    }

    public set name(name : string){
        this._name = name;
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
     * The effort value of a specific stat.
     * 
     * @param statId The stat id which effort values must be returned.
     */
    public getEffortValue(statId : number) : number {
        return this._effortValues[statId];    
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
     * Return the total of effort values of the pokemon.
     */
    public getTotalEffortValues() : number{
        
       let total = 0;
        
        for(var statId in this._effortValues) {
            total += this._effortValues[statId];
        }
        
        return total;
    }
    
}