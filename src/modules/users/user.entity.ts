import { Entity, Column } from "typeorm";

import { EntityBase } from "../../common/base.entity";


@Entity()
export class User extends EntityBase {

    @Column({
        "unique": true
    })
    public name: string;

    @Column()
    public password: string;

}