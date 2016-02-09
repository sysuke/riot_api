
function letGetChamipons()
{
	//	document.write();
	var d_chsel = document.getElementById( 'championsel' );
	var api_name = "static-data";

	$.ajax({
		url: HOST_GLOBAL+api_name+'/'+REGION+'/'+VERSION(api_name)+'/champion?dataById=true&api_key='+API_KEY,
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
	var mobafirach = document.form1.mobafire.checked;
	var d_old = document.getElementById('data');
	if(d_old != null){
		d_old.parentNode.removeChild(d_old);
	}
	var api_name = "static-data";
	var locale = LOCAL_JP;

	$.ajax({
		url: HOST_GLOBAL+api_name+'/'+REGION+'/'+VERSION(api_name)+'/champion/'+championId+'?locale='+locale+'&champData=all&api_key='+API_KEY,
		type: 'GET',
		dataType: 'json',
		data: { },
		async: false,
		success: function (json)
		{
			var championImage =json.image
			championName = json.name;
			spells = json.spells;
			passive = json.passive;
			key = json.key;
			d_chdata.insertAdjacentHTML( 'beforeend',
				  '<div id="data">'+ '<br>'
				+ championName + '<br>'
				+ '<br>'
				+ 'passive: ' + passive.name + '<br>'
				+ ' ' + passive.description + '<br>'
				+ '<br>'
				+ 'Q: ' + spells[0].name + '<br>'
				+ ' ' + spells[0].description + '<br>'
				+ '<br>'
				+ 'W: ' + spells[1].name + '<br>'
				+ ' ' + spells[1].description + '<br>'
				+ '<br>'
				+ 'E: ' + spells[2].name + '<br>'
				+ ' ' + spells[2].description + '<br>'
				+ '<br>'
				+ 'R: ' + spells[3].name + '<br>'
				+ ' ' + spells[3].description + '<br>'
				+ '<br>');
			if(mobafirach)
			{
				d_chdata.insertAdjacentHTML( 'beforeend',
					  '<iframe src="'
					+ 'http://www.mobafire.com/league-of-legends/'+ key +'-guide"'
					+ 'width="1000" height="500" name="modifire">'
					+ 'modifire'
					+ '</iframe>');
			}
			d_chdata.insertAdjacentHTML( 'beforeend', '</div>' );
			letsSetChampionImageSquare( championImage.full );
		},
		error: function (XMLHttpRequest, textStatus, errorThrown)
		{
			alert("error getting Game data!");
		}
	});
}

function letsSetChampionImageSquare( championImageSquare )
{
	var d_data = document.getElementById( 'data' );
	var icon_size = 40;

	d_data.insertAdjacentHTML(
			'afterbegin',
			'<img src="'
			+ 'http://ddragon.leagueoflegends.com/cdn/6.2.1/img/champion/'
			+ championImageSquare
			+ '"'
			+ 'width='+ icon_size + 'height='+ icon_size
			+'>' );
}
function chara(name, id)
{
	this.name=name;
	this.id=id;
}
