import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Superhero extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickname: string;

  @Column()
  real_name: string;

  @Column()
  origin_description: string;

  @Column()
  superpowers: string;

  @Column()
  catch_phrase: string;

  @Column('text', { array: true, nullable: true })
  imageLinks: string[];
}
