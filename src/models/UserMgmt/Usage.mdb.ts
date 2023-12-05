import { Column } from 'typeorm';

export class Usage {
    @Column()
    subscriptionPlan: string

    @Column()
    usesThisMonth: number
}