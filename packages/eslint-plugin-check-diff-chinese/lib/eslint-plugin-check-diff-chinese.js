'use strict'
const errText = ['标', '視頻', '视频']
const RuleOfCheckDiffChinese = {
  meta: {
    type: 'suggestion'
  },
  create(context) {
    return {
      Literal: node => {
        const { value } = node
        if (errText.includes(value)) {
          context.report({
            node,
            message: '{{ str }} 是包含错用错别字 请修改 （づ￣3￣）づ╭❤～',
            data: {
              str: value
            }
          })
        }
      }
    }
  }
}
const rules = {
  'check-diff-chinese': RuleOfCheckDiffChinese
}
module.exports = rules
