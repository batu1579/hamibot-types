# Change Log

所有对 "hamibot-types" 的更改都会记录在这个文件中。

文档格式基于 [Keep a Changelog] ，
此项目遵循 [语义化版本号] 。

## [Unreleased]

### Fixed

- 修复 `device.release` 字段拼写错误的问题 [#15](https://github.com/batu1579/hamibot-types/issues/15)

## [0.1.4] - 2023-04-14

### Changed

- 收窄响应接口中 http 方法的类型
- 收窄 `contentType` 的类型

### Fixed

- 添加遗漏的 `getClip()` 函数 [#6](https://github.com/batu1579/hamibot-types/issues/6)
- 修复可以重复配置请求方法的问题
- 修复使用 `Response.body.json()` 方法时没办法使用解包语法直接获取到对应的数据的问题
- 修复 `HttpRequestOptions` 中的字段为必填的问题 [#8](https://github.com/batu1579/hamibot-types/issues/8)
- 添加 `events.addListener()` 方法中 `eventName` 参数的提示 [#9](https://github.com/batu1579/hamibot-types/issues/9)
- 修复 `events.on()` 和 `events.addListener()` 方法不能使用自定义的事件名称的问题

## [0.1.3] - 2022-12-04

### Fixed

- 添加遗漏的 UISelector 方法：

  - indexInParent

- 修复控件操作中点按相关操作的返回值类型

## [0.1.2] - 2022-11-19

### Fixed

- 修复被误当成属性的 UIObject 方法

  - checked
  - packageName
  - className
  - checkable
  - focusable
  - focused
  - selected
  - clickable
  - longClickable
  - enabled
  - password
  - scrollable

- 删除不存在的 UIObject 属性

  - boundsInScreen

- 添加遗漏的 UIObject 属性

  - desc

## [0.1.1] - 2022-10-29

### Fixed

- 修复没有启用屏幕触摸监听方法的问题
- 修复找不到 `Iterator` 类型的问题

### Changed

- 使方法重载声明相邻
- 统一了一些类型：
  
  - `Function` -> `() -> void` 或 `(...args: any[]): any`
  - `Object` -> `unknown`

## [0.1.0] - 2022-10-26

### Added

- 添加了除 `canvas` 和 `util` 模块以外大部分内置函数的类型声明

## [0.0.1] - 2022-10-25

- initial release

<!-- Links -->

[keep a changelog]: https://keepachangelog.com/en/1.0.0/
[语义化版本号]: https://semver.org/spec/v2.0.0.html

<!-- Versions -->

[unreleased]: https://github.com/batu1579/hamibot-types/compare/v0.1.4...HEAD
[0.1.4]: https://github.com/batu1579/hamibot-types/compare/v0.1.3..v0.1.4
[0.1.3]: https://github.com/batu1579/hamibot-types/compare/v0.1.2..v0.1.3
[0.1.2]: https://github.com/batu1579/hamibot-types/compare/v0.1.1..v0.1.2
[0.1.1]: https://github.com/batu1579/hamibot-types/compare/v0.1.0..v0.1.1
[0.1.0]: https://github.com/batu1579/hamibot-types/compare/v0.0.1..v0.1.0
[0.0.1]: https://github.com/batu1579/hamibot-types/releases/tag/v0.0.1
