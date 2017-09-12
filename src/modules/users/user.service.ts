import { Component } from "@nestjs/common";
import { Repository } from "typeorm";
import * as crypto from "crypto";

import { User } from "./user.entity";
import { Service } from "../database/service.interface";
import { DatabaseService } from "../database/database.service";


@Component()
export class UserService implements Service<User> {

    constructor(private databaseService: DatabaseService) {
    }

    private get repository(): Promise<Repository<User>> {
        return this.databaseService.getRepository(User);
    }

    public async add(user: User): Promise<User> {
        if (user.password) {
            user.password = this.encryptPassword(user.password);
        }
        return (await this.repository).persist(user);
    }

    public async addAll(users: User[]): Promise<User[]> {
        return (await this.repository).persist(users);
    }

    public async getAll(): Promise<User[]> {
        return (await this.repository).find();
    }

    public async getById(id: number): Promise<User> {
        return (await this.repository).findOneById(id);
    }

    public async update(user: User): Promise<User> {
        return (await this.repository).persist(user);
    }

    public async remove(user: User): Promise<User> {
        return (await this.repository).remove(user);
    }

    private encryptPassword(password): string {
        return crypto.createHash("sha1").update(password).digest("hex");
    }

}
