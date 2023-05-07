import { importAddon } from "../../src/application-layer/application";
import { dbORM } from "../../src/data-layer/AddonDB";
import { IncomingAddon } from "../../src/incoming-entities/incomingAddon";
import { mockNewAddon } from "../fixtures";

jest.mock("../../src/data-layer/AddonDB");
jest.mock("fs")
const jsonParseMock = jest.spyOn(JSON, "parse")
const writeEntityMock = jest.spyOn(dbORM, "writeEntity")

describe('GIVEN the importAddon function', () => {
  describe('WHEN a valid file selection is made', () => {
    jsonParseMock.mockReturnValue({} as IncomingAddon)
    writeEntityMock.mockResolvedValue(mockNewAddon)

    test("`THEN a new Addon is imported and returned", async () => {
      
      const actual = await importAddon("mockFileName.json")
      expect(jsonParseMock).toBeCalledTimes(1)
      expect(writeEntityMock).toBeCalledTimes(1)
      expect(actual).toEqual(mockNewAddon)
    })
  });
});