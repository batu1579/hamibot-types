# Hamibot 类型声明

> hamibot 内置函数的类型声明

## 🚀 获取类型声明

### 通过脚本获取

这里提供四个脚本分别对应不同系统和不同来源，只需要在项目根目录下运行即可：

> 推荐使用 Hamibot 代理的脚本，国内获取更稳定也不会被限制访问次数。

- [Windows - Hamibot 代理](./scripts/updateTypesProxy.ps1)
- [Linux - Hamibot 代理](./scripts/updateTypesProxy.sh)
- [Windows - Github](./scripts/updateTypes.ps1)
- [Linus - Github](./scripts/updateTypes.sh)

当然你也可以手动从 [Release] 中下载压缩包并解压在项目目录中。

### 使用 Git 获取

```bash
# 添加子树
git subtree add --prefix=hamibot-types git@github.com:batu1579/hamibot-types.git main --squash

# 将修改推送到远程
git push
```

## 💪 获取更新

### 通过脚本更新

重复 [通过脚本获取](#通过脚本获取) 的操作重新获取即可。

### 使用 Git 更新

```bash
# 拉取子树新代码
git subtree pull --prefix=hamibot-types git@github.com:batu1579/hamibot-types.git main --squash

# 将修改推送到远程
git push
```

## 🛠️ 迁移说明

如果你当前的项目正在使用老版本的模板，可以选择手动更新到新的类型声明（后续会更新模板）。你只需要完成下面几个步骤：

1. 删除原来模板中携带的 `types` 文件夹

2. 使用前文提到的方式 [通过脚本获取](#通过脚本获取) 或 [通过 Git 获取](#使用-git-获取)

3. 打开根目录中的 `tsconfig.json` 文件，将其中 `typeRoots` 数组中的 `types` 修改为 `**\types` :

    ```js
    {
        "compilerOptions": {
            ...
            "typeRoots": [
                "types",    // 将这行
                "**/types", // 修改为这行
                "node_modules/@types"
            ],
            ...
        }
    }
    ```

## ⚠️ 注意事项

如果有用到暂时没有声明过的模块，可以使用 TS 的忽略语法:

> 注意：忽略会跳过所有检查，除了语法错误。使用时会有风险，请在确保肯定不会出现问题后再使用。

```typescript
// 多行忽略（取消两个标记间的代码检查。）
// 可以不使用结束标记，即忽略到文件结尾。
// 注意：必须在文件顶部使用。
// @ts-nocheck
canvas.drawLine(0, 0, 1080, 1920, paint);

// @ts-check

// 单行忽略（取消下一行的代码检查。）
// @ts-ignore
canvas.drawLine(0, 0, 1080, 1920, paint);
```

## 📋 更新日志

查看 [更新日志]

<!-- Links -->

[Release]: https://github.com/batu1579/hamibot-types/releases/latest

[更新日志]: ./CHANGELOG.md
