import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { TaskStatus } from './task-status.enum';

@Entity()
class Task extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;
}

export {
    Task,
};
