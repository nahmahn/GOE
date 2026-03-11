// GOE variant - Global Ontology Engine
import type { PanelConfig, MapLayers } from '@/types';
import type { VariantConfig } from './base';

export * from './base';

export * from '../geo';
export * from '../entities';

export const DEFAULT_PANELS: Record<string, PanelConfig> = {
    map: { name: 'Global Map', enabled: true, priority: 1 },
    // GOE required panels
    // conflict_events (GDELT/ACLED)
    'gdelt-intel': { name: 'Live Intelligence', enabled: true, priority: 1 },
    // economic_indicators (FRED)
    economic: { name: 'Economic Indicators', enabled: true, priority: 1 },
    // ai_brief
    insights: { name: 'GOE Intelligence Brief', enabled: true, priority: 1 },
    // ai_deduction
    deduction: { name: 'AI Deduction', enabled: true, priority: 2 },
    // country_intelligence
    cii: { name: 'Country Intelligence', enabled: true, priority: 1 },
    // natural_disasters
    climate: { name: 'Climate Anomalies', enabled: true, priority: 2 },
    'satellite-fires': { name: 'Satellite Fires', enabled: true, priority: 2 },
    // new panels
    'goe_knowledge_graph': { name: 'Knowledge Graph', enabled: true, priority: 1 },
    'goe_domain_feed': { name: 'Live Intelligence Feed', enabled: true, priority: 1 },
};

export const DEFAULT_MAP_LAYERS: MapLayers = {
    // Enabled
    conflicts: true,
    economic: true, // Economic events
    natural: true, // Natural disasters
    bases: true, // Military bases
    protests: true,
    weather: true, // Typically useful alongside natural disasters
    waterways: true,

    // Disabled explicitly
    pipelines: false,
    cables: false, // undersea_cables
    datacenters: false,
    stockExchanges: false,

    // Everything else disabled
    gpsJamming: false,
    hotspots: false,
    ais: false,
    nuclear: false,
    irradiators: false,
    sanctions: false,
    outages: false,
    cyberThreats: false,
    flights: false,
    military: false,
    spaceports: false,
    minerals: false,
    fires: false,
    ucdpEvents: false,
    displacement: false,
    climate: false,
    startupHubs: false,
    cloudRegions: false,
    accelerators: false,
    techHQs: false,
    techEvents: false,
    financialCenters: false,
    centralBanks: false,
    commodityHubs: false,
    gulfInvestments: false,
    positiveEvents: false,
    kindness: false,
    happiness: false,
    speciesRecovery: false,
    renewableInstallations: false,
    tradeRoutes: false,
    iranAttacks: false,
    ciiChoropleth: false,
    dayNight: false,
    miningSites: false,
    processingPlants: false,
    commodityPorts: false,
};

export const MOBILE_DEFAULT_MAP_LAYERS: MapLayers = {
    ...DEFAULT_MAP_LAYERS,
    // mobile specific overrides if needed
};

export const VARIANT_CONFIG: VariantConfig = {
    name: 'goe',
    description: 'Global Ontology Engine - India Strategic Intelligence',
    panels: DEFAULT_PANELS,
    mapLayers: DEFAULT_MAP_LAYERS,
    mobileMapLayers: MOBILE_DEFAULT_MAP_LAYERS,
};
