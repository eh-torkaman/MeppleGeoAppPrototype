// Generated by https://quicktype.io
//
// To change quicktype's target language, run command:
//
//   "Set quicktype target language"

export interface The1291090_EnLabMepNeighborhoods {
    type:     string;
    crs:      CRS;
    features: Feature[];
}

export interface CRS {
    type:       string;
    properties: CRSProperties;
}

export interface CRSProperties {
    name: string;
}

export interface Feature {
    type:       FeatureType;
    geometry:   Geometry;
    properties: FeatureProperties;
}

export interface Geometry {
    type:        GeometryType;
    coordinates: Array<Array<Array<number[]>>>;
}

export enum GeometryType {
    MultiPolygon = "MultiPolygon",
}

export interface FeatureProperties {
    PERCENTAGE_GESCHEID?:                                number;
    HOTEL_GEMIDDELD_AANTAL_BINNEN_20_KM?:                number;
    PERCENTAGE_PERSONEN_0_TOT_15_JAAR?:                  number;
    STEDELIJKHEID_ADRESSEN_PER_KM_2:                     number;
    CAFE_GEMIDDELDE_AFSTAND_IN_KM?:                      number;
    GEBOORTE_TOTAAL:                                     number;
    GROTE_SUPERMARKT_GEMIDDELD_AANTAL_BINNEN_5_KM?:      number;
    PERCENTAGE_VERWEDUWD?:                               number;
    WINKELS_OV_DAGEL_LEVENSM_GEM_AANTAL_BINNEN_1_KM?:    number;
    DEKKINGSPERCENTAGE:                                  number;
    PERCENTAGE_PERSONEN_25_TOT_45_JAAR?:                 number;
    VOORTGEZET_ONDERWIJS_GEMIDDELD_AANTAL_BINNEN_3_KM?:  number;
    ID:                                                  number;
    PERCENTAGE_WESTERSE_MIGRATIEACHTERGROND?:            number;
    WARENHUIS_GEMIDDELDE_AFSTAND_IN_KM?:                 number;
    PERCENTAGE_PERSONEN_45_TOT_65_JAAR?:                 number;
    STERFTE_TOTAAL:                                      number;
    GEMIDDELDE_HUISHOUDSGROOTTE:                         number;
    MOTORTWEEWIELERS_TOTAAL:                             number;
    BUITENSCHOOLSE_OPVANG_GEMIDDELD_AANTAL_BINNEN_3_KM?: number;
    PERCENTAGE_LEEGSTAND_WONINGEN?:                      number;
    CAFETARIA_GEMIDDELD_AANTAL_BINNEN_3_KM?:             number;
    AANTAL_BEDRIJVEN_CULTUUR_RECREATIE_OVERIGE?:         number;
    PERCENTAGE_EENGEZINSWONING?:                         number;
    PERCENTAGE_KOOPWONINGEN?:                            number;
    KINDERDAGVERBLIJF_GEMIDDELDE_AFSTAND_IN_KM?:         number;
    ZONNEBANK_GEMIDDELDE_AFSTAND_IN_KM?:                 number;
    VMBO_GEMIDDELD_AANTAL_BINNEN_3_KM?:                  number;
    HOTEL_GEMIDDELD_AANTAL_BINNEN_5_KM?:                 number;
    ATTRACTIEPARK_GEMIDDELD_AANTAL_BINNEN_10_KM?:        number;
    PERCENTAGE_EENPERSOONSHUISHOUDENS?:                  number;
    VMBO_GEMIDDELD_AANTAL_BINNEN_10_KM?:                 number;
    HAVO_VWO_GEMIDDELD_AANTAL_BINNEN_10_KM?:             number;
    KUNSTIJSBAAN_GEMIDDELDE_AFSTAND_IN_KM?:              number;
    HUISARTSENPRAKTIJK_GEMIDDELDE_AFSTAND_IN_KM?:        number;
    PERSONENAUTOS_TOTAAL:                                number;
    AANTAL_BEDRIJVEN_NIJVERHEID_ENERGIE?:                number;
    PERSONENAUTOS_PER_HUISHOUDEN?:                       number;
    KINDERDAGVERBLIJF_GEMIDDELD_AANTAL_BINNEN_1_KM?:     number;
    PERCENTAGE_UIT_SURINAME?:                            number;
    BASISONDERWIJS_GEMIDDELD_AANTAL_BINNEN_5_KM?:        number;
    PERCENTAGE_ONGEHUWD?:                                number;
    PERCENTAGE_NIET_WESTERSE_MIGRATIEACHTERGROND?:       number;
    VOORTGEZET_ONDERWIJS_GEMIDDELD_AANTAL_BINNEN_5_KM?:  number;
    WINKELS_OV_DAGEL_LEVENSM_GEM_AANTAL_BINNEN_3_KM?:    number;
    CAFE_GEMIDDELD_AANTAL_BINNEN_1_KM?:                  number;
    AANTAL_PERSONENAUTOS_MET_OVERIGE_BRANDSTOF:          number;
    AANTAL_BEDRIJVEN_FINANCIEEL_ONROEREND_GOED?:         number;
    RESTAURANT_GEMIDDELD_AANTAL_BINNEN_5_KM?:            number;
    PERCENTAGE_UIT_NEDERLANDSE_ANTILLEN_EN_ARUBA?:       number;
    CAFETARIA_GEMIDDELDE_AFSTAND_IN_KM?:                 number;
    PERCENTAGE_BOUWJAARKLASSE_VANAF_2000?:               number;
    BUITENSCHOOLSE_OPVANG_GEMIDDELD_AANTAL_BINNEN_5_KM?: number;
    CAFETARIA_GEMIDDELD_AANTAL_BINNEN_5_KM?:             number;
    PERCENTAGE_PERSONEN_15_TOT_25_JAAR?:                 number;
    PERCENTAGE_HUURWONINGEN?:                            number;
    BIOSCOOP_GEMIDDELDE_AFSTAND_IN_KM?:                  number;
    RESTAURANT_GEMIDDELDE_AFSTAND_IN_KM?:                number;
    HAVO_VWO_GEMIDDELD_AANTAL_BINNEN_3_KM?:              number;
    INDELINGSWIJZIGING_WIJKEN_EN_BUURTEN:                number;
    HUISARTSENPRAKTIJK_GEMIDDELD_AANTAL_BINNEN_5_KM?:    number;
    BEVOLKINGSDICHTHEID_INWONERS_PER_KM_2?:              number;
    OPPERVLAKTE_WATER_IN_HA:                             number;
    PERC_HUURWONINGEN_IN_BEZIT_OVERIGE_VERHUURDERS?:     number;
    ATTRACTIEPARK_GEMIDDELD_AANTAL_BINNEN_50_KM?:        number;
    OPPERVLAKTE_LAND_IN_HA:                              number;
    WARENHUIS_GEMIDDELD_AANTAL_BINNEN_10_KM?:            number;
    BRANDWEERKAZERNE_GEMIDDELDE_AFSTAND_IN_KM?:          number;
    GEBOORTES_PER_1000_INWONERS:                         number;
    AANTAL_BEDRIJFSVESTIGINGEN:                          number;
    HAVO_VWO_GEMIDDELDE_AFSTAND_IN_KM?:                  number;
    JAAR:                                                number;
    PERCENTAGE_BOUWJAARKLASSE_TOT_2000?:                 number;
    PERCENTAGE_OVERIGE_NIETWESTERSEMIGRATIEACHTERGROND?: number;
    PERCENTAGE_HUISHOUDENS_ZONDER_KINDEREN?:             number;
    KINDERDAGVERBLIJF_GEMIDDELD_AANTAL_BINNEN_3_KM?:     number;
    BASISONDERWIJS_GEMIDDELD_AANTAL_BINNEN_3_KM?:        number;
    CAFE_GEMIDDELD_AANTAL_BINNEN_3_KM?:                  number;
    HOTEL_GEMIDDELD_AANTAL_BINNEN_10_KM?:                number;
    WINKELS_OV_DAGEL_LEVENSM_GEM_AANTAL_BINNEN_5_KM?:    number;
    AANTAL_BEDRIJVEN_VERVOER_INFORMATIE_COMMUNICATIE?:   number;
    INHABITANTS:                                         number;
    PERSONENAUTOS_PER_KM_2?:                             number;
    COLOR:                                               number;
    PERCENTAGE_BEWOOND?:                                 number;
    RESTAURANT_GEMIDDELD_AANTAL_BINNEN_3_KM?:            number;
    VROUWEN:                                             number;
    PERCENTAGE_WONINGEN_MET_EIGENDOM_ONBEKEND?:          number;
    MEEST_VOORKOMENDE_POSTCODE:                          number;
    PERCENTAGE_UIT_TURKIJE?:                             number;
    AANTAL_BEDRIJVEN_HANDEL_EN_HORECA?:                  number;
    WINKELS_OV_DAGELIJKSE_LEVENSM_GEM_AFST_IN_KM?:       number;
    BIOSCOOP_GEMIDDELD_AANTAL_BINNEN_10_KM?:             number;
    PERCENTAGE_PERSONEN_65_JAAR_EN_OUDER?:               number;
    GROTE_SUPERMARKT_GEMIDDELD_AANTAL_BINNEN_3_KM?:      number;
    AANTAL_INWONERS:                                     number;
    WARENHUIS_GEMIDDELD_AANTAL_BINNEN_5_KM?:             number;
    NAME:                                                string;
    HOTEL_GEMIDDELDE_AFSTAND_IN_KM?:                     number;
    PERCENTAGE_GEHUWD?:                                  number;
    AANTAL_BEDRIJVEN_LANDBOUW_BOSBOUW_VISSERIJ?:         number;
    AANTAL_PERSONENAUTOS_MET_BRANDSTOF_BENZINE:          number;
    GEMIDDELDE_WONINGWAARDE?:                            number;
    HUISARTSENPRAKTIJK_GEMIDDELD_AANTAL_BINNEN_3_KM?:    number;
    HAVO_VWO_GEMIDDELD_AANTAL_BINNEN_5_KM?:              number;
    SAUNA_GEMIDDELDE_AFSTAND_IN_KM?:                     number;
    BIBLIOTHEEK_GEMIDDELDE_AFSTAND_IN_KM?:               number;
    VOORTGEZET_ONDERWIJS_GEMIDDELD_AANTAL_BINNEN_10_KM?: number;
    PERCENTAGE_HUISHOUDENS_MET_KINDEREN?:                number;
    KINDERDAGVERBLIJF_GEMIDDELD_AANTAL_BINNEN_5_KM?:     number;
    VMBO_GEMIDDELDE_AFSTAND_IN_KM?:                      number;
    ATTRACTIEPARK_GEMIDDELDE_AFSTAND_IN_KM?:             number;
    ACTIVE:                                              number;
    BIOSCOOP_GEMIDDELD_AANTAL_BINNEN_5_KM?:              number;
    ZWEMBAD_GEMIDDELDE_AFSTAND_IN_KM?:                   number;
    ATTRACTIEPARK_GEMIDDELD_AANTAL_BINNEN_20_KM?:        number;
    PERCENTAGE_UIT_MAROKKO?:                             number;
    AANTAL_BEDRIJVEN_OVERHEID_ONDERWIJS_EN_ZORG?:        number;
    URBANIZATION:                                        number;
    AANTAL_BEDRIJVEN_ZAKELIJKE_DIENSTVERLENING?:         number;
    WONINGVOORRAAD:                                      number;
    CAFE_GEMIDDELD_AANTAL_BINNEN_5_KM?:                  number;
    BASISONDERWIJS_GEMIDDELD_AANTAL_BINNEN_1_KM?:        number;
    VOORTGEZET_ONDERWIJS_GEM_AFSTAND_IN_KM?:             number;
    BIOSCOOP_GEMIDDELD_AANTAL_BINNEN_20_KM?:             number;
    RESTAURANT_GEMIDDELD_AANTAL_BINNEN_1_KM?:            number;
    BASISONDERWIJS_GEMIDDELDE_AFSTAND_IN_KM?:            number;
    GROTE_SUPERMARKT_GEMIDDELDE_AFSTAND_IN_KM?:          number;
    OPPERVLAKTE_TOTAAL_IN_HA:                            number;
    MANNEN:                                              number;
    STERFTE_RELATIEF:                                    number;
    GROTE_SUPERMARKT_GEMIDDELD_AANTAL_BINNEN_1_KM?:      number;
    PERCENTAGE_MEERGEZINSWONING?:                        number;
    BUITENSCHOOLSE_OPVANG_GEM_AFSTAND_IN_KM?:            number;
    CAFETARIA_GEMIDDELD_AANTAL_BINNEN_1_KM?:             number;
    PERC_HUURWONINGEN_IN_BEZIT_WONINGCORPORATIES?:       number;
    BUITENSCHOOLSE_OPVANG_GEMIDDELD_AANTAL_BINNEN_1_KM?: number;
    OMGEVINGSADRESSENDICHTHEID:                          number;
    WARENHUIS_GEMIDDELD_AANTAL_BINNEN_20_KM?:            number;
    APOTHEEK_GEMIDDELDE_AFSTAND_IN_KM?:                  number;
    HUISARTSENPRAKTIJK_GEMIDDELD_AANTAL_BINNEN_1_KM?:    number;
    AANTAL_HUISHOUDENS:                                  number;
    VMBO_GEMIDDELD_AANTAL_BINNEN_5_KM?:                  number;
}

export enum FeatureType {
    Feature = "Feature",
}







// 1291090_en_lab_mep-neighborhoods =`[{"PERCENTAGE SEPARATED":"PERCENTAGE GESCHEID","PERCENTAGE GESCHEID":"PERCENTAGE SEPARATED"},{"HOTEL AVERAGE NUMBER WITHIN 20 KM":"HOTEL GEMIDDELD AANTAL BINNEN 20 KM","HOTEL GEMIDDELD AANTAL BINNEN 20 KM":"HOTEL AVERAGE NUMBER WITHIN 20 KM"},{"PERCENTAGE OF PEOPLE 0 TO 15 YEARS":"PERCENTAGE PERSONEN 0 TOT 15 JAAR","PERCENTAGE PERSONEN 0 TOT 15 JAAR":"PERCENTAGE OF PEOPLE 0 TO 15 YEARS"},{"URBANITY ADDRESSES PER KM 2":"STEDELIJKHEID ADRESSEN PER KM 2","STEDELIJKHEID ADRESSEN PER KM 2":"URBANITY ADDRESSES PER KM 2"},{"CAFE AVERAGE DISTANCE IN KM":"CAFE GEMIDDELDE AFSTAND IN KM","CAFE GEMIDDELDE AFSTAND IN KM":"CAFE AVERAGE DISTANCE IN KM"},{"BIRTH TOTAL":"GEBOORTE TOTAAL","GEBOORTE TOTAAL":"BIRTH TOTAL"},{"LARGE SUPERMARKET AVERAGE NUMBER WITHIN 5 KM":"GROTE SUPERMARKT GEMIDDELD AANTAL BINNEN 5 KM","GROTE SUPERMARKT GEMIDDELD AANTAL BINNEN 5 KM":"LARGE SUPERMARKET AVERAGE NUMBER WITHIN 5 KM"},{"PERCENTAGE WIDOWED":"PERCENTAGE VERWEDUWD","PERCENTAGE VERWEDUWD":"PERCENTAGE WIDOWED"},{"SHOPS TRANSPORT DAILY L EVENSM AVERAGE NUMBER IN 1 KM":"WINKELS OV DAGEL LEVENSM GEM AANTAL BINNEN 1 KM","WINKELS OV DAGEL LEVENSM GEM AANTAL BINNEN 1 KM":"SHOPS TRANSPORT DAILY L EVENSM AVERAGE NUMBER IN 1 KM"},{"COVERAGE PERCENTAGE":"DEKKINGSPERCENTAGE","DEKKINGSPERCENTAGE":"COVERAGE PERCENTAGE"},{"PERCENTAGE OF PERSONS 25 TO 45 YEARS":"PERCENTAGE PERSONEN 25 TOT 45 JAAR","PERCENTAGE PERSONEN 25 TOT 45 JAAR":"PERCENTAGE OF PERSONS 25 TO 45 YEARS"},{"SECONDARY EDUCATION AVERAGE NUMBER WITHIN 3 KM":"VOORTGEZET ONDERWIJS GEMIDDELD AANTAL BINNEN 3 KM","VOORTGEZET ONDERWIJS GEMIDDELD AANTAL BINNEN 3 KM":"SECONDARY EDUCATION AVERAGE NUMBER WITHIN 3 KM"},{"ID":"ID"},{"PERCENTAGE OF WESTERN MIGRATION BACKGROUND":"PERCENTAGE WESTERSE MIGRATIEACHTERGROND","PERCENTAGE WESTERSE MIGRATIEACHTERGROND":"PERCENTAGE OF WESTERN MIGRATION BACKGROUND"},{"DEPARTMENT STORE AVERAGE DISTANCE IN KM":"WARENHUIS GEMIDDELDE AFSTAND IN KM","WARENHUIS GEMIDDELDE AFSTAND IN KM":"DEPARTMENT STORE AVERAGE DISTANCE IN KM"},{"PERCENTAGE OF PERSONS 45 TO 65 YEARS":"PERCENTAGE PERSONEN 45 TOT 65 JAAR","PERCENTAGE PERSONEN 45 TOT 65 JAAR":"PERCENTAGE OF PERSONS 45 TO 65 YEARS"},{"TOTAL MORTALITY":"STERFTE TOTAAL","STERFTE TOTAAL":"TOTAL MORTALITY"},{"AVERAGE HOUSEHOLD SIZE":"GEMIDDELDE HUISHOUDSGROOTTE","GEMIDDELDE HUISHOUDSGROOTTE":"AVERAGE HOUSEHOLD SIZE"},{"TWO-WHEELED MOTORCYCLES TOTAL":"MOTORTWEEWIELERS TOTAAL","MOTORTWEEWIELERS TOTAAL":"TWO-WHEELED MOTORCYCLES TOTAL"},{"OUT-of-SCHOOL CARE AVERAGE NUMBER WITHIN 3 KM":"BUITENSCHOOLSE OPVANG GEMIDDELD AANTAL BINNEN 3 KM","BUITENSCHOOLSE OPVANG GEMIDDELD AANTAL BINNEN 3 KM":"OUT-of-SCHOOL CARE AVERAGE NUMBER WITHIN 3 KM"},{"PERCENTAGE OF VACANT HOUSES":"PERCENTAGE LEEGSTAND WONINGEN","PERCENTAGE LEEGSTAND WONINGEN":"PERCENTAGE OF VACANT HOUSES"},{"CAFETERIA AVERAGE NUMBER WITHIN 3 KM":"CAFETARIA GEMIDDELD AANTAL BINNEN 3 KM","CAFETARIA GEMIDDELD AANTAL BINNEN 3 KM":"CAFETERIA AVERAGE NUMBER WITHIN 3 KM"},{"NUMBER OF BUSINESSES CULTURE RECREATION OTHER":"AANTAL BEDRIJVEN CULTUUR RECREATIE OVERIGE","AANTAL BEDRIJVEN CULTUUR RECREATIE OVERIGE":"NUMBER OF BUSINESSES CULTURE RECREATION OTHER"},{"PERCENTAGE OF SINGLE-FAMILY HOUSES":"PERCENTAGE EENGEZINSWONING","PERCENTAGE EENGEZINSWONING":"PERCENTAGE OF SINGLE-FAMILY HOUSES"},{"PERCENTAGE OF OWNERSHIP":"PERCENTAGE KOOPWONINGEN","PERCENTAGE KOOPWONINGEN":"PERCENTAGE OF OWNERSHIP"},{"CHILDREN'S CARE AVERAGE DISTANCE IN KM":"KINDERDAGVERBLIJF GEMIDDELDE AFSTAND IN KM","KINDERDAGVERBLIJF GEMIDDELDE AFSTAND IN KM":"CHILDREN'S CARE AVERAGE DISTANCE IN KM"},{"SUNBANK AVERAGE DISTANCE IN KM":"ZONNEBANK GEMIDDELDE AFSTAND IN KM","ZONNEBANK GEMIDDELDE AFSTAND IN KM":"SUNBANK AVERAGE DISTANCE IN KM"},{"VMBO AVERAGE NUMBER WITHIN 3 KM":"VMBO GEMIDDELD AANTAL BINNEN 3 KM","VMBO GEMIDDELD AANTAL BINNEN 3 KM":"VMBO AVERAGE NUMBER WITHIN 3 KM"},{"HOTEL AVERAGE NUMBER WITHIN 5 KM":"HOTEL GEMIDDELD AANTAL BINNEN 5 KM","HOTEL GEMIDDELD AANTAL BINNEN 5 KM":"HOTEL AVERAGE NUMBER WITHIN 5 KM"},{"AVERAGE NUMBER WITHIN 10 KM":"ATTRACTIEPARK GEMIDDELD AANTAL BINNEN 10 KM","ATTRACTIEPARK GEMIDDELD AANTAL BINNEN 10 KM":"AVERAGE NUMBER WITHIN 10 KM"},{"PERCENTAGE OF SINGLE HOUSEHOLDS":"PERCENTAGE EENPERSOONSHUISHOUDENS","PERCENTAGE EENPERSOONSHUISHOUDENS":"PERCENTAGE OF SINGLE HOUSEHOLDS"},{"VMBO AVERAGE NUMBER WITHIN 10 KM":"VMBO GEMIDDELD AANTAL BINNEN 10 KM","VMBO GEMIDDELD AANTAL BINNEN 10 KM":"VMBO AVERAGE NUMBER WITHIN 10 KM"},{"HAVO VWO AVERAGE NUMBER WITHIN 10 KM":"HAVO VWO GEMIDDELD AANTAL BINNEN 10 KM","HAVO VWO GEMIDDELD AANTAL BINNEN 10 KM":"HAVO VWO AVERAGE NUMBER WITHIN 10 KM"},{"ARTIFICIAL RACK AVERAGE DISTANCE IN KM":"KUNSTIJSBAAN GEMIDDELDE AFSTAND IN KM","KUNSTIJSBAAN GEMIDDELDE AFSTAND IN KM":"ARTIFICIAL RACK AVERAGE DISTANCE IN KM"},{"GP PRACTICE AVERAGE DISTANCE IN KM M":"HUISARTSENPRAKTIJK GEMIDDELDE AFSTAND IN KM","HUISARTSENPRAKTIJK GEMIDDELDE AFSTAND IN KM":"GP PRACTICE AVERAGE DISTANCE IN KM M"},{"TOTAL PERSONAL VEHICLES":"PERSONENAUTOS TOTAAL","PERSONENAUTOS TOTAAL":"TOTAL PERSONAL VEHICLES"},{"NUMBER OF COMPANIES INDUSTRY ENERGY":"AANTAL BEDRIJVEN NIJVERHEID ENERGIE","AANTAL BEDRIJVEN NIJVERHEID ENERGIE":"NUMBER OF COMPANIES INDUSTRY ENERGY"},{"PERSONAL CARS PER HOUSEHOLD":"PERSONENAUTOS PER HUISHOUDEN","PERSONENAUTOS PER HUISHOUDEN":"PERSONAL CARS PER HOUSEHOLD"},{"CHILDREN'S CARE AVERAGE NUMBER WITHIN 1 KM":"KINDERDAGVERBLIJF GEMIDDELD AANTAL BINNEN 1 KM","KINDERDAGVERBLIJF GEMIDDELD AANTAL BINNEN 1 KM":"CHILDREN'S CARE AVERAGE NUMBER WITHIN 1 KM"},{"PERCENTAGE FROM SURINAME":"PERCENTAGE UIT SURINAME","PERCENTAGE UIT SURINAME":"PERCENTAGE FROM SURINAME"},{"PRIMARY EDUCATION AVERAGE NUMBER WITHIN 5 KM":"BASISONDERWIJS GEMIDDELD AANTAL BINNEN 5 KM","BASISONDERWIJS GEMIDDELD AANTAL BINNEN 5 KM":"PRIMARY EDUCATION AVERAGE NUMBER WITHIN 5 KM"},{"PERCENTAGE OF UN MARRIED":"PERCENTAGE ONGEHUWD","PERCENTAGE ONGEHUWD":"PERCENTAGE OF UN MARRIED"},{"PERCENTAGE OF NON-WESTERN MIGRATION BACKGROUND":"PERCENTAGE NIET WESTERSE MIGRATIEACHTERGROND","PERCENTAGE NIET WESTERSE MIGRATIEACHTERGROND":"PERCENTAGE OF NON-WESTERN MIGRATION BACKGROUND"},{"SECONDARY EDUCATION AVERAGE NUMBER WITHIN 5 KM":"VOORTGEZET ONDERWIJS GEMIDDELD AANTAL BINNEN 5 KM","VOORTGEZET ONDERWIJS GEMIDDELD AANTAL BINNEN 5 KM":"SECONDARY EDUCATION AVERAGE NUMBER WITHIN 5 KM"},{"SHOPS TRANSPORT DAY LIFESM AVERAGE NUMBER WITHIN 3 KM":"WINKELS OV DAGEL LEVENSM GEM AANTAL BINNEN 3 KM","WINKELS OV DAGEL LEVENSM GEM AANTAL BINNEN 3 KM":"SHOPS TRANSPORT DAY LIFESM AVERAGE NUMBER WITHIN 3 KM"},{"CAFE AVERAGE NUMBER WITHIN 1 KM":"CAFE GEMIDDELD AANTAL BINNEN 1 KM","CAFE GEMIDDELD AANTAL BINNEN 1 KM":"CAFE AVERAGE NUMBER WITHIN 1 KM"},{"NUMBER OF PASSENGER VEHICLES WITH OTHER FUEL":"AANTAL PERSONENAUTOS MET OVERIGE BRANDSTOF","AANTAL PERSONENAUTOS MET OVERIGE BRANDSTOF":"NUMBER OF PASSENGER VEHICLES WITH OTHER FUEL"},{"NUMBER OF FINANCIAL PROPERTY BUSINESSES":"AANTAL BEDRIJVEN FINANCIEEL ONROEREND GOED","AANTAL BEDRIJVEN FINANCIEEL ONROEREND GOED":"NUMBER OF FINANCIAL PROPERTY BUSINESSES"},{"RESTAURANT AVERAGE NUMBER WITHIN 5 KM":"RESTAURANT GEMIDDELD AANTAL BINNEN 5 KM","RESTAURANT GEMIDDELD AANTAL BINNEN 5 KM":"RESTAURANT AVERAGE NUMBER WITHIN 5 KM"},{"PERCENTAGE FROM THE NETHERLANDS ANTILLES AND ARUBA":"PERCENTAGE UIT NEDERLANDSE ANTILLEN EN ARUBA","PERCENTAGE UIT NEDERLANDSE ANTILLEN EN ARUBA":"PERCENTAGE FROM THE NETHERLANDS ANTILLES AND ARUBA"},{"CAFETERIA AVERAGE DISTANCE IN KM":"CAFETARIA GEMIDDELDE AFSTAND IN KM","CAFETARIA GEMIDDELDE AFSTAND IN KM":"CAFETERIA AVERAGE DISTANCE IN KM"},{"PERCENTAGE OF BUILDING YEAR CLASS FROM 2000":"PERCENTAGE BOUWJAARKLASSE VANAF 2000","PERCENTAGE BOUWJAARKLASSE VANAF 2000":"PERCENTAGE OF BUILDING YEAR CLASS FROM 2000"},{"OUT OF SCHOOL CARE AVERAGE NUMBER WITHIN 5 KM":"BUITENSCHOOLSE OPVANG GEMIDDELD AANTAL BINNEN 5 KM","BUITENSCHOOLSE OPVANG GEMIDDELD AANTAL BINNEN 5 KM":"OUT OF SCHOOL CARE AVERAGE NUMBER WITHIN 5 KM"},{"CAFETERIA AVERAGE NUMBER WITHIN 5 KM":"CAFETARIA GEMIDDELD AANTAL BINNEN 5 KM","CAFETARIA GEMIDDELD AANTAL BINNEN 5 KM":"CAFETERIA AVERAGE NUMBER WITHIN 5 KM"},{"PERCENTAGE OF PERSONS 15 TO 25 YEARS":"PERCENTAGE PERSONEN 15 TOT 25 JAAR","PERCENTAGE PERSONEN 15 TOT 25 JAAR":"PERCENTAGE OF PERSONS 15 TO 25 YEARS"},{"PERCENTAGE OF RENTAL HOUSES":"PERCENTAGE HUURWONINGEN","PERCENTAGE HUURWONINGEN":"PERCENTAGE OF RENTAL HOUSES"},{"CINEMA AVERAGE DISTANCE IN KM":"BIOSCOOP GEMIDDELDE AFSTAND IN KM","BIOSCOOP GEMIDDELDE AFSTAND IN KM":"CINEMA AVERAGE DISTANCE IN KM"},{"RESTAURANT AVERAGE DISTANCE IN KM":"RESTAURANT GEMIDDELDE AFSTAND IN KM","RESTAURANT GEMIDDELDE AFSTAND IN KM":"RESTAURANT AVERAGE DISTANCE IN KM"},{"HAVO VWO AVERAGE NUMBER WITHIN 3 KM":"HAVO VWO GEMIDDELD AANTAL BINNEN 3 KM","HAVO VWO GEMIDDELD AANTAL BINNEN 3 KM":"HAVO VWO AVERAGE NUMBER WITHIN 3 KM"},{"CHANGE OF LAYOUT NEIGHBORHOODS AND NEIGHBORHOODS":"INDELINGSWIJZIGING WIJKEN EN BUURTEN","INDELINGSWIJZIGING WIJKEN EN BUURTEN":"CHANGE OF LAYOUT NEIGHBORHOODS AND NEIGHBORHOODS"},{"GPs PRACTICE AVERAGE NUMBER WITHIN 5 KM":"HUISARTSENPRAKTIJK GEMIDDELD AANTAL BINNEN 5 KM","HUISARTSENPRAKTIJK GEMIDDELD AANTAL BINNEN 5 KM":"GPs PRACTICE AVERAGE NUMBER WITHIN 5 KM"},{"POPULATION DENSITY INHABITANTS PER KM 2":"BEVOLKINGSDICHTHEID INWONERS PER KM 2","BEVOLKINGSDICHTHEID INWONERS PER KM 2":"POPULATION DENSITY INHABITANTS PER KM 2"},{"AREA OF WATER IN HA":"OPPERVLAKTE WATER IN HA","OPPERVLAKTE WATER IN HA":"AREA OF WATER IN HA"},{"PERC RENTAL HOUSES OWNED OTHER LANDERS":"PERC HUURWONINGEN IN BEZIT OVERIGE VERHUURDERS","PERC HUURWONINGEN IN BEZIT OVERIGE VERHUURDERS":"PERC RENTAL HOUSES OWNED OTHER LANDERS"},{"AVERAGE NUMBER OF AREA WITHIN 50 KM":"ATTRACTIEPARK GEMIDDELD AANTAL BINNEN 50 KM","ATTRACTIEPARK GEMIDDELD AANTAL BINNEN 50 KM":"AVERAGE NUMBER OF AREA WITHIN 50 KM"},{"AREA OF LAND IN HA":"OPPERVLAKTE LAND IN HA","OPPERVLAKTE LAND IN HA":"AREA OF LAND IN HA"},{"DEPARTMENT STORE AVERAGE NUMBER WITHIN 10 KM":"WARENHUIS GEMIDDELD AANTAL BINNEN 10 KM","WARENHUIS GEMIDDELD AANTAL BINNEN 10 KM":"DEPARTMENT STORE AVERAGE NUMBER WITHIN 10 KM"},{"FIRE STATION AVERAGE DISTANCE IN KM":"BRANDWEERKAZERNE GEMIDDELDE AFSTAND IN KM","BRANDWEERKAZERNE GEMIDDELDE AFSTAND IN KM":"FIRE STATION AVERAGE DISTANCE IN KM"},{"BIRTH PER 1000 INHABITANTS":"GEBOORTES PER 1000 INWONERS","GEBOORTES PER 1000 INWONERS":"BIRTH PER 1000 INHABITANTS"},{"NUMBER OF BUSINESS ESTABLISHMENTS":"AANTAL BEDRIJFSVESTIGINGEN","AANTAL BEDRIJFSVESTIGINGEN":"NUMBER OF BUSINESS ESTABLISHMENTS"},{"HAVO VWO AVERAGE DISTANCE IN KM":"HAVO VWO GEMIDDELDE AFSTAND IN KM","HAVO VWO GEMIDDELDE AFSTAND IN KM":"HAVO VWO AVERAGE DISTANCE IN KM"},{"YEAR":"JAAR","JAAR":"YEAR"},{"PERCENTAGE OF BUILDING YEAR CLASS UNTIL 2000":"PERCENTAGE BOUWJAARKLASSE TOT 2000","PERCENTAGE BOUWJAARKLASSE TOT 2000":"PERCENTAGE OF BUILDING YEAR CLASS UNTIL 2000"},{"PERCENTAGE OF OTHER NON-WESTERN SEMIGRATION BACKGROUND":"PERCENTAGE OVERIGE NIETWESTERSEMIGRATIEACHTERGROND","PERCENTAGE OVERIGE NIETWESTERSEMIGRATIEACHTERGROND":"PERCENTAGE OF OTHER NON-WESTERN SEMIGRATION BACKGROUND"},{"PERCENTAGE OF HOUSEHOLDS WITHOUT CHILDREN":"PERCENTAGE HUISHOUDENS ZONDER KINDEREN","PERCENTAGE HUISHOUDENS ZONDER KINDEREN":"PERCENTAGE OF HOUSEHOLDS WITHOUT CHILDREN"},{"CHILDREN'S AVERAGE NUMBER WITHIN 3 KM":"KINDERDAGVERBLIJF GEMIDDELD AANTAL BINNEN 3 KM","KINDERDAGVERBLIJF GEMIDDELD AANTAL BINNEN 3 KM":"CHILDREN'S AVERAGE NUMBER WITHIN 3 KM"},{"PRIMARY EDUCATION AVERAGE NUMBER WITHIN 3 KM":"BASISONDERWIJS GEMIDDELD AANTAL BINNEN 3 KM","BASISONDERWIJS GEMIDDELD AANTAL BINNEN 3 KM":"PRIMARY EDUCATION AVERAGE NUMBER WITHIN 3 KM"},{"CAFE AVERAGE NUMBER WITHIN 3 KM":"CAFE GEMIDDELD AANTAL BINNEN 3 KM","CAFE GEMIDDELD AANTAL BINNEN 3 KM":"CAFE AVERAGE NUMBER WITHIN 3 KM"},{"HOTEL AVERAGE NUMBER WITHIN 10 KM":"HOTEL GEMIDDELD AANTAL BINNEN 10 KM","HOTEL GEMIDDELD AANTAL BINNEN 10 KM":"HOTEL AVERAGE NUMBER WITHIN 10 KM"},{"SHOPS TRANSPORT DAILY LIFE AVERAGE NUMBER WITHIN 5 KM":"WINKELS OV DAGEL LEVENSM GEM AANTAL BINNEN 5 KM","WINKELS OV DAGEL LEVENSM GEM AANTAL BINNEN 5 KM":"SHOPS TRANSPORT DAILY LIFE AVERAGE NUMBER WITHIN 5 KM"},{"NUMBER OF BUSINESSES TRANSPORT INFORMATION COMMUNICATION":"AANTAL BEDRIJVEN VERVOER INFORMATIE COMMUNICATIE","AANTAL BEDRIJVEN VERVOER INFORMATIE COMMUNICATIE":"NUMBER OF BUSINESSES TRANSPORT INFORMATION COMMUNICATION"},{"INHABITANTS":"INHABITANTS"},{"PASSENGER CARS PER KM 2":"PERSONENAUTOS PER KM 2","PERSONENAUTOS PER KM 2":"PASSENGER CARS PER KM 2"},{"COLOR":"COLOR"},{"PERCENTAGE OCCUPIED":"PERCENTAGE BEWOOND","PERCENTAGE BEWOOND":"PERCENTAGE OCCUPIED"},{"RESTAURANT AVERAGE NUMBER WITHIN 3 KM":"RESTAURANT GEMIDDELD AANTAL BINNEN 3 KM","RESTAURANT GEMIDDELD AANTAL BINNEN 3 KM":"RESTAURANT AVERAGE NUMBER WITHIN 3 KM"},{"WOMEN":"VROUWEN","VROUWEN":"WOMEN"},{"PERCENTAGE OF HOUSES WITH OWNERSHIP UNKNOWN":"PERCENTAGE WONINGEN MET EIGENDOM ONBEKEND","PERCENTAGE WONINGEN MET EIGENDOM ONBEKEND":"PERCENTAGE OF HOUSES WITH OWNERSHIP UNKNOWN"},{"MOST COMMON ZIP CODE":"MEEST VOORKOMENDE POSTCODE","MEEST VOORKOMENDE POSTCODE":"MOST COMMON ZIP CODE"},{"PERCENTAGE OUT TURKEY":"PERCENTAGE UIT TURKIJE","PERCENTAGE UIT TURKIJE":"PERCENTAGE OUT TURKEY"},{"NUMBER OF TRADING AND HORECA BUSINESSES":"AANTAL BEDRIJVEN HANDEL EN HORECA","AANTAL BEDRIJVEN HANDEL EN HORECA":"NUMBER OF TRADING AND HORECA BUSINESSES"},{"SHOPS TRANSPORT DAILY LIFESM AVERAGE DISTANCE IN KM":"WINKELS OV DAGELIJKSE LEVENSM GEM AFST IN KM","WINKELS OV DAGELIJKSE LEVENSM GEM AFST IN KM":"SHOPS TRANSPORT DAILY LIFESM AVERAGE DISTANCE IN KM"},{"CINEMA AVERAGE NUMBER WITHIN 10 KM":"BIOSCOOP GEMIDDELD AANTAL BINNEN 10 KM","BIOSCOOP GEMIDDELD AANTAL BINNEN 10 KM":"CINEMA AVERAGE NUMBER WITHIN 10 KM"},{"PERCENTAGE OF PERSONS 65 YEARS AND OVER":"PERCENTAGE PERSONEN 65 JAAR EN OUDER","PERCENTAGE PERSONEN 65 JAAR EN OUDER":"PERCENTAGE OF PERSONS 65 YEARS AND OVER"},{"LARGE SUPERMARKET AVERAGE NUMBER WITHIN 3 KM":"GROTE SUPERMARKT GEMIDDELD AANTAL BINNEN 3 KM","GROTE SUPERMARKT GEMIDDELD AANTAL BINNEN 3 KM":"LARGE SUPERMARKET AVERAGE NUMBER WITHIN 3 KM"},{"NUMBER OF INHABITANTS":"AANTAL INWONERS","AANTAL INWONERS":"NUMBER OF INHABITANTS"},{"DEPARTMENT STORE AVERAGE NUMBER INSIDE 5 KM":"WARENHUIS GEMIDDELD AANTAL BINNEN 5 KM","WARENHUIS GEMIDDELD AANTAL BINNEN 5 KM":"DEPARTMENT STORE AVERAGE NUMBER INSIDE 5 KM"},{"NAME":"NAME"},{"HOTEL AVERAGE DISTANCE IN KM":"HOTEL GEMIDDELDE AFSTAND IN KM","HOTEL GEMIDDELDE AFSTAND IN KM":"HOTEL AVERAGE DISTANCE IN KM"},{"PERCENTAGE OF MARRIED":"PERCENTAGE GEHUWD","PERCENTAGE GEHUWD":"PERCENTAGE OF MARRIED"},{"NUMBER OF BUSINESSES AGRICULTURE FORESTRY FISHING":"AANTAL BEDRIJVEN LANDBOUW BOSBOUW VISSERIJ","AANTAL BEDRIJVEN LANDBOUW BOSBOUW VISSERIJ":"NUMBER OF BUSINESSES AGRICULTURE FORESTRY FISHING"},{"NUMBER OF PASSENGER CARS WITH FUEL GASOLINE":"AANTAL PERSONENAUTOS MET BRANDSTOF BENZINE","AANTAL PERSONENAUTOS MET BRANDSTOF BENZINE":"NUMBER OF PASSENGER CARS WITH FUEL GASOLINE"},{"AVERAGE HOUSING VALUE":"GEMIDDELDE WONINGWAARDE","GEMIDDELDE WONINGWAARDE":"AVERAGE HOUSING VALUE"},{"GP PRACTICE AVERAGE NUMBER WITHIN 3 KM":"HUISARTSENPRAKTIJK GEMIDDELD AANTAL BINNEN 3 KM","HUISARTSENPRAKTIJK GEMIDDELD AANTAL BINNEN 3 KM":"GP PRACTICE AVERAGE NUMBER WITHIN 3 KM"},{"HAVO VWO AVERAGE NUMBER WITHIN 5 KM":"HAVO VWO GEMIDDELD AANTAL BINNEN 5 KM","HAVO VWO GEMIDDELD AANTAL BINNEN 5 KM":"HAVO VWO AVERAGE NUMBER WITHIN 5 KM"},{"SAUN A AVERAGE DISTANCE IN KM":"SAUNA GEMIDDELDE AFSTAND IN KM","SAUNA GEMIDDELDE AFSTAND IN KM":"SAUN A AVERAGE DISTANCE IN KM"},{"LIBRARY AVERAGE DISTANCE IN KM":"BIBLIOTHEEK GEMIDDELDE AFSTAND IN KM","BIBLIOTHEEK GEMIDDELDE AFSTAND IN KM":"LIBRARY AVERAGE DISTANCE IN KM"},{"SECONDARY EDUCATION AVERAGE NUMBER WITHIN 10 KM":"VOORTGEZET ONDERWIJS GEMIDDELD AANTAL BINNEN 10 KM","VOORTGEZET ONDERWIJS GEMIDDELD AANTAL BINNEN 10 KM":"SECONDARY EDUCATION AVERAGE NUMBER WITHIN 10 KM"},{"PERCENTAGE OF HOUSEHOLDS WITH CHILDREN":"PERCENTAGE HUISHOUDENS MET KINDEREN","PERCENTAGE HUISHOUDENS MET KINDEREN":"PERCENTAGE OF HOUSEHOLDS WITH CHILDREN"},{"CHILDREN'S CARE AVERAGE NUMBER WITHIN 5 KM":"KINDERDAGVERBLIJF GEMIDDELD AANTAL BINNEN 5 KM","KINDERDAGVERBLIJF GEMIDDELD AANTAL BINNEN 5 KM":"CHILDREN'S CARE AVERAGE NUMBER WITHIN 5 KM"},{"VMBO AVERAGE DISTANCE IN KM":"VMBO GEMIDDELDE AFSTAND IN KM","VMBO GEMIDDELDE AFSTAND IN KM":"VMBO AVERAGE DISTANCE IN KM"},{"Amusement PARK AVERAGE DISTANCE IN KM":"ATTRACTIEPARK GEMIDDELDE AFSTAND IN KM","ATTRACTIEPARK GEMIDDELDE AFSTAND IN KM":"Amusement PARK AVERAGE DISTANCE IN KM"},{"ACTIVE":"ACTIVE"},{"CINEMA AVERAGE NUMBER WITHIN 5 KM":"BIOSCOOP GEMIDDELD AANTAL BINNEN 5 KM","BIOSCOOP GEMIDDELD AANTAL BINNEN 5 KM":"CINEMA AVERAGE NUMBER WITHIN 5 KM"},{"SWIMMING POOL AVERAGE DISTANCE IN KM":"ZWEMBAD GEMIDDELDE AFSTAND IN KM","ZWEMBAD GEMIDDELDE AFSTAND IN KM":"SWIMMING POOL AVERAGE DISTANCE IN KM"},{"ATTRACTION PARK AVERAGE NUMBER WITHIN 20 KM":"ATTRACTIEPARK GEMIDDELD AANTAL BINNEN 20 KM","ATTRACTIEPARK GEMIDDELD AANTAL BINNEN 20 KM":"ATTRACTION PARK AVERAGE NUMBER WITHIN 20 KM"},{"PERCENTAGE FROM MOROCCO":"PERCENTAGE UIT MAROKKO","PERCENTAGE UIT MAROKKO":"PERCENTAGE FROM MOROCCO"},{"NUMBER OF COMPANIES GOVERNMENT EDUCATION AND HEALTHCARE":"AANTAL BEDRIJVEN OVERHEID ONDERWIJS EN ZORG","AANTAL BEDRIJVEN OVERHEID ONDERWIJS EN ZORG":"NUMBER OF COMPANIES GOVERNMENT EDUCATION AND HEALTHCARE"},{"URBANIZATION":"URBANIZATION"},{"NUMBER OF BUSINESS SERVICES":"AANTAL BEDRIJVEN ZAKELIJKE DIENSTVERLENING","AANTAL BEDRIJVEN ZAKELIJKE DIENSTVERLENING":"NUMBER OF BUSINESS SERVICES"},{"HOUSING STOCK":"WONINGVOORRAAD","WONINGVOORRAAD":"HOUSING STOCK"},{"CAFE AVERAGE NUMBER WITHIN 5 KM":"CAFE GEMIDDELD AANTAL BINNEN 5 KM","CAFE GEMIDDELD AANTAL BINNEN 5 KM":"CAFE AVERAGE NUMBER WITHIN 5 KM"},{"PRIMARY EDUCATION AVERAGE NUMBER WITHIN 1 KM":"BASISONDERWIJS GEMIDDELD AANTAL BINNEN 1 KM","BASISONDERWIJS GEMIDDELD AANTAL BINNEN 1 KM":"PRIMARY EDUCATION AVERAGE NUMBER WITHIN 1 KM"},{"CONTINUING ET EDUCATION AVERAGE DISTANCE IN KM":"VOORTGEZET ONDERWIJS GEM AFSTAND IN KM","VOORTGEZET ONDERWIJS GEM AFSTAND IN KM":"CONTINUING ET EDUCATION AVERAGE DISTANCE IN KM"},{"CINEMA AVERAGE NUMBER WITHIN 20 KM":"BIOSCOOP GEMIDDELD AANTAL BINNEN 20 KM","BIOSCOOP GEMIDDELD AANTAL BINNEN 20 KM":"CINEMA AVERAGE NUMBER WITHIN 20 KM"},{"RESTAURANT AVERAGE NUMBER WITHIN 1 KM":"RESTAURANT GEMIDDELD AANTAL BINNEN 1 KM","RESTAURANT GEMIDDELD AANTAL BINNEN 1 KM":"RESTAURANT AVERAGE NUMBER WITHIN 1 KM"},{"PRIMARY EDUCATION AVERAGE DISTANCE IN KM":"BASISONDERWIJS GEMIDDELDE AFSTAND IN KM","BASISONDERWIJS GEMIDDELDE AFSTAND IN KM":"PRIMARY EDUCATION AVERAGE DISTANCE IN KM"},{"LARGE SUPERMARKET AVERAGE DISTANCE IN KM":"GROTE SUPERMARKT GEMIDDELDE AFSTAND IN KM","GROTE SUPERMARKT GEMIDDELDE AFSTAND IN KM":"LARGE SUPERMARKET AVERAGE DISTANCE IN KM"},{"AREA TOTAL IN HA":"OPPERVLAKTE TOTAAL IN HA","OPPERVLAKTE TOTAAL IN HA":"AREA TOTAL IN HA"},{"MEN":"MANNEN","MANNEN":"MEN"},{"MORTALITY RELATIVE":"STERFTE RELATIEF","STERFTE RELATIEF":"MORTALITY RELATIVE"},{"LARGE SUPERMARKET AVERAGE NUMBER WITHIN 1 KM":"GROTE SUPERMARKT GEMIDDELD AANTAL BINNEN 1 KM","GROTE SUPERMARKT GEMIDDELD AANTAL BINNEN 1 KM":"LARGE SUPERMARKET AVERAGE NUMBER WITHIN 1 KM"},{"PERCENTAGE OF MULTI-FAMILY HOUSE":"PERCENTAGE MEERGEZINSWONING","PERCENTAGE MEERGEZINSWONING":"PERCENTAGE OF MULTI-FAMILY HOUSE"},{"OUT-of-SCHOOL CARE AVERAGE DISTANCE IN KM":"BUITENSCHOOLSE OPVANG GEM AFSTAND IN KM","BUITENSCHOOLSE OPVANG GEM AFSTAND IN KM":"OUT-of-SCHOOL CARE AVERAGE DISTANCE IN KM"},{"CAFETERIA AVERAGE NUMBER WITHIN 1 KM":"CAFETARIA GEMIDDELD AANTAL BINNEN 1 KM","CAFETARIA GEMIDDELD AANTAL BINNEN 1 KM":"CAFETERIA AVERAGE NUMBER WITHIN 1 KM"},{"PERC RENTAL HOUSES OWNED HOUSING CORPORATIONS":"PERC HUURWONINGEN IN BEZIT WONINGCORPORATIES","PERC HUURWONINGEN IN BEZIT WONINGCORPORATIES":"PERC RENTAL HOUSES OWNED HOUSING CORPORATIONS"},{"OUT OF SCHOOL CARE AVERAGE NUMBER WITHIN 1 KM":"BUITENSCHOOLSE OPVANG GEMIDDELD AANTAL BINNEN 1 KM","BUITENSCHOOLSE OPVANG GEMIDDELD AANTAL BINNEN 1 KM":"OUT OF SCHOOL CARE AVERAGE NUMBER WITHIN 1 KM"},{"AREA ADDRESS DENSITY":"OMGEVINGSADRESSENDICHTHEID","OMGEVINGSADRESSENDICHTHEID":"AREA ADDRESS DENSITY"},{"TRUE HOME AVERAGE NUMBER WITHIN 20 KM":"WARENHUIS GEMIDDELD AANTAL BINNEN 20 KM","WARENHUIS GEMIDDELD AANTAL BINNEN 20 KM":"TRUE HOME AVERAGE NUMBER WITHIN 20 KM"},{"PHARMACY AVERAGE DISTANCE IN KM":"APOTHEEK GEMIDDELDE AFSTAND IN KM","APOTHEEK GEMIDDELDE AFSTAND IN KM":"PHARMACY AVERAGE DISTANCE IN KM"},{"GP PRACTICE AVERAGE NUMBER WITHIN 1 KM":"HUISARTSENPRAKTIJK GEMIDDELD AANTAL BINNEN 1 KM","HUISARTSENPRAKTIJK GEMIDDELD AANTAL BINNEN 1 KM":"GP PRACTICE AVERAGE NUMBER WITHIN 1 KM"},{"NUMBER OF HOUSEHOLDS":"AANTAL HUISHOUDENS","AANTAL HUISHOUDENS":"NUMBER OF HOUSEHOLDS"},{"VMBO AVERAGE NUMBER WITHIN 5 KM":"VMBO GEMIDDELD AANTAL BINNEN 5 KM","VMBO GEMIDDELD AANTAL BINNEN 5 KM":"VMBO AVERAGE NUMBER WITHIN 5 KM"}]`