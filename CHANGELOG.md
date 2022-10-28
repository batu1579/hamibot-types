# Change Log

所有对 "hamibot-types" 的更改都会记录在这个文件中。

文档格式基于 [Keep a Changelog] ，
此项目遵循 [语义化版本号] 。

## [Unreleased]

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

[unreleased]: https://github.com/batu1579/hamibot-types/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/batu1579/hamibot-types/compare/v0.0.1..v0.1.0
[0.0.1]: https://github.com/batu1579/hamibot-types/releases/tag/v0.0.1
