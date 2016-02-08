
function letGetChamipons()
{
	//	document.write();
	var d_chsel = document.getElementById( 'championsel' );

	$.ajax({
		url: 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?dataById=true&api_key=' + API_KEY,
		type: 'GET',
		dataType: 'json',
		data: {	},
		async: false,
		success: function (json)
		{
			var datas = json.data;
			var champions = new Array();
			for(var i=1; i<500; i++)
			{
				if( datas[i])
				{
					champions[champions.length] = new chara(datas[i].name, i );
				}
			}
			champions.sort(function(a,b)
			{
				if(a.name<b.name) return -1;
				if(a.name > b.name) return 1;
				return 0;
			});
			for(var i=0; i<champions.length; i++)
			{
					d_chsel.insertAdjacentHTML( 'beforeend', '<option value='+ champions[i].id + '>' +champions[i].name +'</option>' );
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			alert("error getting Summoner data!");
		}
	});

}
function letGetChampionData()
{
	var d_chdata = document.getElementById( 'right_frame' );
	var championId = document.form1.championsel.options[document.form1.championsel.selectedIndex].value;
	var d_old = document.getElementById('data');
	if(d_old != null){
		d_old.parentNode.removeChild(d_old);
	}


	$.ajax({
		//NA
		//url: 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/'+championId+'?locale=en_US&champData=all&api_key=' + API_KEY,
		//JP
		url: 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/'+championId+'?locale=ja_JP&champData=all&api_key=' + API_KEY,
		type: 'GET',
		dataType: 'json',
		data: { },
		async: false,
		success: function (json)
		{
			var championImage =json.image
			championName = json.name;
			spells = json.spells;
			//letsSetChampionImageSquare( championImage.full );
			d_chdata.insertAdjacentHTML( 'beforeend', '<div id="data">');
			d_chdata.insertAdjacentHTML( 'beforeend', championName + '<br>' );
			d_chdata.insertAdjacentHTML( 'beforeend', '<br>' );
			d_chdata.insertAdjacentHTML( 'beforeend', 'Q: ' + spells[0].name + '<br>' );
			d_chdata.insertAdjacentHTML( 'beforeend', 'W: ' + spells[1].name + '<br>' );
			d_chdata.insertAdjacentHTML( 'beforeend', 'E: ' + spells[2].name + '<br>' );
			d_chdata.insertAdjacentHTML( 'beforeend', 'R: ' + spells[3].name + '<br>' );
			d_chdata.insertAdjacentHTML( 'beforeend', '</div>' );
		},
		error: function (XMLHttpRequest, textStatus, errorThrown)
		{
			alert("error getting Game data!");
		}
	});
}

function chara(name, id)
{
	this.name=name;
	this.id=id;
}
