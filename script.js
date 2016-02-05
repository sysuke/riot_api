
function letGetSummoner()
{
	//	document.write();
	var d_nerf = document.getElementById( 'nerf' );
	var name =document.form1.field1.value ;

	$.ajax({
		url: 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + name+ '?api_key=' + API_KEY,
		type: 'GET',
		dataType: 'json',
		data: {	},
		async: false,
		success: function (json)
		{
			var SUMMONER_NAME_NOSPACES = name.replace(" ", "");

			SUMMONER_NAME_NOSPACES = SUMMONER_NAME_NOSPACES.toLowerCase().trim();

			summonerID = json[SUMMONER_NAME_NOSPACES].id;

			letsGetGames( summonerID );

		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			alert("error getting Summoner data!");
		}
	});

}

function letsGetGames(summonerID)
{
	var d_nerf = document.getElementById( 'nerf' );

	$.ajax({
		url: 'https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/'+summonerID+'/recent?api_key=' + API_KEY,
		type: 'GET',
		dataType: 'json',
		data: { },
		async: false,
		success: function (json)
		{
			var gameArray = json.games

			var len = 10;
			for(var i=0; i < len; i++)
			{
				d_nerf.insertAdjacentHTML( 'beforeend', 'game '+ ("0"+(i+1)).slice(-2) );
				gameMode = gameArray[i].gameMode;
				d_nerf.insertAdjacentHTML( 'beforeend', ' ' + gameMode );
				championId = gameArray[i].championId

				letsGetChampion( championId );
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown)
		{
			alert("error getting Game data!");
		}
	});
}

function letsGetChampion(championId)
{
	var d_nerf = document.getElementById( 'nerf' );

	$.ajax({
		url: 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/'+championId+'?locale=en_US&champData=all&api_key=' + API_KEY,
		type: 'GET',
		dataType: 'json',
		data: { },
		async: false,
		success: function (json)
		{

			var championImage =json.image
			championName = json.name;
			letsSetChampionImageSquare( championImage.full );
			d_nerf.insertAdjacentHTML( 'beforeend', ' ' + championName + '<br>' );
		},
		error: function (XMLHttpRequest, textStatus, errorThrown)
		{
			alert("error getting Game data!");
		}
	});
}

function letsSetChampionImageSquare( championImageSquare )
{
	var d_nerf = document.getElementById( 'nerf' );
	var icon_size = 25;

	d_nerf.insertAdjacentHTML(
			'beforeend',
			'<img src="'
			+ 'http://ddragon.leagueoflegends.com/cdn/6.2.1/img/champion/'
			+ championImageSquare
			+ '"'
			+ 'width='+ icon_size + 'height='+ icon_size
			+'>' );
}

