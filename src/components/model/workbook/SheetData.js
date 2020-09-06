/*
     */


    import Row from './Row.js';

    export default class SheetData {
      constructor() {
        this.Rows = [];
      }

      ParseFromXml(xml) {
        if (xml == null || xml == '') return;
        if(Array.isArray(xml.row))
        {
          var rowl = parseInt(xml.row.length);
          for (var rrr = 0; rrr < rowl; rrr++) {
            var row = new Row();
            var xmlrow = xml.row[rrr];
            row.ParseFromXml(xmlrow);
            this.AddRow(row);
          }
        }else
        {
          var row = new Row();
          row.ParseFromXml(xml.row);
          this.AddRow(row);
        }
        
      }
      AddRow(Row) {
        this.Rows.push(Row);
      };
      AddCell(cell) {
        var reg = /[A-Za-z]+/g;
        var r = parseInt(cell.r.replace(reg, ''));
        for (var irow = 0; irow < this.Rows.length; irow++) {
          var row = this.Rows[irow];
          if (row.r > r) {
            //需要在最数组最上面增进row
            var row = new Row();
            row.r = r;
            this.Rows.unshift(row);
            row.AddCell(cell);
            return;
          } else if (row.r == r) {
            row.AddCell(cell);
            return;
          } else if (row.r > r) {
            //需要重新移动数组
            var row = new Row();
            row.r = r;
            row.AddCell(cell);
            this.Rows.splice(irow, 0, row);
            return;
          }
        }
        // empty add  or last add row
        var row = new Row();
        row.r = r;
        this.AddRow(row);
        row.AddCell(cell);
      }
      GetCellByRef(ref) {
        var reg = /[A-Za-z]+/g;
        var r = ref.replace(reg, '');
        return this.GetCell(r, ref);
      }
      GetCell(row, col) {
        for (var irow = 0; irow < this.Rows.length; irow++) {
          var Row = this.Rows[irow];
          if (Row.r > row) {
            return null;
          }
          if (Row.r == row) {
            return this.GetColCell(Row, col);
          }
        }
        return null;
      }

      GetRow(row) {
        for (var irow = 0; irow < this.Rows.length; irow++) {
          var Row = this.Rows[irow];
          if (Row.r > row) {
            return null;
          }
          if (Row.r == row) {
            return Row;
          }
        }
        return null;
      }
      GetColCell(Row, col) {
        for (var icol = 0; icol < Row.cells.length; icol++) {
          var Cell = Row.cells[icol];
          if (Cell.r > col) {
            return null;
          }
          if (Cell.r == col) {
            return Cell;
          }
        }
        return null;
      }
    }
