import { viewAllFiles } from "../../src/application-layer/application";
import { dbORM } from "../../src/data-layer/AddonDB";
import { allFilesMock } from "../fixtures";

jest.mock("../../src/data-layer/AddonDB");
const getAllMock = jest.spyOn(dbORM, "getAll");

describe("GIVEN the viewAllFiles function", () => {
  getAllMock.mockResolvedValue(allFilesMock);
  const expected = JSON.parse(JSON.stringify(allFilesMock));
  test("THEN a vaild File entity is returned", async () => {
    const actual = await viewAllFiles();
    expect(getAllMock).toBeCalledTimes(1);
    expect(actual).toEqual(expected);
  });
});
