import request from 'supertest';
import express, { Express } from 'express';
import * as services from '../services';
import * as routes from '../routes';
import { createApp, registerAPIRoute, registerPublic, startServer } from '../server';
import { mock, MockProxy } from 'jest-mock-extended';


describe('createApp', () => {
    it('should register public directory', () => {
        let app: Express = createApp();
    
        registerPublic(app);

        // check if index.html is returned
        return request(app)
            .get('/')
            .expect(200)
            .expect('Content-Type', /html/);
    });
});

describe('registerAPIRoute', () => {
    let app: Express;
    let raceService: services.RaceService;

    beforeEach(() => {
        app = express();
        raceService = new services.RaceService();
        jest.spyOn(services, 'RaceService').mockImplementation(() => raceService);
        registerAPIRoute(app);
    });

    it('should call RaceService methods when /api/race is hit', async () => {
        const raceServiceSpy = jest.spyOn(raceService, 'getAll');
        await request(app).get('/api/race');
        expect(raceServiceSpy).toHaveBeenCalled();
    });
});

describe('startServer', () => {
    let app: Express;

    beforeEach(() => {
        app = express();
    });

    it('should start server on port 3000 and log to console', () => {
        let server = startServer(app);

        expect(server.address()).toHaveProperty('port', 3000);
        server.close();
    });
});
