<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= $page->title()->html() ?></title>
  <?= css('assets/css/tailwind.css') ?>
  <?= js('assets/js/main.js', ['defer'=>true, 'async'=>true]) ?>
</head>
<body>
  