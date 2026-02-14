import fs from "fs";
import path from "path";

const CONFIG_PATH = path.join(__dirname, "../../config.json");

export type Config = {
  currentUserName?: string;
};

export function readConfig(): Config {
  try {
    const raw = fs.readFileSync(CONFIG_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return {}; // default empty config
  }
}

export function writeConfig(config: Config) {
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2), "utf-8");
}

export function setUser(name: string) {
  const config = readConfig();
  config.currentUserName = name;
  writeConfig(config);
}
