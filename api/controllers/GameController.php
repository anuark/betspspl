<?php

namespace api\controllers;

use Yii;
use yii\rest\Controller;
use api\models\{Game, Bet, User};
use yii\web\NotFoundHttpException;

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

    public function actionWinners($id)
    {
        $this->findModel($id);
        $userIds = Bet::find()->select('user_id')->where(['game_id' => $id, 'asserted' => 1])->column();
        return User::find()->where(['id' => $userIds])->all();
    }

    /**
     * Finds the Game model based on its primary key value.
     * If the model is not found, a 404 HTTP exception will be thrown.
     * @return Game the loaded model
     * @throws NotFoundHttpException if the model cannot be found
     */
    protected function findModel($id)
    {
        if (($model = Game::findOne($id)) !== null) {
            return $model;
        }

        throw new NotFoundHttpException('The requested page does not exist.');
    }
}