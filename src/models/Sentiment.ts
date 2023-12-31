import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity('Sentiment')
export class Sentiment {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  source: string;

  @Column()
  title: string;

  @Column()
  url: string;

  @Column()
  sentiment_positive: number;

  @Column()
  sentiment_neutral: number;

  @Column()
  sentiment_negative: number;

  @Column()
  created_at: Date;
}