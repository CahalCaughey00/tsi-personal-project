import { viewAllFiles } from "../../src/application-layer/application";
import { dbORM } from "../../src/data-layer/AddonDB";
import { allFilesMock } from "../fixtures";

jest.mock("../../src/data-layer/AddonDB");
const getAllMock = jest.spyOn(dbORM, "getAll");

describe("GIVEN the viewAllFiles function", () => {
  getAllMock.mockResolvedValue(allFilesMock);

  it("SHOULD return a vaild File entity is returned", async () => {
    const expected = [4143801, 4151762]
    const actual = await viewAllFiles();
    expect(getAllMock).toBeCalledTimes(1);
    expect(actual).toEqual(expected);
  });
});
