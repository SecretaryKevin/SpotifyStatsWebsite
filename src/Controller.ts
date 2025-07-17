import type { Song } from './Interface/Song';

export default class Controller {
    public songs: Record<number, Song[]> = {};
    private selectedYearSongs: Song[] | null = null;
    private allSongs: Song[] = [];

    public loadData = (data: Song[]): void => {
        this.allSongs = data.filter(song => !song.episode_name);

        this.allSongs.forEach(song => {
            const year = parseInt(song.ts.split("T")[0].split("-")[0], 10);
            if (!this.songs[year]) this.songs[year] = [];
            this.songs[year].push(song);
        });

        const years = Object.keys(this.songs).map(Number);
        this.selectedYearSongs = this.songs[years[years.length - 1]];
    };

    public clearData = (): void => {
        this.songs = {};
        this.selectedYearSongs = null;
        this.allSongs = [];
    }

    public getYears = (): number[] => Object.keys(this.songs).map(Number);

    public getSelectedYear = (): number | "All" => {
        if (!this.selectedYearSongs) return 0;
        return this.selectedYearSongs === this.allSongs ? "All" :
            parseInt(this.selectedYearSongs[0].ts.split("-")[0], 10);
    };

    public setSelectedYear = (year: number | "All"): void => {
        this.selectedYearSongs = year === "All" ? this.allSongs : this.songs[year];
    };

    public getTotalTimeListened = (): number => {
        if (!this.selectedYearSongs) return 0;
        const totalMs = this.selectedYearSongs.reduce((sum, song) => sum + song.ms_played, 0);
        return parseFloat((totalMs / 6000).toFixed(2));
    };

    public getTotalNumberOfSongs = (): number => this.selectedYearSongs?.length || 0;

    public getTotalNumberOfArtists = (): number => {
        if (!this.selectedYearSongs) return 0;
        const artists = new Set<string>();
        this.selectedYearSongs.forEach(song => artists.add(song.master_metadata_album_artist_name));
        return artists.size;
    };

    public getTotalNumberOfAlbums = (): number => {
        if (!this.selectedYearSongs) return 0;
        const albums = new Set<string>();
        this.selectedYearSongs.forEach(song => albums.add(song.master_metadata_album_album_name));
        return albums.size;
    };

    public getPercentage = (key: keyof Song): Record<string, number> => {
        const counts: Record<string, number> = {};
        if (!this.selectedYearSongs) return counts;

        this.selectedYearSongs.forEach(song => {
            const value = song[key] as unknown as string;
            if (key === 'reason_end' && value !== 'trackdone') {
                counts['other'] = (counts['other'] || 0) + 1;
            } else {
                counts[value] = (counts[value] || 0) + 1;
            }
        });

        const totalSongs = this.selectedYearSongs.length;
        if (key === 'reason_end') {
            counts['trackdone'] = parseFloat((((counts['trackdone'] || 0) / totalSongs) * 100).toFixed(2));
            counts['other'] = parseFloat((((counts['other'] || 0) / totalSongs) * 100).toFixed(2));
        } else {
            Object.keys(counts).forEach(value => {
                counts[value] = parseFloat(((counts[value] / totalSongs) * 100).toFixed(2));
            });
        }

        return counts;
    };

    public getUnique = (key: keyof Song): string[] => {
        if (!this.selectedYearSongs) return [];
        const unique = new Set<string>();
        this.selectedYearSongs.forEach(song => unique.add(song[key] as unknown as string));
        return Array.from(unique);
    };

    public getSongsPerDay = (): Record<string, { totalSongs: number, playtime: number }> => {
        const days: Record<string, { totalSongs: number, playtime: number }> = {};
        if (!this.selectedYearSongs) return days;

        this.selectedYearSongs.forEach(song => {
            const date = song.ts.split("T")[0];
            if (!days[date]) {
                days[date] = { totalSongs: 1, playtime: song.ms_played / 60000 };
            } else {
                days[date].totalSongs += 1;
                days[date].playtime += song.ms_played / 60000;
            }
        });

        return days;
    };

    private getTopItems = <T>(
        extractKey: (song: Song) => string,
        extractArtist?: (song: Song) => string
    ): T[] => {
        if (!this.selectedYearSongs) return [];

        const items: Record<string, { count: number, ms_played: number, artist?: string }> = {};
        this.selectedYearSongs.forEach(song => {
            const key = extractKey(song);
            if (!items[key]) {
                items[key] = {
                    count: 0,
                    ms_played: 0,
                    ...(extractArtist ? { artist: extractArtist(song) } : {})
                };
            }
            items[key].count += 1;
            items[key].ms_played += song.ms_played;
        });

        const totalSongs = this.selectedYearSongs.length;
        return Object.entries(items)
            .sort(([, a], [, b]) => b.count - a.count)
            .slice(0, 5)
            .map(([name, info]) => ({
                name,
                times_played: info.count,
                percentage_of_total_songs: parseFloat(((info.count / totalSongs) * 100).toFixed(2)),
                minutes_listened: parseFloat((info.ms_played / 60000).toFixed(2)),
                ...(info.artist ? { artist: info.artist } : {})
            }) as unknown as T);
    };

    public getTopFiveSongs = () => this.getTopItems<{
        name: string,
        times_played: number,
        percentage_of_total_songs: number,
        minutes_listened: number,
        artist: string
    }>(
        song => song.master_metadata_track_name,
        song => song.master_metadata_album_artist_name
    );

    public getTopFiveArtists = () => this.getTopItems<{
        name: string,
        times_played: number,
        percentage_of_total_songs: number,
        minutes_listened: number
    }>(
        song => song.master_metadata_album_artist_name
    );

    public getTopFiveAlbums = () => this.getTopItems<{
        name: string,
        times_played: number,
        percentage_of_total_songs: number,
        minutes_listened: number,
        artist: string
    }>(
        song => song.master_metadata_album_album_name,
        song => song.master_metadata_album_artist_name
    );

    public getPercentageByPlatformCategory = (key: keyof Song): Record<string, number> => {
        if (!this.selectedYearSongs) return {};

        const platformCounts: Record<string, number> = {};
        this.selectedYearSongs.forEach(song => {
            const platform = song[key] as unknown as string;
            platformCounts[platform] = (platformCounts[platform] || 0) + 1;
        });

        const categoryTotals: Record<string, number> = {
            "Windows": 0, "Android": 0, "Mac": 0, "iOS": 0, "Other": 0
        };

        Object.entries(platformCounts).forEach(([platform, count]) => {
            const lowerPlatform = platform.toLowerCase();
            if (lowerPlatform.includes('windows')) {
                categoryTotals["Windows"] += count;
            } else if (lowerPlatform.includes('android')) {
                categoryTotals["Android"] += count;
            } else if (lowerPlatform.includes('mac') || lowerPlatform.includes('macos')) {
                categoryTotals["Mac"] += count;
            } else if (lowerPlatform.includes('ios') || lowerPlatform.includes('iphone') || lowerPlatform.includes('ipad')) {
                categoryTotals["iOS"] += count;
            } else {
                categoryTotals["Other"] += count;
            }
        });

        const totalSongs = this.selectedYearSongs.length;
        Object.keys(categoryTotals).forEach(category => {
            if (categoryTotals[category] > 0) {
                categoryTotals[category] = parseFloat(((categoryTotals[category] / totalSongs) * 100).toFixed(2));
            } else {
                delete categoryTotals[category];
            }
        });

        return categoryTotals;
    };
}