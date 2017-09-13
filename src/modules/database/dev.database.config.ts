import { Component } from "@nestjs/common";
import { ConnectionOptions } from "typeorm";

import { Role } from "../roles/role.entity";
import { User } from "../users/user.entity";
import { Category } from "../categories/category.entity";
import { RolePermission } from "../roles/role-permission.entity";
import { DatabaseConfig } from "./database.config";


@Component()
export class DevDatabaseConfig extends DatabaseConfig {
    public getConfiguration(): ConnectionOptions {
        console.log("-----222----");
        console.log(__dirname + "/../.entity.ts");
        return {
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "root",
            database: "melondev",
            entities: [
                // any entity file under src/modules
                Category,
                User,
                Role,
                RolePermission
            ],
            autoSchemaSync: true,
            logger: "advanced-console",
            logging: "all",
        };
    }
}
