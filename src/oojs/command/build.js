define && define({
    name: 'build',
    namespace: 'oojs.command',
    deps: {
        fileSync: 'oojs.utility.fileSync',
        jsHelper: 'oojs.utility.jsHelper',
        gzip: 'oojs.utility.gzip'
    },
    $build: function () {
        this.fs = require('fs');
        this.path = require('path');
    },
    
    build: function(args){
        this.config = args.config || './package.json';
        this.configPath = this.path.resolve(this.config);
    },

    /*
    "build": {
        unionInlay: {
            template: './entry/unionInlay.js',
            sourceFile: ['./test/asset/c.source.js'],
            formatFile: ['./test/asset/c.js'],
            compressFile: ['./asset/c.js'],
            gzipFile: ['./asset/c.js.gz']
        }
    }
    */
    run: function () {

        var packageObj = require(this.configPath);
        var buildObj = packageObj.build;

        for (var key in buildObj) {
            if (key && buildObj[key] && buildObj.hasOwnProperty(key)) {
                var buildItem = buildObj[key];
                var buildTemplate = buildItem.template;

                var templateSource = this.fileSync.readFileSync(buildTemplate);
                var importRegexp = /\$import\((\S+)\)\s*;/gi;
                var importMatch;
                var sourceFileString = templateSource.replace(importRegexp, function () {                
                    var result = "";
                    var importFilePath = arguments[1];
                    importFilePath = importFilePath.replace(/\'/gi,"").replace(/\"/gi,"");
                    if (importFilePath) {                        
                        result = this.fileSync.readFileSync(importFilePath);
                    }
                    return result;
                }.proxy(this));
                
                
                //����source�ļ�
                var sourceFileArray = buildItem.sourceFile;
                for(var i=0, count=sourceFileArray.length; i<count; i++){
                    var tempSourceFilePath = sourceFileArray[i];
                    this.fs.writeFileSync(tempSourceFilePath, sourceFileString);   
                }
                
                
                //����format�ļ�
                var formatFileString = this.jsHelper.formatSync(sourceFileString,{comments: false} );
                var formatFileArray = buildItem.formatFile;
                for(var i=0, count=formatFileArray.length; i<count; i++){
                    var tempFormatFilePath = formatFileArray[i];
                    this.fs.writeFileSync(tempFormatFilePath, formatFileString);
                }               
                
                
                //����compress�ļ�
                var compressFileString = this.jsHelper.compressSync(sourceFileString);
                var compressFileArray = buildItem.compressFile;
                for(var i=0, count=compressFileArray.length; i<count; i++){
                    var tempCompressFilePath = compressFileArray[i];
                    this.fs.writeFileSync(tempCompressFilePath, compressFileString);
                }               
                
                //����gzip�ļ�
                var gzipFileArray = buildItem.gzipFile;
                for(var i=0, count=gzipFileArray.length; i<count; i++){
                    var tempGzipFilePath = gzipFileArray[i];
                    this.gzip.zipStringToFileSync(tempGzipFilePath, compressFileString);
                }
                
                 return;
            }
        }

    }

});

