function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
  let exprMas = [];
  let IsBracket = 0, sumBracket = 0, resultSum = 0, startInd = 0, finishInd = 0;

  expr = expr.split(' ').filter(item => item !== '').join('');
  exprMas = expr.split('+').join(' + ')
                .split('-').join(' - ')
                .split('*').join(' * ')
                .split('/').join(' / ')
                .split('(').join('( ')
                .split(')').join(' )')
                .split(' ');

  for (let i = 0; i < exprMas.length; i++) {
    const item = exprMas[i];
    let substringExpressionResult = 0;

    if (item === "(") {
      if (sumBracket === 0) {
        IsBracket = 1;
        startInd = i;
      }

      sumBracket += 1;
    }

    if (item === ")") {
      sumBracket -= 1;
      if (IsBracket === 1 && sumBracket === 0) {
        finishInd = i;
        substringExpressionResult = expressionCalculator(exprMas.slice(startInd + 1, finishInd).join(''));
        exprMas.splice(startInd, finishInd - startInd + 1, substringExpressionResult);
        i = startInd;
        IsBracket = 0;
      }
    }
  };

  if (sumBracket !== 0) throw new Error("ExpressionError: Brackets must be paired");

  for (let i = 0; i < exprMas.length; i++) {
    const item = exprMas[i];

    if (item === "*") {
      exprMas.splice(i - 1, 3, Number(exprMas[i - 1]) * Number(exprMas[i + 1]));
      i -= 1;
    }

    if (item === "/") {
      if (Number(exprMas[i + 1]) === 0) throw Error('TypeError: Division by zero.');
      exprMas.splice(i - 1, 3, Number(exprMas[i - 1]) / Number(exprMas[i + 1]));
      i -= 1;
    }
  }

  resultSum = Number(exprMas[0]);

  for (let i = 1; i < exprMas.length; i++) {
    const item = exprMas[i];

    if (item === "+") {
      i++;
      resultSum += Number(exprMas[i]);
    }

    if (item === "-") {
      i++;
      resultSum -= Number(exprMas[i]);
    }
  }

  return resultSum;
}

module.exports = {
    expressionCalculator
}
