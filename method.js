/**
 *寻找表中的合并单元格
 * @param rawData　　　　　　表的原始数据　
 * @param blockDic　　　　　　合并单元格字典
 * @param combineHeaders　　　合并的列名
 */
function findBlocks(rawData, blockDic, combineHeaders){
    var cell,
        row,
        col,
        colPreCell,
        colNextCell,
        rowPreCell,
        rowNextCell,
        preCol,
        preRow,
        nextCol,
        nextRow,
        blockKey,
        baseCol = combineHeaders[0];
    for (var i = 0; i <rawData.length; i++) {
        preRow = rawData[i - 1];
        row = rawData[i];
        nextRow = rawData[i + 1];
        for (var j = 0; j < combineHeaders.length; j++) {
            preCol = combineHeaders[j - 1];
            col = combineHeaders[j];
            nextCol = combineHeaders[j + 1];
            cell = row[col];
            blockKey = cell + row[baseCol];
            rowPreCell = preCol ? row[preCol] : null;
            rowPreCell = rowPreCell ? rowPreCell + row[baseCol] :null;

            colPreCell = preRow ? preRow[col] : null;
            colPreCell = colPreCell ? colPreCell + preRow[baseCol] : null;

            rowNextCell = nextRow ? nextRow[col] : null;
            rowNextCell = rowNextCell ? rowNextCell + nextRow[baseCol] : null;

            colNextCell = nextCol ? row[nextCol] :null;
            colNextCell = colNextCell ? colNextCell + row[baseCol] : null;

            if (blockKey !== colPreCell && blockKey !== rowPreCell && (blockKey === colNextCell || blockKey === rowNextCell)) {
                blockDic[blockKey] = { rowSpan: 1, colSpan: 1 };
                continue;
            }
            if (blockKey === rowPreCell && blockKey !== colPreCell) {
                blockDic[blockKey].colSpan++;
                continue;
            }
            if (blockKey === colPreCell && blockKey !== rowPreCell) {
                blockDic[blockKey].rowSpan++;
                continue;
            }
        }
    }
}
/**
 * 渲染表格内容
 * @param rawData　　　　原始表格数据
 * @param blockDic　　　　表格中合并单元格的字典
 * @param headers　　　　表头
 * @param combineCount　 合并的列数
 * @returns {string}　　 表格主题html
 */
function renderTableContent(rawData, blockDic, headers,combineCount) {
    var cell,
        row,
        col,
        colPreCell,
        rowPreCell,
        preCol,
        preRow,
        blockKey,
        baseCol = headers[0];
    var rows = '';
    for (var i = 0; i < rawData.length; i++) {
        preRow = rawData[i - 1];
        row = rawData[i];
        rows += '<tr>';
        for (var j = 0; j < headers.length; j++) {
            preCol = headers[j - 1];
            col = headers[j];
            cell = row[col];
            blockKey = cell + row[baseCol];
            rowPreCell = preCol ? row[preCol] : null;
            rowPreCell = rowPreCell ? rowPreCell + row[baseCol] : null;

            colPreCell = preRow ? preRow[col] : null;
            colPreCell = colPreCell ? colPreCell + preRow[baseCol] : null;

            if (blockKey !== colPreCell && blockKey !== rowPreCell && j < combineCount) {
                if (blockDic[blockKey]) {
                    rows += '<td rowspan="' + blockDic[blockKey].rowSpan + '"colspan="' + blockDic[blockKey].colSpan + '">' + cell + '</td>';
                } else {
                    rows += '<td>' + cell + '</td>';
                }
            } else {
                if (blockDic[blockKey]){
                    continue;
                }
                rows += '<td>' + cell + '</td>';
            }
        }
        rows += '</tr>';
    }
    return rows;
}