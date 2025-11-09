import * as turf from '@turf/turf';
import { MultiPolygon } from 'geojson';

export const mockUser = {
    name: 'Michael',
    role: 'Lead Dispatcher',
    status: 'Online'
};

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
    safeTrend: 'up',
    hazard: 42,
    hazardTrend: 'down',
    injured: 25,
    injuredTrend: 'down',
    rescueNeeded: 15,
    rescueNeededTrend: 'up',
    populationDensity: 'medium',
    alertLevel: 3
};

function generateClusteredReports() {
    const reports = [];
    let reportId = 1;

    const reportMessages = {
        High: ['Structural damage reported', 'Building collapse reported', 'Request for medical assistance', 'Multiple injuries reported', 'Fire reported'],
        Med: ['Power outages in area', 'Flooding in sub-district', 'Water main break', 'Communication lines are down', 'Requesting food and water'],
        Low: ['Roads blocked by debris', 'Minor tremors felt', 'Request for information', 'Fallen trees on road', 'Building with minor cracks']
    };

    const populationPoints = mockPopulationData;

    for (const event of seismicEvents) {
        const numReports = Math.round(event.magnitude * 2) + 8; // More reports for higher magnitude events
        const spreadRadius = event.magnitude * 8; // Wider spread for higher magnitude
        const center = turf.point(event.location.slice().reverse()); // Turf uses [lng, lat]

        // Find populated points within the earthquake's impact radius
        const affectedPopulationPoints = populationPoints.filter(p => {
            const pointLocation = turf.point([p[1], p[0]]);
            return turf.distance(center, pointLocation, { units: 'kilometers' }) <= spreadRadius;
        });

        if (affectedPopulationPoints.length === 0) continue; // Skip if no populated areas are affected

        for (let i = 0; i < numReports; i++) {
            // Pick a random point from the affected populated areas
            const randomPoint = affectedPopulationPoints[Math.floor(Math.random() * affectedPopulationPoints.length)];
            const [lat, lng, density] = randomPoint;

            // Determine priority based on the point's density and event magnitude
            const priorityRoll = Math.random() * (density * 0.5 + event.magnitude / 10);
            let priority: 'High' | 'Med' | 'Low' = priorityRoll > 0.6 ? 'High' : priorityRoll > 0.3 ? 'Med' : 'Low';

            const statusRoll = Math.random();
            let status = 'Active';
            if (statusRoll > 0.9) {
                status = 'Resolved';
            } else if (statusRoll > 0.7) {
                status = 'Under Review';
            }

            const messageOptions = reportMessages[priority];
            const message = messageOptions[Math.floor(Math.random() * messageOptions.length)];

            reports.push({
                id: reportId++,
                priority: priority,
                category: priority === 'High' ? (Math.random() > 0.5 ? 'Injury' : 'Hazard') : 'Hazard',
                title: message,
                status: status,
                description: `${message} in the vicinity of ${event.city}. Reported at ${new Date().toLocaleTimeString()}.`,
                peopleAffected: Math.floor(Math.random() * (priority === 'High' ? 20 : 5)),
                location: `Vicinity of ${event.city}`,
                timestamp: new Date(Date.now() - Math.floor(Math.random() * 60) * 60 * 1000),
                coords: [lat, lng],
                distance: `${(turf.distance(center, turf.point([lng, lat]))).toFixed(1)} km`
            });
        }
    }
    return reports;
}

// City data
const cities = [
  { name: 'Manila City', coords: [14.5995, 120.9842], population: 1846513, radius: 4 },
  { name: 'Davao', coords: [7.1907, 125.4553], population: 1776949, radius: 8 },
  { name: 'Iligan City', coords: [8.2275, 124.2452], population: 363115, radius: 5 },
  { name: 'Cagayan De Oro', coords: [8.4542, 124.6319], population: 728402, radius: 6 },
  { name: 'Zamboanga City', coords: [6.9214, 122.079], population: 977234, radius: 7 },
  { name: 'General Santos', coords: [6.1167, 125.1667], population: 697315, radius: 6 },
];

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

function getAffectedAreas(events = seismicEvents) {
  return events.map(ev => ({
    coords: ev.location,
    radius: ev.magnitude * 10,
    severity: ev.magnitude / 10
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

export const mockPopulationData = generateRealisticPopulationData(); // Must be exported before mockUserReports

export const mockUserReports = generateClusteredReports();

export const mockContacts = [
    { id: 1, name: 'National Emergency Hotline', type: 'Emergency' },
    { id: 2, name: 'Local Police Department', type: 'Emergency' },
    { id: 3, name: 'City Fire Department', type: 'Emergency' },
    { id: 4, name: 'Jane Doe', type: 'Personal' },
    { id: 5, name: 'John Smith', type: 'Personal' },
    { id: 6, name: 'Maria Dela Cruz', type: 'Personal' },
    { id: 7, name: 'Local Hospital', type: 'Emergency' },
];