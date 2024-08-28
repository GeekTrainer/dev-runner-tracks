import { PrismaClient, Race } from '@prisma/client';
import logger from '../logger';

export class RaceService {
    private _prisma: PrismaClient;

    constructor(client?: PrismaClient) {
        if (client) this._prisma = client;
        else this._prisma = new PrismaClient();
    }

    get prisma(): PrismaClient {
        return this._prisma;
    }

    async getAll(): Promise<Race[]> {
        try {
            return await this.prisma.race.findMany();
        } catch (error) {
            logger.error('Error getting all races:', error);
            throw error;
        }
    }

    async getById(id: number): Promise<Race | null> {
        try {
            return await this.prisma.race.findUnique({
                where: { id },
            });
        } catch (error) {
            logger.error(`Error getting race by id "${id}":`, error);
            throw error;
        }
    }

    async getByName(name: string): Promise<Race[]> {
        try {
            return await this.prisma.race.findMany({
                where: { name: { startsWith: name } },
            });
        } catch (error) {
            let sanitized_name = name.replace(/\n|\r/g, "");
            logger.error(`Error getting races by name "%s":`, sanitized_name, error);
            throw error;
        }
    }
}