import { $fetch } from 'ofetch'

const CACHE: Record<string, Seasons> = {};

export default async function (leagueId: string): Promise<Seasons> {
    if (!CACHE[leagueId]) {
        CACHE[leagueId] = await $fetch(`https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id=${leagueId}`);
    }

    return CACHE[leagueId];
}
