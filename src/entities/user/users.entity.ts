import { Entity, Column } from 'typeorm';
import { BaseEntity } from '@nosleepfullbuild/uniride-library/dist/entity/base.entity';

@Entity()
export class User extends BaseEntity{
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

    // Stock driver id trips if the user is a driver
    @Column("text", { array: true, default: '{}' })
    driverTrips: string[];

    // Stock user id trips if the user is a user
    @Column("text", { array: true, default: '{}' })
    userTrips: string[];
    
}
