/// <reference types="@danmarshall/deckgl-typings/deck.gl__core" />
/** @typedef {import('@deck.gl/core').Deck} Deck */
/** @typedef {import('@deck.gl/core/lib/deck').DeckProps} DeckProps */
export  class LeafletLayer extends L.Layer {
    /**
     * @param {DeckProps} props
     */
    constructor(props: DeckProps);
    /** @type {HTMLElement | undefined} */
    _container: HTMLElement | undefined;
    /** @type {Deck | undefined} */
    _deck: Deck | undefined;
    /** @type {boolean | undefined} */
    _animate: boolean | undefined;
    props: import("@deck.gl/core/lib/deck").DeckProps<import("@deck.gl/core/lib/deck").ContextProviderValue>;
    /**
     * @returns {this}
     */
    onAdd(): this;
    /**
     * @param {L.Map} _map
     * @returns {this}
     */
    onRemove(_map: L.Map): this;
    /**
     * @returns {viewreset, movestart,  moveend,  zoomstart,zoom,zoomend}
     */
    getEvents(): {[name: string]: L.LeafletEventHandlerFn};;
    /**
     * @param {DeckProps} props
     * @returns {void}
     */
    setProps(props: DeckProps): void;
    /**
     * @param {any} params
     * @returns {any}
     */
    pickObject(params: any): any;
    /**
     * @param {any} params
     * @returns {any}
     */
    pickMultipleObjects(params: any): any;
    /**
     * @param {any} params
     * @returns {any}
     */
    pickObjects(params: any): any;
    /**
     * @returns {void}
     */
    _update(): void;
    /**
     * @returns {void}
     */
    _pauseAnimation(): void;
    /**
     * @returns {void}
     */
    _unpauseAnimation(): void;
    /**
     * @returns {void}
     */
    _reset(): void;
    /**
     * @returns {void}
     */
    _onMoveStart(): void;
    /**
     * @returns {void}
     */
    _onMoveEnd(): void;
    /**
     * @returns {void}
     */
    _onZoomStart(): void;
    /**
     * @param {L.ZoomAnimEvent} event
     * @returns {void}
     */
    _onAnimZoom(event: L.ZoomAnimEvent): void;
    /**
     * @returns {void}
     */
    _onZoom(): void;
    /**
     * @returns {void}
     */
    _onZoomEnd(): void;
    /**
     * see https://stackoverflow.com/a/67107000/1823988
     * see L.Renderer._updateTransform https://github.com/Leaflet/Leaflet/blob/master/src/layer/vector/Renderer.js#L90-L105
     * @param {L.LatLng} center
     * @param {number} zoom
     */
    _updateTransform(center: L.LatLng, zoom: number): void;
}
export type Deck = import('@deck.gl/core').Deck;
export type DeckProps = import('@deck.gl/core/lib/deck').DeckProps;
import * as L from 'leaflet';
