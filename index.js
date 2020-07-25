function textBox(lines = [], { padding = 10, margin = 2, print = true } = {}) {
  const getWidth = () =>
    lines.reduce((p, n) => (n.length > p ? n.length : p), 0) + padding * 2;
  const truncateLength = () =>
    process.stdout.columns - getWidth() - Math.max(margin, 2) * 2 - padding * 2;

  const truncate = (str = "", endWith = "...") =>
    `${(str + "").substr(
      0,
      getWidth() + truncateLength() - endWith.length
    )}${endWith}`;

  lines = (function trimPadding() {
    let acc = [];
    for (const line of lines) {
      if (line.length >= getWidth() + truncateLength()) {
        if (padding >= 2) {
          padding--;
          return trimPadding();
        } else {
          acc.push(truncate(line));
        }
      } else {
        acc.push(line);
      }
    }
    return acc;
  })();

  const top = `┌${"─".repeat(getWidth())}┐`;
  const bottom = `└${"─".repeat(getWidth())}┘`;
  const blank = `│${" ".repeat(getWidth())}│`;

  const text = (str) =>
    `${blank
      .split("")
      .reduce((p, n, i) =>
        i >= padding ? p + ((str + "")[i - (padding + 1)] || n) : p + n
      )}`;

  const result = `
${" ".repeat(margin)}${top}
${new Array(Math.round(padding / 2.5))
  .fill(`${" ".repeat(margin)}${blank}`)
  .join("\n")}
${" ".repeat(margin)}${lines
    .map((line) => text(line))
    .join("\n" + " ".repeat(margin))}
${new Array(Math.round(padding / 2.5))
  .fill(`${" ".repeat(margin)}${blank}`)
  .join("\n")}
${" ".repeat(margin)}${bottom}
  `;
  return print ? console.log(result) : result;
}

module.exports = textBox;

if (require.main === module) {
  textBox([].concat(process.argv.slice(2)));
}
