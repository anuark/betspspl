<?php

namespace api\controllers;

use Yii;
use yii\rest\ActiveController;
use yii\web\BadRequestHttpException;
use api\models\LoginForm;

class UserController extends ActiveController
{
    public $modelClass = 'api\models\User';

    public function behaviors()
    {
        return [
            'corsFilter' => [
                'class' => \yii\filters\Cors::className(),
            ],
        ];
    }

    public function actionAuth()
    {
        $model = new LoginForm();
        if ($model->load(Yii::$app->request->post(), '') && $model->validate() && $model->user) {
            return $model->user;
        }

        throw new BadRequestHttpException(getError($model));
    }
}
