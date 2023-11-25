import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import { ExcelTarjetaData } from 'src/app/shared/interfaces/Excel.interface';

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root',
})
export class ExceljsService {
  private workbook!: Workbook;

  generarExcel(
    dataExcel: any[],
    sheetName: string[],
    fileName: string,
    columnHeaders: any[],
    firstColumn: boolean
  ) {
    this.workbook = new Workbook();
    this.workbook.creator = 'MONEFI';
    this.workbook.lastModifiedBy = 'MONEFI';

    let index = 0;

    sheetName.forEach((_) => {
      const worksheet = this.workbook.addWorksheet(sheetName[index]);

      const headerRow = worksheet.addRow(columnHeaders[index]);

      headerRow.eachCell((cell) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'ffa3c2b0' },
        };
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
        cell.font = { size: 12, bold: true, color: { argb: 'ff005724' } };
        cell.alignment = { horizontal: 'center' };
      });

      dataExcel[index].forEach((rowData: any[]) => {
        const row = worksheet.addRow(Object.values(rowData));
        row.eachCell((cell) => {
          cell.font = { name: 'Calibri', family: 4, size: 10, bold: false };
          cell.alignment = { horizontal: 'center' };
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'ffffffff' },
          };
          cell.border = {
            left: { style: 'thin' },
            right: { style: 'thin' },
          };
          if (firstColumn && cell.address === `A${row.number}`) {
            cell.alignment = { horizontal: 'left' };
          }
          if (row.number === dataExcel[index].length + 1) {
            cell.border = {
              left: { style: 'thin' },
              right: { style: 'thin' },
              bottom: { style: 'thin' },
            };
          }
        });
      });

      worksheet.columns.forEach((column: any) => {
        let maxLength = 0;
        column.eachCell({ includeEmpty: true }, (cell: any) => {
          const columnLength = cell.value
            ? JSON.stringify(cell.value).length
            : 10;
          maxLength = Math.max(maxLength, columnLength);
        });
        column.width = maxLength < 10 ? 12 : maxLength + 2;
      });

      index++;
    });

    this.workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: EXCEL_TYPE });
      saveAs(blob, fileName + EXCEL_EXTENSION);
    });
  }

  excelGeneralTarjetas(dataSource: any) {
    const columnas = [
      'Nombre de la Tarjeta',
      'Tipo de Tarjeta',
      'Límite de Gasto Mensual',
      'Nombre de la Transacción',
      'Monto',
      'Fecha',
      'Categoría',
    ];

    const arreglos: any = {};
    const columnasNuevas: any = {};

    dataSource.forEach((arreglo: ExcelTarjetaData[], indice: number) => {
      if (arreglo.length === 0) return;

      arreglos[arreglo[0].var_nombre_tarjeta] = arreglo;
      columnasNuevas[indice] = columnas;
    });

    this.generarExcel(
      Object.values(arreglos),
      Object.keys(arreglos),
      `Historial de Transacciones de todas las Tarjetas`,
      Object.values(columnasNuevas),
      false
    );
  }

  excelTarjeta(dataSource: ExcelTarjetaData[]) {
    const columnas = [
      'Nombre de la Tarjeta',
      'Tipo de Tarjeta',
      'Límite de Gasto Mensual',
      'Nombre de la Transacción',
      'Monto',
      'Fecha',
      'Categoría',
    ];

    this.generarExcel(
      [dataSource],
      ['Historial de Transacciones'],
      `Tarjeta ${dataSource[0].var_nombre_tarjeta} - ${dataSource[0].var_tipo_tarjeta}`,
      [columnas],
      false
    );
  }
}
