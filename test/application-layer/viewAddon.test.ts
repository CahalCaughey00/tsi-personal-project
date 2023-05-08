import { viewAddon } from "../../src/application-layer/application";
import { dbORM } from "../../src/data-layer/AddonDB";
import { mockSingleAddon } from "../fixtures";
import { context } from "../../src";


jest.mock("../../src/data-layer/AddonDB")
const getByIdMock = jest.spyOn(dbORM, "getById");

describe("GIVEN the viewFile function", () => {

  describe("WHEN called with a valid id", () => {
    getByIdMock.mockResolvedValue(mockSingleAddon);
    const expected = JSON.parse(JSON.stringify(mockSingleAddon))
    const mockContext = {LOG_LEV: 0, logError: jest.fn()}
    test("THEN a vaild File entity is returned", async () => {
      const actual = await viewAddon("MOCK ID", mockContext);
      expect(getByIdMock).toBeCalledTimes(1)
      expect(actual).toEqual(expected);
    });
  });
})