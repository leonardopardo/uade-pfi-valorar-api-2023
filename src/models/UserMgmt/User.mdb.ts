import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';
import { Usage } from './Usage.mdb';
import { Request } from './Request.mdb';

@Entity('User')
export class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;
  
  @Column()
  company_name: string;

  @Column(() => Usage)
  usage: Usage;

  @Column(() => Request)
  history: [Request];
}