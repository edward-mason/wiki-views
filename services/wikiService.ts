import { WikiApiResponse, ProcessedStats } from '../types';

const BASE_URL = 'https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/user';

export const fetchLifetimeViews = async (title: string): Promise<ProcessedStats> => {
  // Normalize title: replace spaces with underscores, though API handles encoding, standardizing helps
  const normalizedTitle = title.trim().replace(/\s+/g, '_');
  
  if (!normalizedTitle) {
    throw new Error('Please enter a valid article title.');
  }

  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10).replace(/-/g, '');
  
  // Start date from when the API began tracking (July 2015)
  const startDate = '2015070100';
  const endDate = `${todayStr}00`;

  const url = `${BASE_URL}/${encodeURIComponent(normalizedTitle)}/monthly/${startDate}/${endDate}`;

  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Article "${title}" not found on English Wikipedia.`);
    }
    throw new Error('Failed to fetch data from Wikipedia API.');
  }

  const data: WikiApiResponse = await response.json();

  if (!data.items || data.items.length === 0) {
    return {
      totalViews: 0,
      articleTitle: normalizedTitle.replace(/_/g, ' '),
      history: []
    };
  }

  const totalViews = data.items.reduce((acc, item) => acc + item.views, 0);

  const history = data.items.map((item) => {
    // Timestamp format: YYYYMMDDHH
    const year = item.timestamp.substring(0, 4);
    const month = item.timestamp.substring(4, 6);
    // Create a readable date label (e.g., "Jan 2020")
    const dateObj = new Date(parseInt(year), parseInt(month) - 1, 1);
    const dateLabel = dateObj.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

    return {
      date: dateLabel,
      fullDate: `${year}-${month}`,
      views: item.views
    };
  });

  return {
    totalViews,
    articleTitle: normalizedTitle.replace(/_/g, ' '), // Display title with spaces
    history
  };
};