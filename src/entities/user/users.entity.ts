import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    firstname: string;

    @Column({ type: 'varchar', length: 255 })
    lastname: string;

    @Column({ type: 'varchar', length: 255 })
    username: string;

    @Column({ type: 'varchar', length: 255 })
    email: string;

    @Column({ type: 'varchar', length: 255 })
    role: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    phoneNumber: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    vehicle: string | null;
}
