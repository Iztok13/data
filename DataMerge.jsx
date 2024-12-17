// ExtendScript skripta za Adobe Illustrator
// Uporablja podatke iz CSV datoteke za ustvarjanje podlag z vsebino

// Parametri artboarda
var artboardWidth = 420 * 2.83465; // Pretvorba mm v pt
var artboardHeight = 297 * 2.83465;

// Pozicije in velikosti besedila
var positions = {
    "Koda izdelka": { x: -2629.11 * 2.83465, y: 212.68 * 2.83465, font: "Arial-BoldMT", size: 9 },
    "Koda modula": { x: -2514.31 * 2.83465, y: 212.68 * 2.83465, font: "Arial-BoldMT", size: 9 },
    "Slovenski naziv": { x: -2382.56 * 2.83465, y: 276.66 * 2.83465, font: "HelveticaNeueLTStd-Cn", size: 15 },
    "Angleški naziv": { x: -2382.24 * 2.83465, y: 290.2 * 2.83465, font: "HelveticaNeueLTStd-Cn", size: 15 },
    "Koda": { x: -2260.58 * 2.83465, y: 239.43 * 2.83465, font: "Helvetica", size: 13.7 },
    "Tampo koda": { x: -2263.41 * 2.83465, y: 277.53 * 2.83465, font: "Helvetica", size: 13.7 }
};

// Branje CSV datoteke
var file = File.openDialog("Izberite CSV datoteko");
if (!file) {
    alert("Datoteka ni bila izbrana.");
    return;
}

file.open("r");
var csvData = file.read();
file.close();

// Pretvorba CSV v vrstice in stolpce
var rows = csvData.split("\n");
var headers = rows[0].split(",");
var data = rows.slice(1).map(function(row) {
    return row.split(",");
});

// Ustvari artboarde in postavi besedilo
var doc = app.documents.add();
data.forEach(function(row, index) {
    if (index > 0) {
        doc.artboards.add([0, 0, artboardWidth, -artboardHeight]);
    }

    var artboard = doc.artboards[index];
    doc.artboards.setActiveArtboardIndex(index);

    headers.forEach(function(header, colIndex) {
        var text = row[colIndex];
        var position = positions[header.trim()];

        if (position) {
            var textFrame = doc.textFrames.add();
            textFrame.contents = text;
            textFrame.textRange.characterAttributes.textFont = app.textFonts.getByName(position.font);
            textFrame.textRange.characterAttributes.size = position.size;
            textFrame.position = [position.x, position.y];
        }
    });
});

alert("Artboardi in besedilo so bili ustvarjeni.");
