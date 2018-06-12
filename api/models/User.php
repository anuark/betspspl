<?php

namespace api\models;

class User extends \common\models\User
{
    public function fields()
    {
        $fields = parent::fields();
        unset($fields['password_hash'], $fields['password_reset_token']);
        return $fields;
    }
}