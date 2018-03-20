function getCategories(data) {
    var categories = {};
    
    data.items.forEach(function(i) {
        categories[i.GOODN] = categories[i.GOODN] || { total: 0, items: []
            ,GOODN:i.GOODN ,UNIT_PRICE:i.UNIT_PRICE,TOTE_PRICE:i.TOTE_PRICE
            ,FREEZE_PRICE:i.FREEZE_PRICE,WORK_PRICE:i.WORK_PRICE
            ,INQ:0,OTQ:0,RFAMT:0,LDAMT:0,FZAMT:0,WKAMT:0
        };
        categories[i.GOODN].items.push(i);
        categories[i.GOODN].INQ += Number(i.INQ);
        categories[i.GOODN].OTQ += Number(i.OTQ);
        categories[i.GOODN].RFAMT += Number(i.RFAMT);
        categories[i.GOODN].LDAMT += Number(i.LDAMT);
        categories[i.GOODN].FZAMT += Number(i.FZAMT);
        categories[i.GOODN].WKAMT += Number(i.WKAMT);
    });
    
    return Object.values(categories);
}
function salePrice(items,multi) {
    if(!multi){
        multi = 1;
    }
    var sum = 0
    items.forEach(function (i) {
        sum += Number(i.RFAMT) + Number(i.LDAMT) + Number(i.FZAMT) + Number(i.WKAMT);
    });
    sum = sum * multi;
    return numberformat(sum);
}
function currentMisu(data) {
    var sum = 0
    data.items.forEach(function (i) {
        sum += Number(i.RFAMT) + Number(i.LDAMT) + Number(i.FZAMT) + Number(i.WKAMT);
    });
    sum = sum * 1.1;
    sum = Number(data.provider.MISU_TOTAL) - sum;
    return numberformat(sum);
}

function total(items,prop,digit) {
    var sum = 0
    items.forEach(function (i) {
        sum += Number(i[prop]);
    });
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