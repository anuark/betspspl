<?php

namespace api\controllers;

use Yii;
use yii\rest\Controller;
use api\models\Game;

class GameController extends Controller
{
    public function actionIndex()
    {
        return Game::find()->all();
    }
}