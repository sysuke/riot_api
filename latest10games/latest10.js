
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
			var games = json.games;

			var len = games.length;
			for(var i=0; i < len; i++)
			{
				var gamesStats = games[i].stats;
				var date = new Date(games[i].createDate);

				d_nerf.insertAdjacentHTML( 'beforeend', ' '
					+ date.getMonth() + '/'
					+ date.getDate()  + ' '
					+ date.getHours() + ':'
					+ date.getMinutes()
					);
				gameMode = games[i].gameMode;
				d_nerf.insertAdjacentHTML( 'beforeend', ' ' + gameMode );
				championId = games[i].championId

				letsGetChampion( championId );
				gameMode = games[i].gameMode;
				if(gamesStats.win == true)
				{
					d_nerf.insertAdjacentHTML( 'beforeend', ' Win' );
				}
				else
				{
					d_nerf.insertAdjacentHTML( 'beforeend', ' Lose' );
				}

				kills = gamesStats.championsKilled;
				if(!isFinite(kills))
				{
					deaths = 0;
				}
				deaths = gamesStats.numDeaths;
				if(!isFinite(deaths))
				{
					deaths = 0;
				}
				assists =  gamesStats.assists;
				if(!isFinite(assists))
				{
					deaths = 0;
				}

				d_nerf.insertAdjacentHTML( 'beforeend', ' KDA:' + kills );
				d_nerf.insertAdjacentHTML( 'beforeend', '/' + deaths );
				d_nerf.insertAdjacentHTML( 'beforeend', '/' + assists );
				d_nerf.insertAdjacentHTML( 'beforeend', '<br>' );
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
		//NA
		url: 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/'+championId+'?locale=en_US&champData=all&api_key=' + API_KEY,
		//JP
		//url: 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/'+championId+'?locale=ja_JP&champData=all&api_key=' + API_KEY,
		type: 'GET',
		dataType: 'json',
		data: { },
		async: false,
		success: function (json)
		{

			var championImage =json.image
			championName = json.name;
			letsSetChampionImageSquare( championImage.full );
			d_nerf.insertAdjacentHTML( 'beforeend', ' ' + championName );
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

