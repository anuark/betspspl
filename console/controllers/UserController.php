<?php

namespace console\controllers;

use Yii;
use yii\console\Controller;

class UserController extends Controller
{
    public function actionRememberMatch()
    {
        date_default_timezone_set('America/Tegucigalpa');
        $query = (new Query())
            ->from('user u')
            ->innerJoin('bet b', 'b.user_id = u.id')
            ;
        
        foreach ($query->all() as $user) {
            Yii::$app->mailer->compose()
                ->setTo($user->email)
                ->setFrom('noreply@sps-pl.com')
                ->setSubject("No has apostado en el partido que viene.")
                ->setTextBody("")
                ->send();
        }
    }
}