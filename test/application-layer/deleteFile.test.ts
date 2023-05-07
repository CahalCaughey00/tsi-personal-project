import { deleteFile } from "../../src/application-layer/application";
import { dbORM } from "../../src/data-layer/AddonDB";
import { mockSingleFile } from "../fixtures";

jest.mock("../../src/data-layer/AddonDB");
const removeByIdMock = jest.spyOn(dbORM, "removeById");

describe("GIVEN the deleteFile function", () => {
  removeByIdMock.mockResolvedValue(mockSingleFile);
  const expected = JSON.parse(JSON.stringify(mockSingleFile));
  describe("WHEN called with an existing entityId", () => {
    test("THEN it deletes the file from DB and returns deleted File", async () => {
      const actual = await deleteFile("MOCK ID");
      expect(removeByIdMock).toBeCalledTimes(1);
      expect(actual).toEqual(expected);
    });
  })
});