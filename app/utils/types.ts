type BoundingBox = [string, string, string, string]; //Tuple

interface Address {
    "name": string,
    "house_number": string,
    "road": string,
    "neighbourhood": string,
    "suburb": string,
    "city": string,
    "county": string,
    "state": string,
    "postcode": string,
    "country": string,
    "country_code": string
};

export interface SuggestedAddressList {
    "place_id": string,
    "osm_id": string,
    "osm_type": string,
    "licence": string,
    "lat": string,
    "lon": string,
    "boundingbox": BoundingBox,
    "class": string,
    "type": string,
    "display_name": string,
    "display_place": string,
    "display_address": string,
    "address": Address
};
