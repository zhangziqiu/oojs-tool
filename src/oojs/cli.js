define && define({
    name:'cli',
    namespace:'oojs',
    deps: {
        args: 'oojs.args'
    },
    $cli: function(){
        //所有的参数
        var allArgs = process.argv;        
    
        //获取命令参数, 即去除掉命令本身(node或者oojs)的参数.
        var cmdArgs;
        if(allArgs[0]==='node'){
            //使用node bin/oojs-cli gzip 方式调用的, 需要去掉前两个参数
            cmdArgs = allArgs.slice(2);
        }
        else{
            //使用 oojs gzip 方式调用的, 需要去掉第一个参数
            cmdArgs = allArgs.slice(1);
        }
                
        //获取子命令, 第一个参数必须是子命令. 比如: oojs gzip 中的gzip就是子命令
        var commandName; 
        var commandArgs;
        if( cmdArgs && cmdArgs.length>0 ){
            commandName = cmdArgs[0];
            commandArgs = cmdArgs.slice(1);
        }
        
        //处理参数
        var argMapping = this.args.parseArgs(commandArgs);    
        
        //使用子命令对象
        var cmdClass = oojs.using('oojs.command.'+commandName);
        var cmd = oojs.create(cmdClass, argMapping);
        cmd.run();
    }
});
