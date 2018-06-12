<?php

$params = array_merge(
    require(__DIR__ . '/../../common/config/params.php'), 
    require(__DIR__ . '/../../common/config/params-local.php'), 
    require(__DIR__ . '/params.php'), 
    require(__DIR__ . '/params-local.php')
);

return [
    'id' => 'app-api',
    'basePath' => dirname(__DIR__),
    'controllerNamespace' => 'api\controllers',
    'bootstrap' => ['log'],
    'components' => [
        'user' => [
            'identityClass' => 'common\models\User',
            'enableAutoLogin' => false,
            'enableSession' => false,
            'loginUrl' => null,
        ],
        'urlManager' => [
            'enablePrettyUrl' => true,
            'enableStrictParsing' => true,
            'showScriptName' => false,
            'rules' => [
                [
                    'class' => 'yii\rest\UrlRule',
                    'controller' => 'user',
                    'patterns' => [
                        'POST,OPTIONS auth' => 'auth',
                        'GET,OPTIONS,HEAD' => 'index'
                    ]
                ],
                [
                    'class' => 'yii\rest\UrlRule',
                    'controller' => 'game'
                ],
                [
                    'class' => 'yii\rest\UrlRule',
                    'controller' => 'bet'
                ],
            ],
        ],
        'request' => [
            'parsers' => [
                'application/json' => 'yii\web\JsonParser',
            ]
        ],
        'response' => [
            'format' => yii\web\Response::FORMAT_JSON,
            'charset' => 'UTF-8'
        ],
    ],
    'params' => $params,
];
