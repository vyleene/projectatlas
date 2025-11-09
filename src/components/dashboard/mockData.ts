import * as turf from '@turf/turf';
import { MultiPolygon } from 'geojson';


export const extendedSeismicEvents = [
    {
        city: 'Manila City',
        location: [14.5995, 120.9842],
        magnitude: 6.7,
        timestamp: Date.now() - 3 * 60 * 1000,
        casualties: 5,
        status: 'rescue_ongoing',
        readings: [
            { time: -15, value: 0.2 },
            { time: -10, value: 0.3 },
            { time: -5, value: 0.4 },
            { time: -3, value: 6.7 },
            { time: -2, value: 4.2 },
            { time: -1, value: 2.1 },
            { time: 0, value: 1.5 }
        ]
    },
    {
        city: 'Davao',
        location: [7.1907, 125.4553],
        magnitude: 5.2,
        timestamp: Date.now() - 5 * 60 * 1000,
        casualties: 2,
        status: 'rescue_needed',
        readings: [
            { time: -10, value: 0.1 },
            { time: -5, value: 5.2 },
            { time: -4, value: 3.1 },
            { time: -3, value: 1.8 },
            { time: -2, value: 0.9 },
            { time: -1, value: 0.5 },
            { time: 0, value: 0.3 }
        ]
    },
    {
        city: 'Iligan City',
        location: [8.2275, 124.2452],
        magnitude: 4.1,
        timestamp: Date.now() - 8 * 60 * 1000,
        casualties: 0,
        status: 'monitoring',
        readings: [
            { time: -10, value: 0.2 },
            { time: -8, value: 4.1 },
            { time: -7, value: 2.5 },
            { time: -6, value: 1.2 },
            { time: -5, value: 0.6 },
            { time: -3, value: 0.3 },
            { time: 0, value: 0.2 }
        ]
    },
    {
        city: 'Cagayan De Oro',
        location: [8.4542, 124.6319],
        magnitude: 3.5,
        timestamp: Date.now() - 15 * 60 * 1000,
        casualties: 0,
        status: 'safe',
        readings: [
            { time: -15, value: 3.5 },
            { time: -14, value: 2.1 },
            { time: -13, value: 1.3 },
            { time: -12, value: 0.8 },
            { time: -10, value: 0.4 },
            { time: -5, value: 0.2 },
            { time: 0, value: 0.1 }
        ]
    },
    {
        city: 'Zamboanga City',
        location: [6.9214, 122.079],
        magnitude: 5.8,
        timestamp: Date.now() - 25 * 60 * 1000,
        casualties: 1,
        status: 'monitoring',
        readings: [
            { time: -20, value: 0.5 },
            { time: -15, value: 1.2 },
            { time: -10, value: 5.8 },
            { time: -5, value: 3.2 },
            { time: 0, value: 1.0 }
        ]
    },
    {
        city: 'General Santos',
        location: [6.1167, 125.1667],
        magnitude: 4.9,
        timestamp: Date.now() - 45 * 60 * 1000,
        casualties: 0,
        status: 'safe',
        readings: [
            { time: -30, value: 0.2 },
            { time: -25, value: 0.8 },
            { time: -20, value: 4.9 },
            { time: -15, value: 2.5 },
            { time: -10, value: 1.1 },
            { time: -5, value: 0.4 },
            { time: 0, value: 0.1 }
        ]
    }
];

export const seismicEvents = extendedSeismicEvents;

export const mockDispatchers = [
    { id: 'D001', name: 'Team Agila', location: [14.5995, 120.9842], status: 'active', sector: 'Gen. Luna St, Intramuros, Manila', personnel: 5, dispatchTime: new Date(Date.now() - 5 * 60 * 1000) },
    { id: 'D002', name: 'Team Tamaraw', location: [7.1907, 125.4553], status: 'en_route', sector: 'Quimpo Blvd, Bucana, Davao City', personnel: 4, dispatchTime: new Date(Date.now() - 2 * 60 * 1000) },
    { id: 'D003', name: 'Team Haribon', location: [8.2275, 124.2452], status: 'standby', sector: 'Roxas Ave, Poblacion, Iligan City', personnel: 6, dispatchTime: new Date(Date.now() - 30 * 60 * 1000) },
    { id: 'D004', name: 'Team Bayani', location: [8.4542, 124.6319], status: 'active', sector: 'Corrales Ave, Brgy. 2, Cagayan de Oro', personnel: 5, dispatchTime: new Date(Date.now() - 15 * 60 * 1000) },
    { id: 'D005', name: 'Team Diwa', location: [6.9214, 122.079], status: 'en_route', sector: 'N S Valderrosa St, Zone III, Zamboanga City', personnel: 4, dispatchTime: new Date(Date.now() - 8 * 60 * 1000) },
    { id: 'D006', name: 'Team Luzon', location: [6.1167, 125.1667], status: 'standby', sector: 'Pioneer Ave, Brgy. Dadiangas South, General Santos', personnel: 6, dispatchTime: new Date(Date.now() - 60 * 60 * 1000) },
    { id: 'D007', name: 'Team Malakas', location: [14.6760, 121.0437], status: 'active', sector: 'Gen. Aguinaldo Ave, Cubao, Quezon City', personnel: 5, dispatchTime: new Date(Date.now() - 1 * 60 * 1000) },
];

export const mockSituationStatus = {
    safe: 1150,
    safeTrend: 'up', // 'up' is good
    hazard: 42,
    hazardTrend: 'down', // 'down' is good
    injured: 25,
    injuredTrend: 'down', // 'down' is good
    rescueNeeded: 15,
    rescueNeededTrend: 'up', // 'up' is bad
    populationDensity: 'medium',
    alertLevel: 3
};

export const mockUserReports = [
    { id: 1, priority: 'High', message: 'Structural damage reported', location: 'Sector 4, Area B', timestamp: new Date(Date.now() - 2 * 60 * 1000) },
    { id: 2, priority: 'Med', message: 'Power outages in residential area', location: 'Downtown District', timestamp: new Date(Date.now() - 5 * 60 * 1000) },
    { id: 3, priority: 'Low', message: 'Roads blocked by debris', location: 'Sector 1, Area A', timestamp: new Date(Date.now() - 10 * 60 * 1000) },
    { id: 4, priority: 'High', message: 'Building collapse reported', location: 'Sector 3, Area C', timestamp: new Date(Date.now() - 12 * 60 * 1000) },
    { id: 5, priority: 'Med', message: 'Flooding in sub-district', location: 'Sector 2, Area D', timestamp: new Date(Date.now() - 15 * 60 * 1000) },
    { id: 6, priority: 'Low', message: 'Minor tremors felt', location: 'North Suburbs', timestamp: new Date(Date.now() - 20 * 60 * 1000) },
    { id: 7, priority: 'High', message: 'Fire reported in industrial park', location: 'Sector 5, Area F', timestamp: new Date(Date.now() - 22 * 60 * 1000) },
    { id: 8, priority: 'Med', message: 'Water main break', location: 'West End', timestamp: new Date(Date.now() - 30 * 60 * 1000) },
    { id: 9, priority: 'Low', message: 'Request for information', location: 'City Center', timestamp: new Date(Date.now() - 35 * 60 * 1000) },
    { id: 10, priority: 'High', message: 'Multiple injuries at mall', location: 'Uptown Mall', timestamp: new Date(Date.now() - 40 * 60 * 1000) },
    { id: 11, priority: 'Med', message: 'Traffic accident on highway', location: 'Highway 101', timestamp: new Date(Date.now() - 45 * 60 * 1000) },
    { id: 12, priority: 'Low', message: 'Suspicious activity reported', location: 'Sector 1, Area B', timestamp: new Date(Date.now() - 50 * 60 * 1000) },
];

// Philippine archipelago (simplified)
const philippineArchipelago: MultiPolygon = {
  type: "MultiPolygon",
  coordinates: [
    // Luzon
    [[[120.0, 18.5], [122.5, 18.5], [122.0, 16.0], [124.0, 14.0], [121.0, 13.5], [119.5, 15.0], [120.0, 18.5]]],
    // Visayas
    [[[122.5, 12.5], [125.5, 12.0], [125.0, 9.5], [122.0, 10.0], [122.5, 12.5]]],
    // Mindanao
    [[[121.5, 8.5], [127, 8.5], [126.5, 5.5], [121.0, 5.5], [121.5, 8.5]]],
    // Palawan
    [[[118.0, 11.0], [120.0, 9.0], [119.5, 8.5], [117.5, 10.5], [118.0, 11.0]]]
  ]
};

// City data
const cities = [
  { name: 'Manila City', coords: [14.5995, 120.9842], population: 1846513, radius: 4 },
  { name: 'Davao', coords: [7.1907, 125.4553], population: 1776949, radius: 8 },
  { name: 'Iligan City', coords: [8.2275, 124.2452], population: 363115, radius: 5 },
  { name: 'Cagayan De Oro', coords: [8.4542, 124.6319], population: 728402, radius: 6 },
  { name: 'Zamboanga City', coords: [6.9214, 122.079], population: 977234, radius: 7 },
  { name: 'General Santos', coords: [6.1167, 125.1667], population: 697315, radius: 6 },
];

// Helper: calculate earthquake-affected zones
function getAffectedAreas(events = seismicEvents) {
  return events.map(ev => ({
    coords: ev.location,
    radius: ev.magnitude * 10, // example scale factor
    severity: ev.magnitude / 10 // normalize severity
  }));
}

const maxPopulation = Math.max(...cities.map(c => c.population));

export function generateRealisticPopulationData(): [number, number, number][] {
  const rawPoints: [number, number, number][] = [];
  const affectedZones = getAffectedAreas();

  cities.forEach(city => {
    const [lat, lng] = city.coords;
    const center = turf.point([lng, lat]); // Turf expects [lng, lat]
    const normalizedDensity = city.population / maxPopulation;
    const numPoints = Math.ceil(Math.log10(city.population) * 50);

    for (let i = 0; i < numPoints; i++) {
      const angle = Math.random() * 360;
      const distance = Math.pow(Math.random(), 1.5) * city.radius;
      const point = turf.destination(center, distance, angle, { units: 'kilometers' });
      const [pointLng, pointLat] = point.geometry.coordinates;

      const distFromCenter = turf.distance(center, point, { units: 'kilometers' });
      const urbanFactor = Math.max(0.2, 1 - distFromCenter / city.radius);
      let pointDensity = normalizedDensity * urbanFactor;

      affectedZones.forEach(zone => {
        const zoneCenter = turf.point([zone.coords[1], zone.coords[0]]);
        const distFromEpicenter = turf.distance(point, zoneCenter, { units: 'kilometers' });
        if (distFromEpicenter < zone.radius) {
          const impactFactor = 1 - distFromEpicenter / zone.radius;
          pointDensity = Math.min(1.0, pointDensity + zone.severity * impactFactor * 0.3);
        }
      });

      const variance = 0.7 + Math.random() * 0.6;
      pointDensity *= variance;

      rawPoints.push([pointLat, pointLng, Math.max(0.1, Math.min(1.0, pointDensity))]);
    }

    // Always include city center
    rawPoints.push([lat, lng, normalizedDensity]);
  });

  // Filter points to keep only those on land
  const landmassPoints = rawPoints.filter(p => {
    const [lat, lng] = p;
    const pointToCheck = turf.point([lng, lat]);
    return turf.booleanPointInPolygon(pointToCheck, philippineArchipelago);
  });

  return landmassPoints;
}

export const mockPopulationData = generateRealisticPopulationData();