import { addonMapper } from "../../src/data-layer/mappers/addonMapper"
import fs from "fs"
import { join } from "path"
import { IncomingAddon } from "../../src/incoming-entities/incomingAddon";
import { allAddonsMock } from "../fixtures";

describe('GIVEN the addonMapper function', () => {
  describe('WHEN called with an incoming Addon file', () => {
    test("THEN is should generate a valid DBAddon entity", () => {
      const inputAddon: IncomingAddon = JSON.parse(fs.readFileSync(join("example-files", "allMods.json"), "utf-8")).installedAddons[1]
      const actual = addonMapper(inputAddon)
      expect(actual).toEqual(allAddonsMock[1])
    })
  });
});