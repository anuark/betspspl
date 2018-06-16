<?php

namespace console\controllers;

use Yii;
use yii\console\Controller;
use common\models\Game;

class GameController extends Controller
{
    /**
     * Action to track if game has already started then change its status to playing
     */
    public function actionStarted()
    {
        date_default_timezone_set('America/Tegucigalpa');
        $games = Game::find()
            ->where('date > "'.date('Y-m-d H:i:s', strtotime('-1 hour')).'"')
            ->all();

        foreach ($games as $game) {
            if (time() > strtotime($game->date) && $game->status != Game::STATUS_PLAYED) {
                $game->status = Game::STATUS_PLAYING;
                $game->update(false, ['status']);
            }
        }
    }
}