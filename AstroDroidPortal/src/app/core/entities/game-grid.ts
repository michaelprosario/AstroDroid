import { Ensure } from "../services/ensure";
import { GameGridCell, GameGridCellContent } from "./game-grid-cell";
import { Point2D } from "./point-2d";

export class GameGrid {

    grid: GameGridCell[][];
    width: number;
    height: number;

    resetExploreFlags() {
        let col: number = 0;
        let row: number = 0;
        for (col = 0; col < this.width; col++) {
            for (row = 0; row < this.height; row++) {
                let cell = this.grid[col][row];
                cell.explored = false;
                cell.parentCell = undefined;
            }
        }
    }

    constructor(width: number, height: number) {
        if (width < 10) {
            throw "width is less than 10";
        }

        if (height < 10) {
            throw "height is less than 10";
        }

        this.grid = [];
        this.width = width;
        this.height = height;

        let col = 0;
        let row = 0;

        for (col = 0; col < width; col++) {
            this.grid[col] = [];
            for (row = 0; row < height; row++) {
                this.grid[col][row] = new GameGridCell(col, row);
            }
        }
    }

    setGridCell(col: number, row: number, content: GameGridCellContent) {
        if (col < 0)
            throw "setGridCell: col is negative";
        if (col > this.width)
            throw "setGridCell: col is too large"

        if (row < 0)
            throw "setGridCell: row is negative";

        if (row > this.height) {
            throw "setGridCell: row is too large"
        }

        if (!this.grid[col][row]) {
            throw `setGridCell: grid > ${col}/${row} is not defined in grid`

        }


        this.grid[col][row].content = content;
    }

    isValidCell(cell: Point2D) {
        if (cell.x < 0)
            return false;
        if (cell.y < 0)
            return false;
        if (cell.x > this.width - 1)
            return false;
        if (cell.y > this.height - 1)
            return false;

        return true;
    }

    getCell(x: number, y: number): GameGridCell {
        if (x < 0) throw new Error("x must be greater than or equal to 0");
        if (y < 0) throw new Error("y must be greater than or equal to 0");
        if (x > this.width - 1) throw new Error("x must be less than width");
        if (y > this.height - 1) throw new Error("y must be less than height");

        return this.grid[x][y];
    }

    getCellFromPoint(point: Point2D): GameGridCell {
        Ensure.objectNotNull(point, "point is required");

        if (!this.grid[point.x][point.y]) {
            throw `getCellFromPoint > cell not defined ${point.x}/${point.y}`;
        }
        return this.grid[point.x][point.y];
    }

    getAdjacentCells(col: number, row: number): GameGridCell[] {

        let rightCell = new Point2D(col + 1, row);
        let leftCell = new Point2D(col - 1, row);
        let upCell = new Point2D(col, row - 1);
        let downCell = new Point2D(col, row + 1);

        let response = new Array<GameGridCell>()
        // right - if cell is valid and empty ... return adjacent cell
        if (this.isValidCell(rightCell)) {
            let cell = this.getCellFromPoint(rightCell);
            if (cell.content == GameGridCellContent.Empty) {
                response.push(cell);
            }
        }

        // left - if cell is valid and empty ... return adjacent cell
        if (this.isValidCell(leftCell)) {
            let cell = this.getCellFromPoint(leftCell);
            if (cell.content == GameGridCellContent.Empty) {
                response.push(cell);
            }
        }

        // up - if cell is valid and empty ... return adjacent cell
        if (this.isValidCell(upCell)) {
            let cell = this.getCellFromPoint(upCell);
            if (cell.content == GameGridCellContent.Empty) {
                response.push(cell);
            }
        }

        // down - if cell is valid and empty ... return adjacent cell
        if (this.isValidCell(downCell)) {
            let cell = this.getCellFromPoint(downCell);
            if (cell.content == GameGridCellContent.Empty) {
                response.push(cell);
            }
        }

        return response;
    }

    printOut() {
        let col = 0;
        let row = 0;

        let content = "";
        for (row = 0; row < this.height; row++) {
            let line = "";
            for (col = 0; col < this.width; col++) {
                if (this.grid[col][row].content == GameGridCellContent.Empty) {
                    line += "-";
                } else {
                    line += "*";
                }
            }

            content += line + "\n";
        }

        console.log(content);
    }


}