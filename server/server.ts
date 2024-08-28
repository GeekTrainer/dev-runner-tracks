// FILEPATH: /Users/geektrainer/repos/runner-tracker/server/server.ts
import express, { Express } from 'express';
import * as routes from './routes';
import * as services from './services';

export function createApp() {
    const app = express();
    return app;
}

export function registerPublic(app: Express) {
    // register public
    app.use(express.static('public'));
    return app;
}

export function registerAPIRoute(app: Express) {
    app.use('/api/race', routes.registerRaceRoutes(new services.RaceService()));
    return app;
}

export function startServer(app: Express) {
    return app.listen(3000, () => {
        console.log('Server up on http://localhost:3000');
    });
}

if (require.main === module) {
    const app = createApp();
    registerPublic(app);
    registerAPIRoute(app);
    startServer(app);
}