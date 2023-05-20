declare module  'deck.gl-leaflet' {
   // export function LeafletLayer(props: import('./deck.gl-leaflet').DeckProps):import('./deck.gl-leaflet').LeafletLayer;
   export class LeafletLayer extends import('./deck.gl-leaflet').LeafletLayer {
      constructor(props: DeckProps){
         super(props);
      };
   }
    }

  