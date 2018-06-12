<?php

namespace api\models;

use Yii;
use yii\base\Model;

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
        return 123;
    }
}