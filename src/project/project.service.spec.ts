import { Test, TestingModule } from '@nestjs/testing';
import { ProjectService } from './project.service';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';

const prismaMock = {
  project: {
    create: jest.fn(),
    findMany: jest.fn(),
    count: jest.fn(),
    update: jest.fn(),
  },
  projectMember: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
  $transaction: jest.fn(),
};

describe('ProjectService', () => {
  let service: ProjectService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<ProjectService>(ProjectService);
    prisma = module.get<PrismaService>(PrismaService);

    jest.clearAllMocks();
  });

  describe('Create', () => {
    test('should create a project and project member as the admin', async () => {
      const dto: CreateProjectDto = {
        name: 'Test Project',
        description: 'Test Description',
      };

      // const projectCreateSpy = jest
      //   .fn()
      //   .mockResolvedValue({ id: 'proj-1', ...dto });
      // const projectMemberCreateSpy = jest.fn().mockResolvedValue({});
    });
  });
  describe('Find All', () => {
    test('should return paginated response of all projects', async () => {});
  });
  describe('Update', () => {
    test('should update project details', async () => {});
  });
  describe('Get All User Projects', () => {
    test('should return all projects of the current user', async () => {});
  });
});
