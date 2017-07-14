

window.onload = function(){
    var getHeaderHtml = function(headerArray){
        var html = "<tr>";
        for(var i=0,j=headerArray.length;i<j;i++){
            html += "<th>" + headerArray[i] + "</th>";
        }
        html += "</tr>";
        return html;
    };
    var headerHtml = getHeaderHtml(model.headers);
    var block = {};
    findBlocks(model.rows,block,model.mergeHeaders);
    var table = "<table>";
    table += headerHtml;
    table += renderTableContent(model.rows,block,model.headers,model.mergeHeaders.length>>>0);
    table += "</table>";

    var el = document.getElementById("ctn");
    el.innerHTML = table;
    var block1 = {};
    findBlocks(model1.rows,block1,model1.mergeHeaders);
    var table1 = "<table>";
    table1 += headerHtml;
    table1 += renderTableContent(model1.rows,block1,model1.headers,model1.mergeHeaders.length>>>0);
    table1 += "</table>";
    el = document.getElementById("ctn1");
    el.innerHTML = table1;
};

