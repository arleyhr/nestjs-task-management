import { Entity, Column, PrimaryColumn, BaseEntity } from 'typeorm';
import { TaskStatus } from './task-status.enum';

@Entity()
class Task extends BaseEntity {
    @PrimaryColumn()
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
