import { Test, TestingModule } from '@nestjs/testing';
import { ProjectMemberService } from './project-member.service';

const prismaMock = {
  projectMember: {
    create: jest.fn(),
    update: jest.fn(),
  },
};

describe('ProjectMemberService', () => {
  let service: ProjectMemberService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectMemberService],
    }).compile();

    service = module.get<ProjectMemberService>(ProjectMemberService);
  });
});
