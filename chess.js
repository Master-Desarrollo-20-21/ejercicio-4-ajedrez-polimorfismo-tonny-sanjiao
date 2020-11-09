const COLOR = {
    WHITE: 'white',
    BLACK: 'black'
}

const column={
    A: 0,
    B: 1,
    C: 2,
    D: 3,
    E: 4,
    F: 5,
    G: 6,
    H: 7
}

class Piece{
    constructor(kind,color){
        this.kind=kind;
        this.color=color;
    }
}

class Pawn extends Piece{
        constructor(color){
            super("Pawn",color)
            this.kind="Pawn";
            this.value=1;
            this.beenMovedFirstTime=false; // anota si se ha movido almenos una vez para no hacer movimientos de dos casillas.

            if(color==COLOR.WHITE){
                this.symbol="P"
            }else{
                this.symbol="p"
            }

        }
}

class Rook extends Piece{
        constructor(color){
            super("Rook",color)
            this.kind="Rook";
            this.value=5;
            if(color===COLOR.WHITE){
                this.symbol="R"
            }else{
                this.symbol="r"
            }
        }
}

class Knight extends Piece{
        constructor(color){
            super("Knight",color)
            this.kind="Knight";
            this.value=3;
            if(color===COLOR.WHITE){
                this.symbol="K"
            }else{
                this.symbol="k"
            }
        }
}

class Bishop extends Piece{
    constructor(color){
        super("Bishop",color)
        this.kind="Bishop";
        this.value=3;
        if(color===COLOR.WHITE){
            this.symbol="B"
        }else{
            this.symbol="b"
        }
    }
}

class Queen extends Piece{
    constructor(color){
        super("Queen",color)
        this.kind="Queen";
        this.value=9;
        if(color===COLOR.WHITE){
            this.symbol="Q"
        }else{
            this.symbol="q"
        }
    }
}

class King extends Piece{
    constructor(color){
        super("King",color)
        this.kind="King";
        this.value=1000;
        if(color===COLOR.WHITE){
            this.symbol="K"
        }else{
            this.symbol="k"
        }
    }
}

class Player{
    constructor(color){
        this.color=color;
        this.points=0;
    }
    move(fromSquare,toSquare){

    }
}

class Square{
    constructor (row,column,board){
        this.row=row;
        this.column=column;
        this.board=board;
    }
    
    getPiece(row,column){
        if (row===undefined){ // hacemos la sobrecarga del método
            return this.board.grid[this.row][this.column];
        }
        return this.board.grid[row][column];
    }

    isItFree(row,column){ // si la casilla está vacía, no hay pieza y por tanto no tiene atributos de pieza
        if (row===undefined){
            return (this.getPiece()===" ");
        }
        return (this.getPiece(row,column)===" ");
    }

    isItFirstMovement(row,column){ // si la casilla está vacía, no hay pieza y por tanto no tiene atributos de pieza
        if (row===undefined){
            return (this.getPiece().beenMovedFirstTime===false);
        }
        return (this.getPiece(row,column).beenMovedFirstTime===false);
    }

    isItOwn(color,row,column){
        if (row===undefined){
            return this.getPiece().color===color;
        }
        return this.getPiece(row,column).color===color;
    }

    isItEnemy(colorOfMine,row,column){
        if (row===undefined){
            return this.isItFree()===false && this.isItOwn(colorOfMine)===false;
        }
        return this.isItFree(row,column)===false && this.isItOwn(colorOfMine,row,column)===false;
    }

    coordinatesAreInGrid(row,column){
        if (row===undefined){
            return this.row<=7 && this.row>=0 && this.column<=7 && this.column>=0;
        }
        return row<=7 && row>=0 && column<=7 && column>=0;
    }
    getListOfPossibleMovements(){
        const possibleMovements=[];
        if (this.getPiece().kind=="Pawn"){
            if (this.coordinatesAreInGrid(this.row+1,this.column)===true  && this.isItFree(this.row+1,this.column)===true){
                possibleMovements.push([[this.row+1],[this.column]]);
                if (this.coordinatesAreInGrid(this.row+2,this.column)===true && this.isItFree(this.row+2,this.column)===true && this.isItFirstMovement()===true){
                    possibleMovements.push([[this.row+2],[this.column]]);
                }
            }

            if (this.coordinatesAreInGrid(this.row+1,this.column+1)===true && this.isItEnemy(this.color,this.row+1,this.column+1)===true && this.isItFirstMovement()===true){
                possibleMovements.push([[this.row+1],[this.column+1]]);
            }

            if (this.coordinatesAreInGrid(this.row+1,this.column-1)===true && this.isItEnemy(this.color,this.row+1,this.column-1)===true && this.isItFirstMovement()===true){
                possibleMovements.push([[this.row+1],[this.column-1]]);
            }
        }

        if (this.getPiece().kind=="Rook"){
            var i=this.column+1;
            while(this.coordinatesAreInGrid(this.row,i) && this.isItFree(this.row,i)){
                if(this.isItFree(this.row,i) || this.isItFree(this.row,i)){
                    possibleMovements.push([[this.row],[i]]);
                }
                i++;
            }

            i=this.column-1;
            while(this.coordinatesAreInGrid(this.row,i) && this.isItFree(this.row,i)){
                if(this.isItFree(this.row,i) || this.isItFree(this.row,i)){
                    possibleMovements.push([[this.row],[i]]);
                }
                i--;
            }

            i=this.row+1;
            while(this.coordinatesAreInGrid(i,this.column) && this.isItFree(i,this.column)){
                if(this.isItFree(i,this.column) || this.isItFree(i,this.column)){
                    possibleMovements.push([[i],[this.column]]);
                }
                i++;
            }

            i=this.column-1;
            while(this.coordinatesAreInGrid(i,this.column) && this.isItFree(i,this.column)){
                if(this.isItFree(i,this.column) || this.isItFree(i,this.column)){
                    possibleMovements.push([[i],[this.column]]);
                }
                i--;
            }

        }

        return possibleMovements;
    }
}

class Board{
    constructor(){
        this.grid= [[new Rook(COLOR.WHITE),new Knight(COLOR.WHITE),new Bishop(COLOR.WHITE),new Queen(COLOR.WHITE),new King(COLOR.WHITE),new Bishop(COLOR.WHITE),new Knight(COLOR.WHITE),new Rook(COLOR.WHITE)], 
            Array(8).fill(new Pawn(COLOR.WHITE)),
            Array(8).fill(" "),
            Array(8).fill(" "),
            Array(8).fill(" "),
            Array(8).fill(" "),
            Array(8).fill(new Pawn(COLOR.BLACK)),
            [new Rook(COLOR.BLACK),new Knight(COLOR.BLACK),new Bishop(COLOR.BLACK),new King(COLOR.BLACK),new Queen(COLOR.BLACK),new Bishop(COLOR.BLACK),new Knight(COLOR.BLACK),new Rook(COLOR.BLACK)]
            ];
        this.playerBlacks=new Player(COLOR.BLACK);
        this.playerWhites=new Player(COLOR.WHITE);
    }
}
function miFuncion(){
    const a =new Rook(COLOR.BLACK);
    const b =new Board();
    const s=new Square(2,2,b);
    //s.board.grid[2][1]=new Pawn(COLOR.WHITE);
    s.board.grid[2][2]=new Rook(COLOR.WHITE);
    //s.board.grid[2][0]=new Pawn(COLOR.WHITE);
    console.log(s.getListOfPossibleMovements());
    //const t=new Square(2,2,b);
    //console.log(t.getListOfPossibleMovements());

}
