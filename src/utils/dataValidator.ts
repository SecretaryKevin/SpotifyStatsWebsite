export const validateSpotifyData = (
  data: unknown,
  fileName?: string
): {
  valid: boolean;
  sampleErrors: string[];
} => {
  const errors: string[] = [];

  if (!Array.isArray(data)) {
    errors.push("The data is not in the expected format. Please upload valid JSON files.");
  }

  if (fileName && !/^Streaming_History_Audio_\d{4}(-\d{4})?(_\d+)?\.json$/.test(fileName)) {
    errors.push("Please upload files named 'Streaming_History_Audio_YYYY.json' or 'Streaming_History_Audio_YYYY-YYYY.json' from your Spotify data download. Please reload the page and try again.");
  }

  return {
    valid: errors.length === 0,
    sampleErrors: errors
  };
};
