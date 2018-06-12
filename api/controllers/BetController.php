<?php

namespace api\controllers;

use Yii;
use yii\rest\ActiveController;
use api\models\Bet;

class BetController extends ActiveController
{
    public $modelClass = 'api\models\Bet';

    public function behaviors()
    {
        return [
            'authenticator' => [
                'class' => 'yii\filters\auth\HttpBearerAuth'
            ]
        ];
    }

    public function acionIndex()
    {
        $bets = Bet::find()->where(['user_id' => Yii::$app->user->id])->all();
        return $bets;
    }
}