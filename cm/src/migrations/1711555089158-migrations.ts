import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Migrations1711555089158 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
        new Table({
            name: 'users',
            columns: [
                {
                    name: "id",
                    type: "string",
                    isPrimary: true,
                    isNullable: false,
                },
                {
                    name: "email",
                    type: "string",
                    isNullable: false
                },
                {
                    name: "hashed_password",
                    type: "string",
                    isNullable: false
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()",
                    isNullable: false
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: "now()",
                    isNullable: false
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users')
    }

}
