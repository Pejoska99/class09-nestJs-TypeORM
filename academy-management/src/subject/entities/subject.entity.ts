import { Academy } from "src/academy/entities/academy.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Subject {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string


    @Column()
    numberOfClasses: number

    @Column()
    difficulty: string

    @ManyToOne(() => Academy, (academy) => academy.subjects)
    @JoinColumn({name: 'academyId'})
    academy: Academy

    @Column()
    academyId: number
}
