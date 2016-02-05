
function check()
{
	//	document.write();
	var d_nerf = document.getElementById( 'nerf' );
	var name =document.form1.field1.value ;
	var summpnerID ;

	$.ajax({
		url: 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + name+ '?api_key=' + API_KEY,
		type: 'GET',
		dataType: 'json',
		data: {

		},
		success: function (json) {
			var SUMMONER_NAME_NOSPACES = name.replace(" ", "");

			SUMMONER_NAME_NOSPACES = SUMMONER_NAME_NOSPACES.toLowerCase().trim();

			summonerLevel = json[SUMMONER_NAME_NOSPACES].summonerLevel;
			summonerID = json[SUMMONER_NAME_NOSPACES].id;


			sumName = json[SUMMONER_NAME_NOSPACES].name;
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			alert("error getting Summoner data!");
		}
	});
	d_nerf.insertAdjacentHTML( 'beforeend', summonerID );

}
