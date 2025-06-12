export function getCacheKey(): string {
    return `leagues`
}

export default function (): AsyncData<Leagues, NuxtError<null> | null> {
    return useAsyncData(getCacheKey(), () => $fetch('https://www.thesportsdb.com/api/v1/json/3/all_leagues.php'));
}
