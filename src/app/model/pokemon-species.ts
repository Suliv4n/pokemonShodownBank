
export class PokemonSpecies {

    constructor(
        /**
         * The species name.
         */
        private _name : string,
        
        /**
         * The species base stats.
         */
        private _baseStats : object,
    ) {
        
    }

    /**
     * Get the species name.
     */
    public get name(): string{
        return this._name;
    }

    /**
     * Get a copy of the species base stats.
     */
    public get baseStats(): object {
        return Object.assign({}, this._baseStats);
    }

}
