import { deleteAddon } from "../../src/application-layer/application";
import { dbORM } from "../../src/data-layer/AddonDB";
import { mockSingleAddon } from "../fixtures";

jest.mock("../../src/data-layer/AddonDB");
const removeByIdMock = jest.spyOn(dbORM, "removeById");

describe("GIVEN the deleteAddon function", () => {
  removeByIdMock.mockResolvedValue(mockSingleAddon);
  const expected = JSON.parse(JSON.stringify(mockSingleAddon));
  const mockContext = {LOG_LEV: 0, logError: jest.fn()}
  
  describe("WHEN called with an existing entityId", () => {
    test("THEN it deletes the Addon from DB and returns it", async () => {
      const actual = await deleteAddon("MOCK ID", mockContext);
      expect(removeByIdMock).toBeCalledTimes(1);
      expect(actual).toEqual(expected);
    });
  })
});