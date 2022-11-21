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

## 📋 更新日志

查看 [更新日志]

<!-- Links -->

[Release]: https://github.com/batu1579/hamibot-types/releases/latest

[更新日志]: ./CHANGELOG.md
