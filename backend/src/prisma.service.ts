import { Injectable } from '@nestjs/common';
import { PrismaClient, MealClass } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        super();
    }

    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}
