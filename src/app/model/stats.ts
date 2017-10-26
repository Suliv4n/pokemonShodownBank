/**
 * Represents a stat.
 */
export class Stat {
    constructor(
        private _id : number,
        private _name : string
    ) {}

    /**
     * Get the stat name.
     */
    public get name() : string {
        return this._name;    
    }
    
    /**
     * get the stat id.
     */
    public get id() : number {
        return this._id;    
    }
}


export const STATS = {
    HP : new Stat(1, "PV"),
    ATTACK : new Stat(2, "Attaque"),
    DEFENSE : new Stat(3, "Défense"),
    SPECIAL_ATTACK : new Stat(5, "Attaque spéciale"),
    SPECIAL_DEFENSE : new Stat(4, "Défense spéciale"),
    SPEED : new Stat(6, "Vitesse")
}