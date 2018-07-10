<?php

namespace api\models;

use yii\db\Query;

class User extends \common\models\User
{
    public function fields()
    {
        $fields = parent::fields();
        unset($fields['password_hash'], $fields['password_reset_token']);
        $fields['points'] = function ($model) {

            return (int) (new Query())
                ->select('SUM(asserted)+SUM(g.is_extra_point)')
                ->from('bet b')
                ->innerJoin('game g', 'b.game_id = g.id')
                ->where(['user_id' => $model->id, 'b.asserted' => 1])
                ->scalar();
        };

        return $fields;
    }
}