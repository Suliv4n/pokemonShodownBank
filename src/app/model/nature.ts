import { Stat, STATS } from './stats';

const NATURE_BONUS_MODIFIER = 1.1;
const NATURE_MALUS_MODIFIER = 0.9;
const NATURE_NEUTRAL_MODIFIER = 1;

export class Nature {

    /**
     * Construct a nature
     * 
     * @param _id The nature id.
     * @param _name The nature names.
     * @param _identifier The nature uniq identifier.
     * @param _bonusStat The stat in wich the nature give a bonus.
     * @param _malusStat   The stat in which the nature give a malus.
     */
    constructor(
        private _id: number,
        private _name: string,
        private _identifier: string,
        private _bonusStat: Stat = null,
        private _malusStat: Stat = null,
    ) {

    }

    /**
     * Get the stat in wich the nature give a bonus.
     */
    get bonusStat(): Stat{
        return this._bonusStat;
    }

    /**
     * Get the stat in wich the nature give a malus.
     */
    get malusStat(): Stat{
        return this._malusStat;
    }

    /**
     * Get the stat name.
     */
    get name(): string{
        return this._name
    }

    get description(): string{
        let description = this._name;

        if(this._bonusStat !== null || this._malusStat !== null){
            description += " (";
            description += this._bonusStat !== null ? "+" + this._bonusStat.name + ", ": "";
            description += this._malusStat !== null ? "-" + this._malusStat.name : "";
            description += ")";
        }

        return description;
    }

    
    /**
     * Get the modifier of the specific stat.
     * 
     * @param statId The stat id for which the modifier must be returned.
     */
    public getStatModifier(statId: number): number{

        if(statId === this._bonusStat.id){
            return NATURE_BONUS_MODIFIER;
        }
        if(statId === this._malusStat.id){
            return NATURE_MALUS_MODIFIER;
        }

        return NATURE_NEUTRAL_MODIFIER;
    }

}


export const NATURES = {
    1:  new Nature(1, "Hardi", "hardy"),
    2:  new Nature(2, "Assuré", "bold", STATS.DEFENSE, STATS.ATTACK),
    3:  new Nature(3, "Modeste", "modest", STATS.SPECIAL_ATTACK, STATS.ATTACK),
    4:  new Nature(4, "Calme", "calm", STATS.SPECIAL_DEFENSE, STATS.ATTACK),
    5:  new Nature(5, "Timide", "timid", STATS.SPEED, STATS.ATTACK),
    6:  new Nature(6, "Solo", "lonely", STATS.ATTACK, STATS.DEFENSE),
    7:  new Nature(7, "Docile", "docile"),
    8:  new Nature(8, "Doux", "mild", STATS.SPECIAL_ATTACK, STATS.DEFENSE),
    9:  new Nature(9, "Gentil", "gentle", STATS.SPECIAL_DEFENSE, STATS.DEFENSE),
    10: new Nature(10, "Pressé", "hasty", STATS.SPEED, STATS.DEFENSE),
    11: new Nature(11, "Rigide", "adamant", STATS.ATTACK, STATS.SPECIAL_ATTACK),
    12: new Nature(12, "Malin", "impish", STATS.DEFENSE, STATS.SPECIAL_ATTACK),
    13: new Nature(13, "Pudique", "bashful"),
    14: new Nature(14, "Prudent", "careful", STATS.SPECIAL_DEFENSE, STATS.SPECIAL_ATTACK),
    15: new Nature(15, "Foufou", "rash", STATS.SPECIAL_ATTACK, STATS.SPECIAL_DEFENSE),
    16: new Nature(16, "Hardi", "jolly", STATS.SPEED, STATS.SPECIAL_ATTACK),
    17: new Nature(17, "Mauvais", "naughty", STATS.ATTACK, STATS.SPECIAL_DEFENSE),
    18: new Nature(18, "Lâche", "lax", STATS.DEFENSE, STATS.SPECIAL_DEFENSE),
    19: new Nature(19, "Bizarre", "quirky"),
    20: new Nature(20, "Naïf", "naive", STATS.SPEED, STATS.SPECIAL_DEFENSE),
    21: new Nature(21, "Brave", "brave", STATS.ATTACK, STATS.SPEED),
    22: new Nature(22, "Relax", "relaxed", STATS.DEFENSE, STATS.SPEED),
    23: new Nature(23, "Hardi", "quiet", STATS.SPECIAL_DEFENSE, STATS.ATTACK),
    24: new Nature(24, "Malpoli", "sassy", STATS.SPECIAL_DEFENSE, STATS.SPEED),
    25: new Nature(25, "Sérieux", "serious"),
}