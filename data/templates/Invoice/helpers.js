function total(items,prop,digit) {
    var sum = 0
    items.forEach(function (i) {
        sum += Number(i[prop]);
    })
    return numberformat(sum,digit);
}

function numberformat(item,digit) {
    item = Number(item);
    if(!digit){
        digit = 0;
    }
    var option = { minimumFractionDigits: digit,maximumFractionDigits:digit };
    var result = item.toLocaleString('ko',option);
    return result;
}