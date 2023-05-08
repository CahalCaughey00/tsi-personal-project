import { MikroORM } from "@mikro-orm/core";
import { AddonDB } from "../../src/data-layer/AddonDB";
import { SqliteDriver } from "@mikro-orm/sqlite";
import { Addon } from "../../src/data-layer/entities/Addon.entity";
import { File } from "../../src/data-layer/entities/File.entity";
import { allAddonsMock, mockSingleAddon } from "../fixtures";
import * as initOrm from "../../src/data-layer/initOrm";
import { IncomingAddon } from "../../src/incoming-entities/incomingAddon";
import { DBAddon } from "../../src/data-layer/interfaces/Addon";
import { IncomingFile } from "../../src/incoming-entities/incomingFile";
import { DBModFile } from "../../src/data-layer/interfaces/File";
// import { context } from "../../src/index"
// import { addonMapper } from "../../src/data-layer/mappers/addonMapper";
// import { fileMapper } from "../../src/data-layer/mappers/fileMapper";

jest.mock("@mikro-orm/sqlite");

const connectMock = jest.fn();
const closeMock = jest.fn();

const mockFindOne = jest.fn();
const mockFind = jest.fn();

const mockRemove = jest.fn();
const mockFlush = jest.fn();
const mockPersist = jest.fn();
const mockAssign = jest.fn();

const mockContext = {LOG_LEV: 0, logError: jest.fn().mockImplementation(() => {
  throw new Error("Test Error")
})}

const mockEntityManager = {
  findOne: mockFindOne,
  find: mockFind,
  remove: mockRemove,
  flush: mockFlush,
  persist: mockPersist,
  assign: mockAssign,
};

const mockOrm = {
  em: {
    fork: () => mockEntityManager,
  },
  connect: connectMock,
  close: closeMock,
} as unknown as MikroORM<SqliteDriver>;

describe("GIVEN an AddonDB instance", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  const addonDB = new AddonDB();

  describe("WHEN calling the init function", () => {
    test("THEN the orm property is initialised", async () => {
      const initSpy = jest.spyOn(initOrm, "initOrm");
      initSpy.mockResolvedValue(mockOrm);

      await addonDB.init(mockContext);
      expect(initSpy).toBeCalledTimes(1);
      expect(addonDB.orm).toEqual(mockOrm);
    });

    test("AND the entity manager property is initialised", async () => {
      const initSpy = jest.spyOn(initOrm, "initOrm");
      initSpy.mockResolvedValue(mockOrm);

      await addonDB.init(mockContext);
      expect(initSpy).toBeCalledTimes(1);
      expect(addonDB.orm.em.fork()).toEqual(mockEntityManager);
    });

    test("AND database connection opens/closes", async () => {
      const initSpy = jest.spyOn(initOrm, "initOrm");
      initSpy.mockResolvedValue(mockOrm);
      await addonDB.init(mockContext);
      expect(initSpy).toBeCalledTimes(1);
      expect(connectMock).toBeCalledTimes(1);
      expect(closeMock).toBeCalledTimes(1);
    });
  });

  describe("WHEN calling getById with a exisiting entityId", () => {
    test("THEN the database connection opens/closes", async () => {
      const initSpy = jest.spyOn(initOrm, "initOrm");
      initSpy.mockResolvedValue(mockOrm);

      await addonDB.init(mockContext);
      const addon = await addonDB.getById(Addon, "45508", mockContext);
      expect(initSpy).toBeCalledTimes(1);
      expect(connectMock).toBeCalledTimes(2);
      expect(closeMock).toBeCalledTimes(2);
    });

    test("AND a valid entity is returned", async () => {
      const initSpy = jest.spyOn(initOrm, "initOrm");
      initSpy.mockResolvedValue(mockOrm);
      mockFindOne.mockReturnValue(mockSingleAddon);

      await addonDB.init(mockContext);
      const entity = await addonDB.getById(Addon, "45508", mockContext);
      expect(mockFindOne).toBeCalledTimes(1);
      expect(entity).toEqual(mockSingleAddon);
    });
  });

  describe("WHEN calling getById with a non-existent Addon entityId", () => {
    test("THEN the database connection opens/closes", async () => {
      const initSpy = jest.spyOn(initOrm, "initOrm");
      initSpy.mockResolvedValue(mockOrm);

      await addonDB.init(mockContext);
      await addonDB.getById(Addon, "4321234", mockContext);
      expect(initSpy).toBeCalledTimes(1);
      expect(connectMock).toBeCalledTimes(2);
      expect(closeMock).toBeCalledTimes(2);
    });

    test("AND an error is logged", async () => {
      const initSpy = jest.spyOn(initOrm, "initOrm");

      initSpy.mockResolvedValue(mockOrm);
      mockFindOne.mockImplementation(() => {
        throw Error("Test Error");
      });

      await addonDB.init(mockContext);
      const entity = await addonDB.getById(Addon, "4321234", mockContext);

      expect(mockFindOne).toThrowError(new Error("Test Error"));
      expect(entity).toBe(undefined);
    });
  });

  describe("WHEN calling getAll", () => {
    test("THEN the database connection opens/closes", async () => {
      const initSpy = jest.spyOn(initOrm, "initOrm");
      initSpy.mockResolvedValue(mockOrm);

      await addonDB.init(mockContext);
      await addonDB.getAll(Addon);
      expect(initSpy).toBeCalledTimes(1);
      expect(connectMock).toBeCalledTimes(2);
      expect(closeMock).toBeCalledTimes(2);
    });

    test("AND a list of entries is returned", async () => {
      const initSpy = jest.spyOn(initOrm, "initOrm");
      initSpy.mockResolvedValue(mockOrm);
      mockFind.mockReturnValue(allAddonsMock);

      await addonDB.init(mockContext);
      const allEntity = await addonDB.getAll(Addon);
      expect(mockFind).toBeCalledTimes(1);
      expect(allEntity).toEqual(allAddonsMock);
    });
  });

  describe("WHEN calling removeById with an existing entityId", () => {
    test("THEN the database connection opens/closes", async () => {
      const initSpy = jest.spyOn(initOrm, "initOrm");
      const getbyIdSpy = jest.spyOn(addonDB, "getById");
      initSpy.mockResolvedValue(mockOrm);
      getbyIdSpy.mockResolvedValue(mockSingleAddon);

      await addonDB.init(mockContext);
      await addonDB.removeById(Addon, "45508", mockContext);
      expect(initSpy).toBeCalledTimes(1);
      expect(connectMock).toBeCalledTimes(2);
      expect(closeMock).toBeCalledTimes(2);
    });

    test("AND the entity is removed from database", async () => {
      const initSpy = jest.spyOn(initOrm, "initOrm");
      const getbyIdSpy = jest.spyOn(addonDB, "getById");
      initSpy.mockResolvedValue(mockOrm);
      getbyIdSpy.mockResolvedValue(mockSingleAddon);

      await addonDB.init(mockContext);
      const removedEntity = await addonDB.removeById(Addon, "45508", mockContext);
      expect(getbyIdSpy).toBeCalledTimes(1);
      expect(mockRemove).toBeCalledTimes(1);
      expect(mockFlush).toBeCalledTimes(1);
      expect(removedEntity).toEqual(mockSingleAddon);
    });
  });

  describe("WHEN calling removeById with a non-existent entityId", () => {
    test("THEN the database connection opens/closes", async () => {
      const initSpy = jest.spyOn(initOrm, "initOrm");
      const getbyIdSpy = jest.spyOn(addonDB, "getById");
      initSpy.mockResolvedValue(mockOrm);
      getbyIdSpy.mockResolvedValue(undefined);

      await addonDB.init(mockContext);
      await addonDB.removeById(Addon, "4321234", mockContext);
      expect(initSpy).toBeCalledTimes(1);
      expect(connectMock).toBeCalledTimes(1);
      expect(closeMock).toBeCalledTimes(1);
    });

    test("AND no entites are removed", async () => {
      const initSpy = jest.spyOn(initOrm, "initOrm");
      const getbyIdSpy = jest.spyOn(addonDB, "getById");
      initSpy.mockResolvedValue(mockOrm);
      getbyIdSpy.mockResolvedValue(undefined);

      await addonDB.init(mockContext);
      const removedEntity = await addonDB.removeById(Addon, "4321234", mockContext);
      expect(getbyIdSpy).not.toBeCalled;
      expect(mockRemove).not.toBeCalled;
      expect(mockFlush).not.toBeCalled;
      expect(removedEntity).toBe(undefined);
    });
  });

  describe("WHEN calling writeEntity with a non-existent Addon", () => {
    test("THEN a new Addon is written to the database", async () => {
      const initSpy = jest.spyOn(initOrm, "initOrm");
      const getbyIdSpy = jest.spyOn(addonDB, "getById");
      const logSpy = jest.spyOn(console, "log");
      const mockIncomingAddon: IncomingAddon = {
        addonID: 111111,
        webSiteURL: "HereSoTheTestWorks",
        latestFile: { id: 72683 } as IncomingFile,
        installedFile: { id: 72683 } as IncomingFile,
      } as IncomingAddon;

      initSpy.mockResolvedValue(mockOrm);
      getbyIdSpy.mockResolvedValue(undefined);

      // TODO: Try and get mocking for mappers to work
      // const addonMapperMock = *********
      // addonMapperMock.mockReturnValue(mockMappedAddon);

      await addonDB.init(mockContext);
      await addonDB.writeEntity(Addon, mockIncomingAddon, mockContext);

      // expect(addonMapperMock).toBeCalledTimes(1);
      expect(getbyIdSpy).toBeCalledTimes(1);
      expect(connectMock).toBeCalledTimes(2);
      expect(mockPersist).toBeCalledTimes(1);
      expect(logSpy).not.toBeCalled();
      expect(mockAssign).not.toBeCalled();
      expect(mockFlush).toBeCalledTimes(1);
      expect(closeMock).toBeCalledTimes(2);
    });
  });

  describe("WHEN calling writeEntity with a non-existent File", () => {
    test("THEN a new File is written to the database", async () => {
      const initSpy = jest.spyOn(initOrm, "initOrm");
      const getbyIdSpy = jest.spyOn(addonDB, "getById");
      const logSpy = jest.spyOn(console, "log");
      const mockIncomingFile: IncomingFile = {
        id: 22222,
        fileName: "HereSoTheTestWorks",
      } as IncomingFile;

      initSpy.mockResolvedValue(mockOrm);
      getbyIdSpy.mockResolvedValue(undefined);

      // TODO: Try and get mocking for mappers to work
      // const fileMapperMock = *********
      // fileMapperMock.mockReturnValue(mockMappedFile);

      await addonDB.init(mockContext);
      await addonDB.writeEntity(File, mockIncomingFile, mockContext);

      // expect(addonMapperMock).toBeCalledTimes(1);
      expect(getbyIdSpy).toBeCalledTimes(1);
      expect(connectMock).toBeCalledTimes(2);
      expect(mockPersist).toBeCalledTimes(1);
      expect(logSpy).not.toBeCalled();
      expect(mockAssign).not.toBeCalled();
      expect(mockFlush).toBeCalledTimes(1);
      expect(closeMock).toBeCalledTimes(2);
    });
  });

  describe("WHEN calling writeEntity with an already existing Addon", () => {
    test('THEN the existing addon is replaced with the new one', async () => {
      const initSpy = jest.spyOn(initOrm, "initOrm");
      const getbyIdSpy = jest.spyOn(addonDB, "getById");
      const logSpy = jest.spyOn(console, "log");
      const mockIncomingAddon: IncomingAddon = {
        addonID: 111111,
        webSiteURL: "HereSoTheTestWorks",
        latestFile: { id: 72683 } as IncomingFile,
        installedFile: { id: 72683 } as IncomingFile,
      } as IncomingAddon;

      initSpy.mockResolvedValue(mockOrm);
      getbyIdSpy.mockResolvedValue({} as DBAddon);

      // TODO: Try and get mocking for mappers to work
      // const addonMapperMock = *********
      // addonMapperMock.mockReturnValue(mockMappedAddon);

      await addonDB.init(mockContext);
      await addonDB.writeEntity(Addon, mockIncomingAddon, mockContext);

      // expect(addonMapperMock).toBeCalledTimes(1);
      expect(getbyIdSpy).toBeCalledTimes(1);
      expect(connectMock).toBeCalledTimes(2);
      expect(mockPersist).not.toBeCalled();
      expect(logSpy).toBeCalledTimes(1);
      expect(mockAssign).toBeCalledTimes(1);
      expect(mockFlush).toBeCalledTimes(1);
      expect(closeMock).toBeCalledTimes(2);
    });
  });

  describe("WHEN calling writeEntity with an already existing File", () => {
    test("THEN a the existing File is replaces by the new one", async () => {
      const initSpy = jest.spyOn(initOrm, "initOrm");
      const getbyIdSpy = jest.spyOn(addonDB, "getById");
      const logSpy = jest.spyOn(console, "log");
      const mockIncomingFile: IncomingFile = {
        id: 22222,
        fileName: "HereSoTheTestWorks",
      } as IncomingFile;

      initSpy.mockResolvedValue(mockOrm);
      getbyIdSpy.mockResolvedValue({} as DBModFile);

      // TODO: Try and get mocking for mappers to work
      // const fileMapperMock = *********
      // fileMapperMock.mockReturnValue(mockMappedFile);

      await addonDB.init(mockContext);
      await addonDB.writeEntity(File, mockIncomingFile, mockContext);

      // expect(addonMapperMock).toBeCalledTimes(1);
      expect(getbyIdSpy).toBeCalledTimes(1);
      expect(connectMock).toBeCalledTimes(2);
      expect(mockPersist).not.toBeCalled;
      expect(logSpy).toBeCalledTimes(1);
      expect(mockAssign).toBeCalledTimes(1);
      expect(mockFlush).toBeCalledTimes(1);
      expect(closeMock).toBeCalledTimes(2);
    });
  });

});
