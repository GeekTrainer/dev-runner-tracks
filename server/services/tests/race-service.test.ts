import { MockContext, createMockContext } from './mock-context';
import { RaceService } from '../race-service';
import { Race } from '@prisma/client';
import logger from '../../logger';
import { Logger } from 'winston';

let mockContext: MockContext;
let races: Race[];
let raceService: RaceService;

beforeEach(() => {
    mockContext = createMockContext();
    races = getRaces();
    raceService = new RaceService(mockContext.prisma);
    jest.spyOn(logger, 'error').mockImplementation(() => ({} as Logger));
});

afterEach(() => {
    jest.clearAllMocks();
});

beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
    (console.error as jest.Mock).mockRestore();
});

describe('Constructor should manage prisma client', () => {
    test('it should create new prisma client if none is provided', () => {
        // act
        const service = new RaceService();

        // assert
        expect(service.prisma).toBeDefined();
    });

    test('it should use provided prisma client', () => {
        // act
        const service = new RaceService(mockContext.prisma);

        // assert
        expect(service.prisma).toBe(mockContext.prisma);
    });
});

describe('RaceService by id', () => {
    test('it should return race by id', async () => {
        // arrange
        const race  = races[0];
        mockContext.prisma.race.findUnique.mockResolvedValue(race);

        // act
        const result = await raceService.getById(1);

        // assert
        expect(result).toEqual(race);
        expect(mockContext.prisma.race.findUnique).toHaveBeenCalledWith({
            where: {
                id: 1,
            },
        });
    });

    test('it should return null if no race is found', async () => {
        // arrange
        mockContext.prisma.race.findUnique.mockResolvedValue(null);

        // act
        const result = await raceService.getById(1);

        // assert
        expect(result).toBeNull();
        expect(mockContext.prisma.race.findUnique).toHaveBeenCalledWith({
            where: {
                id: 1,
            },
        });
    });

    test('it should throw error if prisma fails', async () => {
        // arrange
        const error = new Error('Error');
        mockContext.prisma.race.findUnique.mockRejectedValue(error);

        // act
        const result = raceService.getById(1);

        // assert
        await expect(result).rejects.toEqual(error);
        expect(mockContext.prisma.race.findUnique).toHaveBeenCalledWith({
            where: {
                id: 1,
            },
        });
        expect(logger.error).toHaveBeenCalledWith('Error getting race by id "1":', error);
    });
});

describe('RaceService by name', () => {
    test('it should return races which start with name', async () => {
        // arrange
        const searchString = 'Test';
        const foundRaces = races.filter(r => r.name.startsWith(searchString));
        mockContext.prisma.race.findMany.mockResolvedValue(foundRaces);

        // act
        const result = await raceService.getByName(searchString);

        // assert
        expect(result).toEqual(foundRaces);
        expect(mockContext.prisma.race.findMany).toHaveBeenCalledWith({
            where: {
                name: {
                    startsWith: searchString,
                },
            },
        });
    });

    test('it should return empty array if no races returned', async () => {
        // arrange
        const searchString = 'Test';
        const emptyRaces: Race[] = [];
        mockContext.prisma.race.findMany.mockResolvedValue(emptyRaces);

        // act
        const result = await raceService.getByName(searchString);

        // assert
        expect(result).toEqual(emptyRaces);
        expect(mockContext.prisma.race.findMany).toHaveBeenCalledWith({
            where: {
                name: {
                    startsWith: searchString,
                },
            },
        });
    });

    test('it should throw error if prisma fails', async () => {
        // arrange
        const searchString = 'Test';
        const error = new Error('Error');
        mockContext.prisma.race.findMany.mockRejectedValue(error);

        // act
        const result = raceService.getByName(searchString);

        // assert
        await expect(result).rejects.toEqual(error);
        expect(mockContext.prisma.race.findMany).toHaveBeenCalledWith({
            where: {
                name: {
                    startsWith: searchString,
                },
            },
        });
        expect(logger.error).toHaveBeenCalledWith('Error getting races by name "%s":', searchString, error);
    });
});

describe('RaceService get all', () => {
    test('it should return all races', async () => {
        // arrange
        mockContext.prisma.race.findMany.mockResolvedValue(races);

        // act
        const result = await raceService.getAll();

        // assert
        expect(result).toEqual(races);
        expect(mockContext.prisma.race.findMany).toHaveBeenCalled();
    });

    test('it should return empty array if no races exist', async () => {
        // arrange
        const emptyRaces: Race[] = [];
        mockContext.prisma.race.findMany.mockResolvedValue(emptyRaces);

        // act
        const result = await raceService.getAll();

        // assert
        expect(result).toEqual(emptyRaces);
        expect(mockContext.prisma.race.findMany).toHaveBeenCalled();
    });

    test('it should throw error if prisma fails', async () => {
        // arrange
        const error = new Error('Error');
        mockContext.prisma.race.findMany.mockRejectedValue(error);

        // act
        const result = raceService.getAll();

        // assert
        await expect(result).rejects.toEqual(error);
        expect(mockContext.prisma.race.findMany).toHaveBeenCalled();
        expect(logger.error).toHaveBeenCalledWith('Error getting all races:', error);
    });
});

const getRaces = () => {
    return [
        {
            id: 1,
            name: 'Test race 1',
            distance: 5,
        },
        {
            id: 2,
            name: 'Test race 2',
            distance: 10,
        },
        {
            id: 3,
            name: 'Other race',
            distance: 15,
        }
    ] as Race[];
};
