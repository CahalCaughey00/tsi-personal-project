import { viewAllAddons } from "../../src/application-layer/application";
import { dbORM } from "../../src/data-layer/AddonDB";
import { allAddonsMock } from "./fixtures";

jest.mock("../../src/data-layer/AddonDB")
const getAllMock = jest.spyOn(dbORM, "getAll");

describe("GIVEN the viewAllFiles function", () => {
  describe("WHEN called with a valid id", () => {
    getAllMock.mockResolvedValue(allAddonsMock);
    const expected = JSON.parse(JSON.stringify(allAddonsMock))
    test("THEN a vaild File entity is returned", async () => {
      const actual = await viewAllAddons();
      expect(getAllMock).toBeCalledTimes(1)
      expect(actual).toEqual(expected);
    });
  });
});