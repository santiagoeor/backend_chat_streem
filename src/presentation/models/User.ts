import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('usuarios')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('char', { length: 100 })
    usuario: string;

    @Column('char', { length: 100 })
    password: string;

    @Column('char', { length: 250 })
    foto: string;

    @Column('int', { default: true })
    estado: boolean;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

}