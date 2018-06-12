<?php

namespace api\controllers;

use Yii;
use yii\rest\Controller;
use api\models\Game;

class GameController extends Controller
{

    public function behaviors()
    {
        return [
            'corsFilter' => [
                'class' => \yii\filters\Cors::className(),
                'cors' => [
                    'Origin' => ['*'],
                    'Access-Control-Allow-Origin' => ['*'],
                    'Access-Control-Request-Method' => ['*'],
                    'Access-Control-Request-Headers' => ['*'],
                    'Access-Control-Max-Age' => ['3600']
                ]
            ],
        ];
    }

    public function actionIndex()
    {
        return Game::find()->select('*, DATE(date) AS date2')->indexBy('date2')->all();
    }
}