
<?PHP
$sql_host="localhost";
$sql_root="root";
$sql_pw="";
$sql_name="48_star";
$json;
$con=mysqli_connect($sql_host,$sql_root,$sql_pw,$sql_name);
if(!$con)
{
	$json["err"]="sql err";
	echo json_encode($json);
	die("");
}
$ac=$_GET["action"];
if($ac==1)
{
	$name=$_GET["name"];
	$score=$_GET["score"];
	$time=$_GET["time"];
	mysqli_query($con,"INSERT INTO rank (name,score,time) VALUES('$name','$score','$time')");
	$rs=mysqli_query($con,"SELECT * FROM rank");
	while($dt=mysqli_fetch_row($rs))
	{
		$json["rank"][]=$dt;
	}
}
echo json_encode($json);
?>