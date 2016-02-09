var API_KEY = "6566e1d4-9ea7-4e57-a201-a2e2fe74897f";
function VERSION(name)
{
	switch(name)
	{
		case 'static-data':
			return "v1.2";
		case 'summoner':
			return 'v1.4';
		case 'game':
			return 'v1.3';
		case 'ddragon':
			return '6.2.1';
	}
}
var LOCAL_US = "en_US";
var LOCAL_JP = "ja_JP";
var REGION = "na";
var HOST_GLOBAL = "https://global.api.pvp.net/api/lol/";
var HOST_NA = "https://na.api.pvp.net/api/lol/";
