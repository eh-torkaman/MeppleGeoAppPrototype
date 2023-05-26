export interface CRS {
  type: string;
  properties: {
    name: string;
  };
}

export interface mapViewStateInterface {
  Center: L.LatLngLiteral;
  Zoom: number;
}
