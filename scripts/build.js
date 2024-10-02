// 创建 index.d.ts 文件
import fs from 'fs/promises';
import { resolve } from 'path';

const typedir = 'types';
const entrypath = resolve('index.d.ts');
const refs = [];
for await (const file of await fs.opendir(resolve(typedir)))
  if (file.isFile() && file.name.endsWith('.d.ts'))
    refs.push(`/// <reference path="${typedir}/${file.name}" />`);
fs.writeFile(entrypath, refs.join('\n'), 'utf-8');
