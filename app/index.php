<?php

$page = $_GET["p"];

switch ($page) {

    case 'devices':
        $page = "devices";
        break;

    case 'app':
        $page = "app";
        break;

    case 'appvr':
        $page = "appvr";
        break;

    case 'appgyro':
        $page = "appgyro";
        break;
  
    default:
        $page = "home";
        break;
}

?>

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Stitch</title>
    <meta name="description" content="An interractive webGL experience through 3D soundscapes">
    <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0"><!-- shrink-to-fit=no -->
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="theme-color" content="#8500ff">

    <link rel="apple-touch-icon" sizes="57x57" href="assets/img/favicons/apple-touch-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="assets/img/favicons/apple-touch-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="assets/img/favicons/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="assets/img/favicons/apple-touch-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="assets/img/favicons/apple-touch-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="assets/img/favicons/apple-touch-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="assets/img/favicons/apple-touch-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="assets/img/favicons/apple-touch-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="assets/img/favicons/apple-touch-icon-180x180.png">
    <link rel="icon" type="image/png" href="assets/img/favicons/favicon-32x32.png" sizes="32x32">
    <link rel="icon" type="image/png" href="assets/img/favicons/favicon-194x194.png" sizes="194x194">
    <link rel="icon" type="image/png" href="assets/img/favicons/favicon-96x96.png" sizes="96x96">
    <link rel="icon" type="image/png" href="assets/img/favicons/android-chrome-192x192.png" sizes="192x192">
    <link rel="icon" type="image/png" href="assets/img/favicons/favicon-16x16.png" sizes="16x16">
    <link rel="manifest" href="assets/img/favicons/manifest.json">
    <link rel="shortcut icon" href="assets/img/favicons/favicon.ico">
    <meta name="msapplication-TileColor" content="#8500ff">
    <meta name="msapplication-TileImage" content="assets/img/favicons/mstile-144x144.png">
    <meta name="msapplication-config" content="assets/img/favicons/browserconfig.xml">

    <script src="https://use.typekit.net/xlp3tha.js"></script>
    <script>try{Typekit.load({ async: true });}catch(e){}</script>
    <link href="assets/css/styles.min.css" rel="stylesheet">
  </head>

  <body class="<?php echo $page; ?>">
     <?php include 'views/'.$page.'.view.php'; ?>  
  </body>
</html>