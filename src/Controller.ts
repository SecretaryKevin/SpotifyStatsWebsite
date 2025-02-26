import type { Song } from './Interface/Song';

export default class Controller {
    public songs: { [key: number]: Song[] } = {};
    private selectedYearSongs: Song[] | null = null;
    private allSongs: Song[] = [];

    public loadData = (data: Song[]): void => {
        // Store all songs first
        this.allSongs = data.filter(song => !song.episode_name);

        // Then organize by year
        this.allSongs.forEach(song => {
            const year = parseInt(song.ts.split("T")[0].split("-")[0], 10);
            if (!this.songs[year]) this.songs[year] = [];
            this.songs[year].push(song);
        });

        const years = Object.keys(this.songs).map(Number);
        this.selectedYearSongs = this.songs[years[years.length - 1]];
    };

    public getYears = (): number[] => {
        return Object.keys(this.songs).map(Number);
    };

    public getSelectedYear = (): number | "All" => {
        if (!this.selectedYearSongs) return 0;
        return this.selectedYearSongs === this.allSongs ? "All" :
            parseInt(this.selectedYearSongs[0].ts.split("-")[0], 10);
    };

    public setSelectedYear = (year: number | "all"): void => {
        if (year === "all") {
            this.selectedYearSongs = this.allSongs;
        } else {
            this.selectedYearSongs = this.songs[year];
        }
    };

    public getTotalTimeListened = (): number => {
        return this.selectedYearSongs ? parseFloat((this.selectedYearSongs.reduce((total, song) => total + song.ms_played, 0) / 6000).toFixed(2)) : 0;
    };

    public getPercentage = (key: keyof Song): { [key: string]: number } => {
        const counts: { [key: string]: number } = {};
        if (this.selectedYearSongs) {
            this.selectedYearSongs.forEach(song => {
                const value = song[key] as unknown as string;
                if (key === 'reason_end' && value !== 'trackdone') {
                    counts['other'] = (counts['other'] || 0) + 1;
                } else {
                    counts[value] = (counts[value] || 0) + 1;
                }
            });

            if (key === 'reason_end') {
                const completed = counts['trackdone'] || 0;
                counts['trackdone'] = parseFloat(((completed / this.selectedYearSongs.length) * 100).toFixed(2));
                const other = counts['other'] || 0;
                counts['other'] = parseFloat(((other / this.selectedYearSongs.length) * 100).toFixed(2));
            } else {
                Object.keys(counts).forEach(value => {
                    counts[value] = parseFloat(((counts[value] / (this.selectedYearSongs?.length || 1)) * 100).toFixed(2));
                });
            }
        }
        return counts;
    };

    public getUnique = (key: keyof Song): string[] => {
        const unique = new Set<string>();
        if (this.selectedYearSongs) {
            this.selectedYearSongs.forEach(song => unique.add(song[key] as unknown as string));
        }
        return Array.from(unique);
    };

    public getSongsPerDay = (): { [key: string]: { totalSongs: number, playtime: number } } => {
        const days: { [key: string]: { totalSongs: number, playtime: number } } = {};
        if (this.selectedYearSongs) {
            this.selectedYearSongs.forEach(song => {
                const date = song.ts.split("T")[0];
                if (!days[date]) {
                    days[date] = { totalSongs: 1, playtime: song.ms_played / 60000 };
                } else {
                    days[date].totalSongs += 1;
                    days[date].playtime += song.ms_played / 60000;
                }
            });
        }
        return days;
    };

    public getTopFiveSongs = (): { name: string, times_played: number, percentage_of_total_songs: number, minutes_listened: number, artist: string }[] => {
        const songs: { [key: string]: { count: number, ms_played: number, artist: string } } = {};
        if (this.selectedYearSongs) {
            this.selectedYearSongs.forEach(song => {
                const name = song.master_metadata_track_name;
                if (!songs[name]) {
                    songs[name] = { count: 0, ms_played: 0, artist: song.master_metadata_album_artist_name };
                }
                songs[name].count += 1;
                songs[name].ms_played += song.ms_played;
            });

            const top_songs = Object.entries(songs).sort((a, b) => b[1].count - a[1].count).slice(0, 5);
            const total_songs = this.selectedYearSongs.length;

            return top_songs.map(([name, info]) => ({
                name,
                times_played: info.count,
                percentage_of_total_songs: parseFloat(((info.count / total_songs) * 100).toFixed(2)),
                minutes_listened: parseFloat((info.ms_played / 60000).toFixed(2)),
                artist: info.artist
            }));
        }
        return [];
    };

    public getTopFiveArtists = (): { name: string, times_played: number, percentage_of_total_songs: number, minutes_listened: number }[] => {
        const artists: { [key: string]: { count: number, ms_played: number } } = {};
        if (this.selectedYearSongs) {
            this.selectedYearSongs.forEach(song => {
                const artist = song.master_metadata_album_artist_name;
                if (!artists[artist]) {
                    artists[artist] = { count: 0, ms_played: 0 };
                }
                artists[artist].count += 1;
                artists[artist].ms_played += song.ms_played;
            });

            const top_artists = Object.entries(artists).sort((a, b) => b[1].count - a[1].count).slice(0, 5);
            const total_songs = this.selectedYearSongs.length;

            return top_artists.map(([name, info]) => ({
                name,
                times_played: info.count,
                percentage_of_total_songs: parseFloat(((info.count / total_songs) * 100).toFixed(2)),
                minutes_listened: parseFloat((info.ms_played / 60000).toFixed(2))
            }));
        }
        return [];
    };

    public getTopFiveAlbums = (): { name: string, times_played: number, percentage_of_total_songs: number, minutes_listened: number, artist: string }[] => {
        const albums: { [key: string]: { count: number, ms_played: number, artist: string } } = {};
        if (this.selectedYearSongs) {
            this.selectedYearSongs.forEach(song => {
                const album = song.master_metadata_album_album_name;
                if (!albums[album]) {
                    albums[album] = { count: 0, ms_played: 0, artist: song.master_metadata_album_artist_name };
                }
                albums[album].count += 1;
                albums[album].ms_played += song.ms_played;
            });

            const top_albums = Object.entries(albums).sort((a, b) => b[1].count - a[1].count).slice(0, 5);
            const total_songs = this.selectedYearSongs.length;

            return top_albums.map(([name, info]) => ({
                name,
                times_played: info.count,
                percentage_of_total_songs: parseFloat(((info.count / total_songs) * 100).toFixed(2)),
                minutes_listened: parseFloat((info.ms_played / 60000).toFixed(2)),
                artist: info.artist
            }));
        }
        return [];
    };
}