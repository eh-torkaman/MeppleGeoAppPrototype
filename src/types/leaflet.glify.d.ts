declare module 'leaflet.glify' {
  import {
    Position,
    Feature,
    FeatureCollection,
    LineString,
    MultiLineString,
    MultiPolygon,
  } from 'geojson';

  import { Point as GeoPoint } from 'geojson';

  import {
    LatLngBounds,
    Point,
    Layer,
    Bounds,
    LatLng,
    ZoomAnimEvent,
    Map,
    ResizeEvent,
    LayerOptions,
    LeafletMouseEvent,
  } from 'leaflet';

  export interface IPointsSettings extends IBaseGlLayerSettings {
    data: number[][] | FeatureCollection<GeoPoint>;
    size?: ((i: number, latLng: LatLng | null) => number) | number | null;
    eachVertex?: (pointVertex: IPointVertex) => void;
    sensitivity?: number;
    sensitivityHover?: number;
  }
  export interface IPointVertex {
    latLng: LatLng;
    pixel: IPixel;
    chosenColor: IColor;
    chosenSize: number;
    key: string;
    feature?: any;
  }
  export class Points extends BaseGlLayer<IPointsSettings> {
    static defaults: Partial<IPointsSettings>;
    static maps: never[];
    bytes: number;
    latLngLookup: {
      [key: string]: IPointVertex[];
    };
    allLatLngLookup: IPointVertex[];
    vertices: number[];
    typedVertices: Float32Array;
    dataFormat: 'Array' | 'GeoJson.FeatureCollection';
    settings: Partial<IPointsSettings>;
    active: boolean;
    get size(): ((i: number, latLng: LatLng | null) => number) | number | null;
    constructor(settings: Partial<IPointsSettings>);
    render(): this;
    getPointLookup(key: string): IPointVertex[];
    addLookup(lookup: IPointVertex): this;
    resetVertices(): this;
    pointSize(pointIndex: number): number;
    drawOnCanvas(e: ICanvasOverlayDrawEvent): this;
    lookup(coords: LatLng): IPointVertex | null;
    static closest(
      targetLocation: LatLng,
      points: IPointVertex[],
      map: Map
    ): IPointVertex | null;
    static tryClick(
      e: LeafletMouseEvent,
      map: Map,
      instances: Points[]
    ): boolean | undefined;
    static tryHover(
      e: LeafletMouseEvent,
      map: Map,
      instances: Points[]
    ): Array<boolean | undefined>;
  }

  export interface IShapesSettings extends IBaseGlLayerSettings {
    border?: boolean;
    borderOpacity?: number;
    data: Feature | FeatureCollection | MultiPolygon;
  }
  export const defaults: Partial<IShapesSettings>;

  export class Shapes extends BaseGlLayer {
    static defaults: Partial<IShapesSettings>;
    static maps: Map[];
    settings: Partial<IShapesSettings>;
    bytes: number;
    polygonLookup: any | null;  //PolygonLookup
    get border(): boolean;
    get borderOpacity(): number;
    constructor(settings: Partial<IShapesSettings>);
    render(): this;
    resetVertices(): this;
    drawOnCanvas(e: ICanvasOverlayDrawEvent): this;
    static tryClick(
      e: LeafletMouseEvent,
      map: Map,
      instances: Shapes[]
    ): boolean | undefined;
    static tryHover(
      e: LeafletMouseEvent,
      map: Map,
      instances: Shapes[]
    ): Array<boolean | undefined>;
  }

  export interface IShaderVariable {
    type: 'FLOAT';
    start?: number;
    size: number;
    normalize?: boolean;
  }
  export type EventCallback = (
    e: LeafletMouseEvent,
    feature: any
  ) => boolean | void;
  export type SetupHoverCallback = (
    map: Map,
    hoverWait?: number,
    immediate?: false
  ) => void;
  export interface IBaseGlLayerSettings {
    data: any;
    longitudeKey: number;
    latitudeKey: number;
    pane: string;
    map: Map;
    shaderVariables?: {
      [name: string]: IShaderVariable;
    };
    setupClick?: (map: Map) => void;
    setupHover?: SetupHoverCallback;
    sensitivity?: number;
    sensitivityHover?: number;
    vertexShaderSource?: (() => string) | string;
    fragmentShaderSource?: (() => string) | string;
    canvas?: HTMLCanvasElement;
    click?: EventCallback;
    hover?: EventCallback;
    hoverOff?: EventCallback;
    color?: ColorCallback | IColor | null;
    className?: string;
    opacity?: number;
    preserveDrawingBuffer?: boolean;
    hoverWait?: number;
  }
  export const defaultPane = 'overlayPane';
  export const defaultHoverWait = 250;
  
  export type ColorCallback = (featureIndex: number, feature: any) => IColor;
  export abstract class BaseGlLayer<
    T extends IBaseGlLayerSettings = IBaseGlLayerSettings
  > {
    bytes: number;
    active: boolean;
    fragmentShader: any;
    canvas: HTMLCanvasElement;
    gl: WebGLRenderingContext | WebGL2RenderingContext;
    layer: CanvasOverlay;
    mapMatrix: MapMatrix;
    matrix: WebGLUniformLocation | null;
    program: WebGLProgram | null;
    settings: Partial<IBaseGlLayerSettings>;
    vertexShader: WebGLShader | null;
    vertices: any;
    vertexLines: any;
    buffers: {
      [name: string]: WebGLBuffer;
    };
    attributeLocations: {
      [name: string]: number;
    };
    uniformLocations: {
      [name: string]: WebGLUniformLocation;
    };
    static defaults: Partial<IBaseGlLayerSettings>;
    abstract render(): this;
    get data(): any;
    get pane(): string;
    get className(): string;
    get map(): Map;
    get sensitivity(): number;
    get sensitivityHover(): number;
    get hoverWait(): number;
    get longitudeKey(): number;
    get latitudeKey(): number;
    get opacity(): number;
    get color(): ColorCallback | IColor | null;
    constructor(settings: Partial<IBaseGlLayerSettings>);
    abstract drawOnCanvas(context: ICanvasOverlayDrawEvent): this;
    attachShaderVariables(byteCount: number): this;
    getShaderVariableCount(): number;
    setData(data: any): this;
    setup(): this;
    setupVertexShader(): this;
    setupFragmentShader(): this;
    setupProgram(): this;
    addTo(map?: Map): this;
    remove(indices?: number | number[]): this;
    insert(feature: any, index: number): this;
    update(feature: any, index: number): this;
    getBuffer(name: string): WebGLBuffer;
    getAttributeLocation(name: string): number;
    getUniformLocation(name: string): WebGLUniformLocation;
    click(e: LeafletMouseEvent, feature: any): boolean | undefined;
    hover(e: LeafletMouseEvent, feature: any): boolean | undefined;
    hoverOff(e: LeafletMouseEvent, feature: any): void;
  }

  export type WeightCallback = (i: number, feature: any) => number;
  export interface ILinesSettings extends IBaseGlLayerSettings {
    data: FeatureCollection<LineString | MultiLineString>;
    weight: WeightCallback | number;
    sensitivity?: number;
    sensitivityHover?: number;
    eachVertex?: (vertices: LineFeatureVertices) => void;
  }
  export class Lines extends BaseGlLayer<ILinesSettings> {
    static defaults: Partial<ILinesSettings>;
    scale: number;
    bytes: number;
    allVertices: number[];
    allVerticesTyped: Float32Array;
    vertices: LineFeatureVertices[];
    aPointSize: number;
    settings: Partial<ILinesSettings>;
    get weight(): WeightCallback | number;
    constructor(settings: Partial<ILinesSettings>);
    render(): this;
    resetVertices(): this;
    drawOnCanvas(e: ICanvasOverlayDrawEvent): this;
    static tryClick(
      e: LeafletMouseEvent,
      map: Map,
      instances: Lines[]
    ): boolean | undefined;
    hoveringFeatures: Array<Feature<LineString | MultiLineString>>;
    static tryHover(
      e: LeafletMouseEvent,
      map: Map,
      instances: Lines[]
    ): Array<boolean | undefined>;
  }
  interface ILineFeatureVerticesSettings {
    project: (coordinates: LatLng, distance: number) => IPixel;
    color: IColor;
    weight: number;
    latitudeKey: number;
    longitudeKey: number;
    opacity: number;
  }
  export class LineFeatureVertices {
    settings: ILineFeatureVerticesSettings;
    vertexCount: number;
    array: number[];
    pixels: IPixel[];
    latLngs: LatLng[];
    get length(): number;
    constructor(settings: ILineFeatureVerticesSettings);
    fillFromCoordinates(coordinates: Position[] | Position[][]): void;
    push(...args: number[]): void;
  }

  export interface ICanvasOverlayDrawEvent {
    canvas: HTMLCanvasElement;
    bounds: LatLngBounds;
    offset: Point;
    scale: number;
    size: Point;
    zoomScale: number;
    zoom: number;
  }
  export type IUserDrawFunc = (event: ICanvasOverlayDrawEvent) => void;
  export type RedrawCallback = (instance: CanvasOverlay) => void;
  export class CanvasOverlay extends Layer {
    _userDrawFunc: IUserDrawFunc;
    _redrawCallbacks: RedrawCallback[];
    canvas?: HTMLCanvasElement;
    _pane: string;
    _frame?: number | null;
    options: LayerOptions;
    constructor(userDrawFunc: IUserDrawFunc, pane: string);
    drawing(userDrawFunc: IUserDrawFunc): this;
    params(options: any): this;
    redraw(callback?: RedrawCallback): this;
    isAnimated(): boolean;
    onAdd(map: Map): this;
    onRemove(map: Map): this;
    addTo(map: Map): this;
    get map(): Map;
    set map(map: Map);
    _resize(resizeEvent: ResizeEvent): void;
    _reset(): void;
    _redraw(): void;
    _animateZoom(e: ZoomAnimEvent): void;
    _animateZoomNoLayer(e: ZoomAnimEvent): void;
    _unclampedProject(latlng: LatLng, zoom: number): Point;
    _unclampedLatLngBoundsToNewLayerBounds(
      latLngBounds: LatLngBounds,
      zoom: number,
      center: LatLng
    ): Bounds;
  }

  export interface IPixel {
    x: number;
    y: number;
  }

  export function latLonToPixel(latitude: number, longitude: number): IPixel;
  export function pixelInCircle(
    centerPixel: IPixel,
    checkPoint: IPixel,
    radius: number
  ): boolean;
  export function latLngDistance(
    x: number,
    y: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ): number;
  export function vectorDistance(dx: number, dy: number): number;
  export function locationDistance(
    location1: LatLng,
    location2: LatLng,
    map: Map
  ): number;
  export function debugPoint(containerPixel: IPixel): void;
  export function debounce(
    fn: (e: LeafletMouseEvent) => void,
    waitMilliseconds: number,
    immediate?: boolean
  ): (e: LeafletMouseEvent) => void;
  export function inBounds(latLng: LatLng, bounds: LatLngBounds): boolean;

  export class MapMatrix {
    array: Float32Array;
    constructor();
    setSize(width: number, height: number): this;
    translateTo(x: number, y: number): this;
    scaleTo(scale: number): this;
  }

  export interface IColor {
    r: number;
    g: number;
    b: number;
    a?: number;
  }
  export const green: IColor;
  export const red: IColor;
  export const blue: IColor;
  export const teal: IColor;
  export const yellow: IColor;
  export const white: IColor;
  export const black: IColor;
  export const gray: IColor;
  export const grey: IColor;
  export function fromHex(hex: string): IColor | null;
  export function random(): IColor;
  export function pallet(): IColor;
  export function notProperlyDefined(valueName: string): string;
 export class Glify {
    longitudeKey: number;
    latitudeKey: number;
    clickSetupMaps: Map[];
    hoverSetupMaps: Map[];
    shader: {
      vertex: string;
      fragment: {
        dot: string;
        point: string;
        puck: string;
        simpleCircle: string;
        square: string;
        polygon: string;
      };
    };
    Points: typeof Points;
    Shapes: typeof Shapes;
    Lines: typeof Lines;
    pointsInstances: Points[];
    shapesInstances: Shapes[];
    linesInstances: Lines[];
    longitudeFirst(): this;
    latitudeFirst(): this;
    get instances(): Array<Points | Lines | Shapes>;
    points(settings: Partial<IPointsSettings>): Points;
    lines(settings: Partial<ILinesSettings>): Lines;
    shapes(settings: Partial<IShapesSettings>): Shapes;
    setupClick(map: Map): void;
    setupHover(map: Map, hoverWait?: number, immediate?: false): void;
  }

  const glify: Glify;
  export default glify;
}
