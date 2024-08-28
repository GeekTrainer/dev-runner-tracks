import express from 'express';
import { RaceService } from '../services';
import escape from 'escape-html';

export const registerRaceRoutes = (service: RaceService) => {
    const router = express.Router();

    router.get('', async (req, res) => {
        try {
            const races = await service.getAll();
            res.json(races);
        } catch (error) {
            res.status(500).send('Error getting all races');
        }
    });

    router.get('/search/:name', async (req, res) => {
        const name = req.params.name;
        try {
            const races = await service.getByName(name);
            res.json(races);
        } catch (error) {
            res.status(500).send(`Error getting races by name "${escape(name)}"`);
        }
    });

    router.get('/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        try {
            const race = await service.getById(id);
            if (race) {
                res.json(race);
            } else {
                res.status(404).send(`No race found with id "${id}"`);
            }
        } catch (error) {
            res.status(500).send(`Error getting race by id "${id}"`);
        }
    });

    return router;
}