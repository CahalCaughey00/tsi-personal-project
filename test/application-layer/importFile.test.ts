import { importFile } from "../../src/application-layer/application";
import { dbORM } from "../../src/data-layer/AddonDB";
import { IncomingFile } from "../../src/incoming-entities/incomingFile";
import { mockNewFile } from "../fixtures";


jest.mock("../../src/data-layer/AddonDB");
jest.mock("fs")
const jsonParseMock = jest.spyOn(JSON, "parse")
const writeEntityMock = jest.spyOn(dbORM, "writeEntity")

describe('GIVEN the importFile function', () => {
  describe('WHEN a valid file selection is made', () => {
    jsonParseMock.mockReturnValue({} as IncomingFile)
    writeEntityMock.mockResolvedValue(mockNewFile)
    const mockContext = {LOG_LEV: 0, logError: jest.fn()}

    test("`THEN a new File is imported and returned", async () => {
      
      const actual = await importFile("mockFileName.json", mockContext)
      expect(jsonParseMock).toBeCalledTimes(1)
      expect(writeEntityMock).toBeCalledTimes(1)
      expect(actual).toEqual(mockNewFile)
    })
  });
});