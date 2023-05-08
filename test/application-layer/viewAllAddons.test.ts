import { viewAllAddons } from "../../src/application-layer/application";
import { dbORM } from "../../src/data-layer/AddonDB";
import { allAddonsMock } from "../fixtures";
import { allAddons } from "../../src/application-layer/application";


jest.mock("../../src/data-layer/AddonDB")
const getAllMock = jest.spyOn(dbORM, "getAll");

describe("GIVEN the viewAllAddons function", () => {
  describe("WHEN called with a valid id", () => {

    getAllMock.mockResolvedValue(allAddonsMock);

    test("THEN a vaild Addon entity is returned", async () => {
      const expected = [372124, 455508]

      const actual = await viewAllAddons();
      expect(getAllMock).toBeCalledTimes(1)
      expect(actual).toEqual(expected);
    });
  });
});