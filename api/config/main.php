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
                    'extraPatterns' => [
                        'POST,OPTIONS auth' => 'auth',
                        'OPTIONS /' => 'index'
                    ]
                ],
                [
                    'class' => 'yii\rest\UrlRule',
                    'controller' => 'game',
                    'extraPatterns' => [
                        'OPTIONS index' => 'index',
                        'OPTIONS /' => 'index',
                        'GET,OPTIONS {id}/winners' => 'winners'
                    ]
                ],
                [
                    'class' => 'yii\rest\UrlRule',
                    'controller' => 'bet',
                    'extraPatterns' => [
                        'OPTIONS /' => 'index'
                    ]
                ],
                [
                    'class' => 'yii\rest\UrlRule',
                    'pluralize' => false,
                    'controller' => 'score-board',
                    'patterns' => [
                        'GET,OPTIONS /' => 'index'
                    ]
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
