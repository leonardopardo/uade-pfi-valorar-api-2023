import { Column } from 'typeorm';

export class Request {

    @Column()
    date: Date

    @Column()
    caracteristicas: [string]

    @Column()
    amenities: [string]

    @Column()
    lat: number

    @Column()
    lon: number

    @Column()
    antiguedad: number

    @Column()
    ambientes: number

    @Column()
    cuartos: number

    @Column()
    banos: number

    @Column()
    superficie_total: number

    @Column()
    barrio: string

    @Column()
    localidad: string
}