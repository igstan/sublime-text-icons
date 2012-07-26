// Load this in Photoshop from "File > Scripts > Browse..."

var langs = {
  // keys: used to name resulted iconsets
  // values: used for text in template icon
  "ASP": "ASP",
  "BATCH": "BATCH",
  "BibTeX": "BibTeX",
  "C#": "C#",
  "C++": "C++",
  "C": "C",
  "COFFEE": "COFFEE",
  "CONFIG": "CONFIG",
  "CSS": "CSS",
  "Document": "",
  "DOT": "DOT",
  "ERLANG": "ERLANG",
  "GROOVY": "GROOVY",
  "HASKELL": "HASKELL",
  "HTML": "HTML",
  "JAVA": "JAVA",
  "JS": "JS",
  "JSP": "JSP",
  "LISP": "LISP",
  "LUA": "LUA",
  "MAKEFILE": "MAKEFILE",
  "MARKDOWN": "MARK↓",
  "MATLAB": "MATLAB",
  "NANT": "NANT",
  "OBJ-C++": "OBJ-C++",
  "OBJ-C": "OBJ-C",
  "OCAML": "OCAML",
  "PERL": "PERL",
  "PHP": "PHP",
  "PYTHON": "PYTHON",
  "R": "R",
  "RAILS": "RAILS",
  "REGEXP": "REGEXP",
  "RUBY": "RUBY",
  "SCHEME": "SCHEME",
  "SHELL": "SHELL",
  "SQL": "SQL",
  "SVG": "SVG",
  "TCL": "TCL",
  "TeX": "TeX",
  "TEXT": "TEXT",
  "TEXTILE": "TEXTILE",
  "XHTML": "XHTML",
  "XML": "XML",
  "XSL": "XSL",
  "YAML": "YAML",
  "YAWS": "YAWS"
};

function exportIconset(doc, iconText, fileName, folder) {
  var originalState = doc.activeHistoryState;
  doc.artLayers["TEXT"].textItem.contents = iconText;

  var sizes = [512, 256, 128, 32, 16];
  var beforeResize = doc.activeHistoryState;

  for (var i=0; i<sizes.length; i++) {
    var size = sizes[i];

    doc.resizeImage(size, size, doc.resolution, ResampleMethod.BICUBIC);

    var saveTarget = new File(folder.absoluteURI + "/icon_" + size + "x" + size + ".png");
    var options = new ExportOptionsSaveForWeb;
    options.format = SaveDocumentType.PNG;
    options.optimized = false;
    options.PNG8 = false;
    options.quality = 100;
    options.transparency = true;

    doc.exportDocument(saveTarget, ExportType.SAVEFORWEB, options);
    doc.activeHistoryState = beforeResize;
  };

  doc.activeHistoryState = originalState;
}

(function main() {
  var scriptFolder = new Folder($.includePath);
  var targetFolder = new Folder(scriptFolder + "/build");
  targetFolder.create();

  var file = new File(scriptFolder.absoluteURI + "/icon-template.psd");
  app.open(file);

  var doc = app.documents[0];

  for (var lang in langs) {
    var iconText = langs[lang];
    var fileName = lang;

    var folder = new Folder(targetFolder.absoluteURI + "/" + fileName + ".iconset");
    folder.create();

    exportIconset(doc, iconText, fileName, folder);
  }
})();
