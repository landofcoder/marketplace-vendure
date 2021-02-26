import * as FileSaver from 'file-saver';

export const exportExcel = (data:any, exportType: string) => {
    const excel = require('exceljs');
    const blobType: string = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet('orderStatistics');
    if (exportType === 'month') {
        worksheet.columns = [
            {header: 'Month', key: 'label', width: 10},
            {header: 'Total Orders', key: 'totalOrders', width: 30},
        ]
    }
    else {
        worksheet.columns = [
            {header: 'Day', key: 'label', width: 10},
            {header: 'Total Orders', key: 'totalOrders', width: 30},
            {header: 'Month', key: 'month', width: 10},
        ]
    }
    worksheet.getColumn(1).alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getColumn(2).alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getColumn(3).alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.addRows(data);
    workbook.xlsx.writeBuffer().then((data: BlobPart) => {
        const blob = new Blob([data], { type: blobType }); 
        FileSaver.saveAs(blob, 'order_statistics.csv');
       });
    }
