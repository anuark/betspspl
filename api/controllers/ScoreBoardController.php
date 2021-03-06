<?php

namespace api\controllers;

use Yii;
use yii\rest\Controller;
use api\models\ScoreBoard;

class ScoreBoardController extends Controller
{
    public function behaviors()
    {
        return [
            'corsFilter' => [
                'class' => 'yii\filters\Cors',
            ],
            'authenticator' => [
                'class' => 'yii\filters\auth\HttpBearerAuth'
            ]
        ];
    }

    public function actionIndex()
    {
        return ScoreBoard::find()->orderBy('points DESC')->all();
    }
}