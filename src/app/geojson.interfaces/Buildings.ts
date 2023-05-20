import { MultiPolygon, Polygon, Feature, FeatureCollection } from 'geojson';
import { CRS } from "./_SharedTypes";

export interface BuildingsCollection<
  G extends Polygon | MultiPolygon,
  P = BuildingsFeatureProperties
> extends FeatureCollection<G, P> {
  type: 'FeatureCollection';
  features: BuildingsFeature<G, P>[];
  crs: CRS;
}

export interface BuildingsFeature<
  G extends Polygon | MultiPolygon,
  P = BuildingsFeatureProperties
> extends Feature<G, P> {}

 

export interface BuildingsFeatureProperties {
  DISTURBANCE_DISTANCE_M: number[];
  GREEN_M2: number[];
  LUXE_PARKING_LOTS_PER_M2?: number[];
  BAG_ID: number;
  BOWEN_RATIO: number[];
  NUM_PEDESTRIANS: number[];
  LUXE_HEAT_FLOW_M2_CHANGE_PER_YEAR?: number[];
  LUXE_HEAT_POWER_TO_FLOW_MULTIPLIER?: number[];
  POPULATION_DENSITY_M2?: number;
  SLANTING_ROOF_HEIGHT: number[];
  OWNER: Owner;
  NUM_CARS: number[];
  ZONING_PERMIT_REQUIRED: number[];
  GROUND_COLOR: number[];
  ALIGN_ELEVATION: number[];
  NUM_BICYCLES: number[];
  ID: number;
  ROOF_COLOR: number;
  SEWERED: number[];
  LUXE_DEMOLISH_COST_M2?: number[];
  DRAINAGE: number[];
  JAM_FACTOR_CARS: number[];
  TRAFFIC_LANES: number[];
  LIVABILITY_EFFECT: number[];
  WATER_MANNING: number[];
  WATER_STORAGE_M2: number[];
  LUXE_UNIT_SIZE_M2?: number[] | number;
  MONUMENTAL: number[] | number;
  NUM_TRUCKS: number[];
  FUNCTION: Function;
  NAME: string;
  LUXE_CONSTRUCTION_COST_M2?: number[];
  NUM_AIRPLANES: number[];
  GROUND_INFILTRATION_MD: number[];
  NUM_BUSES: number[];
  LUXE_CATEGORY_WEIGHT?: number[] | number;
  NUM_VANS: number[];
  SOLID: number[];
  JAM_FACTOR_VANS: number[];
  HEIGHT_OFFSET_M: number[];
  CRITICAL_INFRASTRUCTURE: number[];
  ROOT_DEPTH_M: number[];
  TRAFFIC_NOISE_SIGMA: number[];
  TRAFFIC_SPEED: number[];
  HEAT_EFFECT: number[];
  CONSTRUCTION_FINISH_DATE?: number;
  NUM_SHIPS: number[];
  MAX_FLOORS: number[] | number;
  JAM_FACTOR_TRUCKS: number[];
  NUM_TRAINS: number[];
  WATER_EVAPORATION_FACTOR: number[];
  DISTANCE_ZONE_M: number[];
  TRAFFIC_NOISE_TAU: number[];
  LUXE_SELL_PRICE_M2?: number[];
  FOLIAGE_CROWN_FACTOR: number[];
  BASEMENT_COLOR: number[];
  DEFAULT_FLOORS: number[];
  EXTRA_COLOR: number[];
  SOLAR_PANELS: number[];
  TOP_COLOR: number[];
  LUXE_HEAT_FLOW_M2_START_YEAR?: number[];
  JAM_FACTOR_BUSES: number[];
  NUM_TRAMS: number[];
  LUXE_HEAT_FLOW_M2_START_VALUE?: number[];
  BASEMENT_HEIGHT_M: number[];
  PIPES_PERMITTED: number[];
  FLOOR_HEIGHT_M: number[] | number;
  TERRAIN_MIX: number[];
  LUXE_BUYOUT_COST_M2?: number[];
  LUXE_PARKING_LOTS_DEMAND_PER_M2?: number[];
  MIN_FLOORS: number[] | number;
  SAFETY_DISTANCE_M: number[];
  OTHER_CONSTRUCTION_COST_M2?: number[];
  OTHER_SELL_PRICE_M2?: number[];
  OTHER_HEAT_FLOW_M2_CHANGE_PER_YEAR?: number[];
  OTHER_PARKING_LOTS_PER_M2?: number[];
  OTHER_HEAT_POWER_TO_FLOW_MULTIPLIER?: number[];
  OTHER_BUYOUT_COST_M2?: number[];
  OTHER_UNIT_SIZE_M2?: number[];
  OTHER_HEAT_FLOW_M2_START_YEAR?: number[];
  OTHER_DEMOLISH_COST_M2?: number[];
  OTHER_HEAT_FLOW_M2_START_VALUE?: number[];
  OTHER_CATEGORY_WEIGHT?: number[] | number;
  OTHER_PARKING_LOTS_DEMAND_PER_M2?: number[];
  NORMAL_CONSTRUCTION_COST_M2?: number[];
  NORMAL_PARKING_LOTS_PER_M2?: number[];
  NORMAL_HEAT_FLOW_M2_START_VALUE?: number[];
  NORMAL_BUYOUT_COST_M2?: number[];
  NORMAL_DEMOLISH_COST_M2?: number[];
  NORMAL_HEAT_FLOW_M2_CHANGE_PER_YEAR?: number[];
  NORMAL_PARKING_LOTS_DEMAND_PER_M2?: number[];
  NORMAL_HEAT_POWER_TO_FLOW_MULTIPLIER?: number[];
  NORMAL_CATEGORY_WEIGHT?: number[] | number;
  NORMAL_HEAT_FLOW_M2_START_YEAR?: number[];
  NORMAL_UNIT_SIZE_M2?: number[] | number;
  NORMAL_SELL_PRICE_M2?: number[];
  EDUCATION_HEAT_POWER_TO_FLOW_MULTIPLIER?: number[];
  EDUCATION_SELL_PRICE_M2?: number[];
  EDUCATION_BUYOUT_COST_M2?: number[];
  EDUCATION_HEAT_FLOW_M2_CHANGE_PER_YEAR?: number[];
  EDUCATION_UNIT_SIZE_M2?: number[];
  EDUCATION_CONSTRUCTION_COST_M2?: number[];
  EDUCATION_PARKING_LOTS_PER_M2?: number[];
  EDUCATION_CATEGORY_WEIGHT?: number[] | number;
  EDUCATION_HEAT_FLOW_M2_START_YEAR?: number[];
  EDUCATION_DEMOLISH_COST_M2?: number[];
  EDUCATION_PARKING_LOTS_DEMAND_PER_M2?: number[];
  EDUCATION_HEAT_FLOW_M2_START_VALUE?: number[];
  INDUSTRY_DEMOLISH_COST_M2?: number[];
  INDUSTRY_CATEGORY_WEIGHT?: number[] | number;
  INDUSTRY_BUYOUT_COST_M2?: number[];
  INDUSTRY_SELL_PRICE_M2?: number[];
  INDUSTRY_HEAT_FLOW_M2_CHANGE_PER_YEAR?: number[];
  INDUSTRY_PARKING_LOTS_PER_M2?: number[];
  INDUSTRY_HEAT_FLOW_M2_START_YEAR?: number[];
  INDUSTRY_PARKING_LOTS_DEMAND_PER_M2?: number[];
  INDUSTRY_HEAT_FLOW_M2_START_VALUE?: number[];
  INDUSTRY_CONSTRUCTION_COST_M2?: number[];
  INDUSTRY_UNIT_SIZE_M2?: number[];
  INDUSTRY_HEAT_POWER_TO_FLOW_MULTIPLIER?: number[];
  SHOPPING_BUYOUT_COST_M2?: number[];
  SHOPPING_DEMOLISH_COST_M2?: number[];
  SHOPPING_CATEGORY_WEIGHT?: number[] | number;
  SHOPPING_HEAT_FLOW_M2_START_VALUE?: number[];
  SHOPPING_SELL_PRICE_M2?: number[];
  SHOPPING_CONSTRUCTION_COST_M2?: number[];
  SHOPPING_HEAT_POWER_TO_FLOW_MULTIPLIER?: number[];
  SHOPPING_HEAT_FLOW_M2_START_YEAR?: number[];
  SHOPPING_HEAT_FLOW_M2_CHANGE_PER_YEAR?: number[];
  SHOPPING_UNIT_SIZE_M2?: number[];
  SHOPPING_PARKING_LOTS_PER_M2?: number[];
  SHOPPING_PARKING_LOTS_DEMAND_PER_M2?: number[];
  OFFICES_CATEGORY_WEIGHT?: number[] | number;
  OFFICES_HEAT_FLOW_M2_CHANGE_PER_YEAR?: number[];
  OFFICES_DEMOLISH_COST_M2?: number[];
  SOCIAL_UNIT_SIZE_M2?: number[] | number;
  SOCIAL_CONSTRUCTION_COST_M2?: number[];
  SOCIAL_SELL_PRICE_M2?: number[];
  OFFICES_SELL_PRICE_M2?: number[];
  OFFICES_UNIT_SIZE_M2?: number[];
  SOCIAL_HEAT_FLOW_M2_START_VALUE?: number[];
  OFFICES_CONSTRUCTION_COST_M2?: number[];
  OFFICES_HEAT_POWER_TO_FLOW_MULTIPLIER?: number[];
  SOCIAL_PARKING_LOTS_DEMAND_PER_M2?: number[];
  SOCIAL_HEAT_POWER_TO_FLOW_MULTIPLIER?: number[];
  SOCIAL_HEAT_FLOW_M2_START_YEAR?: number[];
  OFFICES_HEAT_FLOW_M2_START_YEAR?: number[];
  OFFICES_HEAT_FLOW_M2_START_VALUE?: number[];
  SOCIAL_PARKING_LOTS_PER_M2?: number[];
  OFFICES_PARKING_LOTS_PER_M2?: number[];
  SOCIAL_CATEGORY_WEIGHT?: number[] | number;
  OFFICES_PARKING_LOTS_DEMAND_PER_M2?: number[];
  SOCIAL_HEAT_FLOW_M2_CHANGE_PER_YEAR?: number[];
  SOCIAL_BUYOUT_COST_M2?: number[];
  OFFICES_BUYOUT_COST_M2?: number[];
  SOCIAL_DEMOLISH_COST_M2?: number[];
  LEISURE_PARKING_LOTS_PER_M2?: number[];
  LEISURE_HEAT_FLOW_M2_CHANGE_PER_YEAR?: number[];
  LEISURE_CATEGORY_WEIGHT?: number[] | number;
  LEISURE_PARKING_LOTS_DEMAND_PER_M2?: number[];
  LEISURE_HEAT_FLOW_M2_START_VALUE?: number[];
  LEISURE_CONSTRUCTION_COST_M2?: number[];
  LEISURE_BUYOUT_COST_M2?: number[];
  LEISURE_UNIT_SIZE_M2?: number[];
  LEISURE_DEMOLISH_COST_M2?: number[];
  LEISURE_SELL_PRICE_M2?: number[];
  LEISURE_HEAT_FLOW_M2_START_YEAR?: number[];
  LEISURE_HEAT_POWER_TO_FLOW_MULTIPLIER?: number[];
  HEALTHCARE_DEMOLISH_COST_M2?: number[];
  HEALTHCARE_CATEGORY_WEIGHT?: number[] | number;
  HEALTHCARE_HEAT_FLOW_M2_CHANGE_PER_YEAR?: number[];
  HEALTHCARE_HEAT_POWER_TO_FLOW_MULTIPLIER?: number[];
  HEALTHCARE_HEAT_FLOW_M2_START_VALUE?: number[];
  HEALTHCARE_PARKING_LOTS_PER_M2?: number[];
  HEALTHCARE_UNIT_SIZE_M2?: number[];
  HEALTHCARE_PARKING_LOTS_DEMAND_PER_M2?: number[];
  HEALTHCARE_SELL_PRICE_M2?: number[];
  HEALTHCARE_BUYOUT_COST_M2?: number[];
  HEALTHCARE_CONSTRUCTION_COST_M2?: number[];
  HEALTHCARE_HEAT_FLOW_M2_START_YEAR?: number[];
  UNDERGROUND_CATEGORY_WEIGHT?: number[];
  UNDERGROUND_UNIT_SIZE_M2?: number[];
  UNDERGROUND_DEMOLISH_COST_M2?: number[];
  UNDERGROUND_HEAT_FLOW_M2_START_VALUE?: number[];
  UNDERGROUND_PARKING_LOTS_PER_M2?: number[];
  UNDERGROUND_HEAT_FLOW_M2_CHANGE_PER_YEAR?: number[];
  UNDERGROUND_SELL_PRICE_M2?: number[];
  UNDERGROUND_HEAT_FLOW_M2_START_YEAR?: number[];
  UNDERGROUND_HEAT_POWER_TO_FLOW_MULTIPLIER?: number[];
  UNDERGROUND_CONSTRUCTION_COST_M2?: number[];
  UNDERGROUND_BUYOUT_COST_M2?: number[];
  UNDERGROUND_PARKING_LOTS_DEMAND_PER_M2?: number[];
  AGRICULTURE_PARKING_LOTS_PER_M2?: number[];
  AGRICULTURE_SELL_PRICE_M2?: number[];
  AGRICULTURE_DEMOLISH_COST_M2?: number[];
  AGRICULTURE_UNIT_SIZE_M2?: number[];
  AGRICULTURE_BUYOUT_COST_M2?: number[];
  AGRICULTURE_CATEGORY_WEIGHT?: number[];
  AGRICULTURE_CONSTRUCTION_COST_M2?: number[];
  AGRICULTURE_HEAT_FLOW_M2_START_VALUE?: number[];
  AGRICULTURE_HEAT_FLOW_M2_CHANGE_PER_YEAR?: number[];
  AGRICULTURE_HEAT_POWER_TO_FLOW_MULTIPLIER?: number[];
  AGRICULTURE_HEAT_FLOW_M2_START_YEAR?: number[];
  AGRICULTURE_PARKING_LOTS_DEMAND_PER_M2?: number[];
}

export enum Function {
  Basisschool = 'Basisschool',
  Flats = 'Flats',
  GetransformeerdeKantoren = 'Getransformeerde kantoren',
  HedendaagsOnderwijsgebouw = 'Hedendaags onderwijsgebouw',
  HoogbouwKantoren = 'Hoogbouw kantoren',
  Kantoren = 'Kantoren',
  KlasiekeSocialeWoningbouw = 'Klasieke sociale woningbouw',
  KlassiekKantoor = 'Klassiek kantoor',
  KlassiekeMiddenklasseWoning = 'Klassieke middenklasse woning',
  Loodsen = 'Loodsen',
  LuxeAppartementen = 'Luxe appartementen',
  MiddenklasseWoning = 'Middenklasse woning',
  ModerneVilla = 'Moderne villa',
  MonumentaalPand = 'Monumentaal pand',
  NaoorlogseKantoren = 'Naoorlogse kantoren',
  NaoorlogseLuxeAppartementen = 'Naoorlogse luxe appartementen',
  NaoorlogseMiddenklasseWoning = 'Naoorlogse middenklasse woning',
  NaoorlogseSocialeWoningbouw = 'Naoorlogse sociale woningbouw',
  NaoorlogseVilla = 'Naoorlogse villa',
  OndergrondseParkeergarage = 'Ondergrondse parkeergarage',
  OudGebouw = 'Oud gebouw',
  OudeLoodsen = 'Oude loodsen',
  OudeMiddenklasseWoning = 'Oude middenklasse woning',
  OudeVilla = 'Oude villa',
  OverigeFunctie = 'Overige functie',
  ParterreWoning = 'Parterre woning',
  ReligieusGebouw = 'Religieus gebouw',
  Restaurant = 'Restaurant',
  Schuur = 'Schuur',
  SocialeWoningbouw = 'Sociale woningbouw',
  Sportcentrum = 'Sportcentrum',
  Sportveld = 'Sportveld',
  Veehouderij = 'Veehouderij',
  Warenhuis = 'Warenhuis',
  WindmolenKlassiek = 'Windmolen (klassiek)',
  Winkels = 'Winkels',
  Woonboot = 'Woonboot',
  Woonwagen = 'Woonwagen',
  Ziekenhuis = 'Ziekenhuis',
}

export enum Owner {
  Boer = 'Boer',
  Buurtbewoners2 = 'Buurtbewoners (2)',
  GemeenteMeppel = 'Gemeente Meppel',
  GemeenteStaphorst = 'Gemeente Staphorst',
  Gezondheidszorg = 'Gezondheidszorg',
  Onderwijs = 'Onderwijs',
  ProjectManager = 'Project Manager',
  Woningbouwcorporatie = 'Woningbouwcorporatie',
}
