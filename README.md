# Hamibot 类型声明

> hamibot 内置函数的类型声明

## 🚀 获取类型

### 使用 Git 获取

```bash
# 添加子树
git subtree add --prefix=hamibot-types git@github.com:batu1579/hamibot-types.git main --squash

# 将修改推送到远程
git push
```

### 不使用 Git 获取

这里提供两个脚本分别对应不同系统，只需要在项目根目录下运行即可：

- [Windows]
- [Linus]

当然你也可以手动从 [Release] 中下载压缩包并解压在项目目录中。

## 💪 获取更新

### 使用 Git 更新

```bash
# 拉取子树新代码
git subtree pull --prefix=hamibot-types git@github.com:batu1579/hamibot-types.git main --squash

# 将修改推送到远程
git push
```

### 不使用 Git 更新

重复 [不使用 Git 获取](#不使用-git-获取) 的操作重新获取即可。

## 📋 更新日志

查看 [更新日志]

<!-- Links -->

[Windows]: scripts/updateTypes.ps1
[Linus]: scripts/updateTypes.ps1

[Release]: https://github.com/batu1579/hamibot-types/releases/latest

[更新日志]: ./CHANGELOG.md
