// FILEPATH: /Users/geektrainer/repos/race-tracker/server/routes/race.test.ts
import { registerRaceRoutes } from '../race-routes';
import { RaceService } from '../../services/race-service';
import express from 'express';
import request from 'supertest';
import { mock, MockProxy } from 'jest-mock-extended';
import { Race } from '@prisma/client';

let raceService: MockProxy<RaceService> & RaceService;
let app: express.Express;

let races: Race[] = [
    { 
        id: 1,
        name: 'First race',
        distance: 5,
    },
    { 
        id: 2,
        name: 'Second race',
        distance: 10,
    },
];

beforeEach(() => {
    raceService = mock<RaceService>();

    app = express();
    app.use(express.json());
    app.use(registerRaceRoutes(raceService));
});

describe('Race routes', () => {
    describe('GET /', () => {
        test('returns all races', async () => {
            // arrange
            raceService.getAll.mockResolvedValue(races);

            // act
            const response = await request(app).get('');

            // assert
            expect(response.status).toBe(200);
            expect(response.body).toEqual(races);
        });

        test('returns 500 if error getting data', async () => {
            // arrange
            raceService.getAll.mockRejectedValue('error');

            // act
            const response = await request(app).get('');

            // assert
            expect(response.status).toBe(500);
        });
    });

    describe('GET /search/:name', () => {
        test('returns races by name', async () => {
            // arrange
            const race = races[0];
            const nameSearchRaces = [race];
            raceService.getByName.mockResolvedValue(nameSearchRaces);
            const name = race.name;

            // act
            const response = await request(app).get(`/search/${name}`);

            // assert
            expect(response.status).toBe(200);
            expect(response.body).toEqual(nameSearchRaces);
        });

        test('returns 500 if error getting data', async () => {
            // arrange
            raceService.getByName.mockRejectedValue('error');
            const name = races[0].name;

            // act
            const response = await request(app).get(`/search/${name}`);

            // assert
            expect(response.status).toBe(500);
        });
    });

    describe('GET /:id', () => {
        test('returns race by id', async () => {
            // arrange
            const race = races[0];
            raceService.getById.mockResolvedValue(race);

            // act
            const response = await request(app).get(`/${race.id}`);

            // assert
            expect(response.status).toBe(200);
            expect(response.body).toEqual(race);
        });

        test('returns 404 if race not found', async () => {
            // arrange
            const id = 1;
            raceService.getById.mockResolvedValue(null);

            // act
            const response = await request(app).get(`/${id}`);

            // assert
            expect(response.status).toBe(404);
        });

        test('returns 500 if error getting data', async () => {
            // arrange
            const id = 1;
            raceService.getById.mockRejectedValue('error');

            // act
            const response = await request(app).get(`/${id}`);

            // assert
            expect(response.status).toBe(500);
        });
    });
});