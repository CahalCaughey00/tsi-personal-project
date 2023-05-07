import { viewFile } from "../../src/application-layer/application";
import { dbORM } from "../../src/data-layer/AddonDB";
import { mockSingleFile } from "../fixtures";

jest.mock("../../src/data-layer/AddonDB")
const getByIdMock = jest.spyOn(dbORM, "getById");

describe("GIVEN the viewFile function", () => {

  describe("WHEN called with a valid id", () => {
    getByIdMock.mockResolvedValue(mockSingleFile);
    const expected = JSON.parse(JSON.stringify(mockSingleFile))
    test("THEN a vaild File entity is returned", async () => {
      const actual = await viewFile("MOCK ID");
      expect(getByIdMock).toBeCalledTimes(1)
      expect(actual).toEqual(expected);
    });
  });
})