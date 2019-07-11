export interface ScaleType {
    (d: any): any;
    range: any;
    domain: any;
    ticks: any;
}

export interface DimensionsType {
    marginTop: number;
    marginRight: number;
    marginBottom: number;
    marginLeft: number;
    height: number;
    width: number;
    boundedHeight?: number;
    boundedWidth?: number;
}

export interface TimelineDataPoint {
    quarter: number;
    year: number;
    value: number;
    key: any;
    PY: number;
    IC: number;
    projected: boolean;
}

export interface DataPoint {
    quarter: number;
    year: number;
    value: number;
    key: any;
    PY: number;
    IC: number;
    projected: boolean;
}

export interface TimelineDataPointFin {
    date: string;
    value: number;
    key?: any;
    PY: number;
    IC: number;
    projected: boolean;
}
