const flattenAndExtractUse = rules => rules.reduce((pre, rule) => {
  if (rule.use) {
    pre.push(...[].concat(rule.use));
  }

  if (rule.oneOf) {
    pre.push(...flattenAndExtractUse(rule.oneOf));
  }

  return pre;
}, []);

module.exports = (compiler) => {
  const rawRules = compiler.options.module.rules;

  const flattenRules = flattenAndExtractUse(rawRules);

  const rule = flattenRules.find((item) => {
    return item ? /svg-sprite-loader/.test(item.loader) : false;
  }) || {};

  return rule ? rule.options : {};
};
