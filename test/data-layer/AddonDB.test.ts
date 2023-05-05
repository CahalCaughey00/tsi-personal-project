import {
  Connection,
  EntityName,
  // EntityManager,
  // EntityName,
  // FlushMode,
  IDatabaseDriver,
  MikroORM,
} from "@mikro-orm/core";
// import { SqlEntityManager, SqliteDriver } from "@mikro-orm/sqlite";
import { AddonDB } from "../../src/data-layer/AddonDB"
import { Addon } from "../../src/data-layer/entities/Addon.entity";
import { File } from "../../src/data-layer/entities/File.entity";
import { MockInstance } from "jest-mock"

jest.mock("../../src/data-layer/entities/Addon.entity")
jest.mock("../../src/data-layer/entities/File.entity")
jest.mock("@mikro-orm/sqlite")
// jest.mock()


const mockFindOne = jest.fn()
const mockFind = jest.fn()

const mockRemove = jest.fn() 
const mockFlush = jest.fn()
const mockPersist = jest.fn()
const mockAssign = jest.fn()

const mockEntityManager = {
  findOne: mockFindOne,
  find: mockFind,
  remove: mockRemove,
  flush: mockFlush,
  persist: mockPersist,
  assign: mockAssign
}

const connectMock = jest.fn()
const closeMock = jest.fn()

const mockOrm = {
  em: {
    fork: () => mockEntityManager
  },
  connect: connectMock,
  close: closeMock
} as unknown as MikroORM<IDatabaseDriver<Connection>>


const ormInitMock = jest.spyOn(MikroORM, "init");

const addonMock = jest.mocked(Addon)
ormInitMock.mockResolvedValue(mockOrm)

describe('GIVEN an AddonDB instance', async () => {
  const addonDB = new AddonDB()
  await addonDB.init()

  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('WHEN calling getById with a valid Addon entityId', () => {
    test('THEN connection opens and closes correctly', () => {
      // addonDB.getById(Addon, "12345")
      expect(connectMock).toBeCalledTimes(1)
      expect(closeMock).toBeCalledTimes(1)
    })
    // test('THEN is does not throw', () => {
      
    // })
  })
});