import { deleteFile } from "../../src/application-layer/application";
import { dbORM } from "../../src/data-layer/AddonDB";
import { mockSingleFile } from "../fixtures";


jest.mock("../../src/data-layer/AddonDB");
const removeByIdMock = jest.spyOn(dbORM, "removeById");

describe("GIVEN the deleteFile function", () => {
  removeByIdMock.mockResolvedValue(mockSingleFile);
  const expected = JSON.parse(JSON.stringify(mockSingleFile));
  const mockContext = {LOG_LEV: 0, logError: jest.fn()}

  describe("WHEN called with an existing entityId", () => {
    test("THEN it deletes the file from DB and returns deleted File", async () => {
      const actual = await deleteFile("MOCK ID", mockContext);
      expect(removeByIdMock).toBeCalledTimes(1);
      expect(actual).toEqual(expected);
    });
  })
});