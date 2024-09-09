export default class Patrimoine {
    possesseur: string;
    possessions: { libelle: string; getValeur: (date: string) => number }[];

    constructor(possesseur: string, possessions: { libelle: string; getValeur: (date: string) => number }[]) {
        this.possesseur = possesseur;
        this.possessions = [...possessions];
    }

    getValeur(date: string): number {
        let result = 0;
        for (const item of this.possessions) {
            result += item.getValeur(date);
        }
        return result;
    }
}