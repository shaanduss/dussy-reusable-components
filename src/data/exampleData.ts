export const hongKongRegions: string[] = [
  "Hong Kong Island",
  "Kowloon",
  "New Territories",
] as const;

export const hongKongDistrictsByRegion: Record<
  (typeof hongKongRegions)[number],
  string[]
> = {
  "Hong Kong Island": [
    "Central and Western",
    "Eastern",
    "Southern",
    "Wan Chai",
  ],
  Kowloon: [
    "Kowloon City",
    "Kwun Tong",
    "Sham Shui Po",
    "Wong Tai Sin",
    "Yau Tsim Mong",
  ],
  "New Territories": [
    "Islands",
    "Kwai Tsing",
    "North",
    "Sai Kung",
    "Sha Tin",
    "Tai Po",
    "Tsuen Wan",
    "Tuen Mun",
    "Yuen Long",
  ],
};
