define && define({
	name:'args',
	namespace:'oojs',
	parseArgs:function(args){
		var result = { values:[] };
		var count = args.length;
		for(var i=0; i<count; ){
			var tempName = args[i];
			var tempValue = args[i+1];
			if(tempName.indexOf('--')===0){
				//--n=0
				tempName = tempName.substring(2);
				var tempArray = tempName.split('=');
				tempName = tempArray[0];
				tempValue = tempArray[1];
				i++;
			}
			else if(tempName.indexOf('-')===0){
				//-n 0
				tempName = tempName.substring(1);
				if(tempValue && tempValue.indexOf('-')>-1){
					tempValue = null;
					i++;
				}
				else{
					i=i+2;
				}
			}
			else{
				//n
				result.values.push(tempName);
				tempValue = null;
			}
			if(!tempValue){
				tempValue = true;
			}
			result[tempName] = tempValue;
		}
		return result;
	}
});