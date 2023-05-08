import { fileMapper } from "../../src/data-layer/mappers/fileMapper"
import fs from "fs"
import { join } from "path"
import { IncomingFile } from "../../src/incoming-entities/incomingFile";
import { allFilesMock } from "../fixtures";

describe('GIVEN the fileMapper function', () => {
  describe('WHEN called with an incoming File', () => {
    test("THEN is should generate a valid DBAddon entity", () => {
      const inputFile: IncomingFile = JSON.parse(fs.readFileSync(join("example-files", "allMods.json"), "utf-8")).installedAddons[5].installedFile
      const actual = fileMapper(inputFile)
      expect(actual).toEqual(allFilesMock[1])
    })
  });
});