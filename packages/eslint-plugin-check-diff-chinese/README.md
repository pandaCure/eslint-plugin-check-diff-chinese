# `eslint-plugin-check-diff-chinese`
校验项目中汉字是否符合繁体字规则 并自动修复
- 默认高频配置文件
- 可以开启 (opencc)[https://github.com/BYVoid/OpenCC#readme]
> TODO: 后续会自定义配置文件

## Usage

```
.eslintrc
{
  plugins: ['check-diff-chinese'],
  rule: {
    'check-diff-chinese': "error" // 默认高频词汇校验
    // 或者
    'check-diff-chinese': {
      opencc: true
    } // 开启 opencc s2twp.json 转换
  }
}
```
