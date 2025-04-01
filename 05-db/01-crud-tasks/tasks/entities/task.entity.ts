import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsString, IsNotEmpty, IsBoolean, IsOptional } from "class-validator";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsBoolean()
  @Column({ default: false })
  isCompleted: boolean;
}
