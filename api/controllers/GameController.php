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
            ],
            'authenticator' => [
                'class' => 'yii\filters\auth\HttpBearerAuth'
            ]
        ];
    }

    public function actionIndex()
    {
        return Game::find()
            ->select([
                'game.*',
                'IF(b.id IS NOT NULL, 1, 0) AS has_bet',
                'IF(b.id IS NOT NULL, b.asserted, 0) AS asserted',
                'b.bet_for_local',
                'b.bet_for_draw',
                'b.bet_for_away'
            ])
            ->leftJoin('bet b', 'b.game_id = game.id AND b.user_id = '.Yii::$app->user->id)
            ->all();
    }
}