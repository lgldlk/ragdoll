// get-dir-all-file-name-arr.ts
import * as fs from 'fs';
import * as path from 'path';

// 默认存放env文件的文件夹路径
const directory = path.resolve(process.cwd(), 'src/config/env');

type optionsType = {
  dirPath?: string;
  prefix?: string;
};

export function getDirAllFileNameArr(options?: optionsType): string[] {
  const params = { dirPath: directory, prefix: 'src/config/env/', ...options };
  const results = [];
  try {
    for (const dirContent of fs.readdirSync(params.dirPath)) {
      const dirContentPath = path.resolve(directory, dirContent);
      if (fs.statSync(dirContentPath).isFile()) {
        if (dirContent.endsWith('.env')) {
          if (params.prefix) {
            results.push(`${params.prefix}${dirContent}`);
          } else {
            results.push(dirContent);
          }
        }
      }
    }
    return results;
  } catch (error) {
    return results;
  }
}
