function getCategories(data) {
    var categories = {};
    var avg = getAverage(data.items);
    data.items.forEach(function(i) {
        categories[i.ROWNO] = categories[i.ROWNO] 
          || { SCAN_YN1:'',SEQNO1:'',WEIGHT1:'',CLASS1:''
              ,SCAN_YN2:'',SEQNO2:'',WEIGHT2:'',CLASS2:''
              ,SCAN_YN3:'',SEQNO3:'',WEIGHT3:'',CLASS3:''
              ,SCAN_YN4:'',SEQNO4:'',WEIGHT4:'',CLASS4:''
               };
        var index = i.SEQNO % 4;
        var item = categories[i.ROWNO];
        var over = '';
        if(i.WEIGHT > avg * 1.2 || i.WEIGHT < avg * 0.8){
            over = 'over';
        }
        
        if(index == 1){
            item.SCAN_YN1 = i.SCAN_YN;
            item.SEQNO1 = i.SEQNO;
            item.WEIGHT1 = i.WEIGHT;
            item.CLASS1 = over;
        }else if(index == 2){
            item.SCAN_YN2 = i.SCAN_YN;
            item.SEQNO2 = i.SEQNO;
            item.WEIGHT2 = i.WEIGHT;
            item.CLASS2 = over;
        }else if(index == 3){
            item.SCAN_YN3 = i.SCAN_YN;
            item.SEQNO3 = i.SEQNO;
            item.WEIGHT3 = i.WEIGHT;
            item.CLASS3 = over;
        }else if(index === 0){
            item.SCAN_YN4 = i.SCAN_YN;
            item.SEQNO4 = i.SEQNO;
            item.WEIGHT4 = i.WEIGHT;
            item.CLASS4 = over;
        }
    });
    
    return Object.values(categories);
}

function getAverage(items) {
    var sum = 0
    items.forEach(function (i) {
        sum += Number(i.WEIGHT);
    })
    var avg = sum / items.length;
    return avg.toFixed(2); 
}
function numberformat(item,digit) {
    if(!item){
        return '';
    }
    item = Number(item);
    if(!digit){
        digit = 0;
    }
    var option = { minimumFractionDigits: digit,maximumFractionDigits:digit };
    var result = item.toLocaleString('ko',option);
    return result;
}
function getOverComment(items){
    var avg = getAverage(items);
    var cnt20 = 0;
    var cnt50 = 0;
    items.forEach(function(i) {
        if(i.WEIGHT > avg * 1.5 || i.WEIGHT < avg * 0.5){
            cnt50++;
        }
        else if(i.WEIGHT > avg * 1.2 || i.WEIGHT < avg * 0.8){
            cnt20++;
        } 
    });
    
    if(cnt20 > 0 && cnt50 > 0){
        return '※평균중량의 오차범위(±20% ' +  cnt20 +'건, ±50%  '+cnt50+'건)를 초과하는 자료가 존재합니다.';
    }else if(cnt20 > 0){
        return '※평균중량의 오차범위(±20% ' +  cnt20 +'건)를 초과하는 자료가 존재합니다.';
    }else if(cnt50 > 0){
        return '※평균중량의 오차범위(±50% ' +  cnt50 +'건)를 초과하는 자료가 존재합니다.';
    }
}
