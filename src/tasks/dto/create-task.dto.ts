import { IsNotEmpty } from 'class-validator';

class CreateTaskDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
}

export {
    CreateTaskDto,
};
