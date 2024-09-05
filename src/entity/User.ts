import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  VersionColumn,
  BeforeUpdate,
  BaseEntity,
} from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text", nullable: false })
  firstName: string;

  @Column({ type: "text", nullable: false })
  lastName: string;

  @Column({
    type: "timestamptz",
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column({
    type: "timestamptz",
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  // entity versioning
  @VersionColumn()
  version: number;

  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date();
  }
}
