function getCategories(data) {
    var categories = {};
    
    data.items.forEach(function(i) {
        categories[i.GOODN] = categories[i.GOODN] || { total: 0, items: []
            ,GOODN:i.GOODN ,UNIT_PRICE:i.UNIT_PRICE
            ,BDAY_Q:0,TDAY_IN_Q:0,TDAY_OUT_Q:0,INV_Q:0
            ,BDAY_W:0,TDAY_IN_W:0,TDAY_OUT_W:0,INV_W:0
        };
        categories[i.GOODN].items.push(i);
        categories[i.GOODN].BDAY_Q += Number(i.BDAY_Q);
        categories[i.GOODN].TDAY_IN_Q += Number(i.TDAY_IN_Q);
        categories[i.GOODN].TDAY_OUT_Q += Number(i.TDAY_OUT_Q);
        categories[i.GOODN].INV_Q += Number(i.INV_Q);
        categories[i.GOODN].BDAY_W += Number(i.BDAY_W);
        categories[i.GOODN].TDAY_IN_W += Number(i.TDAY_IN_W);
        categories[i.GOODN].TDAY_OUT_W += Number(i.TDAY_OUT_W);
        categories[i.GOODN].INV_W += Number(i.INV_W);
    });
    
    return Object.values(categories);
}

function total(items,prop) {
    var sum = 0
    items.forEach(function (i) {
        sum += Number(i[prop]);
    })
    return sum
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