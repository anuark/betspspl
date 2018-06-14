<?php

namespace api\models;

class User extends \common\models\User
{
    public function fields()
    {
        $fields = parent::fields();
        unset($fields['password_hash'], $fields['password_reset_token']);
        $fields['points'] = function ($model) {
            return (int) (new Query())
                ->select('SUM(asserted)')
                ->from('bet')
                ->where(['user_id' => $model->id])
                ->scalar();
        };

        return $fields;
    }
}