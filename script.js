
function check()
{
//	document.write();
	var d_nerf = document.getElementById( 'nerf' );
	var d_appkey = document.getElementById( 'appkey' );

	d_nerf.insertAdjacentHTML( 'beforeend', document.form1.field1.value );
	d_appkey.insertAdjacentHTML( 'beforeend', APP_KEY );
}
