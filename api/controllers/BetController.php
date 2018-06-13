<?php

namespace api\controllers;

use Yii;
use yii\rest\ActiveController;
use api\models\Bet;
use yii\web\BadRequestHttpException;

class BetController extends ActiveController
{
    public $modelClass = 'api\models\Bet';

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

    public function acionIndex()
    {
        $bets = Bet::find()->where(['user_id' => Yii::$app->user->id])->all();
        return $bets;
    }

    public function actionCreate()
    {
        $model = new Bet();
        if ($model->load(Yii::$app->request->post(), '')) {
            $bet = Bet::find()->where(['user_id' => $model->user_id, 'game_id' => $model->game_id])->one();
            if (!$bet) {
                $model->save();
                return $model;
            }

            $bet->load(Yii::$app->request->post(), '');
            $bet->update();
            return $bet;
        }

        throw new BadRequestHttpException(getError($model));
    }
}
