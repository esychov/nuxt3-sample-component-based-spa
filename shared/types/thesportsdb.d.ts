export {Leagues, League, Seasons, Season};

declare global {
    interface Leagues {
        leagues: Array<League>
    }

    interface League {
        idLeague: string,
        strLeague: string,
        strSport: string,
        strLeagueAlternate: string
    }

    interface Seasons {
        seasons: Array<Season>
    }

    interface Season {
        strSeason: string,
        strBadge: string
    }
}
