<?php

namespace api\models;

use Yii;
use yii\base\Model;
use api\models\User;

class LoginForm extends Model
{
    public $googleid;

    public function rules()
    {
        return [
            [['googleid'], 'safe']
        ];
    }

    public function getUser()
    {
        $user = User::find()->one();
        return $user;
    }
}