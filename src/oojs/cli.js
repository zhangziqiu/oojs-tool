define && define({
	name:'cli',
	namespace:'oojs',
	deps: {
		args: 'oojs.args'
	},
	$cli: function(){
		var allArgs = process.argv;		
	
		
		var cmdArgs;//去除掉 node 和 oojs 命令后的参数对象
		if(allArgs[0]==='node'){
			cmdArgs = allArgs.slice(2);
		}
		else{
			cmdArgs = allArgs.slice(1);
		}
				
		//获取子命令
		var commandName; 
		var commandArgs;
		if( cmdArgs && cmdArgs.length>0 ){
			commandName = cmdArgs[0];
			commandArgs = cmdArgs.slice(1);
		}
		
		//处理参数
		var argMapping = this.args.parseArgs(commandArgs);	
		
		var cmdClass = oojs.using('oojs.command.'+commandName);
		var cmd = oojs.create(cmdClass, argMapping);
		cmd.run();


	}
});
